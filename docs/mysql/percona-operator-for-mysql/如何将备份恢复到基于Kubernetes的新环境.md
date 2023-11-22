---
order: 518
tags:
  - percona-operator-for-mysql
title: 如何将备份恢复到基于 Kubernetes 的新环境
date: 2023-11-15 09:54:52
categories:
  - mysql
  - percona-operator-for-mysql
columns:
  -
---

# 如何将备份恢复到基于 Kubernetes 的新环境

Operator 不仅允许在创建备份的 Kubernetes 集群上恢复备份，还允许在安装了 Operator 的任何基于 Kubernetes 的环境中恢复备份。

还原到基于 Kubernetes 的新环境时，请确保它具有与原始群集中相同的用户密码的 Secrets 对象。有关机密的更多详细信息，请参阅系统用户。所需的 Secrets 对象的名称可以从 `deploy/cr.yaml` 中的 `spec.secrets` key 中找到（ 默认 my-cluster-name-secrets ）。

要恢复备份，您将使用特殊的恢复配置文件。此类文件的示例是 [deploy/backup/restore.yaml](https://github.com/percona/percona-xtradb-cluster-operator/blob/main/deploy/backup/restore.yaml)。可以在[还原选项参考](https://docs.percona.com/percona-operator-for-mysql/pxc/operator.html#perconaxtradbclusterrestore-custom-resource-options)中找到可在其中使用的选项列表。

您将需要备份和集群的正确名称。如果您有权访问原始群集，则可以使用以下命令列出可用备份：

```bash
kubectl get pxc-backup
```

以下命令将列出可用的集群：

```bash
kubectl get pxc
```

::: tip
如果您已为时间点恢复配置了存储二进制日志，则可以将集群回滚到特定事务、时间（在某些情况下甚至跳过事务）。否则，在不进行时间点恢复的情况下还原备份是唯一的选择。
:::

当备份和集群的正确名称已知时，可以通过以下方式完成备份还原。

## 在没有时间点恢复的情况下恢复集群

1. 在 `deploy/backup/restore.yaml` 文件中设置相应的 key。

- 将 `spec.pxcCluster` key 设置为要在其上还原备份的目标集群的名称，
- 将 `spec.backupSource` 小节设置为指向相应的 PVC 或云存储：

::: tabs

如果您需要为恢复 Pod 提供无头服务（即从租户网络中的持久卷恢复），请在以下 metadata.annotations 说明中提及这一点：

@tab 兼容 S3 的存储

key `destination` 的值应由三部分组成： 前缀 `s3://`、S3 存储桶和备份名称，您已使用命令 `kubectl get pxc-backup` 找到这些名称。此外，您还应该添加必要的 S3 配置 key，这些 key 与 `deploy/cr.yaml` 用于为文件中的备份配置 S3 兼容存储的 key 相同：

```yaml
...
backupSource:
  destination: s3://S3-BUCKET-NAME/BACKUP-NAME
  s3:
    bucket: S3-BUCKET-NAME
    credentialsSecret: my-cluster-name-backup-s3
    region: us-west-2
    endpointUrl: https://URL-OF-THE-S3-COMPATIBLE-STORAGE
    ...

```

:::

:::details 测试过程用到的资源

- s3 认证 secret `deploy/backup/backup-secret-s3.yaml`
- 应用恢复的文件 `deploy/backup/restore.yaml`

```yaml
apiVersion: pxc.percona.com/v1
kind: PerconaXtraDBClusterRestore
metadata:
  name: restore1
#  annotations:
#    percona.com/headless-service: "true"
spec:
  pxcCluster: cluster1
  #backupName: cron-cluster1-s3-devops-202311149036-13d7u
  backupSource:
    verifyTLS: true
    destination: s3://pitr/cluster1-2023-11-14-08:56:52-full
    s3:
      bucket: pitr
      credentialsSecret: cluster1-s3
      endpointUrl: https://minio-devops.test.com
```

:::

2. 之后，可以按如下方式开始实际的恢复过程：

```bash
kubectl apply -f deploy/backup/restore.yaml
```

## 使用时间点恢复恢复集群

::: tip
在现有集群上还原备份之前，请禁用该集群上的时间点功能，无论备份是使用时间点恢复还是不使用时间点恢复。
:::

1. 在 `deploy/backup/restore.yaml` 文件中设置相应的 key。

- 将 `spec.pxcCluster` key 设置为要在其上还原备份的目标集群的名称，
- 将其他恢复参数添加到该 `pitr` 部分：
  - `type` key 可以等于以下选项之一，
    - `date` - 回滚到特定日期，
    - `transaction` - 回滚到特定事务（从 Operator 1.8.0 开始可用），
    - `latest` - 恢复到最新的事务，
    - `skip` - 跳过特定事务（从 Operator 1.7.0 开始可用）。
  - `date` key 与 option `type=date` 一起使用 ，并包含 datetime 格式的值，
  - `gtid` key（从 Operator 1.8.0 开始可用）与 option `type=transaction` 一起使用 ，并包含事务的确切 GTID，该事务紧随包含在恢复中的最后一个事务之后，
- 将 `spec.backupSource` 子选项设置为指向相应的 S3 兼容存储。此小节应包含一个 destination 与具有特殊 `s3://` 前缀的 s3 存储桶相等的 key，后跟必要的 S3 配置 key，与文件`deploy/cr.yaml`中的 key 相同。

生成的 `restore.yaml` 文件可能如下所示：

```yaml
apiVersion: pxc.percona.com/v1
kind: PerconaXtraDBClusterRestore
metadata:
  name: restore1
spec:
  pxcCluster: cluster1
  backupName: backup1
  pitr:
    type: date
    date: "2020-12-31 09:37:13"
    backupSource:
      destination: s3://S3-BUCKET-NAME/BACKUP-NAME
      s3:
        bucket: S3-BUCKET-NAME
        credentialsSecret: my-cluster-name-backup-s3
        region: us-west-2
        endpointUrl: https://URL-OF-THE-S3-COMPATIBLE-STORAGE
```

您还可以使用 `storageName` key 来指定存储的确切名称（实际存储应已在 `deploy/cr.yaml` 文件的 `backup.storages` 子部分中定义）：

```yaml
storageName: s3-us-west
backupSource:
  destination: s3://S3-BUCKET-NAME/BACKUP-NAME
```

2. 运行实际的恢复过程：

```bash
kubectl apply -f deploy/backup/restore.yaml
```
