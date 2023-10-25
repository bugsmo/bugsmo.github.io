---
order: 5
tags: 
  - ssh
columns: 
  - null
title: SSH 问题汇总
date: 2023-10-24 10:09:21
categories: 
  - sre
  - ssh
---

# SSH 问题汇总

## 1. Authentication refused:bad ownership or modes for dircetory /root

### 背景

服务器配置了免密，但是 ssh 过去时报错，错误如下：

```bash
Connect asset xxx error: Authentication failed
```

### 排查原因

通过命令 `tail -100f /var/log/secure` 查看日志，发现错误信息

```bash
Authentication refused: bad ownership or modes for directory /root
```

检查 root 目录的权限

```bash
ls -ld /root/

dr-xrwx---+ 7 root root 4096 10月 24 10:01 /root/
```

### 修复

将 root 目录权限修改为 750

```bash
chmod 750 /root/
```

检查

```bash
ls -ld /root/
drwxr-x---+ 7 root root 4096 10月 24 10:03 /root/
```

再次免密尝试登录，恢复正常。
