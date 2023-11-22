---
order: 514
tags:
  - percona-operator-for-mysql
title: 在 Kubernetes 上扩展 MySQL
date: 2023-11-14 15:09:50
categories:
  - mysql
  - percona-operator-for-mysql
columns:
  -
---

# 在 Kubernetes 上扩展 MySQL

Kubernetes 平台带来的一大优势是易于应用程序扩容。扩容应用程序的结果是添加`资源`或 `Pod`，并将它们调度到可用的 Kubernetes 节点。

扩容可以是垂直的，也可以是水平的。垂直扩容为 MySQL 节点增加了更多的计算或存储资源;水平扩容是指向群集添加更多节点。

## 垂直扩容

## 扩容资源

Operator 部署和管理多个组件：Percona XtraDB Cluster （PXC）、HAProxy 或 ProxySQL 等。要添加或减少 CPU 或内存，您需要编辑自定义资源中的相应部分。我们遵循 Kubernetes 提供的结构 `requests limits` 。

要向 PXC 中的 MySQL 节点添加更多资源，请在自定义资源中编辑以下部分：

```yaml
spec:
  pxc:
    resources:
      requests:
        memory: 4G
        cpu: 2
      limits:
        memory: 4G
        cpu: 2
```

## 扩容存储

Kubernetes 使用 PersistentVolume （PV） 和 PersistentVolumeClaim （PVC） 管理存储，前者是管理员提供的存储段，后者是用户对存储的请求。在 Kubernetes v1.11 中，添加了该功能以允许用户增加现有 PVC 对象的大小。用户无法缩小现有 PVC 对象的大小。

### 卷扩容能力

某些卷类型支持 PVC 扩展（有关 PVC 和支持的卷类型的确切详细信息，请参见 [Kubernetes 文档](https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/#expanding-persistent-volumes-claims)）。

您可以执行以下命令，查看存储是否支持扩容功能。

```bash
kubectl describe sc <storage class name> | grep allowVolumeExpansion
```

::: details 预期输出

```bash
allowVolumeExpansion: true
```

:::

1. 获取集群的卷列表：

```bash
kubectl get pvc -l app.kubernetes.io/instance=<CLUSTER_NAME>
```

::: details 预期输出

```bash
kubectl get pvc -l app.kubernetes.io/instance=cluster1
NAME                     STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
datadir-cluster1-pxc-0   Bound    pvc-6330b6ab-fc1f-4799-970d-a6d26c6c1ecb   200G       RWO            nfs-synology   4d4h
datadir-cluster1-pxc-1   Bound    pvc-1f3a25fc-0b89-49a5-90a0-f87cfe4b4ec1   200G       RWO            nfs-synology   19m
datadir-cluster1-pxc-2   Bound    pvc-7931116d-77d9-496a-8bec-00f2d081c96e   200G       RWO            nfs-synology   18m
```

:::

2. 修改卷以增加大小，您可以编辑 pvc 或运行 patch 命令：

```bash
kubectl patch pvc <pvc-name> -p '{ "spec": { "resources": { "requests": { "storage": "NEW STORAGE SIZE" }}}}'
```

::: details 预期输出

```bash
persistentvolumeclaim/datadir-cluster1-pxc-0 patched
```

:::

3. 通过运行 describe 检查扩容是否成功：

```bash
kubectl describe pvc <pvc-name>
```

::: details 预期输出

```bash
Normal  ExternalExpanding           3m52s              volume_expand                                                                                     CSI migration enabled for kubernetes.io/gce-pd; waiting for external resizer to expand the pvc
Normal  Resizing                    3m52s              external-resizer pd.csi.storage.gke.io                                                            External resizer is resizing volume pvc-90f0633b-0938-4b66-a695-556bb8a9e943
Normal  FileSystemResizeRequired    3m44s              external-resizer pd.csi.storage.gke.io                                                            Require file system resize of volume on node
Normal  FileSystemResizeSuccessful  3m10s              kubelet
```

:::

4. 现在我们增加了存储空间，但是我们的 StatefulSet 和自定义资源不同步。使用新的存储设置编辑自定义资源并应用：

```yaml
spec:
  pxc:
    volumeSpec:
      persistentVolumeClaim:
        resources:
          requests:
            storage: <NEW STORAGE SIZE>
```

应用自定义资源：

```bash
kubectl apply -f cr.yaml
```

5. 删除 StatefulSet，将其与自定义资源同步：

```bash
kubectl delete sts <statefulset-name> --cascade=orphan
```

Pod 不会宕机，Operator 将重新创建 StatefulSet：

```bash
kubectl get sts <statefulset-name>
```

### 无卷扩展功能

也可以在不进行卷扩展的情况下扩展存储。我们需要一个接一个地删除 Pod 及其持久卷，以将数据重新同步到新卷。这也可用于缩小存储空间。

1. 使用新的存储大小编辑自定义资源，如下所示：

```yaml
spec:
  pxc:
    volumeSpec:
      persistentVolumeClaim:
        resources:
          requests:
            storage: <NEW STORAGE SIZE>
```

以常规方式应用自定义资源更新：

```bash
kubectl apply -f deploy/cr.yaml
```

2. 使用以下 orphan 选项删除有状态副本集

```bash
kubectl delete sts <statefulset-name> --cascade=orphan
```

Pod 会等一会儿才有，Operator 将重新创建 StatefulSet：

```bash
kubectl get sts <statefulset-name>
```

::: tip
我测试的是 nfs 存储，operator 报无法 patch pvc。
:::

3. 纵向扩展集群

更改存储大小将需要我们终止 Pod，这会降低集群的计算能力，并可能导致性能问题。为了提高操作期间的性能，我们将把集群的大小从 3 个节点更改为 5 个节点：

```yaml
spec:
  pxc:
    size: 5
```

应用更改：

```yaml
kubectl apply -f deploy/cr.yaml
```

新的 Pod 已经有了新的存储：

```yaml
kubectl get pvc -l app.kubernetes.io/instance=cluster1
```

::: details 预期输出，nfs 存储不支持在线扩容的，所以旧的还是 200G。

```bash
NAME                     STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   AGE
datadir-cluster1-pxc-0   Bound    pvc-6330b6ab-fc1f-4799-970d-a6d26c6c1ecb   200G       RWO            nfs-synology   4d5h
datadir-cluster1-pxc-1   Bound    pvc-1f3a25fc-0b89-49a5-90a0-f87cfe4b4ec1   200G       RWO            nfs-synology   35m
datadir-cluster1-pxc-2   Bound    pvc-7931116d-77d9-496a-8bec-00f2d081c96e   200G       RWO            nfs-synology   33m
datadir-cluster1-pxc-3   Bound    pvc-456a1271-0afd-43b1-adb5-c8c102e3b64d   300G       RWO            nfs-synology   44s
```

:::

4. 逐个删除旧存储大小的 PVC 和 Pod。等待数据同步，然后再继续下一个节点。

```bash
kubectl delete pvc <PVC NAME>
kubectl delete pod <POD NAME>
```

新的 PVC 将与 Pod 一起创建。

## 水平扩容

集群的大小由自定义资源选项配置中的大小键控制。因此，扩展群集只需要更改此选项并应用更新的配置文件即可。这可以在专门保存的配置中完成：

```yaml
spec:
  pxc:
    size: 5
```

应用更改：

```bash
kubectl apply -f deploy/cr.yaml
```

## 自动扩缩容

要自动进行水平扩展，可以使用[水平 Pod 自动缩放程序 （HPA）](https://kubernetes.io/zh-cn/docs/tasks/run-application/horizontal-pod-autoscale/)。它将扩展自定义资源本身，让 Operator 处理其他所有事情。

还可以使用 [Kuvernetes 事件驱动的自动缩放 （KEDA）](https://keda.sh/)，您可以在其中应用更复杂的逻辑来做出缩放决策。

目前，无法将 Vertical Pod Autoscaler （VPA） 与 Operator 一起使用，因为它为具有所有者引用的对象引入了限制。
