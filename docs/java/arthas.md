---
order: 5
tags:
  - arthas
columns:
  - null
title: Arthas Java 线上监控诊断工具
date: 2023-10-24 17:16:32
categories:
  - sre
  - java
---

# Arthas Java 线上监控诊断工具

使用教程看[官方网站](https://arthas.aliyun.com/doc/)

## docker/k8s 里的 pid 为 1 的进程失败

1. 比如 pod 容器的 jre 环境是 1.8，那么上传 1.8 的 jdk 到 pod。
2. 使用 jdk 目录到 java 命令启动 `/opt/app/jdk/bin/java -jar arthas-boot.jar 1`，1 是 程序进程 pid，这样就可以正常启动 arthas 了。
