---
order: 500
tags:
  - percona-operator-for-mysql
title: 了解 Percona Operator for MySQL
date: 2023-11-09 09:51:48
categories:
  - mysql
columns:
  -
---

# 了解 Percona Operator for MySQL

`Percona XtraDB Cluster` 是一种开源企业 MySQL 解决方案，可帮助您确保应用程序的数据可用性，同时在要求最苛刻的公有云、私有云和混合云环境中提高安全性并简化新应用程序的开发。

基于 `Percona XtraDB Cluster` 的 `Percona Operator for MySQL` 包含在本地或云中基于 Kubernetes 的环境中快速一致地部署和扩展 `Percona XtraDB Cluster` 实例所需的一切。

## 要求

Operator 是使用 Percona XtraDB Cluster 版本 8.0.32-24.2 和 5.7.42-31.65 开发和测试的。其他选项也可能有效，但尚未经过测试。

### 官方支持的平台

以下平台已经过测试，并得到 Operator 1.13.0 的正式支持：

- 谷歌 Kubernetes 引擎 （GKE） 1.24 - 1.27
- Amazon Elastic Container Service for Kubernetes （EKS） 1.23 – 1.27
- Azure Kubernetes 服务 （AKS） 1.24 - 1.26
- OpenShift 4.10 - 4.13
- Minikube 1.30（基于 Kubernetes 1.27）

其他 Kubernetes 平台也可能有效，但尚未经过测试。

### 资源限制

运行官方支持的平台的集群至少包含三个节点，其中包含以下资源：

- 2GB 内存，
- 每个节点 2 个 CPU 线程，用于 Pod 配置，
- 至少 60GB 的可用存储空间用于持久卷配置。

## 社区论坛

[免费技术帮助](https://forums.percona.com/c/mysql-mariadb/percona-kubernetes-operator-for-mysql/28?utm_campaign=Doc%20pages)

## 设计概述

Percona XtraDB Cluster 集成了与 XtraDB 存储引擎一起运行的 Percona Server for MySQL，以及 Percona XtraBackup 与 Galera 库，以实现同步多主复制。

Operator 的设计与 Percona XtraDB 集群高可用性实现高度绑定，下图可以简要描述。

![](https://assets.moweilong.com/img/replication.svg)

作为常规的 MySQL Server 实例，每个节点都包含跨节点同步的同一组数据。建议的配置是至少具有 3 个节点。在具有此数量节点的基本设置中，Percona XtraDB Cluster 提供高可用性，即使您关闭任何节点，它仍会继续运行。此外，HAProxy 路由器可以实现负载平衡，该路由器接受来自 MySQL 客户端的传入流量并将其转发到后端 MySQL 服务器。

::: tip 注意
（可选）Operator 允许使用 ProxySQL 守护程序而不是 HAProxy，后者提供 SQL 感知数据库工作负载管理，并且与其他负载均衡器相比效率更高。
:::

为了提供高可用性，如果可能，操作员使用节点亲和性在单独的工作节点上运行 Percona XtraDB Cluster 实例。如果某个节点发生故障，则会在另一个节点上自动重新创建 Pod。

为了为有状态应用程序提供数据存储，Kubernetes 使用持久卷。使用 PersistentVolumeClaim（PVC）实现对 Pod 的自动存储配置。如果发生故障，容器存储接口 （CSI） 应该能够在其他节点上重新挂载存储。PVC StorageClass 必须支持此功能（Kubernetes 和 OpenShift 分别在 1.9 和 3.9 版本中支持此功能）。

Operator 功能使用 PerconaXtraDBCluster 对象扩展了 Kubernetes API，它是作为 golang 应用程序实现的。每个 PerconaXtraDBCluster 对象都映射到一个单独的 Percona XtraDB Cluster 设置。Operator 侦听所创建对象上的所有事件。当创建新的 PerconaXtraDBCluster 对象或现有对象进行一些更改或删除时，操作员会自动创建/更改/删除所有需要的 Kubernetes 对象，并具有适当的设置，以提供适当的 Percona XtraDB 集群操作。

## 比较在 Kubernetes 中部署 MySQL 的各种解决方案

有多种方法可以在 Kubernetes 中部署和管理 MySQL。在这里，我们将重点比较以下开源解决方案：

- [KubeDB](https://github.com/kubedb)
- [Bitpoke MySQL Operator (former Presslabs)](https://github.com/bitpoke/mysql-operator/)
- [Oracle MySQL Operator](https://github.com/mysql/mysql-operator)
- [Moco by Cybozu](https://github.com/cybozu-go/moco)
- [Vitess Operator by PlanetScale](https://github.com/planetscale/vitess-operator)
- Percona Operator for MySQ
  - [based on Percona XtraDB Cluster](https://github.com/percona/percona-xtradb-cluster-operator/)
  - [based on Percona Server for MySQL](https://github.com/percona/percona-server-mysql-operator/)

### 通用

回顾通用功能，例如支持的 MySQL 版本，开源模型等。

| 功能/产品         | Percona Operator for MySQL (based on PXC) | Percona Operator for MySQL (based on PS) | Bitpoke MySQL Operator | Moco       | Oracle MySQL Operator | Vitess     |
| ----------------- | ----------------------------------------- | ---------------------------------------- | ---------------------- | ---------- | --------------------- | ---------- |
| 开源模型          | Apache 2.0                                | Apache 2.0                               | Apache 2.0             | Apache 2.0 | Apache 2.0            | Apache 2.0 |
| MySQL 版本        | 5.7, 8.0                                  | 8.0                                      | 5.7                    | 8.0        | 8.0                   | 5.7, 8.0   |
| Kubernetes 一致性 | 测试了各种版本                            | 测试了各种版本                           | 不保证                 | 不保证     | 不保证                | 不保证     |
| 付费支持          | 支持                                      | 支持                                     | 不支持                 | 不支持     | 支持                  | 不支持     |

### MySQL 拓扑

专注于复制功能和代理集成。

| 功能/产品                | Percona Operator for MySQL (based on PXC) | Percona Operator for MySQL (based on PS) | Bitpoke MySQL Operator | Moco      | Oracle MySQL Operator | Vitess |
| ------------------------ | ----------------------------------------- | ---------------------------------------- | ---------------------- | --------- | --------------------- | ------ |
| Replication              | Sync with Galera                          | Async and Group Replication              | Async                  | Semi-sync | Group Replication     | Async  |
| Proxy                    | HAProxy and ProxySQL                      | HAProxy and MySQL Router                 | None                   | None      | MySQL Router          | VTGate |
| Multi-cluster deployment | 支持                                      | 不支持                                   | 不支持                 | 不支持    | 不支持                | 不支持 |
| Sharding                 | 不支持                                    | 不支持                                   | 不支持                 | 不支持    | 不支持                | 支持   |

### 备份

以下是每个解决方案的备份和还原功能。

| 功能/产品        | Percona Operator for MySQL (based on PXC) | Percona Operator for MySQL (based on PS) | Bitpoke MySQL Operator | Moco   | Oracle MySQL Operator | Vitess |
| ---------------- | ----------------------------------------- | ---------------------------------------- | ---------------------- | ------ | --------------------- | ------ |
| 定时备份         | 支持                                      | 支持                                     | 支持                   | 支持   | 不支持                | 支持   |
| 增量备份         | 不支持                                    | 不支持                                   | 不支持                 | 支持   | 不支持                | 不支持 |
| PITR             | 支持                                      | 不支持                                   | 不支持                 | 不支持 | 不支持                | 不支持 |
| PVCs for backups | 支持                                      | 不支持                                   | 不支持                 | 不支持 | 不支持                | 不支持 |

### 监控

监控对于任何运营团队都至关重要。

| 功能/产品        | Percona Operator for MySQL (based on PXC) | Percona Operator for MySQL (based on PS) | Bitpoke MySQL Operator | Moco            | Oracle MySQL Operator | Vitess |
| ---------------- | ----------------------------------------- | ---------------------------------------- | ---------------------- | --------------- | --------------------- | ------ |
| Custom exporters | 通过 sidecar                              | 通过 sidecar                             | mysqld_exporter        | mysqld_exporter | 不支持                | 不支持 |
| PMM              | 支持                                      | 支持                                     | 不支持                 | 不支持          | 不支持                | 不支持 |

### 其他

比较不适合分类别的各种功能。

| 功能/产品 | Percona Operator for MySQL (based on PXC) | Percona Operator for MySQL (based on PS) | Bitpoke MySQL Operator | Moco   | Oracle MySQL Operator | Vitess |
| --------- | ----------------------------------------- | ---------------------------------------- | ---------------------- | ------ | --------------------- | ------ |
| Helm      | 支持                                      | 支持                                     | 支持                   | 支持   | 支持                  | 不支持 |
| 传输加密  | 支持                                      | 支持                                     | 不支持                 | 不支持 | 支持                  | 支持   |
| 静态加密  | 支持                                      | 支持                                     | 不支持                 | 不支持 | 不支持                | 不支持 |
