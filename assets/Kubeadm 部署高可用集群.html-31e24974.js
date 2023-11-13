import{_ as l,r as t,o as r,c,b as n,d as s,e,a as i}from"./app-8ca7f52c.js";const o={},p=i(`<h1 id="kubeadm-部署高可用集群" tabindex="-1"><a class="header-anchor" href="#kubeadm-部署高可用集群" aria-hidden="true">#</a> Kubeadm 部署高可用集群</h1><h2 id="_1-主机配置" tabindex="-1"><a class="header-anchor" href="#_1-主机配置" aria-hidden="true">#</a> 1. 主机配置</h2><p>预安装 CentOS7。</p><h3 id="_1-1-设置时间" tabindex="-1"><a class="header-anchor" href="#_1-1-设置时间" aria-hidden="true">#</a> 1.1 设置时间</h3><p>开启时间同步</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> chrony

systemctl <span class="token builtin class-name">enable</span> chronyd

systemctl start chronyd

systemctl status chronyd

timedatectl set-ntp <span class="token boolean">true</span>

timedatectl status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>Warning: The system is configured to read the RTC time in the local time zone. This mode can not be fully supported. It will create various problems with time zone changes and daylight saving time adjustments. The RTC time is never updated, it relies on external facilities to maintain it. If at all possible, use RTC in UTC by calling &#39;timedatectl set-local-rtc 0&#39;.</p></div><p>无特殊情况，不能启用硬件的时钟来校时。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>timedatectl set-local-rtc <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设置时区</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>timedatectl set-timezone Asia/Shanghai
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检查 ntp-server 是否可用</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>chronyc activity <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-2-设置防火墙" tabindex="-1"><a class="header-anchor" href="#_1-2-设置防火墙" aria-hidden="true">#</a> 1.2 设置防火墙</h3><p>关闭所有防火墙。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>iptables <span class="token parameter variable">-F</span>

systemctl status firewalld

systemctl stop firewalld

systemctl disable firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-3-静态-host" tabindex="-1"><a class="header-anchor" href="#_1-3-静态-host" aria-hidden="true">#</a> 1.3 静态 host</h3><p>所有计划加入 k8s 集群的机器。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> /etc/hosts

<span class="token number">172.16</span>.0.175 free00
<span class="token number">172.16</span>.0.167 free01
<span class="token number">172.16</span>.0.168 free02
<span class="token number">172.16</span>.0.170 free03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4-检查-mac-和-product-uuid" tabindex="-1"><a class="header-anchor" href="#_1-4-检查-mac-和-product-uuid" aria-hidden="true">#</a> 1.4 检查 mac 和 product_uuid</h3><p>同一个 k8s 集群内的所有节点需要确保 mac 地址和 product_uuid 均唯一，开始集群初始化之前需要检查相关信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查mac地址</span>
<span class="token function">ip</span> <span class="token function">link</span>
<span class="token function">ifconfig</span> <span class="token parameter variable">-a</span>

<span class="token comment"># 检查product_uuid</span>
<span class="token function">sudo</span> <span class="token function">cat</span> /sys/class/dmi/id/product_uuid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-配置-ssh-免密登录" tabindex="-1"><a class="header-anchor" href="#_1-5-配置-ssh-免密登录" aria-hidden="true">#</a> 1.5 配置 ssh 免密登录</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 在root用户下面生成一个公用的key，并配置可以使用该key免密登录</span>
<span class="token function">su</span> root
ssh-keygen
<span class="token builtin class-name">cd</span> /root/.ssh/
<span class="token function">cat</span> id_rsa.pub <span class="token operator">&gt;&gt;</span> authorized_keys
<span class="token function">chmod</span> <span class="token number">600</span> authorized_keys

<span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> ~/.ssh/config <span class="token operator">&lt;&lt;</span><span class="token string">EOF
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
EOF</span>

ssh-copy-id <span class="token parameter variable">-p</span> <span class="token number">22</span> free00
ssh-copy-id <span class="token parameter variable">-p</span> <span class="token number">22</span> free01
ssh-copy-id <span class="token parameter variable">-p</span> <span class="token number">22</span> free02
ssh-copy-id <span class="token parameter variable">-p</span> <span class="token number">22</span> free03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6-关闭-swap-内存" tabindex="-1"><a class="header-anchor" href="#_1-6-关闭-swap-内存" aria-hidden="true">#</a> 1.6 关闭 swap 内存</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用命令直接关闭swap内存</span>
swapoff <span class="token parameter variable">-a</span>

<span class="token comment"># 修改fstab文件禁止开机自动挂载swap分区</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;/swap / s/^\\(.*\\)$/#\\1/g&#39;</span> /etc/fstab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-7-关闭-selinux" tabindex="-1"><a class="header-anchor" href="#_1-7-关闭-selinux" aria-hidden="true">#</a> 1.7 关闭 selinux</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用命令直接关闭</span>
setenforce <span class="token number">0</span>

<span class="token comment"># 也可以直接修改/etc/selinux/config文件</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/^SELINUX=enforcing$/SELINUX=disabled/&#39;</span> /etc/selinux/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-8-配置-netfilter-参数" tabindex="-1"><a class="header-anchor" href="#_1-8-配置-netfilter-参数" aria-hidden="true">#</a> 1.8 配置 netfilter 参数</h3><p>这里主要是需要配置内核加载 br_netfilter 和 iptables 放行 ipv6 和 ipv4 的流量，确保集群内的容器能够正常通信。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/modules-load.d/k8s.conf</span>
br_netfilter
EOF</span>

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/sysctl.d/k8s.conf</span>
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF</span>
<span class="token function">sudo</span> <span class="token function">sysctl</span> <span class="token parameter variable">--system</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-9-配置-ipvs" tabindex="-1"><a class="header-anchor" href="#_1-9-配置-ipvs" aria-hidden="true">#</a> 1.9 配置 ipvs</h3><p>如果我们使用的是 cilium 来完全替代 kube-proxy，那么实际上就用不到 ipvs 和 iptables，因此这一步理论上是可以跳过的。</p><h2 id="_2-cni-组件选择" tabindex="-1"><a class="header-anchor" href="#_2-cni-组件选择" aria-hidden="true">#</a> 2. CNI 组件选择</h2><h3 id="_2-1-cilium" tabindex="-1"><a class="header-anchor" href="#_2-1-cilium" aria-hidden="true">#</a> 2.1 Cilium</h3>`,35),d={href:"https://wiki.moweilong.com/sre/cilium/Cilium%20%E4%BE%9D%E8%B5%96.html",target:"_blank",rel:"noopener noreferrer"},u={href:"https://wiki.moweilong.com/sre/linux/CentOS7%20%E5%86%85%E6%A0%B8%E5%8D%87%E7%BA%A7.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://wiki.moweilong.com/sre/linux/CentOS7%20%E5%86%85%E6%A0%B8%E9%85%8D%E7%BD%AE.html",target:"_blank",rel:"noopener noreferrer"},b=n("h2",{id:"_3-安装-container-runtime",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_3-安装-container-runtime","aria-hidden":"true"},"#"),s(" 3. 安装 container runtime")],-1),m={href:"https://kubernetes.io/docs/setup/production-environment/container-runtimes/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd",target:"_blank",rel:"noopener noreferrer"},h=i(`<h3 id="_3-1-修改-linux-内核参数" tabindex="-1"><a class="header-anchor" href="#_3-1-修改-linux-内核参数" aria-hidden="true">#</a> 3.1 修改 Linux 内核参数</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 首先生成配置文件确保配置持久化</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/modules-load.d/containerd.conf</span>
overlay
br_netfilter
EOF</span>

<span class="token function">sudo</span> modprobe overlay
<span class="token function">sudo</span> modprobe br_netfilter

<span class="token comment"># Setup required sysctl params, these persist across reboots.</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/sysctl.d/99-kubernetes-cri.conf</span>
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF</span>

<span class="token comment"># Apply sysctl params without reboot</span>
<span class="token function">sudo</span> <span class="token function">sysctl</span> <span class="token parameter variable">--system</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-安装-containerd" tabindex="-1"><a class="header-anchor" href="#_3-2-安装-containerd" aria-hidden="true">#</a> 3.2 安装 containerd</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 导入 docker 官方的 yum 源</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils device-mapper-persistent-data lvm2

<span class="token function">sudo</span> yum-config-manager --add-repo  https://download.docker.com/linux/centos/docker-ce.repo

<span class="token comment"># 查看 yum 源中存在的各个版本的 containerd.io</span>
yum list containerd.io <span class="token parameter variable">--showduplicates</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span>

<span class="token comment"># 安装 kubekey 推荐版本的 containerd.io</span>
yum <span class="token function">install</span> containerd.io-1.6.4-3.1.el7.x86_64 <span class="token parameter variable">-y</span>

<span class="token comment"># 也可以安装最新版本</span>
yum <span class="token function">install</span> containerd <span class="token parameter variable">-y</span>

<span class="token comment"># 设置一下开机启动</span>
<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> containerd

<span class="token function">sudo</span> systemctl status containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-关于-cri" tabindex="-1"><a class="header-anchor" href="#_3-3-关于-cri" aria-hidden="true">#</a> 3.3 关于 CRI</h3><p>官方表示，对于 k8s 来说，不需要安装 cri-containerd，并且该功能会在后面的 2.0 版本中废弃。</p>`,6),g={class:"hint-container tip"},f=n("p",{class:"hint-container-title"},"提示",-1),y={href:"https://github.com/containerd/containerd/blob/main/RELEASES.md#deprecated-features",target:"_blank",rel:"noopener noreferrer"},_=n("h3",{id:"_3-4-安装-cni-plugins",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_3-4-安装-cni-plugins","aria-hidden":"true"},"#"),s(" 3.4 安装 cni-plugins")],-1),x=n("p",null,"使用 yum 源安装的方式会把 runc 安装好，但是并不会安装 cni-plugins，因此这部分还是需要我们自行安装。",-1),E=n("div",{class:"hint-container tip"},[n("p",{class:"hint-container-title"},"提示"),n("p",null,"The containerd.io package contains runc too, but does not contain CNI plugins.")],-1),I={href:"https://github.com/containernetworking/plugins/releases",target:"_blank",rel:"noopener noreferrer"},C=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Download the cni-plugins-&lt;OS&gt;-&lt;ARCH&gt;-&lt;VERSION&gt;.tgz archive from https://github.com/containernetworking/plugins/releases , verify its sha256sum, and extract it under /opt/cni/bin:</span>

<span class="token builtin class-name">export</span> <span class="token assign-left variable">CNI_VERSION</span><span class="token operator">=</span>v1.3.0
<span class="token comment"># 下载源文件和sha512文件并校验</span>
<span class="token function">wget</span> https://ghproxy.com/https://github.com/containernetworking/plugins/releases/download/<span class="token variable">\${CNI_VERSION}</span>/cni-plugins-linux-amd64-<span class="token variable">\${CNI_VERSION}</span>.tgz

<span class="token function">wget</span> https://ghproxy.com/https://github.com/containernetworking/plugins/releases/download/<span class="token variable">\${CNI_VERSION}</span>/cni-plugins-linux-amd64-<span class="token variable">\${CNI_VERSION}</span>.tgz.sha512

sha512sum <span class="token parameter variable">-c</span> cni-plugins-linux-amd64-<span class="token variable">\${CNI_VERSION}</span>.tgz.sha512

<span class="token comment"># 创建目录并解压</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /opt/cni/bin
<span class="token function">tar</span> Cxzvf /opt/cni/bin cni-plugins-linux-amd64-<span class="token variable">\${CNI_VERSION}</span>.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5-配置-cgroup-drivers" tabindex="-1"><a class="header-anchor" href="#_3-5-配置-cgroup-drivers" aria-hidden="true">#</a> 3.5 配置 cgroup drivers</h3><p>CentOS7 使用的是 systemd 来初始化系统并管理进程，初始化进程会生成并使用一个 root 控制组 (cgroup), 并充当 cgroup 管理器。 Systemd 与 cgroup 集成紧密，并将为每个 systemd 单元分配一个 cgroup。 我们也可以配置容器运行时和 kubelet 使用 cgroupfs。 连同 systemd 一起使用 cgroupfs 意味着将有两个不同的 cgroup 管理器。而当一个系统中同时存在 cgroupfs 和 systemd 两者时，容易变得不稳定，因此最好更改设置，令容器运行时和 kubelet 使用 systemd 作为 cgroup 驱动，以此使系统更为稳定。 对于 containerd, 需要设置配置文件/etc/containerd/config.toml 中的 SystemdCgroup 参数。</p>`,3),w={href:"https://kubernetes.io/docs/setup/production-environment/container-runtimes/#containerd-systemd",target:"_blank",rel:"noopener noreferrer"},R=i(`<p>kubekey containerd 使用的配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/containerd/config.toml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-toml line-numbers-mode" data-ext="toml"><pre class="language-toml"><code><span class="token key property">version</span> <span class="token punctuation">=</span> <span class="token number">2</span>
<span class="token key property">root</span> <span class="token punctuation">=</span> <span class="token string">&quot;/var/lib/containerd&quot;</span>
<span class="token key property">state</span> <span class="token punctuation">=</span> <span class="token string">&quot;/run/containerd&quot;</span>

<span class="token punctuation">[</span><span class="token table class-name">grpc</span><span class="token punctuation">]</span>
<span class="token key property">address</span> <span class="token punctuation">=</span> <span class="token string">&quot;/run/containerd/containerd.sock&quot;</span>
<span class="token key property">uid</span> <span class="token punctuation">=</span> <span class="token number">0</span>
<span class="token key property">gid</span> <span class="token punctuation">=</span> <span class="token number">0</span>
<span class="token key property">max_recv_message_size</span> <span class="token punctuation">=</span> <span class="token number">16777216</span>
<span class="token key property">max_send_message_size</span> <span class="token punctuation">=</span> <span class="token number">16777216</span>

<span class="token punctuation">[</span><span class="token table class-name">ttrpc</span><span class="token punctuation">]</span>
<span class="token key property">address</span> <span class="token punctuation">=</span> <span class="token string">&quot;&quot;</span>
<span class="token key property">uid</span> <span class="token punctuation">=</span> <span class="token number">0</span>
<span class="token key property">gid</span> <span class="token punctuation">=</span> <span class="token number">0</span>

<span class="token punctuation">[</span><span class="token table class-name">debug</span><span class="token punctuation">]</span>
<span class="token key property">address</span> <span class="token punctuation">=</span> <span class="token string">&quot;&quot;</span>
<span class="token key property">uid</span> <span class="token punctuation">=</span> <span class="token number">0</span>
<span class="token key property">gid</span> <span class="token punctuation">=</span> <span class="token number">0</span>
<span class="token key property">level</span> <span class="token punctuation">=</span> <span class="token string">&quot;&quot;</span>

<span class="token punctuation">[</span><span class="token table class-name">metrics</span><span class="token punctuation">]</span>
<span class="token key property">address</span> <span class="token punctuation">=</span> <span class="token string">&quot;&quot;</span>
<span class="token key property">grpc_histogram</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>

<span class="token punctuation">[</span><span class="token table class-name">cgroup</span><span class="token punctuation">]</span>
<span class="token key property">path</span> <span class="token punctuation">=</span> <span class="token string">&quot;&quot;</span>

<span class="token punctuation">[</span><span class="token table class-name">timeouts</span><span class="token punctuation">]</span>
<span class="token key property">&quot;io.containerd.timeout.shim.cleanup&quot;</span> <span class="token punctuation">=</span> <span class="token string">&quot;5s&quot;</span>
<span class="token key property">&quot;io.containerd.timeout.shim.load&quot;</span> <span class="token punctuation">=</span> <span class="token string">&quot;5s&quot;</span>
<span class="token key property">&quot;io.containerd.timeout.shim.shutdown&quot;</span> <span class="token punctuation">=</span> <span class="token string">&quot;3s&quot;</span>
<span class="token key property">&quot;io.containerd.timeout.task.state&quot;</span> <span class="token punctuation">=</span> <span class="token string">&quot;2s&quot;</span>

<span class="token punctuation">[</span><span class="token table class-name">plugins</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token table class-name">plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.runtimes.runc</span><span class="token punctuation">]</span>
<span class="token key property">runtime_type</span> <span class="token punctuation">=</span> <span class="token string">&quot;io.containerd.runc.v2&quot;</span>
<span class="token punctuation">[</span><span class="token table class-name">plugins.&quot;io.containerd.grpc.v1.cri&quot;.containerd.runtimes.runc.options</span><span class="token punctuation">]</span>
<span class="token key property">SystemdCgroup</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token punctuation">[</span><span class="token table class-name">plugins.&quot;io.containerd.grpc.v1.cri&quot;</span><span class="token punctuation">]</span>
<span class="token key property">sandbox_image</span> <span class="token punctuation">=</span> <span class="token string">&quot;registry.aliyuncs.com/google_containers/pause:3.9&quot;</span>
<span class="token punctuation">[</span><span class="token table class-name">plugins.&quot;io.containerd.grpc.v1.cri&quot;.cni</span><span class="token punctuation">]</span>
<span class="token key property">bin_dir</span> <span class="token punctuation">=</span> <span class="token string">&quot;/opt/cni/bin&quot;</span>
<span class="token key property">conf_dir</span> <span class="token punctuation">=</span> <span class="token string">&quot;/etc/cni/net.d&quot;</span>
<span class="token key property">max_conf_num</span> <span class="token punctuation">=</span> <span class="token number">1</span>
<span class="token key property">conf_template</span> <span class="token punctuation">=</span> <span class="token string">&quot;&quot;</span>
<span class="token punctuation">[</span><span class="token table class-name">plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token table class-name">plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry.mirrors</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token table class-name">plugins.&quot;io.containerd.grpc.v1.cri&quot;.registry.mirrors.&quot;docker.io&quot;</span><span class="token punctuation">]</span>
<span class="token key property">endpoint</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span><span class="token string">&quot;https://registry-1.docker.io&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启服务</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl restart containerd

systemctl status containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6-关于-kubelet-的-cgroup-driver" tabindex="-1"><a class="header-anchor" href="#_3-6-关于-kubelet-的-cgroup-driver" aria-hidden="true">#</a> 3.6 关于 kubelet 的 cgroup driver</h3>`,6),q={href:"https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/configure-cgroup-driver/",target:"_blank",rel:"noopener noreferrer"},P=i(`<div class="hint-container tip"><p class="hint-container-title">提示</p><p>Note: In v1.22 and later, if the user does not set the cgroupDriver field under KubeletConfiguration, kubeadm defaults it to systemd.</p><p>In Kubernetes v1.28, you can enable automatic detection of the cgroup driver as an alpha feature. See systemd cgroup driver for more details.</p></div><p>一个比较简单的指定 kubelet 的 cgroup driver 的方法就是在 kubeadm-config.yaml 加入 cgroupDriver 字段</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># kubeadm-config.yaml</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterConfiguration
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kubeadm.k8s.io/v1beta3
<span class="token key atrule">kubernetesVersion</span><span class="token punctuation">:</span> v1.21.0
<span class="token punctuation">---</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> KubeletConfiguration
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kubelet.config.k8s.io/v1beta1
<span class="token key atrule">cgroupDriver</span><span class="token punctuation">:</span> systemd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以直接查看 configmaps 来查看初始化之后集群的 kubeadm-config 配置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl describe configmaps kubeadm-config <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然因为我们需要安装的版本高于 1.22.0 并且使用的就是 systemd，因此可以不用再重复配置。</p><h3 id="_3-7-安装-cri-tools" tabindex="-1"><a class="header-anchor" href="#_3-7-安装-cri-tools" aria-hidden="true">#</a> 3.7 安装 cri-tools</h3>`,7),S={href:"https://github.com/kubernetes-sigs/cri-tools/releases",target:"_blank",rel:"noopener noreferrer"},A=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token string">&quot;v1.28.0&quot;</span>

<span class="token function">wget</span> https://ghproxy.com/https://github.com/kubernetes-sigs/cri-tools/releases/download/<span class="token variable">$VERSION</span>/crictl-<span class="token variable">$VERSION</span>-linux-amd64.tar.gz

<span class="token function">tar</span> zxvf crictl-<span class="token variable">$VERSION</span>-linux-amd64.tar.gz <span class="token parameter variable">-C</span> /usr/local/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置 crictl</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/crictl.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">runtime-endpoint</span><span class="token punctuation">:</span> unix<span class="token punctuation">:</span>///run/containerd/containerd.sock
<span class="token key atrule">image-endpoint</span><span class="token punctuation">:</span> unix<span class="token punctuation">:</span>///run/containerd/containerd.sock
<span class="token key atrule">timeout</span><span class="token punctuation">:</span> <span class="token number">5</span>
<span class="token key atrule">debug</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">pull-image-on-create</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>crictl version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-安装-kube-组件" tabindex="-1"><a class="header-anchor" href="#_4-安装-kube-组件" aria-hidden="true">#</a> 4. 安装 kube 组件</h2>`,7),N={href:"https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#installing-kubeadm-kubelet-and-kubectl",target:"_blank",rel:"noopener noreferrer"},H=i(`<p>kube 三件套就是 kubeadm、kubelet 和 kubectl，三者的具体功能和作用如下：</p><ul><li>kubeadm：用来初始化集群的指令。</li><li>kubelet：在集群中的每个节点上用来启动 Pod 和容器等。</li><li>kubectl：用来与集群通信的命令行工具。</li></ul><p>需要注意的是：</p><ul><li>kubeadm 不会帮助我们管理 kubelet 和 kubectl，其他两者也是一样的，也就是说这三者是相互独立的，并不存在谁管理谁的情况；</li><li>kubelet 的版本必须小于等于 API-server 的版本，否则容易出现兼容性的问题；</li><li>kubectl 并不是集群中的每个节点都需要安装，也并不是一定要安装在集群中的节点，可以单独安装在自己本地的机器环境上面，然后配合 kubeconfig 文件即可使用 kubectl 命令来远程管理对应的 k8s 集群；</li></ul><p>CentOS7 的安装比较简单，我们直接使用官方提供的 yum 源即可。需要注意的是这里需要设置 selinux 的状态，但是前面我们已经关闭了 selinux，因此这里略过这步。</p><p>yum 源</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 直接导入谷歌官方的yum源</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-\\<span class="token variable">$basearch</span>
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
exclude=kubelet kubeadm kubectl
EOF</span>

<span class="token comment"># 当然如果连不上谷歌的源，可以考虑使用国内的阿里镜像源 el7 el8 通用</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装三件套</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 我们要安装的k8s版本是最新版本的，使用这个命令</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet kubeadm kubectl <span class="token parameter variable">--disableexcludes</span><span class="token operator">=</span>kubernetes

<span class="token comment"># 如果网络环境不好出现gpgcheck验证失败导致无法正常读取yum源，可以考虑关闭该yum源的repo_gpgcheck</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/repo_gpgcheck=1/repo_gpgcheck=0/g&#39;</span> /etc/yum.repos.d/kubernetes.repo

<span class="token comment"># 或者在安装的时候禁用gpgcheck</span>
<span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet kubeadm kubectl <span class="token parameter variable">--nogpgcheck</span> <span class="token parameter variable">--disableexcludes</span><span class="token operator">=</span>kubernetes

<span class="token comment"># 如果想要安装特定版本，可以使用这个命令查看相关版本的信息</span>
<span class="token function">sudo</span> yum list <span class="token parameter variable">--nogpgcheck</span> kubelet kubeadm kubectl <span class="token parameter variable">--showduplicates</span> <span class="token parameter variable">--disableexcludes</span><span class="token operator">=</span>kubernetes

<span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.26.7-0 kubeadm-1.26.7-0 kubectl-1.26.7-0 <span class="token parameter variable">--disableexcludes</span><span class="token operator">=</span>kubernetes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置开机自启 kubelet</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> kubelet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_5-高可用配置" tabindex="-1"><a class="header-anchor" href="#_5-高可用配置" aria-hidden="true">#</a> 5. 高可用配置</h2>`,12),O={href:"https://www.kubesphere.io/zh/docs/v3.4/installing-on-linux/high-availability-configurations/set-up-ha-cluster-using-keepalived-haproxy/#%E9%85%8D%E7%BD%AE%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1",target:"_blank",rel:"noopener noreferrer"},L=i(`<h2 id="_6-初始化集群" tabindex="-1"><a class="header-anchor" href="#_6-初始化集群" aria-hidden="true">#</a> 6. 初始化集群</h2><h3 id="_6-1-初始化集群配置" tabindex="-1"><a class="header-anchor" href="#_6-1-初始化集群配置" aria-hidden="true">#</a> 6.1 初始化集群配置</h3><p>我们先使用 kubeadm 命令查看一下主要的几个镜像版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm config images list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>registry.k8s.io/kube-apiserver:v1.28.2
registry.k8s.io/kube-controller-manager:v1.28.2
registry.k8s.io/kube-scheduler:v1.28.2
registry.k8s.io/kube-proxy:v1.28.2
registry.k8s.io/pause:3.9
registry.k8s.io/etcd:3.5.9-0
registry.k8s.io/coredns/coredns:v1.10.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了方便编辑和管理，我们还是把初始化参数导出成配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm config print init-defaults <span class="token operator">&gt;</span> kubeadm-kubeproxy-free.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改配置文件:</p><ul><li>考虑到大多数情况下国内的网络无法使用谷歌的 k8s.gcr.io 镜像源，我们可以直接在配置文件中修改 imageRepository 参数为阿里的镜像源</li><li>kubernetesVersion 字段用来指定我们要安装的 k8s 版本</li><li>criSocket 从 1.24.0 版本开始已经默认变成了 containerd</li><li>修改 etcd 存储路径</li><li>controlPlaneEndpoint 配置为 虚拟 IP 的地址端口</li><li>podSubnet、serviceSubnet 和 dnsDomain 两个参数默认情况下可以不用修改，这里我按照自己的需求进行了变更</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>apiServer:
  timeoutForControlPlane: 4m0s
apiVersion: kubeadm.k8s.io/v1beta3
certificatesDir: /etc/kubernetes/pki
clusterName: kubernetes
etcd:
  local:
    dataDir: /var/lib/etcd
imageRepository: registry.aliyuncs.com/google_containers
kind: ClusterConfiguration
controlPlaneEndpoint: <span class="token number">172.16</span>.0.200:16443
kubernetesVersion: <span class="token number">1.28</span>.2
networking:
  dnsDomain: cluster.local
  serviceSubnet: <span class="token number">10.18</span>.0.0/18
  podSubnet: <span class="token number">10.18</span>.64.0/18
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-初始化集群" tabindex="-1"><a class="header-anchor" href="#_6-2-初始化集群" aria-hidden="true">#</a> 6.2 初始化集群</h3><p>此时我们再查看对应的配置文件中的镜像版本，就会发现已经变成了对应阿里云镜像源的版本</p>`,13),T={href:"https://kubernetes.io/zh-cn/docs/reference/setup-tools/kubeadm/kubeadm-init/",target:"_blank",rel:"noopener noreferrer"},D=n("code",null,"--skip-phases=addon/kube-proxy",-1),B=i(`<p>查看一下对应的镜像版本，确定配置文件是否生效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm config images list <span class="token parameter variable">--config</span>  kubeadm-kubeproxy-free.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>registry.aliyuncs.com/google_containers/kube-apiserver:v1.28.2
registry.aliyuncs.com/google_containers/kube-controller-manager:v1.28.2
registry.aliyuncs.com/google_containers/kube-scheduler:v1.28.2
registry.aliyuncs.com/google_containers/kube-proxy:v1.28.2
registry.aliyuncs.com/google_containers/pause:3.9
registry.aliyuncs.com/google_containers/etcd:3.5.9-0
registry.aliyuncs.com/google_containers/coredns:v1.10.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>确认没问题之后我们直接拉取镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm config images pull <span class="token parameter variable">--config</span> kubeadm-kubeproxy-free.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>初始化，注意添加参数跳过 kube-proxy 的安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm init <span class="token parameter variable">--config</span> kubeadm-kubeproxy-free.conf --skip-phases<span class="token operator">=</span>addon/kube-proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当我们看到下面这个输出结果的时候，我们的集群就算是初始化成功了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Your Kubernetes control-plane has initialized successfully<span class="token operator">!</span>

To start using your cluster, you need to run the following as a regular user:

  <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
  <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
  <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config

Alternatively, <span class="token keyword">if</span> you are the root user, you can run:

  <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run <span class="token string">&quot;kubectl apply -f [podnetwork].yaml&quot;</span> with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

You can now <span class="token function">join</span> any number of control-plane nodes by copying certificate authorities
and <span class="token function">service</span> account keys on each <span class="token function">node</span> and <span class="token keyword">then</span> running the following as root:

  kubeadm <span class="token function">join</span> <span class="token number">172.16</span>.0.200:16443 <span class="token parameter variable">--token</span> 7cwlcl.from7wfu1rgyfluf <span class="token punctuation">\\</span>
        --discovery-token-ca-cert-hash sha256:6ee757429ad9eb56048de2963f3bc66f228abb0895edde2cbe2c1f85ff9d58b8 <span class="token punctuation">\\</span>
        --control-plane

Then you can <span class="token function">join</span> any number of worker nodes by running the following on each as root:

kubeadm <span class="token function">join</span> <span class="token number">172.16</span>.0.200:16443 <span class="token parameter variable">--token</span> 7cwlcl.from7wfu1rgyfluf <span class="token punctuation">\\</span>
        --discovery-token-ca-cert-hash sha256:6ee757429ad9eb56048de2963f3bc66f228abb0895edde2cbe2c1f85ff9d58b8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>刚初始化成功之后，我们还没办法马上查看 k8s 集群信息，需要配置 kubeconfig 相关参数才能正常使用 kubectl 连接 apiserver 读取集群信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加 kubectl 的自动补全功能</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;source &lt;(kubectl completion bash)&quot;</span> <span class="token operator">&gt;&gt;</span> ~/.bashrc

<span class="token comment"># 安装完成后重新登陆shell</span>
yum <span class="token function">install</span> bash-completion <span class="token parameter variable">-y</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成后，我们再执行相关命令就可以查看集群的信息了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl cluster-info

kubectl get nodes <span class="token parameter variable">-o</span> wide

kubectl get pod <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候查看 daemonset 可以看到是没有 kube-proxy 的</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get ds <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>master02 master03 执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/kubernetes/pki/etcd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>拷贝证书到 master02 master03 节点</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">scp</span> /etc/kubernetes/pki/ca.* /etc/kubernetes/pki/sa.* /etc/kubernetes/pki/front-proxy-ca.* free01:/etc/kubernetes/pki/

<span class="token function">scp</span> /etc/kubernetes/pki/etcd/ca.* free01:/etc/kubernetes/pki/etcd/

<span class="token function">scp</span> /etc/kubernetes/pki/ca.* /etc/kubernetes/pki/sa.* /etc/kubernetes/pki/front-proxy-ca.* free03:/etc/kubernetes/pki/

<span class="token function">scp</span> /etc/kubernetes/pki/etcd/ca.* free03:/etc/kubernetes/pki/etcd/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>master02 master03 执行命令加入 master</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  kubeadm join 172.16.0.200:16443 --token 7cwlcl.from7wfu1rgyfluf \\
        --discovery-token-ca-cert-hash sha256:6ee757429ad9eb56048de2963f3bc66f228abb0895edde2cbe2c1f85ff9d58b8 \\
        --control-plane
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-添加-worker-节点" tabindex="-1"><a class="header-anchor" href="#_6-3-添加-worker-节点" aria-hidden="true">#</a> 6.3 添加 worker 节点</h3><p>这时候我们还需要继续添加剩下的节点作为 worker 节点运行负载，直接在剩下的节点上面运行集群初始化成功时输出的命令就可以成功加入集群。</p><p>因为我们前面的 kubeadm 初始化 master 节点的时候没有启用 kube-proxy，所以在添加节点的时候会出现警告，但是不影响我们继续添加节点</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm <span class="token function">join</span> <span class="token number">172.16</span>.0.200:16443 <span class="token parameter variable">--token</span> 7cwlcl.from7wfu1rgyfluf <span class="token punctuation">\\</span>
        --discovery-token-ca-cert-hash sha256:6ee757429ad9eb56048de2963f3bc66f228abb0895edde2cbe2c1f85ff9d58b8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不小心没保存初始化成功的输出信息也没有关系，我们可以使用 kubectl 工具查看或者生成 token</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看现有的token列表</span>
kubeadm token list

<span class="token comment"># 如果token已经失效，那就再创建一个新的token</span>
kubeadm token create

<span class="token comment"># 如果找不到--discovery-token-ca-cert-hash参数，则可以在master节点上使用openssl工具来获取</span>
openssl x509 <span class="token parameter variable">-pubkey</span> <span class="token parameter variable">-in</span> /etc/kubernetes/pki/ca.crt <span class="token operator">|</span> openssl rsa <span class="token parameter variable">-pubin</span> <span class="token parameter variable">-outform</span> der <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">|</span> openssl dgst <span class="token parameter variable">-sha256</span> <span class="token parameter variable">-hex</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;s/^.* //&#39;</span>

<span class="token comment"># 输出 90f0a5e68b57d00d3f92a59f1464dfe0e7d8115365dc902fcdf596f8c1744445</span>

kubeadm <span class="token function">join</span> <span class="token number">172.16</span>.0.200:16443 <span class="token parameter variable">--token</span> 9xs6nr.zdwayftngv9l9jl7 <span class="token punctuation">\\</span>
        --discovery-token-ca-cert-hash sha256:90f0a5e68b57d00d3f92a59f1464dfe0e7d8115365dc902fcdf596f8c1744445
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加完成之后我们再查看集群的节点可以发现状态还是 NotReady，接下来就需要部署 CNI 了。</p><h2 id="_7-安装-cni" tabindex="-1"><a class="header-anchor" href="#_7-安装-cni" aria-hidden="true">#</a> 7. 安装 CNI</h2><h3 id="_7-1-安装-helm3" tabindex="-1"><a class="header-anchor" href="#_7-1-安装-helm3" aria-hidden="true">#</a> 7.1 安装 helm3</h3>`,33),z={href:"https://helm.sh/zh/docs/intro/install/#%E7%94%A8%E4%BA%8C%E8%BF%9B%E5%88%B6%E7%89%88%E6%9C%AC%E5%AE%89%E8%A3%85",target:"_blank",rel:"noopener noreferrer"},V={href:"https://github.com/helm/helm/releases",target:"_blank",rel:"noopener noreferrer"},$=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 国内太慢了</span>
<span class="token function">wget</span> https://get.helm.sh/helm-v3.13.1-linux-amd64.tar.gz

<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> helm-v3.13.1-linux-amd64.tar.gz

<span class="token function">cp</span> <span class="token parameter variable">-rp</span> linux-amd64/helm /usr/local/bin/

helm version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-2-安装-cilium" tabindex="-1"><a class="header-anchor" href="#_7-2-安装-cilium" aria-hidden="true">#</a> 7.2 安装 Cilium</h3><p>完整的部署指南可以参考官方文档，首先我们添加 helm 的 repo。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm repo <span class="token function">add</span> cilium https://helm.cilium.io/

helm repo list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),F={href:"https://docs.cilium.io/en/stable/installation/k8s-install-helm/",target:"_blank",rel:"noopener noreferrer"},M=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm <span class="token function">install</span> cilium ./cilium <span class="token punctuation">\\</span>
    <span class="token parameter variable">--namespace</span> kube-system <span class="token punctuation">\\</span>
    <span class="token parameter variable">--set</span> <span class="token assign-left variable">kubeProxyReplacement</span><span class="token operator">=</span>true <span class="token punctuation">\\</span>
    <span class="token parameter variable">--set</span> <span class="token assign-left variable">k8sServiceHost</span><span class="token operator">=</span>REPLACE_WITH_API_SERVER_IP <span class="token punctuation">\\</span>
    <span class="token parameter variable">--set</span> <span class="token assign-left variable">k8sServicePort</span><span class="token operator">=</span>REPLACE_WITH_API_SERVER_PORT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),U={href:"https://docs.cilium.io/en/stable/network/kubernetes/ipam-cluster-pool/#gsg-ipam-crd-cluster-pool",target:"_blank",rel:"noopener noreferrer"},K=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm <span class="token function">install</span> cilium cilium/cilium <span class="token parameter variable">--version</span> <span class="token number">1.14</span>.3 <span class="token punctuation">\\</span>
    <span class="token parameter variable">--namespace</span> kube-system <span class="token punctuation">\\</span>
    <span class="token parameter variable">--set</span> <span class="token assign-left variable">kubeProxyReplacement</span><span class="token operator">=</span>true  <span class="token punctuation">\\</span>
    <span class="token parameter variable">--set</span> <span class="token assign-left variable">ipam.mode</span><span class="token operator">=</span>cluster-pool      <span class="token punctuation">\\</span>
    <span class="token parameter variable">--set</span> <span class="token assign-left variable">k8sServiceHost</span><span class="token operator">=</span>REPLACE_WITH_API_SERVER_IP <span class="token punctuation">\\</span>
    <span class="token parameter variable">--set</span> <span class="token assign-left variable">k8sServicePort</span><span class="token operator">=</span>REPLACE_WITH_API_SERVER_PORT <span class="token punctuation">\\</span>
	<span class="token parameter variable">--set</span> <span class="token assign-left variable">ipam.operator.clusterPoolIPv4PodCIDRList</span><span class="token operator">=</span><span class="token operator">&lt;</span>IPv4CIDR<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
	<span class="token parameter variable">--set</span> <span class="token assign-left variable">ipam.operator.clusterPoolIPv4MaskSize</span><span class="token operator">=</span><span class="token operator">&lt;</span>IPv4MaskSize<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后可以得到我们的初始化安装参数</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm <span class="token function">install</span> cilium cilium/cilium <span class="token parameter variable">--version</span> <span class="token number">1.14</span>.3 <span class="token punctuation">\\</span>
    <span class="token parameter variable">--namespace</span> kube-system <span class="token punctuation">\\</span>
    <span class="token parameter variable">--set</span> <span class="token assign-left variable">kubeProxyReplacement</span><span class="token operator">=</span>true  <span class="token punctuation">\\</span>
    <span class="token parameter variable">--set</span> <span class="token assign-left variable">k8sServiceHost</span><span class="token operator">=</span><span class="token number">172.16</span>.0.200 <span class="token punctuation">\\</span>
    <span class="token parameter variable">--set</span> <span class="token assign-left variable">k8sServicePort</span><span class="token operator">=</span><span class="token number">16443</span> <span class="token punctuation">\\</span>
	<span class="token parameter variable">--set</span> <span class="token assign-left variable">ipam.operator.clusterPoolIPv4PodCIDRList</span><span class="token operator">=</span><span class="token number">10.18</span>.64.0/18 <span class="token punctuation">\\</span>
	<span class="token parameter variable">--set</span> <span class="token assign-left variable">ipam.operator.clusterPoolIPv4MaskSize</span><span class="token operator">=</span><span class="token number">24</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时我们再查看集群的 daemonset 和 deployment 状态：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 这时候查看集群的daemonset和deployment状态可以看到cilium相关的服务已经正常</span>
kubectl get ds <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>NAMESPACE     NAME     DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR            AGE
kube-system   cilium   <span class="token number">4</span>         <span class="token number">4</span>         <span class="token number">4</span>       <span class="token number">4</span>            <span class="token number">4</span>           kubernetes.io/os<span class="token operator">=</span>linux   4m21s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>再查看所有的 pod，状态都正常，ip 也和我们初始化的时候分配的 ip 段一致，说明初始化的参数设置生效了。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 再查看所有的pod，状态都正常，ip按预期进行了分配</span>
kubectl get pods <span class="token parameter variable">-A</span> <span class="token parameter variable">-o</span> wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>NAMESPACE     NAME                               READY   STATUS              RESTARTS   AGE     IP             NODE     NOMINATED NODE   READINESS GATES
kube-system   cilium-gr2j4                       <span class="token number">1</span>/1     Running             <span class="token number">0</span>          5m31s   <span class="token number">172.16</span>.0.167   free01   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   cilium-j9ld5                       <span class="token number">1</span>/1     Running             <span class="token number">0</span>          5m31s   <span class="token number">172.16</span>.0.175   free00   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   cilium-mzdqn                       <span class="token number">0</span>/1     Running            <span class="token number">0</span>          5m31s   <span class="token number">172.16</span>.0.170   free02   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   cilium-operator-6db6645669-nm6l2   <span class="token number">1</span>/1     Running             <span class="token number">0</span>          5m30s   <span class="token number">172.16</span>.0.175   free00   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   cilium-operator-6db6645669-wflt2   <span class="token number">0</span>/1     Running             <span class="token number">0</span>          5m30s   <span class="token number">172.16</span>.0.170   free02   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   cilium-rz7fl                       <span class="token number">1</span>/1     Running             <span class="token number">0</span>          5m31s   <span class="token number">172.16</span>.0.168   free03   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   coredns-66f779496c-cqzgq           <span class="token number">1</span>/1     Running             <span class="token number">0</span>          54m     <span class="token number">10.18</span>.64.11    free00   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   coredns-66f779496c-h6rnw           <span class="token number">1</span>/1     Running             <span class="token number">0</span>          54m     <span class="token number">10.18</span>.64.89    free00   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   etcd-free00                        <span class="token number">1</span>/1     Running             <span class="token number">2</span>          54m     <span class="token number">172.16</span>.0.175   free00   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   etcd-free01                        <span class="token number">1</span>/1     Running             <span class="token number">1</span>          49m     <span class="token number">172.16</span>.0.167   free01   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   etcd-free03                        <span class="token number">1</span>/1     Running             <span class="token number">1</span>          49m     <span class="token number">172.16</span>.0.168   free03   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   kube-apiserver-free00              <span class="token number">1</span>/1     Running             <span class="token number">2</span>          54m     <span class="token number">172.16</span>.0.175   free00   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   kube-apiserver-free01              <span class="token number">1</span>/1     Running             <span class="token number">2</span>          49m     <span class="token number">172.16</span>.0.167   free01   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   kube-apiserver-free03              <span class="token number">1</span>/1     Running             <span class="token number">1</span>          49m     <span class="token number">172.16</span>.0.168   free03   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   kube-controller-manager-free00     <span class="token number">1</span>/1     Running             <span class="token number">3</span>          54m     <span class="token number">172.16</span>.0.175   free00   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   kube-controller-manager-free01     <span class="token number">1</span>/1     Running             <span class="token number">2</span>          49m     <span class="token number">172.16</span>.0.167   free01   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   kube-controller-manager-free03     <span class="token number">1</span>/1     Running             <span class="token number">1</span>          49m     <span class="token number">172.16</span>.0.168   free03   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   kube-scheduler-free00              <span class="token number">1</span>/1     Running             <span class="token number">4</span>          54m     <span class="token number">172.16</span>.0.175   free00   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   kube-scheduler-free01              <span class="token number">1</span>/1     Running             <span class="token number">2</span>          49m     <span class="token number">172.16</span>.0.167   free01   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
kube-system   kube-scheduler-free03              <span class="token number">1</span>/1     Running             <span class="token number">1</span>          49m     <span class="token number">172.16</span>.0.168   free03   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候我们再进入 pod 中检查 cilium 的状态</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># --verbose 参数可以查看详细的状态信息</span>
<span class="token comment"># cilium-j9ld5     需要替换为任意一个cilium的pod</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token parameter variable">-n</span> kube-system cilium-j9ld5  -- cilium status <span class="token parameter variable">--verbose</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Defaulted container <span class="token string">&quot;cilium-agent&quot;</span> out of: cilium-agent, config <span class="token punctuation">(</span>init<span class="token punctuation">)</span>, mount-cgroup <span class="token punctuation">(</span>init<span class="token punctuation">)</span>, apply-sysctl-overwrites <span class="token punctuation">(</span>init<span class="token punctuation">)</span>, mount-bpf-fs <span class="token punctuation">(</span>init<span class="token punctuation">)</span>, clean-cilium-state <span class="token punctuation">(</span>init<span class="token punctuation">)</span>, install-cni-binaries <span class="token punctuation">(</span>init<span class="token punctuation">)</span>
KVStore:                Ok   Disabled
Kubernetes:             Ok   <span class="token number">1.28</span> <span class="token punctuation">(</span>v1.28.2<span class="token punctuation">)</span> <span class="token punctuation">[</span>linux/amd64<span class="token punctuation">]</span>
Kubernetes APIs:        <span class="token punctuation">[</span><span class="token string">&quot;EndpointSliceOrEndpoint&quot;</span>, <span class="token string">&quot;cilium/v2::CiliumClusterwideNetworkPolicy&quot;</span>, <span class="token string">&quot;cilium/v2::CiliumEndpoint&quot;</span>, <span class="token string">&quot;cilium/v2::CiliumNetworkPolicy&quot;</span>, <span class="token string">&quot;cilium/v2::CiliumNode&quot;</span>, <span class="token string">&quot;cilium/v2alpha1::CiliumCIDRGroup&quot;</span>, <span class="token string">&quot;core/v1::Namespace&quot;</span>, <span class="token string">&quot;core/v1::Pods&quot;</span>, <span class="token string">&quot;core/v1::Service&quot;</span>, <span class="token string">&quot;networking.k8s.io/v1::NetworkPolicy&quot;</span><span class="token punctuation">]</span>
KubeProxyReplacement:   True   <span class="token punctuation">[</span>eth0 <span class="token number">172.16</span>.0.175 <span class="token punctuation">(</span>Direct Routing<span class="token punctuation">)</span><span class="token punctuation">]</span>
Host firewall:          Disabled
CNI Chaining:           none
Cilium:                 Ok   <span class="token number">1.14</span>.3 <span class="token punctuation">(</span>v1.14.3-252a99ef<span class="token punctuation">)</span>
NodeMonitor:            Listening <span class="token keyword">for</span> events on <span class="token number">4</span> CPUs with 64x4096 of shared memory
Cilium health daemon:   Ok
IPAM:                   IPv4: <span class="token number">4</span>/254 allocated from <span class="token number">10.18</span>.64.0/24,
Allocated addresses:
  <span class="token number">10.18</span>.64.11 <span class="token punctuation">(</span>kube-system/coredns-66f779496c-cqzgq<span class="token punctuation">)</span>
  <span class="token number">10.18</span>.64.178 <span class="token punctuation">(</span>router<span class="token punctuation">)</span>
  <span class="token number">10.18</span>.64.4 <span class="token punctuation">(</span>health<span class="token punctuation">)</span>
  <span class="token number">10.18</span>.64.89 <span class="token punctuation">(</span>kube-system/coredns-66f779496c-h6rnw<span class="token punctuation">)</span>
IPv4 BIG TCP:           Disabled
IPv6 BIG TCP:           Disabled
BandwidthManager:       Disabled
Host Routing:           Legacy
Masquerading:           IPTables <span class="token punctuation">[</span>IPv4: Enabled, IPv6: Disabled<span class="token punctuation">]</span>
Clock Source <span class="token keyword">for</span> BPF:   ktime
Controller Status:      <span class="token number">28</span>/28 healthy
  Name                                  Last success   Last error   Count   Message
  cilium-health-ep                      54s ago        never        <span class="token number">0</span>       no error
  dns-garbage-collector-job             14s ago        never        <span class="token number">0</span>       no error
  endpoint-1030-regeneration-recovery   never          never        <span class="token number">0</span>       no error
  endpoint-1262-regeneration-recovery   never          never        <span class="token number">0</span>       no error
  endpoint-1389-regeneration-recovery   never          never        <span class="token number">0</span>       no error
  endpoint-331-regeneration-recovery    never          never        <span class="token number">0</span>       no error
  endpoint-gc                           3m14s ago      never        <span class="token number">0</span>       no error
  ipcache-inject-labels                 55s ago        22m58s ago   <span class="token number">0</span>       no error
  k8s-heartbeat                         14s ago        never        <span class="token number">0</span>       no error
  link-cache                            10s ago        never        <span class="token number">0</span>       no error
  metricsmap-bpf-prom-sync              4s ago         never        <span class="token number">0</span>       no error
  resolve-identity-1030                 2m55s ago      never        <span class="token number">0</span>       no error
  resolve-identity-1262                 2m54s ago      never        <span class="token number">0</span>       no error
  resolve-identity-1389                 2m55s ago      never        <span class="token number">0</span>       no error
  resolve-identity-331                  2m55s ago      never        <span class="token number">0</span>       no error
  sync-host-ips                         55s ago        never        <span class="token number">0</span>       no error
  sync-lb-maps-with-k8s-services        22m55s ago     never        <span class="token number">0</span>       no error
  sync-policymap-1030                   7m53s ago      never        <span class="token number">0</span>       no error
  sync-policymap-1262                   7m54s ago      never        <span class="token number">0</span>       no error
  sync-policymap-1389                   7m54s ago      never        <span class="token number">0</span>       no error
  sync-policymap-331                    7m54s ago      never        <span class="token number">0</span>       no error
  sync-to-k8s-ciliumendpoint <span class="token punctuation">(</span><span class="token number">1030</span><span class="token punctuation">)</span>     5s ago         never        <span class="token number">0</span>       no error
  sync-to-k8s-ciliumendpoint <span class="token punctuation">(</span><span class="token number">1262</span><span class="token punctuation">)</span>     4s ago         never        <span class="token number">0</span>       no error
  sync-to-k8s-ciliumendpoint <span class="token punctuation">(</span><span class="token number">1389</span><span class="token punctuation">)</span>     5s ago         never        <span class="token number">0</span>       no error
  sync-to-k8s-ciliumendpoint <span class="token punctuation">(</span><span class="token number">331</span><span class="token punctuation">)</span>      5s ago         never        <span class="token number">0</span>       no error
  sync-utime                            55s ago        never        <span class="token number">0</span>       no error
  template-dir-watcher                  never          never        <span class="token number">0</span>       no error
  write-cni-file                        23m14s ago     never        <span class="token number">0</span>       no error
Proxy Status:            OK, <span class="token function">ip</span> <span class="token number">10.18</span>.64.178, <span class="token number">0</span> redirects active on ports <span class="token number">10000</span>-20000, Envoy: embedded
Global Identity Range:   min <span class="token number">256</span>, max <span class="token number">65535</span>
Hubble:                  Ok   Current/Max Flows: <span class="token number">4095</span>/4095 <span class="token punctuation">(</span><span class="token number">100.00</span>%<span class="token punctuation">)</span>, Flows/s: <span class="token number">10.45</span>   Metrics: Disabled
KubeProxyReplacement Details:
  Status:                 True
  Socket LB:              Enabled
  Socket LB Tracing:      Enabled
  Socket LB Coverage:     Full
  Devices:                eth0 <span class="token number">172.16</span>.0.175 <span class="token punctuation">(</span>Direct Routing<span class="token punctuation">)</span>
  Mode:                   SNAT
  Backend Selection:      Random
  Session Affinity:       Enabled
  Graceful Termination:   Enabled
  NAT46/64 Support:       Disabled
  XDP Acceleration:       Disabled
  Services:
  - ClusterIP:      Enabled
  - NodePort:       Enabled <span class="token punctuation">(</span>Range: <span class="token number">30000</span>-32767<span class="token punctuation">)</span>
  - LoadBalancer:   Enabled
  - externalIPs:    Enabled
  - HostPort:       Enabled
BPF Maps:   dynamic sizing: on <span class="token punctuation">(</span>ratio: <span class="token number">0.002500</span><span class="token punctuation">)</span>
  Name                          Size
  Auth                          <span class="token number">524288</span>
  Non-TCP connection tracking   <span class="token number">72322</span>
  TCP connection tracking       <span class="token number">144645</span>
  Endpoint policy               <span class="token number">65535</span>
  IP cache                      <span class="token number">512000</span>
  IPv4 masquerading agent       <span class="token number">16384</span>
  IPv6 masquerading agent       <span class="token number">16384</span>
  IPv4 fragmentation            <span class="token number">8192</span>
  IPv4 <span class="token function">service</span>                  <span class="token number">65536</span>
  IPv6 <span class="token function">service</span>                  <span class="token number">65536</span>
  IPv4 <span class="token function">service</span> backend          <span class="token number">65536</span>
  IPv6 <span class="token function">service</span> backend          <span class="token number">65536</span>
  IPv4 <span class="token function">service</span> reverse NAT      <span class="token number">65536</span>
  IPv6 <span class="token function">service</span> reverse NAT      <span class="token number">65536</span>
  Metrics                       <span class="token number">1024</span>
  NAT                           <span class="token number">144645</span>
  Neighbor table                <span class="token number">144645</span>
  Global policy                 <span class="token number">16384</span>
  Session affinity              <span class="token number">65536</span>
  Sock reverse NAT              <span class="token number">72322</span>
  Tunnel                        <span class="token number">65536</span>
Encryption:            Disabled
Cluster health:        <span class="token number">4</span>/4 reachable   <span class="token punctuation">(</span><span class="token number">2023</span>-10-20T08:14:57Z<span class="token punctuation">)</span>
  Name                 IP              Node        Endpoints
  free00 <span class="token punctuation">(</span>localhost<span class="token punctuation">)</span>   <span class="token number">172.16</span>.0.175    reachable   reachable
  free01               <span class="token number">172.16</span>.0.167    reachable   reachable
  free02               <span class="token number">172.16</span>.0.170    reachable   reachable
  free03               <span class="token number">172.16</span>.0.168    reachable   reachable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其实到这里 cilium 的部署就可以说是 ok 了的，整个集群的 cni 都处于正常状态，其余的工作负载也都能够正常运行了。</p><p>安装最新版本的 Cilium CLI。Cilium CLI 可用于安装 Cilium、检查 Cilium 安装的状态以及启用/禁用各种功能（例如 clustermesh、Hubble）。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">CILIUM_CLI_VERSION</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt<span class="token variable">)</span></span>

<span class="token assign-left variable">CLI_ARCH</span><span class="token operator">=</span>amd64

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;aarch64&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token assign-left variable">CLI_ARCH</span><span class="token operator">=</span>arm64<span class="token punctuation">;</span> <span class="token keyword">fi</span>
<span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token parameter variable">--fail</span> --remote-name-all https://ghproxy.com/https://github.com/cilium/cilium-cli/releases/download/<span class="token variable">\${CILIUM_CLI_VERSION}</span>/cilium-linux-<span class="token variable">\${CLI_ARCH}</span>.tar.gz<span class="token punctuation">{</span>,.sha256sum<span class="token punctuation">}</span>

sha256sum <span class="token parameter variable">--check</span> cilium-linux-<span class="token variable">\${CLI_ARCH}</span>.tar.gz.sha256sum

<span class="token function">sudo</span> <span class="token function">tar</span> xzvfC cilium-linux-<span class="token variable">\${CLI_ARCH}</span>.tar.gz /usr/local/bin

<span class="token function">rm</span> cilium-linux-<span class="token variable">\${CLI_ARCH}</span>.tar.gz<span class="token punctuation">{</span>,.sha256sum<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要验证 Cilium 是否已正确安装，您可以运行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cilium status <span class="token parameter variable">--wait</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行以下命令来验证您的集群是否具有正确的网络连接：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cilium connectivity <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>恭喜！您拥有一个带有 Cilium 的功能齐全的 Kubernetes 集群。🎉</p><h3 id="_7-3-设置-hubble-可观测性" tabindex="-1"><a class="header-anchor" href="#_7-3-设置-hubble-可观测性" aria-hidden="true">#</a> 7.3 设置 Hubble 可观测性</h3><p>Hubble 是 Cilium 的可观察层，可用于获取 Kubernetes 集群的网络和安全层的集群范围内的可见性。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>确认 Cilium 已正确安装在您的 Kubernetes 集群中。</p></div><p>在 Cilium 中启用 Hubble</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cilium hubble <span class="token builtin class-name">enable</span>

cilium status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启用 Hubble 需要在运行 Cilium 的所有节点上打开 TCP 端口 4244。这是正确运行所必需的。</p><p>为了访问 Hubble 收集的可观测性数据，请安装 Hubble CLI：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">HUBBLE_VERSION</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> https://ghproxy.com/https://raw.githubusercontent.com/cilium/hubble/master/stable.txt<span class="token variable">)</span></span>

<span class="token assign-left variable">HUBBLE_ARCH</span><span class="token operator">=</span>amd64

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;aarch64&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token assign-left variable">HUBBLE_ARCH</span><span class="token operator">=</span>arm64<span class="token punctuation">;</span> <span class="token keyword">fi</span>
<span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token parameter variable">--fail</span> --remote-name-all https://ghproxy.com/https://github.com/cilium/hubble/releases/download/<span class="token variable">$HUBBLE_VERSION</span>/hubble-linux-<span class="token variable">\${HUBBLE_ARCH}</span>.tar.gz<span class="token punctuation">{</span>,.sha256sum<span class="token punctuation">}</span>

sha256sum <span class="token parameter variable">--check</span> hubble-linux-<span class="token variable">\${HUBBLE_ARCH}</span>.tar.gz.sha256sum

<span class="token function">sudo</span> <span class="token function">tar</span> xzvfC hubble-linux-<span class="token variable">\${HUBBLE_ARCH}</span>.tar.gz /usr/local/bin

<span class="token function">rm</span> hubble-linux-<span class="token variable">\${HUBBLE_ARCH}</span>.tar.gz<span class="token punctuation">{</span>,.sha256sum<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,31),j={href:"https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/",target:"_blank",rel:"noopener noreferrer"},G=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 方式一：使用cilium-cli工具安装的hubble也可以使用cilium暴露api端口，需要注意的是该命令默认会暴露到IPV6和IPV4网络中，如果宿主机节点不支持ipv6网络会报错</span>
cilium hubble port-forward<span class="token operator">&amp;</span>

<span class="token comment"># 方式二：使用kubectl的port-forward功能把hubble-relay这个服务的80端口暴露到4245端口上</span>
kubectl port-forward <span class="token parameter variable">-n</span> kube-system svc/hubble-relay <span class="token parameter variable">--address</span> <span class="token number">0.0</span>.0.0 <span class="token number">4245</span>:80 <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在您可以验证是否可以通过已安装的 CLI 访问 Hubble API：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>hubble status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Healthcheck <span class="token punctuation">(</span>via localhost:4245<span class="token punctuation">)</span>: Ok
Current/Max Flows: <span class="token number">16,380</span>/16,380 <span class="token punctuation">(</span><span class="token number">100.00</span>%<span class="token punctuation">)</span>
Flows/s: <span class="token number">25.77</span>
Connected Nodes: <span class="token number">4</span>/4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您还可以查询流 API 并查找流：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>hubble observe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果您将端口转发到除 之外的端口 4245，请确保使用 --server 标志或 HUBBLE_SERVER 环境变量来设置 Hubble 服务器地址（默认值：localhost:4245）。有关更多信息，请通过运行或 配置 Hubble CLI 查看 Hubble CLI 的帮助消息。hubble help statushubble help observehubble config</p></div><h3 id="_7-4-service-map-hubble-ui" tabindex="-1"><a class="header-anchor" href="#_7-4-service-map-hubble-ui" aria-hidden="true">#</a> 7.4 Service Map &amp; Hubble UI</h3><div class="hint-container tip"><p class="hint-container-title">提示</p><p>确认 Cilium 和 Hubble 已正确安装在 Kubernetes 集群中。</p></div><p>通过运行以下命令启用 Hubble UI：</p><div class="hint-container warning"><p class="hint-container-title">注意</p><p>如果已使用 启用 Hubble ，则必须先使用 暂时禁用 Hubble 。这是因为 Hubble UI 无法在运行时添加。cilium hubble enable cilium hubble disable</p></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cilium hubble disable

cilium hubble <span class="token builtin class-name">enable</span> <span class="token parameter variable">--ui</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 nodeport 的方式来暴露 hubble-ui，首先我们查看原来的 hubble-ui 这个 svc 的配置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get svc <span class="token parameter variable">-n</span> kube-system hubble-ui

<span class="token comment"># 修改 type: NodePort</span>
kubectl edit svc <span class="token parameter variable">-n</span> kube-system hubble-ui

kubectl get svc <span class="token parameter variable">-n</span> kube-system hubble-ui
NAME        TYPE       CLUSTER-IP     EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>        AGE
hubble-ui   NodePort   <span class="token number">10.18</span>.24.150   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>:30317/TCP   40s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候我们在浏览器中访问 http://120.79.229.149:30317/ 就可以看到 hubble 的 ui 界面了</p><h2 id="_8-重置集群" tabindex="-1"><a class="header-anchor" href="#_8-重置集群" aria-hidden="true">#</a> 8. 重置集群</h2><p>任意 master 节点执行以下命令删除节点</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl delete <span class="token function">node</span> free01
kubectl delete <span class="token function">node</span> free02
kubectl delete <span class="token function">node</span> free03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所有节点执行以下命令重置</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubeadm reset <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,21);function Y(W,X){const a=t("ExternalLinkIcon");return r(),c("div",null,[p,n("p",null,[n("a",d,[s("1. Cilium 依赖"),e(a)])]),n("p",null,[n("a",u,[s("2. 内核升级"),e(a)])]),n("p",null,[n("a",v,[s("3. 内核配置"),e(a)])]),b,n("p",null,[s("详细的官方文档可以参考"),n("a",m,[s("这里"),e(a)]),s("，由于在发布的 1.24 版本中移除了 docker-shim，因此安装的版本 ≥1.24 的时候需要注意容器运行时的选择。这里我们安装的版本为最新的 1.24，因此我们不能继续使用 docker，这里我们将其换为"),n("a",k,[s("containerd"),e(a)])]),h,n("div",g,[f,n("p",null,[s("FAQ: For Kubernetes, do I need to download cri-containerd-(cni-)<\\VERSION>-<\\OS-<\\ARCH>.tar.gz too? Answer: No. As the Kubernetes CRI feature has been already included in containerd-<\\VERSION>-OS>-ARCH>.tar.gz, you do not need to download the cri-containerd-.... archives to use CRI. The cri-containerd-... archives are "),n("a",y,[s("deprecated"),e(a)]),s(", do not work on old Linux distributions, and will be removed in containerd 2.0.")])]),_,x,E,n("p",null,[s("我们直接在 "),n("a",I,[s("github"),e(a)]),s(" 上面找到系统对应的架构版本，这里为 amd64，然后解压即可。")]),C,n("p",null,[s("参考 k8s 官方的"),n("a",w,[s("说明文档"),e(a)]),s("：")]),R,n("p",null,[s("k8s 官方有"),n("a",q,[s("详细的文档"),e(a)]),s("介绍了如何设置 kubelet 的 cgroup driver，需要特别注意的是，在 1.22 版本开始，如果没有手动设置 kubelet 的 cgroup driver，那么默认会设置为 systemd")]),P,n("p",null,[n("a",S,[s("cri-tools"),e(a)]),s("设置版本和 k8s 第二个版本对应即可")]),A,n("p",null,[s("对应的官方文档可以参考"),n("a",N,[s("这里"),e(a)])]),H,n("p",null,[n("a",O,[s("keepalive 和 haproxy 安装配置"),e(a)])]),L,n("p",null,[s("我们可以在"),n("a",T,[s("集群初始化"),e(a)]),s("的时候添加参数 "),D,s(" 跳过 kube-proxy 的安装")]),B,n("p",null,[s("cilium 的部署依赖 helm3，因此我们在部署 cilium 之前需要先安装 "),n("a",z,[s("helm3"),e(a)]),s("。")]),n("p",null,[s("通过"),n("a",V,[s("二进制包"),e(a)]),s("安装")]),$,n("p",null,[s("参考官网的"),n("a",F,[s("文档"),e(a)]),s("，这里我们需要指定集群的 APIserver 的 IP 和端口")]),M,n("p",null,[s("但是考虑到 cilium 默认使用的 podCIDR 为 10.0.0.0/8，很可能会和我们集群内的网络冲突，最好的方案就是初始化的时候指定 podCIDR，关于初始化的时候 podCIDR 的设置，可以参考官方的这个"),n("a",U,[s("文章"),e(a)]),s("。")]),K,n("p",null,[s("验证 Hubble API 访问，为了访问 Hubble API，请创建一个从本地计算机转发到 Hubble 服务的端口。这将允许您将 Hubble 客户端连接到本地端口 4245 并访问 Kubernetes 集群中的 Hubble Relay 服务。有关此方法的更多信息，请"),n("a",j,[s("参阅使用端口转发访问集群中的应用程序"),e(a)]),s("。")]),G])}const Z=l(o,[["render",Y],["__file","Kubeadm 部署高可用集群.html.vue"]]);export{Z as default};
