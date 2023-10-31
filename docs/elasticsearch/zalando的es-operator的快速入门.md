---
order: 100
tags:
  - es-operator
  - zalando
title: zalando es-operator 快速入门
date: 2023-10-26 10:48:04
categories:
  - elasticsearch
columns:
  -
---

# zalando 的 es-operator 的快速入门

这是一个用于在 Kubernetes 中运行 Elasticsearch 的操作符，重点关注操作方面，例如安全排空和为 Elasticsearch 数据节点提供自动缩放功能，而不仅仅是抽象清单定义。

## 拉取代码库

开始之前要完成一些准备工作。

```bash
git clone https://github.com/zalando-incubator/es-operator.git

cp -r es-operator/docs/ .
```

## 步骤 1 - 设置角色

ES Operator 需要特殊权限才能访问 Kubernetes API，而 Elasticsearch 需要特权访问权限来增加内存映射文件的操作系统限制。

因此，作为第一步，我们部署了一个附加了必要 RBAC 角色的服务帐户 operator 。

- 可选修改部署清单的 namespace 为：infra

```bash
kubectl apply -f docs/cluster-roles.yaml
```

## 步骤 2 - 注册自定义资源定义

ES 操作员管理两个自定义资源。这些需要在集群中注册。

```bash
kubectl apply -f docs/zalando.org_elasticsearchdatasets.yaml
kubectl apply -f docs/zalando.org_elasticsearchmetricsets.yaml
```

## 步骤 3 - 部署 ES 运算符

接下来，我们将部署我们的运算符。它将从命名空间中的部署清单创建 es-operator-demo ，并拉取最新的映像。

- 可选修改部署清单的 namespace 为：infra
- 可选修改部署清单的镜像地址为：pixiuio/es-operator:v0.1.4

```bash
kubectl apply -f docs/es-operator.yaml
```

您可以检查它是否已成功启动：

```bash
kubectl -n infra get pods
```

## 步骤 4 - 引导您的 Elasticsearch 集群

Elasticsearch 将从一组主节点引导。出于此演示的目的，单个母版就足够了。对于生产，建议使用一组三个母版。

- 可选修改部署清单的 namespace 为：infra
- 可选修改部署清单的镜像地址：pixiuio/elasticsearch-oss:7.10.2

```bash
kubectl apply -f docs/elasticsearch-cluster.yaml
```

清单还为传输和 HTTP 协议创建服务。如果通过隧道连接到主服务器上的端口 9200，您应该能够与 Elasticsearch 集群通信。

```bash
MASTER_POD=$(kubectl -n infra get pods -l application=elasticsearch,role=master -o custom-columns=:metadata.name --no-headers | head -n 1)
kubectl -n infra port-forward $MASTER_POD 9200
```

新建终端，执行以下命令

```bash
curl http://127.0.0.1:9200

{
  "name" : "es-master-0",
  "cluster_name" : "es-cluster",
  "cluster_uuid" : "OeBtrse_SceonjeeG0jdvQ",
  "version" : {
    "number" : "7.10.2",
    "build_flavor" : "oss",
    "build_type" : "docker",
    "build_hash" : "747e1cc71def077253878a59143c1f785afa92b9",
    "build_date" : "2021-01-13T00:42:12.435326Z",
    "build_snapshot" : false,
    "lucene_version" : "8.7.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

## 步骤 5 - 添加 Elasticsearch 数据集

最后，让我们添加数据节点。出于本演示的目的，我们有一个简单的堆栈将启动一个数据节点，并关闭了自动缩放功能。

- 可选修改部署清单的 namespace 为：infra
- 可选修改部署清单的镜像地址：pixiuio/elasticsearch-oss:7.0.0
- 可选修改部署清单的资源限制，增大 jvm 内存，pod 内存和 cpu。
- 可选修改部署清单的 pvc 容量。

```bash
kubectl apply -f docs/elasticsearchdataset-simple.yaml
```

若要检查结果，请首先查找自定义资源。

```bash
kubectl -n infra get eds
```

ES 运算符创建一个 StatefulSet，它将生成 Pod。这可能需要几分钟时间，具体取决于您的网络和群集性能。（静待 pod running）

```bash
kubectl -n infra get sts
kubectl -n infra get pods
```

## 步骤 6：索引创建

通过隧道连接到主服务器上的端口 9200，您应该能够与 Elasticsearch 集群通信。

```bash
MASTER_POD=$(kubectl -n infra get pods -l application=elasticsearch,role=master -o custom-columns=:metadata.name --no-headers | head -n 1)
kubectl -n infra port-forward $MASTER_POD 9200
```

我们使用名为 group 的 Elasticsearch 节点标签来区分堆栈。建议使用此标签将具有相同扩展要求的索引绑定到具有相同 group 标签的节点，方法是使用如下分片分配设置：

```bash
curl -XPUT localhost:9200/demo-index -HContent-type:application/json \
-d '{"settings": {"index": { "number_of_shards":5, "number_of_replicas":0, "routing.allocation.include.group": "simple"}}}'
```

查看 group

- group=simple

```bash
kubectl -n infra get pods es-data-simple-0  --show-labels
```

我们可以使用以下命令行来查看所有索引：

```bash
curl -XGET 'http://localhost:9200/_cat/indices?v'
```

查看集群状态

```bash
curl -XGET 'http://localhost:9200/_cat/health'
```

## 高级步骤：自动缩放

在 ES 运算符如何处理数据节点方面积累了一些经验后，就可以开始尝试自动缩放功能。该 [README.md](https://github.com/zalando-incubator/es-operator/tree/master#example-1) 提供了一些不同扩展场景的示例。

## 高级步骤：生产就绪功能

如果您了解自动缩放的工作原理，则可以处理生产就绪的后续步骤。

来自 Elasticsearch 的官方 Helm Charts 提供了一些有趣的功能，你可能还想在投入生产之前集成：

- 不同的持久性选项
- 基于主机的反亲和性
- 改进了基于脚本的准备情况检查

我们还没有在他们的掌舵中看到它，但如果您希望集群具有高可用性，请使用分配感知功能来确保数据在不同位置、区域或机架之间传播。

高级步骤：不同的 Elasticsearch 集群
当然，您可以决定 ES 操作员是应该管理一个大集群，还是要运行多个较小的集群。这是完全可能的。只需确保它们具有不同的集群名称，并使用不同的主机名通过 Kubernetes 服务进行集群发现。
