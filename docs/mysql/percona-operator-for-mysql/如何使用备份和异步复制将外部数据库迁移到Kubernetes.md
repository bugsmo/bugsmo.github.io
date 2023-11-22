---
order: 519
tags:
  - percona-operator-for-mysql
title: 如何使用备份和异步复制将外部数据库迁移到 Kubernetes
date: 2023-11-15 10:15:40
categories:
  - mysql
  - percona-operator-for-mysql
columns:
  -
---

# 如何使用备份和异步复制将外部数据库迁移到 Kubernetes

Operator 使您能够使用 Percona XtraBackup 将数据库从在 Kubernetes 环境外部进行的备份恢复到目标 Kubernetes 集群。通过这种方式，您可以将外部数据库迁移到 Kubernetes。在源环境和目标环境之间使用[异步复制](https://docs.percona.com/percona-operator-for-mysql/pxc/replication.html)可以减少停机时间并防止应用程序丢失数据。

本文档提供了如何使用异步复制将本地部署的 Percona Server for MySQL 8.0 迁移到由 Operator 管理的 Kubernetes 集群的步骤。建议先在非生产环境中测试此迁移，然后再将其应用于生产环境。

## 需求

1. 源环境和目标环境的 MySQL 版本必须为 8.0.22 及更高版本，因为从 MySQL 版本 8.0.22 开始可以使用异步复制。

2. 您必须在源环境中运行 Percona XtraBackup 作为备份工具。有关如何安装 Percona XtraBackup，请参阅[安装说明](https://docs.percona.com/percona-xtrabackup/8.0/installation.html)

3. 用于保存备份的存储应为受支持的云存储之一：AWS S3 或兼容存储，或 Azure Blob 存储。

## 配置目标环境

1. 部署 Percona Operator for MySQL，并按照任何官方安装指南使用它来创建 Percona XtraDB 集群。

2. 使用用于访问存储的凭据创建 YAML 文件，这是创建 Kubernetes Secrets 对象所需的。作为此处的示例，我们将使用 Amazon S3 存储。您需要使用以下数据创建密钥，以在 Amazon S3 上存储备份：

- key `metadata.name` 是您将进一步用于引用 Kubernetes Secret 的名称，
- key `data.AWS_ACCESS_KEY_ID` 和 `data.AWS_SECRET_ACCESS_KEY` 是用于访问存储的 base64 编码凭据（显然，这些密钥应包含适当的值以使访问成为可能）。

按照 [deploy/backup-s3.yaml](https://github.com/percona/percona-xtradb-cluster-operator/blob/main/deploy/backup/backup-secret-s3.yaml) 示例，使用这些 base64 编码的密钥创建 Secrets 文件：

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-cluster-name-backup-s3
type: Opaque
data:
  AWS_ACCESS_KEY_ID: UkVQTEFDRS1XSVRILUFXUy1BQ0NFU1MtS0VZ
  AWS_SECRET_ACCESS_KEY: UkVQTEFDRS1XSVRILUFXUy1TRUNSRVQtS0VZ
```

::: tabs

@tab 在 Linux 中

```bash
echo -n 'plain-text-string' | base64 --wrap=0
```

@tab 在 macOS 中

```bash
echo -n 'plain-text-string' | base64
```

:::

3. 编辑结束后，创建 Kubernetes Secret 对象，如下所示：

```bash
kubectl apply -f deploy/backup-s3.yaml
```

4. 您将需要操作员创建的 monitor 、 operator xtrabackup 和 replication 系统用户的密码。使用 kubectl get secrets command 查看 Secrets 对象列表（默认情况下，您感兴趣的 Secrets 对象具有 cluster1-secrets 名称）。当您知道 Secrets 名称时，您可以获取特定用户的密码，如下所示：

```bash
kubectl get secrets cluster1-secrets -o yaml -o jsonpath='{.data.<user_name>}' | base64 --decode | tr '\n' ' ' && echo " "
```

重复此命令 4 次，用 `monitor` 、 `o`perator`、 `xtrabackup`和`replication` 替换。在准备源环境时，您将进一步使用这些密码。

## 准备源环境

1. 使用 [Percona Server for MySQL](https://docs.percona.com/percona-server/8.0/quickstart-overview.html#install-percona-server-for-mysql) 或 [Percona XtraDB Cluster](https://docs.percona.com/percona-xtradb-cluster/8.0/install-index.html#installation-alternatives) 的官方安装说明，在源环境中启动并运行数据库（如果已安装其中之一，请跳过此步骤）。
2. 使用 [Percona XtraBackup](https://docs.percona.com/percona-xtrabackup/8.0/installation.html) 的官方安装说明在源环境中启动并运行它（如果已安装，请跳过此步骤）。
3. 使用全局事务标识符 （GTID） 配置复制。如果您运行的是 Percona Sever for MySQL，则需要执行此步骤。如果运行 Percona XtraDB 集群，则已配置复制。

编辑配置文件， my.cnf 如下所示：

```toml
[mysqld]
enforce_gtid_consistency=ON
gtid_mode=ON
```

4. 创建 Operator 恢复备份所需的 `monitor` 、 `operator`、 `xtrabackup` 和 `replication` system 用户。用户密码必须与您在目标环境中找到的密码匹配。

使用以下命令创建具有实际密码（替换 monitor_password 、 operator_password 、 xtrabackup_password 和 replication_password 占位符）的用户：

```sql
CREATE USER 'monitor'@'%' IDENTIFIED BY 'monitor_password' WITH MAX_USER_CONNECTIONS 100;
GRANT SELECT, PROCESS, SUPER, REPLICATION CLIENT, RELOAD ON *.* TO 'monitor'@'%';
GRANT SERVICE_CONNECTION_ADMIN ON *.* TO 'monitor'@'%';

CREATE USER 'operator'@'%' IDENTIFIED BY 'operator_password';
GRANT ALL ON *.* TO 'operator'@'%' WITH GRANT OPTION;

CREATE USER 'xtrabackup'@'%' IDENTIFIED BY 'xtrabackup_password';
GRANT ALL ON *.* TO 'xtrabackup'@'%';

CREATE USER 'replication'@'%' IDENTIFIED BY 'replication_password';
GRANT REPLICATION SLAVE ON *.* to 'replication'@'%';
FLUSH PRIVILEGES;
```

## 在源环境中进行备份

1. 将存储凭据导出为环境变量。按照上述示例，下面是一个命令，用于显示如何导出 AWS S3 凭证：

```bash
export AWS_ACCESS_KEY_ID=XXXXXX
export AWS_SECRET_ACCESS_KEY=XXXXXX
```

不要忘记将 XXXX 占位符替换为您的实际 Amazon 访问密钥 ID 和秘密访问密钥值。

2. 备份数据库并使用 [xbcloud](https://docs.percona.com/percona-xtrabackup/8.0/xbcloud-binary-overview.html?h=xbcloud) 将其上传到存储。将 `--target-dir` 、 `--password` `--s3-bucket` 的值替换为以下命令中的值：

```bash
xtrabackup --backup --stream=xbstream --target-dir=/tmp/backups/ --extra-lsndirk=/tmp/backups/  --password=root_password | xbcloud put --storage=s3 --parallel=10 --md5 --s3-bucket="mysql-testing-bucket" "db-test-1"
```

## 从目标环境中的备份恢复

如果源数据库没有任何数据，请跳过此步骤并继续执行异步复制配置。否则，请在目标环境中还原数据库。

1. 要恢复备份，您将使用特殊的恢复配置文件。此类文件的示例是 `deploy/backup/restore.yaml`。例如。您的 `restore.yaml` 文件可能包含以下内容：

```yaml
apiVersion: pxc.percona.com/v1
kind: PerconaXtraDBClusterRestore
metadata:
  name: restore1
spec:
  pxcCluster: cluster1
  backupSource:
    destination: s3://mysql-testing-bucket/db-test-1
    s3:
      credentialsSecret: my-cluster-name-backup-s3
      region: us-west-2
```

不要忘记将备份路径和凭据替换为您的值。

2. 从备份还原：

```bash
kubectl apply -f restore.yml
```

## 在 Kubernetes 集群中配置异步复制

此步骤将允许您避免应用程序的数据丢失，配置源数据库和目标集群之间的异步复制。

1. 在目标环境中编辑自定义资源清单 `deploy/cr.yaml` 以配置该 `spec.pxc.replicationChannels` 部分。

```yaml
spec:
  ...
  pxc:
    ...
    replicationChannels:
    - name: ps_to_pxc1
      isSource: false
      sourcesList:
        - host: <source_ip>
          port: 3306
          weight: 100
```

像往常一样对自定义资源应用更改：

```bash
kubectl apply -f deploy/cr.yaml
```

2. 通过连接到 Percona XtraDB 群集节点来验证复制。您可以使用 mysql 工具执行此操作，并且需要操作员为此创建的 root 系统用户密码。密码的获取方式与其他系统用户相同：

```bash
kubectl get secrets cluster1-secrets -o yaml -o jsonpath='{.data.root}' | base64 --decode | tr '\n' ' ' && echo " "
```

当您知道密码时，您可以使用以下 kubectl 命令（ root_password 替换为您刚刚获得的实际 root 密码）：

```bash
kubectl exec -it cluster1-pxc-0 -c pxc -- mysql -uroot -proot_password -e "show replica status \G"
```

::: details

```bash
*************************** 1. row ***************************
               Slave_IO_State: Waiting for master to send event
                  Master_Host: <ip-of-source-db>
                  Master_User: replication
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: binlog.000004
          Read_Master_Log_Pos: 529
               Relay_Log_File: cluster1-pxc-0-relay-bin-ps_to_pxc1.000002
                Relay_Log_Pos: 738
        Relay_Master_Log_File: binlog.000004
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
              Replicate_Do_DB:
          Replicate_Ignore_DB:
           Replicate_Do_Table:
       Replicate_Ignore_Table:
      Replicate_Wild_Do_Table:
  Replicate_Wild_Ignore_Table:
                   Last_Errno: 0
                   Last_Error:
                 Skip_Counter: 0
          Exec_Master_Log_Pos: 529
              Relay_Log_Space: 969
              Until_Condition: None
               Until_Log_File:
                Until_Log_Pos: 0
           Master_SSL_Allowed: No
           Master_SSL_CA_File:
           Master_SSL_CA_Path:
              Master_SSL_Cert:
            Master_SSL_Cipher:
               Master_SSL_Key:
        Seconds_Behind_Master: 0
Master_SSL_Verify_Server_Cert: No
                Last_IO_Errno: 0
                Last_IO_Error:
               Last_SQL_Errno: 0
               Last_SQL_Error:
  Replicate_Ignore_Server_Ids:
             Master_Server_Id: 1
                  Master_UUID: 9741945e-148d-11ec-89e9-5ee1a3cf433f
             Master_Info_File: mysql.slave_master_info
                    SQL_Delay: 0
          SQL_Remaining_Delay: NULL
      Slave_SQL_Running_State: Slave has read all relay log; waiting for more updates
           Master_Retry_Count: 3
                  Master_Bind:
      Last_IO_Error_Timestamp:
     Last_SQL_Error_Timestamp:
               Master_SSL_Crl:
           Master_SSL_Crlpath:
           Retrieved_Gtid_Set: 9741945e-148d-11ec-89e9-5ee1a3cf433f:1-2
            Executed_Gtid_Set: 93f1e7bf-1495-11ec-80b2-06e6016a7c3d:1,
9647dc03-1495-11ec-a385-7e3b2511dacb:1-7,
9741945e-148d-11ec-89e9-5ee1a3cf433f:1-2
                Auto_Position: 1
         Replicate_Rewrite_DB:
                 Channel_Name: ps_to_pxc1
           Master_TLS_Version:
       Master_public_key_path:
        Get_master_public_key: 0
            Network_Namespace:
```

:::

## 将 Kubernetes 集群提升为主集群

在将应用程序重新配置为使用 Kubernetes 中的新 Percona XtraDB 集群后，您可以将此集群提升为主集群。

1. 停止复制。编辑 `deploy/cr.yaml` 清单并注释 `replicationChannels` 小节：

```yaml
...
spec:
  ...
  pxc:
    ...
    #replicationChannels:
    #- name: ps_to_pxc1
    #  isSource: false
    #  sourcesList:
    #    - host: <source_ip>
    #      port: 3306
    #      weight: 100
```

2. 在源环境中停止 mysqld 服务，以确保不会写入任何新数据：

```bash
sudo systemctl stop mysqld
```

3. 将更改应用于目标环境中的 Kubernetes 集群：

```bash
kubectl apply -f deploy/cr.yaml
```
