---
order: 900
tags:
  - Linux
  - CentOS
  - CentOS8
  - Yum
title: Failed to download metadata for repo ‘AppStream’ [CentOS]
date: 2023-10-19 17:30:40
categories:
  - sre
  - linux
columns:
  -
---

# Failed to download metadata for repo ‘AppStream’ [CentOS]

## 问题

执行命令升级系统

```bash
yum update
```

输出

```bash
CentOS-8 - AppStream 70 B/s | 38 B 00:00
Error: Failed to download metadata for repo 'AppStream': Cannot prepare internal mirrorlist: No URLs in mirrorlist
```

## 修复

::: tip
CentOS Linux 8 had reached the End Of Life (EOL) on December 31st, 2021. It means that CentOS 8 will no longer receive development resources from the official CentOS project. After Dec 31st, 2021, if you need to update your CentOS, you need to change the mirrors to vault.centos.org where they will be archived permanently. Alternatively, you may want to upgrade to CentOS Stream.
:::

第一步: 进入目录 `/etc/yum.repos.d/` 。

```bash
cd /etc/yum.repos.d/
```

第二步：执行命令。

```bash
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*

sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
```

第三步：验证。

```bash
yum update -y
```

yum 恢复正常。
