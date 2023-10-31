---
order: 1
tags: 
  - Docker Install
title: 自动安装 Docker
date: 2023-10-30 10:09:04
categories: 
  - docker
columns: 
  - 
---

# 自动安装 Docker

## 清华大学镜像站提供自动化脚本

Docker 提供了一个自动配置与安装的脚本，支持 Debian、RHEL、SUSE 系列及衍生系统的安装。

以下内容假定

- 您为 root 用户，或有 sudo 权限，或知道 root 密码；
- 您系统上有 curl 或 wget

```bash
export DOWNLOAD_URL="https://mirrors.tuna.tsinghua.edu.cn/docker-ce"
# 如您使用 curl
curl -fsSL https://get.docker.com/ | sudo -E sh
# 如您使用 wget
wget -O- https://get.docker.com/ | sudo -E sh
```
