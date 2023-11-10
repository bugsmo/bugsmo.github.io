---
order: 508
tags:
  - percona-operator-for-mysql
categories:
  - mysql
columns:
  - null
title: 使用 ProxySQL 配置负载均衡
date: 2023-11-09 16:10:18
---

# 使用 ProxySQL 配置负载均衡

基于 Percona XtraDB 的 Percona Operator for MySQL 集群提供了两种集群组件的选择，以提供负载均衡和代理服务：您可以使用 [HAProxy](https://www.haproxy.org/) 或 [ProxySQL](https://proxysql.com/)。您可以通过 `deploy/cr.yaml` 配置文件中的 `haproxy.enabled` 和 `proxysql.enabled` 选项启用或禁用来控制使用哪一个（如果有）。

::: warning
从 ProxySQL 切换到 HAProxy 将导致 Percona XtraDB 集群 Pod 重新启动。无法从 HAProxy 切换到 ProxySQL，如果您需要 ProxySQL，则应在创建集群时进行配置。
:::

生成的设置将使用数字零 Percona XtraDB 集群成员（ `cluster1-pxc-0` 默认）作为写入器。

::: tip 注意
如果需要将 ProxySQL 服务配置为无头服务（例如在租户网络上使用），请在 `deploy/cr.yaml` 自定义资源元数据部分添加以下[注释](https://docs.percona.com/percona-operator-for-mysql/pxc/annotations.html) ：

```yaml
apiVersion: pxc.percona.com/v1
kind: PerconaXtraDBCluster
metadata:
  name: cluster1
  annotations:
    percona.com/issue-vault-token: "true"
  labels:
    xx: ""
```

此注释仅在服务创建时有效，以后无法添加。
:::

升级具有 ProxySQL 的集群时，将执行以下步骤。首先，读取器成员逐个升级：Operator 等待升级后的成员以在线状态出现在 ProxySQL 中，然后继续升级下一个成员。完成所有读取器的升级后，写入器 Percona XtraDB 集群成员最终升级。

::: tip 注意
当 ProxySQL 和 Percona XtraDB 集群升级时，它们将并行升级。
:::

## 将自定义配置选项传递给 ProxySQL

您可以通过以下方式之一将自定义配置传递给 HAProxy：

- 编辑 `deploy/cr.yaml` 文件，
- 使用 ConfigMap，
- 使用 Secret 对象。

::: tip 注意
如果以这种方式指定自定义 ProxySQL 配置，则 ProxySQL 将尝试将传递的参数与之前设置的配置参数（如果有）合并。如果 ProxySQL 无法合并某个选项，您将在其日志中看到警告。
:::

### 编辑 `deploy/cr.yaml` 文件

您可以通过编辑文件`deploy/cr.yaml` 中的 `proxysql.configuration` 键来添加 `proxysql.cnf` 配置文件中的选项。下面是一个示例：

```cfg
...
proxysql:
  enabled: false
  size: 3
  image: percona/percona-xtradb-cluster-operator:1.13.0-proxysql
  configuration: |
    datadir="/var/lib/proxysql"

    admin_variables =
    {
      admin_credentials="proxyadmin:admin_password"
      mysql_ifaces="0.0.0.0:6032"
      refresh_interval=2000

      cluster_username="proxyadmin"
      cluster_password="admin_password"
      cluster_check_interval_ms=200
      cluster_check_status_frequency=100
      cluster_mysql_query_rules_save_to_disk=true
      cluster_mysql_servers_save_to_disk=true
      cluster_mysql_users_save_to_disk=true
      cluster_proxysql_servers_save_to_disk=true
      cluster_mysql_query_rules_diffs_before_sync=1
      cluster_mysql_servers_diffs_before_sync=1
      cluster_mysql_users_diffs_before_sync=1
      cluster_proxysql_servers_diffs_before_sync=1
    }

    mysql_variables=
    {
      monitor_password="monitor"
      monitor_galera_healthcheck_interval=1000
      threads=2
      max_connections=2048
      default_query_delay=0
      default_query_timeout=10000
      poll_timeout=2000
      interfaces="0.0.0.0:3306"
      default_schema="information_schema"
      stacksize=1048576
      connect_timeout_server=10000
      monitor_history=60000
      monitor_connect_interval=20000
      monitor_ping_interval=10000
      ping_timeout_server=200
      commands_stats=true
      sessions_sort=true
      have_ssl=true
      ssl_p2s_ca="/etc/proxysql/ssl-internal/ca.crt"
      ssl_p2s_cert="/etc/proxysql/ssl-internal/tls.crt"
      ssl_p2s_key="/etc/proxysql/ssl-internal/tls.key"
      ssl_p2s_cipher="ECDHE-RSA-AES128-GCM-SHA256"
    }
```

### 使用 ConfigMap

您可以使用 configmap 和集群重启来重置配置选项。configmap 允许 Kubernetes 在容器化应用程序内传递或更新配置数据。

使用命令 `kubectl` 从外部资源创建 configmap，有关更多信息，请参阅[配置 Pod 以使用 ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#create-a-configmap)。

例如，您可以使用以下设置定义配置文件 `proxysql.cnf` ：

```conf
datadir="/var/lib/proxysql"

admin_variables =
{
  admin_credentials="proxyadmin:admin_password"
  mysql_ifaces="0.0.0.0:6032"
  refresh_interval=2000

  cluster_username="proxyadmin"
  cluster_password="admin_password"
  cluster_check_interval_ms=200
  cluster_check_status_frequency=100
  cluster_mysql_query_rules_save_to_disk=true
  cluster_mysql_servers_save_to_disk=true
  cluster_mysql_users_save_to_disk=true
  cluster_proxysql_servers_save_to_disk=true
  cluster_mysql_query_rules_diffs_before_sync=1
  cluster_mysql_servers_diffs_before_sync=1
  cluster_mysql_users_diffs_before_sync=1
  cluster_proxysql_servers_diffs_before_sync=1
}

mysql_variables=
{
  monitor_password="monitor"
  monitor_galera_healthcheck_interval=1000
  threads=2
  max_connections=2048
  default_query_delay=0
  default_query_timeout=10000
  poll_timeout=2000
  interfaces="0.0.0.0:3306"
  default_schema="information_schema"
  stacksize=1048576
  connect_timeout_server=10000
  monitor_history=60000
  monitor_connect_interval=20000
  monitor_ping_interval=10000
  ping_timeout_server=200
  commands_stats=true
  sessions_sort=true
  have_ssl=true
  ssl_p2s_ca="/etc/proxysql/ssl-internal/ca.crt"
  ssl_p2s_cert="/etc/proxysql/ssl-internal/tls.crt"
  ssl_p2s_key="/etc/proxysql/ssl-internal/tls.key"
  ssl_p2s_cipher="ECDHE-RSA-AES128-GCM-SHA256"
}
```

您可以使用以下 `kubectl create configmap` 命令从 `proxysql.cnf` 文件创建 configmap。

您应该使用集群名称与 `-proxysql` 后缀的组合作为 configmap 的命名约定。若要查找群集名称，可以使用以下命令：

```bash
kubectl get pxc
```

`kubectl create configmap` 命令的语法为：

```bash
$ kubectl create configmap <cluster-name>-proxysql <resource-type=resource-name>
```

以下示例定义为 configmap 名称，将 `proxysql.cnf` 文件定义为 `cluster1-proxysql` 数据源：

```bash
kubectl create configmap cluster1-proxysql --from-file=proxysql.cnf
```

要查看创建的 configmap，请使用以下命令：

```bash
kubectl describe configmaps cluster1-haproxy
```

### 使用 Secret 对象

Operator 还可以将配置选项存储在 Kubernetes Secret 中。如果需要对某些敏感数据进行额外保护，这可能很有用。

您应该创建一个具有特定名称的 Secret 对象，该对象由集群名称和 `proxysql` 后缀组成。

配置选项应放在 data 该部分的特定键内。此 key 的名称 proxysql.conf 用于 ProxySQL Pod。

实际选项应使用 Base64 进行编码。

例如，让我们定义一个 `proxysql.conf` 配置文件，并把我们在上一个示例中使用的选项放在那里：

```conf
datadir="/var/lib/proxysql"

admin_variables =
{
  admin_credentials="proxyadmin:admin_password"
  mysql_ifaces="0.0.0.0:6032"
  refresh_interval=2000

  cluster_username="proxyadmin"
  cluster_password="admin_password"
  cluster_check_interval_ms=200
  cluster_check_status_frequency=100
  cluster_mysql_query_rules_save_to_disk=true
  cluster_mysql_servers_save_to_disk=true
  cluster_mysql_users_save_to_disk=true
  cluster_proxysql_servers_save_to_disk=true
  cluster_mysql_query_rules_diffs_before_sync=1
  cluster_mysql_servers_diffs_before_sync=1
  cluster_mysql_users_diffs_before_sync=1
  cluster_proxysql_servers_diffs_before_sync=1
}

mysql_variables=
{
  monitor_password="monitor"
  monitor_galera_healthcheck_interval=1000
  threads=2
  max_connections=2048
  default_query_delay=0
  default_query_timeout=10000
  poll_timeout=2000
  interfaces="0.0.0.0:3306"
  default_schema="information_schema"
  stacksize=1048576
  connect_timeout_server=10000
  monitor_history=60000
  monitor_connect_interval=20000
  monitor_ping_interval=10000
  ping_timeout_server=200
  commands_stats=true
  sessions_sort=true
  have_ssl=true
  ssl_p2s_ca="/etc/proxysql/ssl-internal/ca.crt"
  ssl_p2s_cert="/etc/proxysql/ssl-internal/tls.crt"
  ssl_p2s_key="/etc/proxysql/ssl-internal/tls.key"
  ssl_p2s_cipher="ECDHE-RSA-AES128-GCM-SHA256"
}
```

您可以通过命令行从选项中获取 Base64 编码的字符串，如下所示：

::: tabs

@tab 在 Linux 中

```bash
cat proxysql.cnf | base64 --wrap=0
```

@tab 在 macOS 中

```bash
cat proxysql.cnf | base64
```

:::

::: tip 注意
同样，您可以从 Base64 编码的字符串中读取选项列表：

```bash
echo "ZGF0YWRpcj0iL3Zhci9saWIvcHJveHlzcWwiCgphZG1pbl92YXJpYWJsZXMgPQp7CiBhZG1pbl9j\
cmVkZW50aWFscz0icHJveHlhZG1pbjphZG1pbl9wYXNzd29yZCIKIG15c3FsX2lmYWNlcz0iMC4w\
LjAuMDo2MDMyIgogcmVmcmVzaF9pbnRlcnZhbD0yMDAwCgogY2x1c3Rlcl91c2VybmFtZT0icHJv\
eHlhZG1pbiIKIGNsdXN0ZXJfcGFzc3dvcmQ9ImFkbWluX3Bhc3N3b3JkIgogY2x1c3Rlcl9jaGVj\
a19pbnRlcnZhbF9tcz0yMDAKIGNsdXN0ZXJfY2hlY2tfc3RhdHVzX2ZyZXF1ZW5jeT0xMDAKIGNs\
dXN0ZXJfbXlzcWxfcXVlcnlfcnVsZXNfc2F2ZV90b19kaXNrPXRydWUKIGNsdXN0ZXJfbXlzcWxf\
c2VydmVyc19zYXZlX3RvX2Rpc2s9dHJ1ZQogY2x1c3Rlcl9teXNxbF91c2Vyc19zYXZlX3RvX2Rp\
c2s9dHJ1ZQogY2x1c3Rlcl9wcm94eXNxbF9zZXJ2ZXJzX3NhdmVfdG9fZGlzaz10cnVlCiBjbHVz\
dGVyX215c3FsX3F1ZXJ5X3J1bGVzX2RpZmZzX2JlZm9yZV9zeW5jPTEKIGNsdXN0ZXJfbXlzcWxf\
c2VydmVyc19kaWZmc19iZWZvcmVfc3luYz0xCiBjbHVzdGVyX215c3FsX3VzZXJzX2RpZmZzX2Jl\
Zm9yZV9zeW5jPTEKIGNsdXN0ZXJfcHJveHlzcWxfc2VydmVyc19kaWZmc19iZWZvcmVfc3luYz0x\
Cn0KCm15c3FsX3ZhcmlhYmxlcz0KewogbW9uaXRvcl9wYXNzd29yZD0ibW9uaXRvciIKIG1vbml0\
b3JfZ2FsZXJhX2hlYWx0aGNoZWNrX2ludGVydmFsPTEwMDAKIHRocmVhZHM9MgogbWF4X2Nvbm5l\
Y3Rpb25zPTIwNDgKIGRlZmF1bHRfcXVlcnlfZGVsYXk9MAogZGVmYXVsdF9xdWVyeV90aW1lb3V0\
PTEwMDAwCiBwb2xsX3RpbWVvdXQ9MjAwMAogaW50ZXJmYWNlcz0iMC4wLjAuMDozMzA2IgogZGVm\
YXVsdF9zY2hlbWE9ImluZm9ybWF0aW9uX3NjaGVtYSIKIHN0YWNrc2l6ZT0xMDQ4NTc2CiBjb25u\
ZWN0X3RpbWVvdXRfc2VydmVyPTEwMDAwCiBtb25pdG9yX2hpc3Rvcnk9NjAwMDAKIG1vbml0b3Jf\
Y29ubmVjdF9pbnRlcnZhbD0yMDAwMAogbW9uaXRvcl9waW5nX2ludGVydmFsPTEwMDAwCiBwaW5n\
X3RpbWVvdXRfc2VydmVyPTIwMAogY29tbWFuZHNfc3RhdHM9dHJ1ZQogc2Vzc2lvbnNfc29ydD10\
cnVlCiBoYXZlX3NzbD10cnVlCiBzc2xfcDJzX2NhPSIvZXRjL3Byb3h5c3FsL3NzbC1pbnRlcm5h\
bC9jYS5jcnQiCiBzc2xfcDJzX2NlcnQ9Ii9ldGMvcHJveHlzcWwvc3NsLWludGVybmFsL3Rscy5j\
cnQiCiBzc2xfcDJzX2tleT0iL2V0Yy9wcm94eXNxbC9zc2wtaW50ZXJuYWwvdGxzLmtleSIKIHNz\
bF9wMnNfY2lwaGVyPSJFQ0RIRS1SU0EtQUVTMTI4LUdDTS1TSEEyNTYiCn0K" | base64 --decode
```

:::

最后，使用 yaml 文件创建 Secret 对象。例如，您可以创建包含以下内容的文件 `deploy/my-proxysql-secret.yaml`：

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cluster1-proxysql
data:
  my.cnf:
    "ZGF0YWRpcj0iL3Zhci9saWIvcHJveHlzcWwiCgphZG1pbl92YXJpYWJsZXMgPQp7CiBhZG1pbl9j\
    cmVkZW50aWFscz0icHJveHlhZG1pbjphZG1pbl9wYXNzd29yZCIKIG15c3FsX2lmYWNlcz0iMC4w\
    LjAuMDo2MDMyIgogcmVmcmVzaF9pbnRlcnZhbD0yMDAwCgogY2x1c3Rlcl91c2VybmFtZT0icHJv\
    eHlhZG1pbiIKIGNsdXN0ZXJfcGFzc3dvcmQ9ImFkbWluX3Bhc3N3b3JkIgogY2x1c3Rlcl9jaGVj\
    a19pbnRlcnZhbF9tcz0yMDAKIGNsdXN0ZXJfY2hlY2tfc3RhdHVzX2ZyZXF1ZW5jeT0xMDAKIGNs\
    dXN0ZXJfbXlzcWxfcXVlcnlfcnVsZXNfc2F2ZV90b19kaXNrPXRydWUKIGNsdXN0ZXJfbXlzcWxf\
    c2VydmVyc19zYXZlX3RvX2Rpc2s9dHJ1ZQogY2x1c3Rlcl9teXNxbF91c2Vyc19zYXZlX3RvX2Rp\
    c2s9dHJ1ZQogY2x1c3Rlcl9wcm94eXNxbF9zZXJ2ZXJzX3NhdmVfdG9fZGlzaz10cnVlCiBjbHVz\
    dGVyX215c3FsX3F1ZXJ5X3J1bGVzX2RpZmZzX2JlZm9yZV9zeW5jPTEKIGNsdXN0ZXJfbXlzcWxf\
    c2VydmVyc19kaWZmc19iZWZvcmVfc3luYz0xCiBjbHVzdGVyX215c3FsX3VzZXJzX2RpZmZzX2Jl\
    Zm9yZV9zeW5jPTEKIGNsdXN0ZXJfcHJveHlzcWxfc2VydmVyc19kaWZmc19iZWZvcmVfc3luYz0x\
    Cn0KCm15c3FsX3ZhcmlhYmxlcz0KewogbW9uaXRvcl9wYXNzd29yZD0ibW9uaXRvciIKIG1vbml0\
    b3JfZ2FsZXJhX2hlYWx0aGNoZWNrX2ludGVydmFsPTEwMDAKIHRocmVhZHM9MgogbWF4X2Nvbm5l\
    Y3Rpb25zPTIwNDgKIGRlZmF1bHRfcXVlcnlfZGVsYXk9MAogZGVmYXVsdF9xdWVyeV90aW1lb3V0\
    PTEwMDAwCiBwb2xsX3RpbWVvdXQ9MjAwMAogaW50ZXJmYWNlcz0iMC4wLjAuMDozMzA2IgogZGVm\
    YXVsdF9zY2hlbWE9ImluZm9ybWF0aW9uX3NjaGVtYSIKIHN0YWNrc2l6ZT0xMDQ4NTc2CiBjb25u\
    ZWN0X3RpbWVvdXRfc2VydmVyPTEwMDAwCiBtb25pdG9yX2hpc3Rvcnk9NjAwMDAKIG1vbml0b3Jf\
    Y29ubmVjdF9pbnRlcnZhbD0yMDAwMAogbW9uaXRvcl9waW5nX2ludGVydmFsPTEwMDAwCiBwaW5n\
    X3RpbWVvdXRfc2VydmVyPTIwMAogY29tbWFuZHNfc3RhdHM9dHJ1ZQogc2Vzc2lvbnNfc29ydD10\
    cnVlCiBoYXZlX3NzbD10cnVlCiBzc2xfcDJzX2NhPSIvZXRjL3Byb3h5c3FsL3NzbC1pbnRlcm5h\
    bC9jYS5jcnQiCiBzc2xfcDJzX2NlcnQ9Ii9ldGMvcHJveHlzcWwvc3NsLWludGVybmFsL3Rscy5j\
    cnQiCiBzc2xfcDJzX2tleT0iL2V0Yy9wcm94eXNxbC9zc2wtaW50ZXJuYWwvdGxzLmtleSIKIHNz\
    bF9wMnNfY2lwaGVyPSJFQ0RIRS1SU0EtQUVTMTI4LUdDTS1TSEEyNTYiCn0K"
```

准备就绪后，使用以下命令应用它：

```bash
kubectl create -f deploy/my-proxysql-secret.yaml
```

::: tip 注意
不要忘记重新启动 Percona XtraDB 集群，以确保集群已更新配置。
:::

## 访问 ProxySQL 管理界面

您可以使用 [ProxySQL 管理界面](https://www.percona.com/blog/proxysql-admin-interface-not-typical-mysql-server/?_gl=1*1jxle8p*_gcl_au*OTg5NTM4MTc5LjE2OTMyMDY2NDQ.)来配置其设置。

以这种方式配置 ProxySQL 意味着使用 MySQL 协议连接到它，需要做两件事：

- ProxySQL Pod 名称
- ProxySQL 管理员密码

您可以使用 kubectl get pods 命令找出 ProxySQL Pod 名称，该命令将具有以下输出：

```bash
kubectl get pods

NAME                                              READY   STATUS    RESTARTS   AGE
cluster1-pxc-node-0                               1/1     Running   0          5m
cluster1-pxc-node-1                               1/1     Running   0          4m
cluster1-pxc-node-2                               1/1     Running   0          2m
cluster1-proxysql-0                               1/1     Running   0          5m
percona-xtradb-cluster-operator-dc67778fd-qtspz   1/1     Running   0          6m
```

下一个命令将打印您所需的管理员密码：

```bash
kubectl get secrets $(kubectl get pxc -o jsonpath='{.items[].spec.seretsName}') -o template='{{ .data.proxyadmin | base64decode }}'
```

当 Pod 名称和管理员密码都已知时，按如下方式连接到 ProxySQL，将 `cluster1-proxysql-0` 替换为实际 Pod 名称，将 `admin_password` 替换为实际密码：

```bash
kubectl exec -it cluster1-proxysql-0 -- mysql -h127.0.0.1 -P6032 -uproxyadmin -padmin_password
```
