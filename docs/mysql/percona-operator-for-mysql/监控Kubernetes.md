---
order: 520
tags:
  - percona-operator-for-mysql
title: 监控 Kubernetes
date: 2023-11-15 10:45:44
categories:
  - mysql
  - percona-operator-for-mysql
columns:
  -
---

# 监控 Kubernetes

::: danger
PMM 开源协议是 AGPL。不能分发到公共网络上使用。
:::

监视数据库的状态对于及时识别和响应性能问题至关重要。Percona 监控和管理 （PMM） 解决方案使您能够做到这一点。

但是，数据库状态还取决于 Kubernetes 集群本身的状态。因此，拥有可以描述 Kubernetes 集群状态的指标非常重要。

本文档介绍如何设置对 Kubernetes 集群运行状况的监控。此设置已经过测试，PMM 服务器作为集中式数据存储，Victoria Metrics Kubernetes 监控堆栈作为指标收集器。如果您使用其他与 Prometheus 兼容的存储，这些步骤也可能适用。

## 注意事项

在此设置中，我们使用 Victoria Metrics Kubernetes 监控堆栈 Helm 图表。自定义图表的值时，请考虑以下事项：

- 由于我们使用 PMM 服务器进行监控，因此无需将数据存储在 Victoria Metrics Operator 中。因此，安装 Victoria Metrics Helm 图表时，在此设置中 `vmsingle.enabled` 将 和 `vmcluster.enabled` 参数设置为 `false` 。
- 默认情况下不安装 Prometheus 节点 exporter，因为它需要有权访问主机文件系统的特权容器。如果您需要节点的指标，请通过将 Victoria Metrics Helm 图表中 `prometheus-node-exporter.enabled` 的标志设置为 来启用 Prometheus 节点导出器 true 。
- 检查图表和依赖关系 `victoria-metrics-k8s-stack` 图表的所有基于角色的访问控制 （RBAC） 规则，并根据您的要求进行修改。

## 先决条件

要设置 Kubernetes 的监控，您需要满足以下条件：

1. PMM 服务器启动并运行。您可以将 PMM 服务器作为 Docker 映像、虚拟设备或在 AWS 实例上运行。有关安装说明，请参阅官方 PMM 文档。
2. Helm v3 版。
3. kubectl。

## 操作步骤

### 在 PMM Server 中设置身份验证

要访问 PMM 服务器资源并在服务器上执行操作，请配置身份验证。

1. 获取 PMM API 密钥。密钥必须具有“Admin”角色。

::: tabs

@tab 从 PMM UI

[生成 PMM API KEY](https://docs.percona.com/percona-monitoring-and-management/details/api.html#api-keys-and-authentication)

@tab 从命令行

您可以使用 curl 和 jq 实用程序查询 PMM 服务器安装中的 API 密钥。在以下命令中，将占位符替换为 `<login>:<password>@<server_host>` 您的实际 PMM 服务器登录名、密码和主机名：

```bash
API_KEY=$(curl --insecure -X POST -H "Content-Type: application/json" -d '{"name":"operator", "role": "Admin"}' "https://<login>:<password>@<server_host>/graph/api/auth/keys" | jq .key)
```

:::

2. 使用 base64 对 API 密钥进行编码。

```bash
echo -n <API-key> | base64 --wrap=0
```

3. 创建要设置监视的命名空间。以下命令创建 Namespace `monitoring-system` 。您可以指定其他名称。在后面的步骤中，指定命名空间而不是 `<namespace>` 占位符。

```bash
kubectl create namespace monitoring-system
```

4. 为 Kubernetes 密钥创建 YAML 文件，并在其中指定 base64 编码的 API 密钥值。我们把这个文件命名为 `pmm-api-vmoperator.yaml` 。

```yaml
apiVersion: v1
data:
  api_key: <base-64-encoded-API-key>
kind: Secret
metadata:
  name: pmm-token-vmoperator
  #namespace: default
type: Opaque
```

5. 使用之前创建的 YAML 文件创建 Secrets 对象。将 `<filename>` 占位符替换为您的值。

```bash
kubectl apply -f pmm-api-vmoperator.yaml -n <namespace>
```

6. 检查是否已创建密钥。以下命令检查名为 `pmm-token-vmoperator` （在 secrets 文件中的 metadata.name 选项中定义）的资源的密钥。如果定义了其他资源名称，请指定值。

```bash
kubectl get secret pmm-token-vmoperator -n <namespace>
```

### 创建一个 ConfigMap 来挂载 kube-state-metrics

`kube-state-metrics` （KSM） 是一个简单的服务，它监听 Kubernetes API 服务器并生成有关各种对象（Pod、部署、服务和自定义资源）状态的指标。

要定义 `kube-state-metrics` 应捕获的指标，请创建 ConfigMap 并将其挂载到容器中。

使用[示例 configmap.yaml](https://github.com/Percona-Lab/k8s-monitoring/blob/main/vm-operator-k8s-stack/ksm-configmap.yaml) 配置文件创建 ConfigMap。

```bash
kubectl apply -f https://raw.githubusercontent.com/Percona-Lab/k8s-monitoring/main/vm-operator-k8s-stack/ksm-configmap.yaml -n <namespace>
```

因此，您已经创建了 ConfigMap `customresource-config-ksm`。

### 安装 Victoria Metrics Kubernetes 监控堆栈

1. 添加 victoria-metrics-k8s-stack chart 的依赖仓库。

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

2. 添加 Victoria Metrics Kubernetes 监控堆栈存储库。

```bash
helm repo add vm https://victoriametrics.github.io/helm-charts/
```

3. 更新存储库。

```bash
helm repo update
```

4. 安装 Victoria Metrics Kubernetes 监控堆栈 Helm 图表。您需要指定以下配置：

- 用于访问 PMM 服务器的 URL， `externalVM.write.url` 格式为 `<PMM-SERVER-URL>/victoriametrics/api/v1/write`。URL 可以包含 PMM 服务器的 IP 地址或主机名。
- `vmagent.spec.externalLabels.k8s_cluster_id` 选项为 Kubernetes 集群的唯一名称或 ID。如果要将指标从多个 Kubernetes 集群发送到同一 PMM 服务器，请确保设置不同的值。

::: tabs

@tab 命令行

使用以下命令安装 Victoria Metrics Operator 并传递所需的配置。 vm-k8s value 命令是发布名称。您可以使用其他名称。将 `<namespace>` 占位符替换为您的值。Namespace 必须与 Secret 和 ConfigMap 的 Namespace 相同：

```bash
helm install vm-k8s vm/victoria-metrics-k8s-stack \
-f https://raw.githubusercontent.com/Percona-Lab/k8s-monitoring/main/vm-operator-k8s-stack/values.yaml \
--set externalVM.write.url=<PMM-SERVER-URL>/victoriametrics/api/v1/write \
--set vmagent.spec.externalLabels.k8s_cluster_id=<UNIQUE-CLUSTER-IDENTIFER/NAME> \
-n <namespace>
```

举例来说，假设您的 PMM 服务器 URL 是 `https://pmm-example.com` ，集群 ID 是`test-cluster` ，命名空间是 `monitoring-system` 。然后命令将如下所示：

```bash
helm install vm-k8s vm/victoria-metrics-k8s-stack \
 -f https://raw.githubusercontent.com/Percona-Lab/k8s-monitoring/main/vm-operator-k8s-stack/values.yaml \
 --set externalVM.write.url=https://pmm-example.com/victoriametrics/api/v1/write \
 --set vmagent.spec.externalLabels.k8s_cluster_id=test-cluster> \
 -n monitoring-system
```

@tab 配置文件

编辑 `values.yaml`

```yaml
externalVM:
  write:
    # Replace PMM-SERVER-URL with valid URL of PMM Server
    url: "https://<PMM-SERVER-URL>//victoriametrics/api/v1/write"

....

vmagent:
  # spec for VMAgent crd
  # https://docs.victoriametrics.com/operator/api.html#vmagentspec
  spec:
    selectAllByDefault: true
    image:
      tag: v1.91.3
    scrapeInterval: 25s
    externalLabels:
      k8s_cluster_id: <cluster-name>
```

（可选）检查文件的其余部分并进行更改。例如，如果您计划使用 Prometheus 节点导出器收集节点的指标，请将选项 `prometheus-node-exporter.enabled` 设置为 true 。

运行以下命令以安装 Victoria Metrics Kubernetes 监控堆栈。该 vm-k8s 值是 Release 名称。您可以使用其他名称。将 `<namespace>` 占位符替换为您的值。Namespace 必须与 Secret 和 ConfigMap 的 Namespace 相同。

```bash
kubectl apply -f values.yaml -n <namespace>
```

示例 `values.yaml` 文件取自 `victoria-metrics-k8s-stack` 版本 0.17.5。字段和默认值在较新版本的 `victoria-metrics-k8s-stack` Helm 图表中可能有所不同。如果您使用的是不同版本的 Helm 图表 `victoria-metrics-k8s-stack`， 请检查它们。
:::

5. 通过检查 Pod 来验证安装是否成功。

```bash
kubectl get pods -n <namespace>
```

::: details

```bash
NAME                                                        READY   STATUS    RESTARTS   AGE
vm-k8s-grafana-5f6bdb8c7c-d5bw5                             3/3     Running   0          90m
vm-k8s-kube-state-metrics-57c5977d4f-6jtbj                  1/1     Running   0          81m
vm-k8s-prometheus-node-exporter-kntfk                       1/1     Running   0          90m
vm-k8s-prometheus-node-exporter-mjrvj                       1/1     Running   0          90m
vm-k8s-prometheus-node-exporter-v98c8                       1/1     Running   0          90m
vm-k8s-victoria-metrics-operator-6b7f4f786d-sctp8           1/1     Running   0          90m
vmagent-vm-k8s-victoria-metrics-k8s-stack-fbc86c9db-rz8wk   2/2     Running   0          90m
```

Pod 正在运行的内容取决于安装 victoria-metrics-k8s-stack chart 时使用的值中选择的配置。
:::

## 验证指标捕获

1. 连接到 PMM 服务器。
2. 单击“Explore”并切换到“Code”模式。
3. 检查是否捕获了所需的指标，在“Metrics browser”下拉列表中键入以下内容：

- cadvisor
- kubelet
- kube-state-metrics 指标，其中还包括 Kubernetes 集群中部署的 Operator 和数据库的自定义资源指标：
