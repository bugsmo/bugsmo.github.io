---
order: 3
tags: 
  - Linux
  - Linux 内核
title: CentOS7 内核配置
date: 2023-10-20 10:35:50
categories: 
  - sre
  - linux
columns: 
  - 
---

# CentOS7 内核配置

## 内核参数查看

首先我们查看自己当前内核版本的参数，基本上可以分为 y、n、m 三个选项

- y：yes，Build directly into the kernel. 表示该功能被编译进内核中，默认启用
- n：no，Leave entirely out of the kernel. 表示该功能未被编译进内核中，不启用
- m：module，Build as a module, to be loaded if needed. 表示该功能被编译为模块，按需启用

```bash
# 查看当前使用的内核版本的编译参数
cat /boot/config-$(uname -r)
```

## 内核参数启用

cilium 官方对各项功能所需要开启的[内核参数](http://localhost:3000/sre/cilium/Cilium%20%E4%BE%9D%E8%B5%96.html#%E5%86%85%E6%A0%B8%E5%8F%82%E6%95%B0)列举如下：

Cilium 利用并构建于内核 eBPF 功能以及与 eBPF 集成的各种子系统。因此，主机系统需要运行最新的 Linux 内核才能运行 Cilium 代理。更新的内核可能会提供额外的 eBPF 功能，Cilium 将在代理启动时自动检测并使用这些功能。对于此版本的 Cilium，建议使用内核 4.19.57 或更高版本（或同等版本，例如 RHEL8 上的 4.18）。有关需要较新内核的功能列表，请参阅高级功能所需的内核版本。

为了正确启用 eBPF 功能，必须启用以下内核配置选项。发行版内核通常就是这种情况。当选项可以构建为模块或静态链接时，任一选择都是有效的。

```text
CONFIG_BPF=y
CONFIG_BPF_SYSCALL=y
CONFIG_NET_CLS_BPF=y
CONFIG_BPF_JIT=y
CONFIG_NET_CLS_ACT=y
CONFIG_NET_SCH_INGRESS=y
CONFIG_CRYPTO_SHA1=y
CONFIG_CRYPTO_USER_API_HASH=y
CONFIG_CGROUPS=y
CONFIG_CGROUP_BPF=y
CONFIG_PERF_EVENTS=y
CONFIG_SCHEDSTATS=y
```

对比我们使用的 6.5.7-1.el7.elrepo.x86_64 内核可以发现有两个模块是为 m

```bash
egrep "^CONFIG_BPF=|^CONFIG_BPF_SYSCALL=|^CONFIG_NET_CLS_BPF=|^CONFIG_BPF_JIT=|^CONFIG_NET_CLS_ACT=|^CONFIG_NET_SCH_INGRESS=|^CONFIG_CRYPTO_SHA1=|^CONFIG_CRYPTO_USER_API_HASH=|^CONFIG_CGROUPS=|^CONFIG_CGROUP_BPF=" /boot/config-6.5.7-1.el7.elrepo.x86_64
```

输出

```bash
CONFIG_BPF=y
CONFIG_BPF_SYSCALL=y
CONFIG_BPF_JIT=y
CONFIG_CGROUPS=y
CONFIG_CGROUP_BPF=y
CONFIG_NET_SCH_INGRESS=m
CONFIG_NET_CLS_BPF=m
CONFIG_NET_CLS_ACT=y
CONFIG_CRYPTO_SHA1=y
CONFIG_CRYPTO_USER_API_HASH=y
```

缺少的这两个模块我们可以在 /usr/lib/modules/$(uname -r) 目录下面找到它们：

```bash
ls /usr/lib/modules/$(uname -r)/kernel/net/sched/sch_ingress.ko

ls /usr/lib/modules/$(uname -r)/kernel/net/sched/cls_bpf.ko
```

确认相关内核模块存在我们直接加载内核即可：

```bash
modprobe cls_bpf
modprobe sch_ingress
lsmod | egrep "cls_bpf|sch_ingress"
```

配置开机自动加载 cilium 所需相关模块

```bash
cat <<EOF | sudo tee /etc/modules-load.d/cilium-base-requirements.conf
cls_bpf
sch_ingress
EOF
```

其他 cilium 高级功能所需要的内核功能也类似，这里不做赘述。
