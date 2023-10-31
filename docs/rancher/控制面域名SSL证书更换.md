---
order: 1
tags: 
  - rancher SSL
title: 控制面域名 SSL 证书更换
date: 2023-10-30 10:39:37
categories: 
  - rancher
columns: 
  - 
---

# 控制面域名 SSL 证书更换

## 版本 2.5.2

```bash
cd /home/rancher

\mv private.pem tls.key

\mv fullchain.crt tls.crt

kubectl delete secrets tls-rancher-ingress -n cattle-system

kubectl -n cattle-system create secret tls tls-rancher-ingress --cert=./tls.crt --key=./tls.key
```
