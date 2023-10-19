---
order: 2
tags:
  - Linux
  - Linux 内核
title: CentOS8 内核升级
categories:
  - sre
  - linux
columns:
  - null
date: 2023-10-19 17:23:53
---

# CentOS8 内核升级

## 1. 查看系统内核版本

查看版本信息及相关内容

```bash
uname -a
```

## 2. 更新系统版本

会修改所有已安装的包和配置，慎重执行。

```bash
yum -y update
```

可选 yum -y upgrade 只升级包不修改配置。

```bash
yum -y upgrade
```

## 3. 安装 ELRepo 源

::: tip
ELRepo 仓库是基于社区的用于企业级 Linux 仓库，提供对 RedHat Enterprise (RHEL) 和 其他基于 RHEL 的 Linux 发行版（CentOS、Scientific、Fedora 等）的支持。
:::

导入公钥

```bash
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
```

安装 yum 源

```bash
yum install https://www.elrepo.org/elrepo-release-8.el8.elrepo.noarch.rpm -y
```

## 4.查询可用内核版本

```bash
yum --disablerepo="*" --enablerepo="elrepo-kernel" list available
```

输出

```bash
Last metadata expiration check: 0:21:29 ago on Thu 19 Oct 2023 05:06:13 PM CST.
Modular dependency problems:

 Problem 1: conflicting requests
  - nothing provides module(perl:5.26) needed by module perl-IO-Socket-SSL:2.066:8030020201222215140:1e4bbb35.x86_64
 Problem 2: conflicting requests
  - nothing provides module(perl:5.26) needed by module perl-libwww-perl:6.34:8030020201223164340:b967a9a2.x86_64
Available Packages
bpftool.x86_64                                                                     5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-lt.x86_64                                                                   5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-lt-core.x86_64                                                              5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-lt-devel.x86_64                                                             5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-lt-doc.noarch                                                               5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-lt-headers.x86_64                                                           5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-lt-modules.x86_64                                                           5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-lt-modules-extra.x86_64                                                     5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-lt-tools.x86_64                                                             5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-lt-tools-libs.x86_64                                                        5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-lt-tools-libs-devel.x86_64                                                  5.4.258-1.el8.elrepo                                                  elrepo-kernel
kernel-ml.x86_64                                                                   6.5.7-1.el8.elrepo                                                    elrepo-kernel
kernel-ml-core.x86_64                                                              6.5.7-1.el8.elrepo                                                    elrepo-kernel
kernel-ml-devel.x86_64                                                             6.5.7-1.el8.elrepo                                                    elrepo-kernel
kernel-ml-doc.noarch                                                               6.5.7-1.el8.elrepo                                                    elrepo-kernel
kernel-ml-headers.x86_64                                                           6.5.7-1.el8.elrepo                                                    elrepo-kernel
kernel-ml-modules.x86_64                                                           6.5.7-1.el8.elrepo                                                    elrepo-kernel
kernel-ml-modules-extra.x86_64                                                     6.5.7-1.el8.elrepo                                                    elrepo-kernel
kernel-ml-tools.x86_64                                                             6.5.7-1.el8.elrepo                                                    elrepo-kernel
kernel-ml-tools-libs.x86_64                                                        6.5.7-1.el8.elrepo                                                    elrepo-kernel
kernel-ml-tools-libs-devel.x86_64                                                  6.5.7-1.el8.elrepo                                                    elrepo-kernel
perf.x86_64                                                                        6.5.7-1.el8.elrepo                                                    elrepo-kernel
python3-perf.x86_64                                                                6.5.7-1.el8.elrepo                                                    elrepo-kernel
```

kernel-ml 和 kernel-lt 二者的区别：

- kernel-ml 软件包是根据 Linux Kernel Archives 的主线稳定分支提供的源构建的。 内核配置基于默认的 RHEL-7 配置，并根据需要启用了添加的功能。 这些软件包有意命名为 kernel-ml，以免与 RHEL-7 内核发生冲突，因此，它们可以与常规内核一起安装和更新。
- kernel-lt 包是从 Linux Kernel Archives 提供的源代码构建的，就像 kernel-ml 软件包一样。 不同之处在于 kernel-lt 基于长期支持分支，而 kernel-ml 基于主线稳定分支。

## 5. 安装最新的稳定版本内核

大于 6.3 才符合要求，安装 ml 稳定版本

```bash
yum -y --enablerepo=elrepo-kernel install kernel-ml
```

会默认安装 ml 的最新版本，即 6.5.7-1.el7.elrepo 。

安装完成后需要设置 grub2，即内核默认启动项

## 6. 设置 grub2

内核安装好后，需要设置为默认启动选项并重启后才会生效

查看系统上的所有可用内核：

```bash
sudo awk -F\' '$1=="menuentry " {print i++ " : " $2}' /etc/grub2.cfg
```

输出

```bash

```

刚刚安装的内核即 ``

我们需要把 grub2 默认设置为 0

方法 1：通过 grub2-set-default 0 命令设置

```bash
grub2-set-default 0
```

方法 2：编辑 /etc/default/grub 文件，编辑（e）将 GRUB_DEFAULT 设置为 0，
修改完成后保存退出（：wq）

```bash
vim /etc/default/grub
```

## 7. 生成 grub 配置文件并重启

```bash
grub2-mkconfig -o /boot/grub2/grub.cfg
```

重启服务器

```bash
reboot
```

## 8. 验证是否成功安装

```bash
uname -a
```

## 9. 删除旧内核（可选）

查看内核包

```bash
rpm -qa | grep kernel
```

输出

```bash
kernel-3.10.0-1160.99.1.el7.x86_64
kernel-devel-3.10.0-1160.99.1.el7.x86_64
kernel-3.10.0-957.el7.x86_64
kernel-tools-libs-3.10.0-1160.99.1.el7.x86_64
kernel-3.10.0-957.21.3.el7.x86_64
kernel-tools-3.10.0-1160.99.1.el7.x86_64
kernel-devel-3.10.0-957.21.3.el7.x86_64
kernel-ml-6.5.7-1.el7.elrepo.x86_64
kernel-headers-3.10.0-1160.99.1.el7.x86_64
```

可选择删除 3.10 版本的内核

```bash
yum remove kernel-3.10.0*
```

卸载其他内核工具包

```bash
yum remove kernel-*-3.10.0*
```

会卸载一些对内核 headers 依赖的安装包，比如 gcc、gcc-c++ 之类的。不过不要紧，我们可以在安装完最新版内核 headers 后再重新安装回来即可。

安装匹配新版本内核工具包

```bash
yum -y --enablerepo=elrepo-kernel install kernel-ml*
```

安装 gcc 等

```bash
yum install gcc gcc-c++ glibc-devel glibc-headers -y
```

## 10. 手动下载内核包

http://mirrors.coreix.net/elrepo-archive-archive/kernel/el7/x86_64/RPMS/

搜索 `6.5.7-1`

```bash
KERNEL_VERSION=6.5.7-1

wget http://mirrors.coreix.net/elrepo-archive-archive/kernel/el7/x86_64/RPMS/kernel-ml-${KERNEL_VERSION}.el7.elrepo.x86_64.rpm

wget http://mirrors.coreix.net/elrepo-archive-archive/kernel/el7/x86_64/RPMS/kernel-ml-devel-${KERNEL_VERSION}.el7.elrepo.x86_64.rpm

wget http://mirrors.coreix.net/elrepo-archive-archive/kernel/el7/x86_64/RPMS/kernel-ml-doc-${KERNEL_VERSION}.el7.elrepo.noarch.rpm

wget http://mirrors.coreix.net/elrepo-archive-archive/kernel/el7/x86_64/RPMS/kernel-ml-headers-${KERNEL_VERSION}.el7.elrepo.x86_64.rpm

wget http://mirrors.coreix.net/elrepo-archive-archive/kernel/el7/x86_64/RPMS/kernel-ml-tools-${KERNEL_VERSION}.el7.elrepo.x86_64.rpm

wget http://mirrors.coreix.net/elrepo-archive-archive/kernel/el7/x86_64/RPMS/kernel-ml-tools-libs-${KERNEL_VERSION}.el7.elrepo.x86_64.rpm

wget http://mirrors.coreix.net/elrepo-archive-archive/kernel/el7/x86_64/RPMS/kernel-ml-tools-libs-devel-${KERNEL_VERSION}.el7.elrepo.x86_64.rpm
```
