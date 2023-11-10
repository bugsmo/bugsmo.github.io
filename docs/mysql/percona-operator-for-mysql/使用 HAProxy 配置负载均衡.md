---
order: 507
tags:
  - percona-operator-for-mysql
categories:
  - mysql
columns:
  - null
title: 使用 HAProxy 配置负载均衡
date: 2023-11-09 15:34:36
---

# 使用 HAProxy 配置负载均衡

基于 Percona XtraDB 的 Percona Operator for MySQL 集群提供了两种集群组件的选择，以提供负载均衡和代理服务：您可以使用 [HAProxy](https://www.haproxy.org/) 或 [ProxySQL](https://proxysql.com/)。您可以通过 `deploy/cr.yaml` 配置文件中的 `haproxy.enabled` 和 `proxysql.enabled` 选项启用或禁用来控制使用哪一个（如果有）。

使用以下命令启用 HAProxy：

```bash
kubectl patch pxc cluster1 --type=merge --patch '{
"spec": {
"haproxy": {
"enabled": true,
"size": 3,
"image": "percona/percona-xtradb-cluster-operator:1.13.0-haproxy" },
"proxysql": { "enabled": false }
}}'
```

::: warning
从 ProxySQL 切换到 HAProxy 将导致 Percona XtraDB 集群 Pod 重新启动。无法从 HAProxy 切换到 ProxySQL，如果您需要 ProxySQL，则应在创建集群时进行配置。
:::

生成的 HAPproxy 设置将包含两个 `services`：

- `cluster1-haproxy` 在端口 3306 （MySQL） 和 3309（[代理协议](https://www.haproxy.com/blog/haproxy/proxy-protocol/)）上侦听的服务。默认情况下，此服务指向数字为零的 Percona XtraDB 集群成员 （ `cluster1-pxc-0`） 当此成员可用时。如果零成员不可用，则按其编号的降序选择成员（例如 `cluster1-pxc-2` ，`cluster1-pxc-1` 等）。此服务可用于读取和写入加载，或者它也可以仅用于具有拆分写入和读取负载的设置中的写入负载（单写入器模式）。
- `cluster1-haproxy-replicas` 侦听端口 3306 （MySQL）。此服务选择 Percona XtraDB 集群成员，以按照循环负载平衡算法提供查询。

::: tip 注意
如果需要配置 `cluster1-haproxy` 和 `cluster1-haproxy-replicas` 作为无头服务（例如在租户网络上使用），请在 `deploy/cr.yaml` 自定义资源元数据部分添加以下[注释](https://docs.percona.com/percona-operator-for-mysql/pxc/annotations.html) ：

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

升级具有 HAProxy 的集群时，将执行以下步骤。首先，读取器成员逐个升级：操作员等待升级后的 Percona XtraDB 集群成员同步，然后继续升级下一个成员。完成所有读取器的升级后，写入器 Percona XtraDB 集群成员最终升级。

## 将自定义配置选项传递给 HAProxy

您可以通过以下方式之一将自定义配置传递给 HAProxy：

- 编辑 `deploy/cr.yaml` 文件，
- 使用 ConfigMap，
- 使用 Secret 对象。

::: tip 注意
如果以这种方式指定自定义 HAProxy 配置，则 Operator 不会提供自己的 HAProxy 配置文件。这就是为什么您应该指定一整套配置选项或什么都不指定。
:::

### 编辑 `deploy/cr.yaml` 文件

您可以通过编辑 `deploy/cr.yaml` 文件中的 `haproxy.configuration` 键来添加 `haproxy.cfg` 配置文件中的选项。下面是一个示例：

```yaml
---
haproxy:
  enabled: true
  size: 3
  image: percona/percona-xtradb-cluster-operator:1.13.0-haproxy
  configuration: |
    global
      maxconn 2048
      external-check
      stats socket /var/run/haproxy.sock mode 600 expose-fd listeners level user
    defaults
      log global
      mode tcp
      retries 10
      timeout client 10000
      timeout connect 100500
      timeout server 10000
    frontend galera-in
      bind *:3309 accept-proxy
      bind *:3306
      mode tcp
      option clitcpka
      default_backend galera-nodes
    frontend galera-replica-in
      bind *:3309 accept-proxy
      bind *:3307
      mode tcp
      option clitcpka
      default_backend galera-replica-nodes
```

### 使用 ConfigMap

您可以使用 configmap 和集群重启来重置配置选项。configmap 允许 Kubernetes 在容器化应用程序内传递或更新配置数据。

使用命令 `kubectl` 从外部资源创建 configmap，有关更多信息，请参阅[配置 Pod 以使用 ConfigMap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#create-a-configmap)。

例如，您可以使用以下设置定义配置文件 `haproxy.cfg` ：

```cfg
global
  maxconn 2048
  external-check
  stats socket /var/run/haproxy.sock mode 600 expose-fd listeners level user
defaults
  log global
  mode tcp
  retries 10
  timeout client 10000
  timeout connect 100500
  timeout server 10000
frontend galera-in
  bind *:3309 accept-proxy
  bind *:3306
  mode tcp
  option clitcpka
  default_backend galera-nodes
frontend galera-replica-in
  bind *:3309 accept-proxy
  bind *:3307
  mode tcp
  option clitcpka
  default_backend galera-replica-nodes
```

您可以使用以下 `kubectl create configmap` 命令从 `haproxy.cfg` 文件创建 configmap。

您应该使用集群名称与 `-haproxy` 后缀的组合作为 configmap 的命名约定。若要查找群集名称，可以使用以下命令：

```bash
kubectl get pxc
```

命令的 `kubectl create configmap` 语法为：

```bash
kubectl create configmap <cluster-name>-haproxy <resource-type=resource-name>
```

以下示例定义为 configmap 名称，将 `haproxy.cfg` 文件定义为 `cluster1-haproxy` 数据源：

```bash
kubectl create configmap cluster1-haproxy --from-file=haproxy.cfg
```

要查看创建的 configmap，请使用以下命令：

```bash
kubectl describe configmaps cluster1-haproxy
```

### 使用 Secret 对象

Operator 还可以将配置选项存储在 Kubernetes Secret 中。如果需要对某些敏感数据进行额外保护，这可能很有用。

您应该创建一个具有特定名称的 Secret 对象，该对象由集群名称和 `haproxy` 后缀组成。

配置选项应放在 data 该部分的特定键内。此 key 的名称 haproxy.cfg 用于 ProxySQL Pod。

实际选项应使用 Base64 进行编码。

例如，让我们定义一个 `haproxy.cfg` 配置文件，并把我们在上一个示例中使用的选项放在那里：

```cfg
global
  maxconn 2048
  external-check
  stats socket /var/run/haproxy.sock mode 600 expose-fd listeners level user
defaults
  log global
  mode tcp
  retries 10
  timeout client 10000
  timeout connect 100500
  timeout server 10000
frontend galera-in
  bind *:3309 accept-proxy
  bind *:3306
  mode tcp
  option clitcpka
  default_backend galera-nodes
frontend galera-replica-in
  bind *:3309 accept-proxy
  bind *:3307
  mode tcp
  option clitcpka
  default_backend galera-replica-nodes
```

您可以通过命令行从选项中获取 Base64 编码的字符串，如下所示：

::: tabs

@tab 在 Linux 中

```bash
cat haproxy.cfg | base64 --wrap=0
```

@tab 在 macOS 中

```bash
cat haproxy.cfg | base64
```

:::

::: tip 注意
同样，您可以从 Base64 编码的字符串中读取选项列表：

```bash
echo "IGdsb2JhbAogICBtYXhjb25uIDIwNDgKICAgZXh0ZXJuYWwtY2hlY2sKICAgc3RhdHMgc29ja2V0\
IC92YXIvcnVuL2hhcHJveHkuc29jayBtb2RlIDYwMCBleHBvc2UtZmQgbGlzdGVuZXJzIGxldmVs\
IHVzZXIKIGRlZmF1bHRzCiAgIGxvZyBnbG9iYWwKICAgbW9kZSB0Y3AKICAgcmV0cmllcyAxMAog\
ICB0aW1lb3V0IGNsaWVudCAxMDAwMAogICB0aW1lb3V0IGNvbm5lY3QgMTAwNTAwCiAgIHRpbWVv\
dXQgc2VydmVyIDEwMDAwCiBmcm9udGVuZCBnYWxlcmEtaW4KICAgYmluZCAqOjMzMDkgYWNjZXB0\
LXByb3h5CiAgIGJpbmQgKjozMzA2CiAgIG1vZGUgdGNwCiAgIG9wdGlvbiBjbGl0Y3BrYQogICBk\
ZWZhdWx0X2JhY2tlbmQgZ2FsZXJhLW5vZGVzCiBmcm9udGVuZCBnYWxlcmEtcmVwbGljYS1pbgog\
ICBiaW5kICo6MzMwOSBhY2NlcHQtcHJveHkKICAgYmluZCAqOjMzMDcKICAgbW9kZSB0Y3AKICAg\
b3B0aW9uIGNsaXRjcGthCiAgIGRlZmF1bHRfYmFja2VuZCBnYWxlcmEtcmVwbGljYS1ub2Rlcwo=" | base64 --decode
```

:::

最后，使用 yaml 文件创建 Secret 对象。例如，您可以创建包含以下内容的文件 `deploy/my-haproxy-secret.yaml`：

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: cluster1-haproxy
data:
  my.cnf:
    "IGdsb2JhbAogICBtYXhjb25uIDIwNDgKICAgZXh0ZXJuYWwtY2hlY2sKICAgc3RhdHMgc29ja2V0\
    IC92YXIvcnVuL2hhcHJveHkuc29jayBtb2RlIDYwMCBleHBvc2UtZmQgbGlzdGVuZXJzIGxldmVs\
    IHVzZXIKIGRlZmF1bHRzCiAgIGxvZyBnbG9iYWwKICAgbW9kZSB0Y3AKICAgcmV0cmllcyAxMAog\
    ICB0aW1lb3V0IGNsaWVudCAxMDAwMAogICB0aW1lb3V0IGNvbm5lY3QgMTAwNTAwCiAgIHRpbWVv\
    dXQgc2VydmVyIDEwMDAwCiBmcm9udGVuZCBnYWxlcmEtaW4KICAgYmluZCAqOjMzMDkgYWNjZXB0\
    LXByb3h5CiAgIGJpbmQgKjozMzA2CiAgIG1vZGUgdGNwCiAgIG9wdGlvbiBjbGl0Y3BrYQogICBk\
    ZWZhdWx0X2JhY2tlbmQgZ2FsZXJhLW5vZGVzCiBmcm9udGVuZCBnYWxlcmEtcmVwbGljYS1pbgog\
    ICBiaW5kICo6MzMwOSBhY2NlcHQtcHJveHkKICAgYmluZCAqOjMzMDcKICAgbW9kZSB0Y3AKICAg\
    b3B0aW9uIGNsaXRjcGthCiAgIGRlZmF1bHRfYmFja2VuZCBnYWxlcmEtcmVwbGljYS1ub2Rlcwo="
```

准备就绪后，使用以下命令应用它：

```bash
kubectl create -f deploy/my-haproxy-secret.yaml
```

::: tip 注意
不要忘记重新启动 Percona XtraDB 集群，以确保集群已更新配置。
:::

## 启用 Proxy 协议（记录真实客户的 IP）

Proxy 协议允许 HAProxy 向 Percona XtraDB 集群提供真实的客户端地址。

::: tip 注意
要使用此功能，您应该具有 Percona XtraDB Cluster 映像版本 8.0.21 或更高版本。
:::

通常，Proxy 协议被禁用，Percona XtraDB Cluster 看到的是代理服务器 （HAProxy） 的 IP 地址，而不是真实的客户端地址。但在某些情况下，使 Percona XtraDB 集群的真实客户端 IP 地址可见是很重要的：例如，它允许基于客户端/应用程序地址授予权限，并显着增强审计。

您可以通过在 `deploy/cr.yaml` 配置文件中的 [pxc.configuration](https://docs.percona.com/percona-operator-for-mysql/pxc/operator.html#pxc-configuration) 键中添加 `proxy_protocol_networks` 选项，在 Percona XtraDB 集群上启用代理协议。

::: tip 注意
根据云提供商的负载平衡器，您可能还需要在 deploy/cr.yaml 中设置 [haproxy.externaltrafficpolicy](https://docs.percona.com/percona-operator-for-mysql/pxc/operator.html#haproxy-externaltrafficpolicy) 选项。
:::

有关代理协议的更多信息，请参阅官方 [HAProxy 文档](https://www.haproxy.com/blog/using-haproxy-with-the-proxy-protocol-to-better-secure-your-database)。
