---
order: 499
tags:
  - percona-operator-for-mysql
categories:
  - mysql
columns:
  - null
title: 在 Kubernetes 上安装 Percona XtraDB 集群
date: 2023-11-10 09:43:45
---

# 在 Kubernetes 上安装 Percona XtraDB 集群

## 克隆 repository

1. 首先，克隆 percona-xtradb-cluster-operator 存储库：

```bash
git clone -b v1.13.0 https://ghproxy.moweilong.com/https://github.com/percona/percona-xtradb-cluster-operator
cd percona-xtradb-cluster-operator
```

::: tip 注意
在此步骤中克隆代码时，使用选项指定 -b 正确的分支至关重要。请小心。
:::

## 安装

1. 现在，应该从 `deploy/crd.yaml` 该文件创建 Percona XtraDB Cluster 的自定义资源定义。自定义资源定义扩展了 Kubernetes 通过新项目（在我们的例子中是运算符的核心）“知道”的标准资源集。

此步骤应仅执行一次;它不需要在下一次操作员部署等中重复。

```bash
kubectl apply -f deploy/crd.yaml
```

2. 接下来要做的是将 pxc 命名空间添加到 Kubernetes，不要忘记为后续步骤设置相应的上下文：

```bash
kubectl create namespace pxc
kubectl config set-context $(kubectl config current-context) --namespace=pxc
```

3. 现在，应该从 deploy/rbac.yaml 该文件中设置 Percona XtraDB 集群的 RBAC（基于角色的访问控制）。简而言之，基于角色的访问基于专门定义的角色和与之对应的操作，允许在特定 Kubernetes 资源上完成（有关用户和角色的详细信息可以在 [Kubernetes 文档](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings)中找到）。

```bash
kubectl apply -f deploy/rbac.yaml
```

::: tip 注意
设置 RBAC 要求用户具有群集管理员角色权限。例如，使用 Google Kubernetes Engine 的用户可以通过以下命令授予用户所需的权限：

```bash
kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value core/account)
```

:::

4. 最后是时候在 Kubernetes 中启动运算符了：

```bash
kubectl apply -f deploy/operator.yaml
```

::: tip 注意
您可以通过应用单个 deploy/bundle.yaml 文件而不是运行步骤 1、3 和 4 中的命令来简化操作员安装：

```bash
kubectl apply -f deploy/bundle.yaml
```

这将自动创建自定义资源定义，设置基于角色的访问控制，并将操作员安装为单个操作。
:::

5. 现在是时候将 Percona XtraDB 集群用户密钥与登录名和密码添加到 Kubernetes 了。默认情况下，操作员自动生成用户密钥，此步骤无需执行任何操作。

不过，您可以自己生成和应用您的 Secrets。在这种情况下，请将用户帐户的登录名和纯文本密码放在 `deploy/secrets.yaml` 文件的数据部分中；编辑完成后，使用以下命令创建用户密钥：

```bash
kubectl create -f deploy/secrets.yaml
```

6. 现在应该生成证书。默认情况下，操作员自动生成证书，此步骤无需执行任何操作。不过，您可以根据 TLS 说明生成自己的证书并将其应用为机密。

7. 启动算子并添加用户密钥后，可以随时使用以下命令创建 Percona XtraDB 集群：

```bash
kubectl apply -f deploy/cr.yaml
```

创建过程需要一些时间。当操作员和副本集 Pod 都达到其运行状态时，该过程结束：

```bash
NAME                                               READY   STATUS    RESTARTS      AGE
cluster1-haproxy-0                                 2/2     Running   0             4m13s
cluster1-haproxy-1                                 2/2     Running   0             2m52s
cluster1-haproxy-2                                 2/2     Running   0             2m27s
cluster1-pxc-0                                     3/3     Running   0             4m10s
cluster1-pxc-1                                     3/3     Running   0             3m5s
cluster1-pxc-2                                     3/3     Running   0             119s
percona-xtradb-cluster-operator-57dbcb9899-2zzhk   1/1     Running   0             40m
```

8. 检查与新创建的群集的连接

```bash
kubectl run -i --rm --tty percona-client --image=percona:8.0 --restart=Never -- bash -il

percona-client:/$ mysql -h cluster1-haproxy -uroot -proot_password
```

此命令会将您连接到 MySQL 监视器。

```bash
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 1215
Server version: 8.0.32-24.2 Percona XtraDB Cluster (GPL), Release rel24, Revision 2119e75, WSREP version 26.1.4.3

Copyright (c) 2009-2021 Percona LLC and/or its affiliates
Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)
```

## 自定义配置

- `proxy service` 是否需要自动创建为无头服务类型，默认是 `clusterIP`。
- 是否关闭 `遥测` 功能。
- 日志收集
- 数据备份

### 日志收集到 ES

`logcollector.configuration` 配置参考如下：

```yaml
apiVersion: pxc.percona.com/v1
kind: PerconaXtraDBCluster
metadata:
  name: cluster1
......
  logcollector:
    enabled: true
    configuration: |
      [SERVICE]
           Flush        1
           Log_Level    error
           Daemon       off
           parsers_file parsers_multiline.conf

      [INPUT]
           Name             tail
           Path             ${LOG_DATA_DIR}/mysqld-error.log
           Tag              ${POD_NAMESPASE}.${POD_NAME}.mysqld-error.log
           Mem_Buf_Limit    5MB
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline-regex-test
           read_from_head   true
           Path_Key         file

      [INPUT]
           Name             tail
           Path             ${LOG_DATA_DIR}/wsrep_recovery_verbose.log
           Tag              ${POD_NAMESPASE}.${POD_NAME}.wsrep_recovery_verbose.log
           Mem_Buf_Limit    5MB
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline-regex-test
           read_from_head   true
           Path_Key         file

      [INPUT]
           Name             tail
           Path             ${LOG_DATA_DIR}/innobackup.prepare.log
           Tag              ${POD_NAMESPASE}.${POD_NAME}.innobackup.prepare.log
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline-regex-test
           read_from_head   true
           Path_Key         file

      [INPUT]
           Name             tail
           Path             ${LOG_DATA_DIR}/innobackup.move.log
           Tag              ${POD_NAMESPASE}.${POD_NAME}.innobackup.move.log
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline-regex-test
           read_from_head   true
           Path_Key         file

      [INPUT]
           Name             tail
           Path             ${LOG_DATA_DIR}/innobackup.backup.log
           Tag              ${POD_NAMESPASE}.${POD_NAME}.innobackup.backup.log
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline-regex-test
           read_from_head   true
           Path_Key         file

      [INPUT]
           Name             tail
           Path             ${LOG_DATA_DIR}/mysqld.post.processing.log
           Tag              ${POD_NAMESPASE}.${POD_NAME}.mysqld.post.processing.log
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline-regex-test
           read_from_head   true
           Path_Key         file

      [OUTPUT]
           Name  es
           Match *
           Host  es-http
           Port  9200
           Index percona-xtradb-cluster
           Type  doc
    resources:
      requests:
        memory: 100M
        cpu: 200m
```
