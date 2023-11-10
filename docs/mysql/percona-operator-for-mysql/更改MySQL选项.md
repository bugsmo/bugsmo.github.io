---
order: 502
tags:
  - percona-operator-for-mysql
categories:
  - mysql
columns:
  - null
title: 更改 MySQL 选项
date: 2023-11-09 13:29:11
---

# 更改 MySQL 选项

您可能需要对应用程序进行配置更改。MySQL 允许选择使用配置文件配置数据库。您可以通过以下方式之一传递 [my.cnf](https://dev.mysql.com/doc/refman/8.0/en/option-files.html) 配置文件中的选项以包含在 MySQL 配置中：

- 编辑 `deploy/cr.yaml` 文件，
- 使用 ConfigMap，
- 使用 Secret 对象。

通常不需要添加自定义选项，因为 Operator 负责为 MySQL 提供合理的默认值。此外，某些 MySQL 选项无法更改：您不应将选项更改为 `require_secure_transport ON` ，因为这会破坏 Operator 的行为。

::: tip 注意
如果您仍然需要同等的东西 `require_secure_transport=ON` 来强制客户端和服务器之间的加密连接，最方便的解决方法是创建带有选项的 `REQUIRE SSL` MySQL 用户。
:::

如果您一次使用多种不同的方式向操作员提供自定义配置，则它只会选择一种。首先，它查找 Secret 对象。如果未找到匹配的 Secret，它将查找在自定义资源（通过 `deploy/cr.yaml` 文件提供的配置）中指定的自定义配置。如果也没有找到，则 Operator 会搜索 ConfigMap。

## 编辑 `deploy/cr.yaml` 文件

您可以通过编辑 的配置部分来添加 [my.cnf](https://dev.mysql.com/doc/refman/8.0/en/option-files.html) 配置文件中的选项 `deploy/cr.yaml` 。下面是一个示例：

```yaml
spec:
  secretsName: cluster1-secrets
  pxc:
    ...
      configuration: |
        [mysqld]
        wsrep_debug=CLIENT
        [sst]
        wsrep_debug=CLIENT
```

有关详细信息，请参阅 [自定义资源选项，PXC 选项](https://docs.percona.com/percona-operator-for-mysql/pxc/operator.html#operator-pxc-section)。

## 使用 ConfigMap

您可以使用 configmap 和集群重启来重置配置选项。configmap 允许 Kubernetes 在容器化应用程序内传递或更新配置数据。

使用命令 `kubectl` 从外部资源创建 configmap，有关更多信息，请参阅[配置 Pod 以使用 ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#create-a-configmap)。

例如，假设您的应用程序需要更多连接。要增加 MySQL `max_connections` 中的设置，请使用以下设置定义配置文件 `my.cnf` ：

```conf
[mysqld]
...
max_connections=250
```

您可以使用以下 `kubectl create configmap` 命令从 `my.cnf` 文件创建 configmap。

您应该使用集群名称与 -pxc 后缀的组合作为 configmap 的命名约定。若要查找群集名称，可以使用以下命令：

```bash
kubectl get pxc
```

`kubectl create configmap` 命令的语法为：

```bash
kubectl create configmap <cluster-name>-pxc <resource-type=resource-name>
```

以下示例定义为 configmap 名称，将 `my.cnf` 文件定义为 `cluster1-pxc` 数据源：

```bash
kubectl create configmap cluster1-pxc --from-file=my.cnf
```

要查看创建的 configmap，请使用以下命令：

```bash
kubectl describe configmaps cluster1-pxc
```

## 使用 Secret 对象

Operator 还可以将配置选项存储在 [Kubernetes Secret](https://kubernetes.io/docs/concepts/configuration/secret/) 中。如果需要对某些敏感数据进行额外保护，这可能很有用。

您应该创建一个具有特定名称的 Secret 对象，该对象由集群名称和 pxc 后缀组成。

配置选项应放在 `data` 该部分的特定键内。此密钥的名称 `my.cnf` 用于 Percona XtraDB Cluster Pod。

实际选项应使用 [Base64](https://en.wikipedia.org/wiki/Base64) 进行编码。

例如，让我们定义一个 `my.cnf` 配置文件，并放置一对我们在上一个示例中使用的 MySQL 选项：

```conf
[mysqld]
wsrep_debug=CLIENT
[sst]
wsrep_debug=CLIENT
```

您可以通过命令行从选项中获取 Base64 编码的字符串，如下所示：

::: tabs

@tab 在 Linux 中

```bash
cat my.cnf | base64 --wrap=0
```

@tab 在 macOS 中

```bash
cat my.cnf | base64
```

:::

::: tip 注意
同样，您可以从 Base64 编码的字符串中读取选项列表：

```bash
echo "W215c3FsZF0Kd3NyZXBfZGVidWc9T04KW3NzdF0Kd3NyZXBfZGVidWc9T04K" | base64 --decode
```

:::

最后，使用 yaml 文件创建 Secret 对象。例如，您可以创建`deploy/my-pxc-secret.yaml`，包含以下内容的文件：

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cluster1-pxc
data:
  my.cnf: "W215c3FsZF0Kd3NyZXBfZGVidWc9T04KW3NzdF0Kd3NyZXBfZGVidWc9T04K"
```

准备就绪后，使用以下命令应用它：

```bash
kubectl create -f deploy/my-pxc-secret.yaml
```

::: tip 注意
不要忘记重新启动 Percona XtraDB Cluster，以确保集群已更新配置。
:::

## 使更改的选项对 Percona XtraDB Cluster 可见

不要忘记重新启动 Percona XtraDB Cluster，以确保集群已更新配置（请参阅有关如何连接 [Install Percona XtraDB Cluster on Kubernetes page](https://docs.percona.com/percona-operator-for-mysql/pxc/kubernetes.html)的详细信息）。

## 自动调优 MySQL 选项

如果用户没有指定这些选项的常量值（在 CR.yaml 或 ConfigMap 中），则 Operator 可以根据可用的 Pod 资源限制（内存和 CPU）自动计算和设置这些选项的少数配置选项。

可以自动设置的选项如下：

- innodb_buffer_pool_size
- max_connections

如果定义了 Percona XtraDB 集群 Pod limits，则使用 limits 值来计算这些选项。如果未定义 Percona XtraDB Cluster Pod limits，则不会执行自动调整。

此外，从 Operator 1.12.0 开始，还有另一种自动调优方式。您可以`"{{ containerMemoryLimit }}"` 按如下方式用作 `spec.pxc.configuration` 值：

```yaml
pxc:
    configuration: |
    [mysqld]
    innodb_buffer_pool_size={{containerMemoryLimit * 3 / 4}}
    ...
```
