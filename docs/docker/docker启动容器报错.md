---
order: 100
tags:
  - docker启动容器报错
title: docker 启动容器报错
date: 2023-10-27 11:13:01
categories:
  - docker
columns:
  -
---

# docker 启动容器报错

## iptables: No chain/target/match by that name

### 根本原因

docker 服务启动的时候，docker 服务会向 iptables 注册一个链，以便让 docker 服务管理的容器所暴露的端口之间进行通信。

通过命令 `iptables -L` 可以查看 iptables 链。查看链路，发现并没有相关端口的 iptables 链。

如果你删除了 iptables 中的 docker 链，或者 iptables 的规则被丢失了（例如重启防火墙，笔者就是重启防火墙导致），docker 就会报 iptables error 例如：iptables: No chain/target/match by that name。

### 解决方案

重启 docker 服务，之后，正确的 iptables 规则就会被创建出来。再次查看 iptables 链，相关链路已经出现，服务也正常启动。
