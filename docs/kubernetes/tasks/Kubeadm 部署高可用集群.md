---
order: 1
tags:
  - k8s安装
title: Kubeadm 部署高可用集群
date: 2023-10-19 14:21:49
categories:
  - kubernetes
  - tasks
columns:
  -
---

# Kubeadm 部署高可用集群

## 1. 主机配置

预安装 CentOS7。

### 1.1 设置时间

开启时间同步

```bash
yum install -y chrony

systemctl enable chronyd

systemctl start chronyd

systemctl status chronyd

timedatectl set-ntp true

timedatectl status
```

::: warning
Warning: The system is configured to read the RTC time in the local time zone.
This mode can not be fully supported. It will create various problems
with time zone changes and daylight saving time adjustments. The RTC
time is never updated, it relies on external facilities to maintain it.
If at all possible, use RTC in UTC by calling
'timedatectl set-local-rtc 0'.
:::

无特殊情况，不能启用硬件的时钟来校时。

```bash
timedatectl set-local-rtc 0
```

设置时区

```bash
timedatectl set-timezone Asia/Shanghai
```

检查 ntp-server 是否可用

```bash
chronyc activity -v
```

### 1.2 设置防火墙

关闭所有防火墙。

```bash
iptables -F

systemctl status firewalld

systemctl stop firewalld

systemctl disable firewalld
```

### 1.3 静态 host

所有计划加入 k8s 集群的机器。

```bash
cat /etc/hosts

172.16.0.175 free00
172.16.0.167 free01
172.16.0.168 free02
172.16.0.170 free03
```

### 1.4 检查 mac 和 product_uuid

同一个 k8s 集群内的所有节点需要确保 mac 地址和 product_uuid 均唯一，开始集群初始化之前需要检查相关信息

```bash
# 检查mac地址
ip link
ifconfig -a

# 检查product_uuid
sudo cat /sys/class/dmi/id/product_uuid
```

### 1.5 配置 ssh 免密登录

```bash
# 在root用户下面生成一个公用的key，并配置可以使用该key免密登录
su root
ssh-keygen
cd /root/.ssh/
cat id_rsa.pub >> authorized_keys
chmod 600 authorized_keys

cat >> ~/.ssh/config <<EOF
Host free00
    HostName 172.16.0.175
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa

Host free01
    HostName 172.16.0.167
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa

Host free02
    HostName 172.16.0.168
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa

Host free03
    HostName 172.16.0.170
    User root
    Port 22
    IdentityFile ~/.ssh/id_rsa
EOF

ssh-copy-id -p 22 free00
ssh-copy-id -p 22 free01
ssh-copy-id -p 22 free02
ssh-copy-id -p 22 free03
```

### 1.6 关闭 swap 内存

```bash
# 使用命令直接关闭swap内存
swapoff -a

# 修改fstab文件禁止开机自动挂载swap分区
sed -i '/swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

### 1.7 关闭 selinux

```bash
# 使用命令直接关闭
setenforce 0

# 也可以直接修改/etc/selinux/config文件
sed -i 's/^SELINUX=enforcing$/SELINUX=disabled/' /etc/selinux/config
```

### 1.8 配置 netfilter 参数

这里主要是需要配置内核加载 br_netfilter 和 iptables 放行 ipv6 和 ipv4 的流量，确保集群内的容器能够正常通信。

```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
br_netfilter
EOF

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sudo sysctl --system
```

### 1.9 配置 ipvs

如果我们使用的是 cilium 来完全替代 kube-proxy，那么实际上就用不到 ipvs 和 iptables，因此这一步理论上是可以跳过的。

## 2. CNI 组件选择

### 2.1 Cilium

[1. Cilium 依赖](https://wiki.moweilong.com/sre/cilium/Cilium%20%E4%BE%9D%E8%B5%96.html)

[2. 内核升级](https://wiki.moweilong.com/sre/linux/CentOS7%20%E5%86%85%E6%A0%B8%E5%8D%87%E7%BA%A7.html)

[3. 内核配置](https://wiki.moweilong.com/sre/linux/CentOS7%20内核配置.html)

## 3. 安装 container runtime

详细的官方文档可以参考[这里](https://kubernetes.io/docs/setup/production-environment/container-runtimes/)，由于在发布的 1.24 版本中移除了 docker-shim，因此安装的版本 ≥1.24 的时候需要注意容器运行时的选择。这里我们安装的版本为最新的 1.24，因此我们不能继续使用 docker，这里我们将其换为[containerd](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd)

### 3.1 修改 Linux 内核参数

```bash
# 首先生成配置文件确保配置持久化
cat <<EOF | sudo tee /etc/modules-load.d/containerd.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# Setup required sysctl params, these persist across reboots.
cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF

# Apply sysctl params without reboot
sudo sysctl --system
```

### 3.2 安装 containerd

```bash
# 导入 docker 官方的 yum 源
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

sudo yum-config-manager --add-repo  https://download.docker.com/linux/centos/docker-ce.repo

# 查看 yum 源中存在的各个版本的 containerd.io
yum list containerd.io --showduplicates | sort -r

# 安装 kubekey 推荐版本的 containerd.io
yum install containerd.io-1.6.4-3.1.el7.x86_64 -y

# 也可以安装最新版本
yum install containerd -y

# 设置一下开机启动
sudo systemctl enable --now containerd

sudo systemctl status containerd
```

### 3.3 关于 CRI

官方表示，对于 k8s 来说，不需要安装 cri-containerd，并且该功能会在后面的 2.0 版本中废弃。

::: tip
FAQ: For Kubernetes, do I need to download cri-containerd-(cni-)<\VERSION>-<\OS-<\ARCH>.tar.gz too?
Answer: No.
As the Kubernetes CRI feature has been already included in containerd-<\VERSION>-OS>-ARCH>.tar.gz, you do not need to download the cri-containerd-.... archives to use CRI.
The cri-containerd-... archives are [deprecated](https://github.com/containerd/containerd/blob/main/RELEASES.md#deprecated-features), do not work on old Linux distributions, and will be removed in containerd 2.0.
:::

### 3.4 安装 cni-plugins

使用 yum 源安装的方式会把 runc 安装好，但是并不会安装 cni-plugins，因此这部分还是需要我们自行安装。

::: tip
The containerd.io package contains runc too, but does not contain CNI plugins.
:::

我们直接在 [github](https://github.com/containernetworking/plugins/releases) 上面找到系统对应的架构版本，这里为 amd64，然后解压即可。

```bash
# Download the cni-plugins-<OS>-<ARCH>-<VERSION>.tgz archive from https://github.com/containernetworking/plugins/releases , verify its sha256sum, and extract it under /opt/cni/bin:

export CNI_VERSION=v1.3.0
# 下载源文件和sha512文件并校验
wget https://ghproxy.com/https://github.com/containernetworking/plugins/releases/download/${CNI_VERSION}/cni-plugins-linux-amd64-${CNI_VERSION}.tgz

wget https://ghproxy.com/https://github.com/containernetworking/plugins/releases/download/${CNI_VERSION}/cni-plugins-linux-amd64-${CNI_VERSION}.tgz.sha512

sha512sum -c cni-plugins-linux-amd64-${CNI_VERSION}.tgz.sha512

# 创建目录并解压
mkdir -p /opt/cni/bin
tar Cxzvf /opt/cni/bin cni-plugins-linux-amd64-${CNI_VERSION}.tgz
```

### 3.5 配置 cgroup drivers

CentOS7 使用的是 systemd 来初始化系统并管理进程，初始化进程会生成并使用一个 root 控制组 (cgroup), 并充当 cgroup 管理器。 Systemd 与 cgroup 集成紧密，并将为每个 systemd 单元分配一个 cgroup。 我们也可以配置容器运行时和 kubelet 使用 cgroupfs。 连同 systemd 一起使用 cgroupfs 意味着将有两个不同的 cgroup 管理器。而当一个系统中同时存在 cgroupfs 和 systemd 两者时，容易变得不稳定，因此最好更改设置，令容器运行时和 kubelet 使用 systemd 作为 cgroup 驱动，以此使系统更为稳定。 对于 containerd, 需要设置配置文件/etc/containerd/config.toml 中的 SystemdCgroup 参数。

参考 k8s 官方的[说明文档](https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd-systemd)：

kubekey containerd 使用的配置

```bash
vi /etc/containerd/config.toml
```

```toml
version = 2
root = "/var/lib/containerd"
state = "/run/containerd"

[grpc]
address = "/run/containerd/containerd.sock"
uid = 0
gid = 0
max_recv_message_size = 16777216
max_send_message_size = 16777216

[ttrpc]
address = ""
uid = 0
gid = 0

[debug]
address = ""
uid = 0
gid = 0
level = ""

[metrics]
address = ""
grpc_histogram = false

[cgroup]
path = ""

[timeouts]
"io.containerd.timeout.shim.cleanup" = "5s"
"io.containerd.timeout.shim.load" = "5s"
"io.containerd.timeout.shim.shutdown" = "3s"
"io.containerd.timeout.task.state" = "2s"

[plugins]
[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
runtime_type = "io.containerd.runc.v2"
[plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
SystemdCgroup = true
[plugins."io.containerd.grpc.v1.cri"]
sandbox_image = "registry.aliyuncs.com/google_containers/pause:3.9"
[plugins."io.containerd.grpc.v1.cri".cni]
bin_dir = "/opt/cni/bin"
conf_dir = "/etc/cni/net.d"
max_conf_num = 1
conf_template = ""
[plugins."io.containerd.grpc.v1.cri".registry]
[plugins."io.containerd.grpc.v1.cri".registry.mirrors]
[plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
endpoint = ["https://registry-1.docker.io"]
```

重启服务

```bash
systemctl restart containerd

systemctl status containerd
```

### 3.6 关于 kubelet 的 cgroup driver

k8s 官方有[详细的文档](https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/configure-cgroup-driver/)介绍了如何设置 kubelet 的 cgroup driver，需要特别注意的是，在 1.22 版本开始，如果没有手动设置 kubelet 的 cgroup driver，那么默认会设置为 systemd

::: tip
Note:
In v1.22 and later, if the user does not set the cgroupDriver field under KubeletConfiguration, kubeadm defaults it to systemd.

In Kubernetes v1.28, you can enable automatic detection of the cgroup driver as an alpha feature. See systemd cgroup driver for more details.
:::

一个比较简单的指定 kubelet 的 cgroup driver 的方法就是在 kubeadm-config.yaml 加入 cgroupDriver 字段

```yaml
# kubeadm-config.yaml
kind: ClusterConfiguration
apiVersion: kubeadm.k8s.io/v1beta3
kubernetesVersion: v1.21.0
---
kind: KubeletConfiguration
apiVersion: kubelet.config.k8s.io/v1beta1
cgroupDriver: systemd
```

我们可以直接查看 configmaps 来查看初始化之后集群的 kubeadm-config 配置。

```bash
kubectl describe configmaps kubeadm-config -n kube-system
```

当然因为我们需要安装的版本高于 1.22.0 并且使用的就是 systemd，因此可以不用再重复配置。

### 3.7 安装 cri-tools

[cri-tools](https://github.com/kubernetes-sigs/cri-tools/releases)设置版本和 k8s 第二个版本对应即可

```bash
VERSION="v1.28.0"

wget https://ghproxy.com/https://github.com/kubernetes-sigs/cri-tools/releases/download/$VERSION/crictl-$VERSION-linux-amd64.tar.gz

tar zxvf crictl-$VERSION-linux-amd64.tar.gz -C /usr/local/bin
```

配置 crictl

```bash
vi /etc/crictl.yaml
```

```yaml
runtime-endpoint: unix:///run/containerd/containerd.sock
image-endpoint: unix:///run/containerd/containerd.sock
timeout: 5
debug: false
pull-image-on-create: false
```

验证

```bash
crictl version
```

## 4. 安装 kube 组件

对应的官方文档可以参考[这里](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#installing-kubeadm-kubelet-and-kubectl)

kube 三件套就是 kubeadm、kubelet 和 kubectl，三者的具体功能和作用如下：

- kubeadm：用来初始化集群的指令。
- kubelet：在集群中的每个节点上用来启动 Pod 和容器等。
- kubectl：用来与集群通信的命令行工具。

需要注意的是：

- kubeadm 不会帮助我们管理 kubelet 和 kubectl，其他两者也是一样的，也就是说这三者是相互独立的，并不存在谁管理谁的情况；
- kubelet 的版本必须小于等于 API-server 的版本，否则容易出现兼容性的问题；
- kubectl 并不是集群中的每个节点都需要安装，也并不是一定要安装在集群中的节点，可以单独安装在自己本地的机器环境上面，然后配合 kubeconfig 文件即可使用 kubectl 命令来远程管理对应的 k8s 集群；

CentOS7 的安装比较简单，我们直接使用官方提供的 yum 源即可。需要注意的是这里需要设置 selinux 的状态，但是前面我们已经关闭了 selinux，因此这里略过这步。

yum 源

```bash
# 直接导入谷歌官方的yum源
cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-\$basearch
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
exclude=kubelet kubeadm kubectl
EOF

# 当然如果连不上谷歌的源，可以考虑使用国内的阿里镜像源 el7 el8 通用
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

安装三件套

```bash
# 我们要安装的k8s版本是最新版本的，使用这个命令
sudo yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes

# 如果网络环境不好出现gpgcheck验证失败导致无法正常读取yum源，可以考虑关闭该yum源的repo_gpgcheck
sed -i 's/repo_gpgcheck=1/repo_gpgcheck=0/g' /etc/yum.repos.d/kubernetes.repo

# 或者在安装的时候禁用gpgcheck
sudo yum install -y kubelet kubeadm kubectl --nogpgcheck --disableexcludes=kubernetes

# 如果想要安装特定版本，可以使用这个命令查看相关版本的信息
sudo yum list --nogpgcheck kubelet kubeadm kubectl --showduplicates --disableexcludes=kubernetes

sudo yum install -y kubelet-1.26.7-0 kubeadm-1.26.7-0 kubectl-1.26.7-0 --disableexcludes=kubernetes
```

配置开机自启 kubelet

```bash
sudo systemctl enable --now kubelet
```

## 5. 高可用配置

keepalive 和 haproxy

## 6. 初始化集群

### 6.1 初始化集群配置

我们先使用 kubeadm 命令查看一下主要的几个镜像版本

```bash
kubeadm config images list
```

输出

```bash
registry.k8s.io/kube-apiserver:v1.28.2
registry.k8s.io/kube-controller-manager:v1.28.2
registry.k8s.io/kube-scheduler:v1.28.2
registry.k8s.io/kube-proxy:v1.28.2
registry.k8s.io/pause:3.9
registry.k8s.io/etcd:3.5.9-0
registry.k8s.io/coredns/coredns:v1.10.1
```

为了方便编辑和管理，我们还是把初始化参数导出成配置文件

```bash
kubeadm config print init-defaults > kubeadm-kubeproxy-free.conf
```

修改配置文件:

- 考虑到大多数情况下国内的网络无法使用谷歌的 k8s.gcr.io 镜像源，我们可以直接在配置文件中修改 imageRepository 参数为阿里的镜像源
- kubernetesVersion 字段用来指定我们要安装的 k8s 版本
- criSocket 从 1.24.0 版本开始已经默认变成了 containerd
- 修改 etcd 存储路径
- controlPlaneEndpoint 配置为 slb 的地址端口
- podSubnet、serviceSubnet 和 dnsDomain 两个参数默认情况下可以不用修改，这里我按照自己的需求进行了变更

```bash
apiServer:
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta3
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: registry.aliyuncs.com/google_containers
kind: ClusterConfiguration
controlPlaneEndpoint: 172.16.0.200:16443
kubernetesVersion: 1.28.2
networking:
  dnsDomain: cluster.local
  serviceSubnet: 10.18.0.0/18
  podSubnet: 10.18.64.0/18
```

### 6.2 初始化集群

此时我们再查看对应的配置文件中的镜像版本，就会发现已经变成了对应阿里云镜像源的版本

我们可以在[集群初始化](https://kubernetes.io/zh-cn/docs/reference/setup-tools/kubeadm/kubeadm-init/)的时候添加参数 `--skip-phases=addon/kube-proxy` 跳过 kube-proxy 的安装

查看一下对应的镜像版本，确定配置文件是否生效

```bash
kubeadm config images list --config  kubeadm-kubeproxy-free.conf
```

输出

```bash
registry.aliyuncs.com/google_containers/kube-apiserver:v1.28.2
registry.aliyuncs.com/google_containers/kube-controller-manager:v1.28.2
registry.aliyuncs.com/google_containers/kube-scheduler:v1.28.2
registry.aliyuncs.com/google_containers/kube-proxy:v1.28.2
registry.aliyuncs.com/google_containers/pause:3.9
registry.aliyuncs.com/google_containers/etcd:3.5.9-0
registry.aliyuncs.com/google_containers/coredns:v1.10.1
```

确认没问题之后我们直接拉取镜像

```bash
kubeadm config images pull --config kubeadm-kubeproxy-free.conf
```

初始化，注意添加参数跳过 kube-proxy 的安装

```bash
kubeadm init --config kubeadm-kubeproxy-free.conf --skip-phases=addon/kube-proxy
```

当我们看到下面这个输出结果的时候，我们的集群就算是初始化成功了

```bash
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now join any number of control-plane nodes by copying certificate authorities
and service account keys on each node and then running the following as root:

  kubeadm join 172.16.0.200:16443 --token 7cwlcl.from7wfu1rgyfluf \
        --discovery-token-ca-cert-hash sha256:6ee757429ad9eb56048de2963f3bc66f228abb0895edde2cbe2c1f85ff9d58b8 \
        --control-plane

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 172.16.0.200:16443 --token 7cwlcl.from7wfu1rgyfluf \
        --discovery-token-ca-cert-hash sha256:6ee757429ad9eb56048de2963f3bc66f228abb0895edde2cbe2c1f85ff9d58b8
```

刚初始化成功之后，我们还没办法马上查看 k8s 集群信息，需要配置 kubeconfig 相关参数才能正常使用 kubectl 连接 apiserver 读取集群信息。

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

添加 kubectl 的自动补全功能

```bash
echo "source <(kubectl completion bash)" >> ~/.bashrc

# 安装完成后重新登陆shell
yum install bash-completion -y
```

配置完成后，我们再执行相关命令就可以查看集群的信息了。

```bash
kubectl cluster-info

kubectl get nodes -o wide

kubectl get pod -A
```

这时候查看 daemonset 可以看到是没有 kube-proxy 的

```bash
kubectl get ds -A
```

master02 master03 执行

```bash
mkdir -p /etc/kubernetes/pki/etcd
```

拷贝证书到 master02 master03 节点

```bash
scp /etc/kubernetes/pki/ca.* /etc/kubernetes/pki/sa.* /etc/kubernetes/pki/front-proxy-ca.* free01:/etc/kubernetes/pki/

scp /etc/kubernetes/pki/etcd/ca.* free01:/etc/kubernetes/pki/etcd/

scp /etc/kubernetes/pki/ca.* /etc/kubernetes/pki/sa.* /etc/kubernetes/pki/front-proxy-ca.* free03:/etc/kubernetes/pki/

scp /etc/kubernetes/pki/etcd/ca.* free03:/etc/kubernetes/pki/etcd/
```

master02 master03 执行命令加入 master

```
  kubeadm join 172.16.0.200:16443 --token 7cwlcl.from7wfu1rgyfluf \
        --discovery-token-ca-cert-hash sha256:6ee757429ad9eb56048de2963f3bc66f228abb0895edde2cbe2c1f85ff9d58b8 \
        --control-plane
```

### 6.3 添加 worker 节点

这时候我们还需要继续添加剩下的节点作为 worker 节点运行负载，直接在剩下的节点上面运行集群初始化成功时输出的命令就可以成功加入集群。

因为我们前面的 kubeadm 初始化 master 节点的时候没有启用 kube-proxy，所以在添加节点的时候会出现警告，但是不影响我们继续添加节点

```bash
kubeadm join 172.16.0.200:16443 --token 7cwlcl.from7wfu1rgyfluf \
        --discovery-token-ca-cert-hash sha256:6ee757429ad9eb56048de2963f3bc66f228abb0895edde2cbe2c1f85ff9d58b8
```

如果不小心没保存初始化成功的输出信息也没有关系，我们可以使用 kubectl 工具查看或者生成 token

```bash
# 查看现有的token列表
kubeadm token list

# 如果token已经失效，那就再创建一个新的token
kubeadm token create

# 如果找不到--discovery-token-ca-cert-hash参数，则可以在master节点上使用openssl工具来获取
openssl x509 -pubkey -in /etc/kubernetes/pki/ca.crt | openssl rsa -pubin -outform der 2>/dev/null | openssl dgst -sha256 -hex | sed 's/^.* //'

# 输出 90f0a5e68b57d00d3f92a59f1464dfe0e7d8115365dc902fcdf596f8c1744445

kubeadm join 172.16.0.200:16443 --token 9xs6nr.zdwayftngv9l9jl7 \
        --discovery-token-ca-cert-hash sha256:90f0a5e68b57d00d3f92a59f1464dfe0e7d8115365dc902fcdf596f8c1744445
```

添加完成之后我们再查看集群的节点可以发现状态还是 NotReady，接下来就需要部署 CNI 了。

## 7. 安装 CNI

### 7.1 安装 helm3

cilium 的部署依赖 helm3，因此我们在部署 cilium 之前需要先安装 [helm3](https://helm.sh/zh/docs/intro/install/#%E7%94%A8%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%89%88%E6%9C%AC%E5%AE%89%E8%A3%85)。

通过[二进制包](https://github.com/helm/helm/releases)安装

```bash
# 国内太慢了
wget https://get.helm.sh/helm-v3.13.1-linux-amd64.tar.gz

tar -zxvf helm-v3.13.1-linux-amd64.tar.gz

cp -rp linux-amd64/helm /usr/local/bin/

helm version
```

### 7.2 安装 Cilium

完整的部署指南可以参考官方文档，首先我们添加 helm 的 repo。

```bash
helm repo add cilium https://helm.cilium.io/

helm repo list
```

参考官网的[文档](https://docs.cilium.io/en/stable/installation/k8s-install-helm/)，这里我们需要指定集群的 APIserver 的 IP 和端口

```bash
helm install cilium ./cilium \
    --namespace kube-system \
    --set kubeProxyReplacement=true \
    --set k8sServiceHost=REPLACE_WITH_API_SERVER_IP \
    --set k8sServicePort=REPLACE_WITH_API_SERVER_PORT
```

但是考虑到 cilium 默认使用的 podCIDR 为 10.0.0.0/8，很可能会和我们集群内的网络冲突，最好的方案就是初始化的时候指定 podCIDR，关于初始化的时候 podCIDR 的设置，可以参考官方的这个[文章](https://docs.cilium.io/en/stable/network/kubernetes/ipam-cluster-pool/#gsg-ipam-crd-cluster-pool)。

```bash
helm install cilium cilium/cilium --version 1.14.3 \
    --namespace kube-system \
    --set kubeProxyReplacement=true  \
    --set ipam.mode=cluster-pool      \
    --set k8sServiceHost=REPLACE_WITH_API_SERVER_IP \
    --set k8sServicePort=REPLACE_WITH_API_SERVER_PORT \
	--set ipam.operator.clusterPoolIPv4PodCIDRList=<IPv4CIDR> \
	--set ipam.operator.clusterPoolIPv4MaskSize=<IPv4MaskSize>
```

最后可以得到我们的初始化安装参数

```bash
helm install cilium cilium/cilium --version 1.14.3 \
    --namespace kube-system \
    --set kubeProxyReplacement=true  \
    --set k8sServiceHost=172.16.0.200 \
    --set k8sServicePort=16443 \
	--set ipam.operator.clusterPoolIPv4PodCIDRList=10.18.64.0/18 \
	--set ipam.operator.clusterPoolIPv4MaskSize=24
```

此时我们再查看集群的 daemonset 和 deployment 状态：

```bash
# 这时候查看集群的daemonset和deployment状态可以看到cilium相关的服务已经正常
kubectl get ds -A
```

输出

```bash
NAMESPACE     NAME     DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
kube-system   cilium   4         4         4       4            4           kubernetes.io/os=linux   4m21s
```

再查看所有的 pod，状态都正常，ip 也和我们初始化的时候分配的 ip 段一致，说明初始化的参数设置生效了。

```bash
# 再查看所有的pod，状态都正常，ip按预期进行了分配
kubectl get pods -A -o wide
```

输出

```bash
NAMESPACE     NAME                               READY   STATUS              RESTARTS   AGE     IP             NODE     NOMINATED NODE   READINESS GATES
kube-system   cilium-gr2j4                       1/1     Running             0          5m31s   172.16.0.167   free01   <none>           <none>
kube-system   cilium-j9ld5                       1/1     Running             0          5m31s   172.16.0.175   free00   <none>           <none>
kube-system   cilium-mzdqn                       0/1     Running            0          5m31s   172.16.0.170   free02   <none>           <none>
kube-system   cilium-operator-6db6645669-nm6l2   1/1     Running             0          5m30s   172.16.0.175   free00   <none>           <none>
kube-system   cilium-operator-6db6645669-wflt2   0/1     Running             0          5m30s   172.16.0.170   free02   <none>           <none>
kube-system   cilium-rz7fl                       1/1     Running             0          5m31s   172.16.0.168   free03   <none>           <none>
kube-system   coredns-66f779496c-cqzgq           1/1     Running             0          54m     10.18.64.11    free00   <none>           <none>
kube-system   coredns-66f779496c-h6rnw           1/1     Running             0          54m     10.18.64.89    free00   <none>           <none>
kube-system   etcd-free00                        1/1     Running             2          54m     172.16.0.175   free00   <none>           <none>
kube-system   etcd-free01                        1/1     Running             1          49m     172.16.0.167   free01   <none>           <none>
kube-system   etcd-free03                        1/1     Running             1          49m     172.16.0.168   free03   <none>           <none>
kube-system   kube-apiserver-free00              1/1     Running             2          54m     172.16.0.175   free00   <none>           <none>
kube-system   kube-apiserver-free01              1/1     Running             2          49m     172.16.0.167   free01   <none>           <none>
kube-system   kube-apiserver-free03              1/1     Running             1          49m     172.16.0.168   free03   <none>           <none>
kube-system   kube-controller-manager-free00     1/1     Running             3          54m     172.16.0.175   free00   <none>           <none>
kube-system   kube-controller-manager-free01     1/1     Running             2          49m     172.16.0.167   free01   <none>           <none>
kube-system   kube-controller-manager-free03     1/1     Running             1          49m     172.16.0.168   free03   <none>           <none>
kube-system   kube-scheduler-free00              1/1     Running             4          54m     172.16.0.175   free00   <none>           <none>
kube-system   kube-scheduler-free01              1/1     Running             2          49m     172.16.0.167   free01   <none>           <none>
kube-system   kube-scheduler-free03              1/1     Running             1          49m     172.16.0.168   free03   <none>           <none>
```

这时候我们再进入 pod 中检查 cilium 的状态

```bash
# --verbose 参数可以查看详细的状态信息
# cilium-j9ld5     需要替换为任意一个cilium的pod
kubectl exec -it -n kube-system cilium-j9ld5  -- cilium status --verbose
```

输出

```bash
Defaulted container "cilium-agent" out of: cilium-agent, config (init), mount-cgroup (init), apply-sysctl-overwrites (init), mount-bpf-fs (init), clean-cilium-state (init), install-cni-binaries (init)
KVStore:                Ok   Disabled
Kubernetes:             Ok   1.28 (v1.28.2) [linux/amd64]
Kubernetes APIs:        ["EndpointSliceOrEndpoint", "cilium/v2::CiliumClusterwideNetworkPolicy", "cilium/v2::CiliumEndpoint", "cilium/v2::CiliumNetworkPolicy", "cilium/v2::CiliumNode", "cilium/v2alpha1::CiliumCIDRGroup", "core/v1::Namespace", "core/v1::Pods", "core/v1::Service", "networking.k8s.io/v1::NetworkPolicy"]
KubeProxyReplacement:   True   [eth0 172.16.0.175 (Direct Routing)]
Host firewall:          Disabled
CNI Chaining:           none
Cilium:                 Ok   1.14.3 (v1.14.3-252a99ef)
NodeMonitor:            Listening for events on 4 CPUs with 64x4096 of shared memory
Cilium health daemon:   Ok
IPAM:                   IPv4: 4/254 allocated from 10.18.64.0/24,
Allocated addresses:
  10.18.64.11 (kube-system/coredns-66f779496c-cqzgq)
  10.18.64.178 (router)
  10.18.64.4 (health)
  10.18.64.89 (kube-system/coredns-66f779496c-h6rnw)
IPv4 BIG TCP:           Disabled
IPv6 BIG TCP:           Disabled
BandwidthManager:       Disabled
Host Routing:           Legacy
Masquerading:           IPTables [IPv4: Enabled, IPv6: Disabled]
Clock Source for BPF:   ktime
Controller Status:      28/28 healthy
  Name                                  Last success   Last error   Count   Message
  cilium-health-ep                      54s ago        never        0       no error
  dns-garbage-collector-job             14s ago        never        0       no error
  endpoint-1030-regeneration-recovery   never          never        0       no error
  endpoint-1262-regeneration-recovery   never          never        0       no error
  endpoint-1389-regeneration-recovery   never          never        0       no error
  endpoint-331-regeneration-recovery    never          never        0       no error
  endpoint-gc                           3m14s ago      never        0       no error
  ipcache-inject-labels                 55s ago        22m58s ago   0       no error
  k8s-heartbeat                         14s ago        never        0       no error
  link-cache                            10s ago        never        0       no error
  metricsmap-bpf-prom-sync              4s ago         never        0       no error
  resolve-identity-1030                 2m55s ago      never        0       no error
  resolve-identity-1262                 2m54s ago      never        0       no error
  resolve-identity-1389                 2m55s ago      never        0       no error
  resolve-identity-331                  2m55s ago      never        0       no error
  sync-host-ips                         55s ago        never        0       no error
  sync-lb-maps-with-k8s-services        22m55s ago     never        0       no error
  sync-policymap-1030                   7m53s ago      never        0       no error
  sync-policymap-1262                   7m54s ago      never        0       no error
  sync-policymap-1389                   7m54s ago      never        0       no error
  sync-policymap-331                    7m54s ago      never        0       no error
  sync-to-k8s-ciliumendpoint (1030)     5s ago         never        0       no error
  sync-to-k8s-ciliumendpoint (1262)     4s ago         never        0       no error
  sync-to-k8s-ciliumendpoint (1389)     5s ago         never        0       no error
  sync-to-k8s-ciliumendpoint (331)      5s ago         never        0       no error
  sync-utime                            55s ago        never        0       no error
  template-dir-watcher                  never          never        0       no error
  write-cni-file                        23m14s ago     never        0       no error
Proxy Status:            OK, ip 10.18.64.178, 0 redirects active on ports 10000-20000, Envoy: embedded
Global Identity Range:   min 256, max 65535
Hubble:                  Ok   Current/Max Flows: 4095/4095 (100.00%), Flows/s: 10.45   Metrics: Disabled
KubeProxyReplacement Details:
  Status:                 True
  Socket LB:              Enabled
  Socket LB Tracing:      Enabled
  Socket LB Coverage:     Full
  Devices:                eth0 172.16.0.175 (Direct Routing)
  Mode:                   SNAT
  Backend Selection:      Random
  Session Affinity:       Enabled
  Graceful Termination:   Enabled
  NAT46/64 Support:       Disabled
  XDP Acceleration:       Disabled
  Services:
  - ClusterIP:      Enabled
  - NodePort:       Enabled (Range: 30000-32767)
  - LoadBalancer:   Enabled
  - externalIPs:    Enabled
  - HostPort:       Enabled
BPF Maps:   dynamic sizing: on (ratio: 0.002500)
  Name                          Size
  Auth                          524288
  Non-TCP connection tracking   72322
  TCP connection tracking       144645
  Endpoint policy               65535
  IP cache                      512000
  IPv4 masquerading agent       16384
  IPv6 masquerading agent       16384
  IPv4 fragmentation            8192
  IPv4 service                  65536
  IPv6 service                  65536
  IPv4 service backend          65536
  IPv6 service backend          65536
  IPv4 service reverse NAT      65536
  IPv6 service reverse NAT      65536
  Metrics                       1024
  NAT                           144645
  Neighbor table                144645
  Global policy                 16384
  Session affinity              65536
  Sock reverse NAT              72322
  Tunnel                        65536
Encryption:            Disabled
Cluster health:        4/4 reachable   (2023-10-20T08:14:57Z)
  Name                 IP              Node        Endpoints
  free00 (localhost)   172.16.0.175    reachable   reachable
  free01               172.16.0.167    reachable   reachable
  free02               172.16.0.170    reachable   reachable
  free03               172.16.0.168    reachable   reachable
```

其实到这里 cilium 的部署就可以说是 ok 了的，整个集群的 cni 都处于正常状态，其余的工作负载也都能够正常运行了。

安装最新版本的 Cilium CLI。Cilium CLI 可用于安装 Cilium、检查 Cilium 安装的状态以及启用/禁用各种功能（例如 clustermesh、Hubble）。

```bash
CILIUM_CLI_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)

CLI_ARCH=amd64

if [ "$(uname -m)" = "aarch64" ]; then CLI_ARCH=arm64; fi
curl -L --fail --remote-name-all https://ghproxy.com/https://github.com/cilium/cilium-cli/releases/download/${CILIUM_CLI_VERSION}/cilium-linux-${CLI_ARCH}.tar.gz{,.sha256sum}

sha256sum --check cilium-linux-${CLI_ARCH}.tar.gz.sha256sum

sudo tar xzvfC cilium-linux-${CLI_ARCH}.tar.gz /usr/local/bin

rm cilium-linux-${CLI_ARCH}.tar.gz{,.sha256sum}
```

要验证 Cilium 是否已正确安装，您可以运行

```bash
cilium status --wait
```

运行以下命令来验证您的集群是否具有正确的网络连接：

```bash
cilium connectivity test
```

恭喜！您拥有一个带有 Cilium 的功能齐全的 Kubernetes 集群。🎉

### 7.3 设置 Hubble 可观测性

Hubble 是 Cilium 的可观察层，可用于获取 Kubernetes 集群的网络和安全层的集群范围内的可见性。

::: tip
确认 Cilium 已正确安装在您的 Kubernetes 集群中。
:::

在 Cilium 中启用 Hubble

```bash
cilium hubble enable

cilium status
```

启用 Hubble 需要在运行 Cilium 的所有节点上打开 TCP 端口 4244。这是正确运行所必需的。

为了访问 Hubble 收集的可观测性数据，请安装 Hubble CLI：

```bash
HUBBLE_VERSION=$(curl -s https://ghproxy.com/https://raw.githubusercontent.com/cilium/hubble/master/stable.txt)

HUBBLE_ARCH=amd64

if [ "$(uname -m)" = "aarch64" ]; then HUBBLE_ARCH=arm64; fi
curl -L --fail --remote-name-all https://ghproxy.com/https://github.com/cilium/hubble/releases/download/$HUBBLE_VERSION/hubble-linux-${HUBBLE_ARCH}.tar.gz{,.sha256sum}

sha256sum --check hubble-linux-${HUBBLE_ARCH}.tar.gz.sha256sum

sudo tar xzvfC hubble-linux-${HUBBLE_ARCH}.tar.gz /usr/local/bin

rm hubble-linux-${HUBBLE_ARCH}.tar.gz{,.sha256sum}
```

验证 Hubble API 访问，为了访问 Hubble API，请创建一个从本地计算机转发到 Hubble 服务的端口。这将允许您将 Hubble 客户端连接到本地端口 4245 并访问 Kubernetes 集群中的 Hubble Relay 服务。有关此方法的更多信息，请[参阅使用端口转发访问集群中的应用程序](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/)。

```bash
# 方式一：使用cilium-cli工具安装的hubble也可以使用cilium暴露api端口，需要注意的是该命令默认会暴露到IPV6和IPV4网络中，如果宿主机节点不支持ipv6网络会报错
cilium hubble port-forward&

# 方式二：使用kubectl的port-forward功能把hubble-relay这个服务的80端口暴露到4245端口上
kubectl port-forward -n kube-system svc/hubble-relay --address 0.0.0.0 4245:80 &
```

现在您可以验证是否可以通过已安装的 CLI 访问 Hubble API：

```bash
hubble status
```

输出

```bash
Healthcheck (via localhost:4245): Ok
Current/Max Flows: 16,380/16,380 (100.00%)
Flows/s: 25.77
Connected Nodes: 4/4
```

您还可以查询流 API 并查找流：

```bash
hubble observe
```

::: tip
如果您将端口转发到除 之外的端口 4245，请确保使用 --server 标志或 HUBBLE_SERVER 环境变量来设置 Hubble 服务器地址（默认值：localhost:4245）。有关更多信息，请通过运行或 配置 Hubble CLI 查看 Hubble CLI 的帮助消息。hubble help statushubble help observehubble config
:::

### 7.4 Service Map & Hubble UI

::: tip
确认 Cilium 和 Hubble 已正确安装在 Kubernetes 集群中。
:::

通过运行以下命令启用 Hubble UI：

::: warning
如果已使用 启用 Hubble ，则必须先使用 暂时禁用 Hubble 。这是因为 Hubble UI 无法在运行时添加。cilium hubble enable
cilium hubble disable
:::

```bash
cilium hubble disable

cilium hubble enable --ui
```

使用 nodeport 的方式来暴露 hubble-ui，首先我们查看原来的 hubble-ui 这个 svc 的配置

```bash
kubectl get svc -n kube-system hubble-ui

# 修改 type: NodePort
kubectl edit svc -n kube-system hubble-ui

kubectl get svc -n kube-system hubble-ui
NAME        TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
hubble-ui   NodePort   10.18.24.150   <none>        80:30317/TCP   40s
```

这时候我们在浏览器中访问 http://120.79.229.149:30317/ 就可以看到 hubble 的 ui 界面了

## 8. 重置集群

任意 master 节点执行以下命令删除节点

```bash
kubectl delete node free01
kubectl delete node free02
kubectl delete node free03
```

所有节点执行以下命令重置

```bash
kubeadm reset -f
```
