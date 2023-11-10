---
tags: 
  - client-go
title: client-go 包
date: 2023-10-31 17:36:18
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# client-go 包

[Github](https://github.com/kubernetes/client-go/blob/master/INSTALL.md)

## 介绍

## 安装

### 使用最新版本

如果您想使用该库的最新版本，请使用 go1.16+ 并运行：

```bash
go get k8s.io/client-go@latest
```

### 使用特定版本

如果您想使用特定版本的 `k8s.io/client-go` 库，您可以指明您的项目需要哪个版本的 `client-go` ：

- 如果您使用的 Kubernetes 版本 >= `v1.17.0` ，请使用相应的 `v0.x.y` 标签。例如， `k8s.io/client-go@v0.20.4` 对应 Kubernetes `v1.20.4` ：

```bash
go get k8s.io/client-go@v0.20.4
```

- 如果您使用 Kubernetes 版本 < `v1.17.0` ，请使用相应的 `kubernetes-1.x.y` 标记。例如， `k8s.io/client-go@kubernetes-1.16.3` 对应 Kubernetes `v1.16.3` ：

```bash
go get k8s.io/client-go@kubernetes-1.16.3
```

## 用法
