---
order: 503
tags:
  - percona-operator-for-mysql
categories:
  - mysql
columns:
  - null
title: Anti-affinity 和 tolerations
date: 2023-11-09 13:58:17
---

# Anti-affinity 和 tolerations

Operator 可以很好地自动将新 Pod 分配给节点，这些节点足以实现整个集群的均衡分布。在某些情况下，确保 Pod 将登陆特定节点是值得的：例如，为了获得配备 SSD 的机器的速度优势，或者为了降低选择同一可用区中的节点的成本。

[deploy/cr.yaml](https://github.com/percona/percona-xtradb-cluster-operator/blob/main/deploy/cr.yaml) 文件的相应部分（例如 `pxc` 、 `haproxy` 和 `proxysql` ）包含可用于执行此操作的键，具体取决于最适合特定情况的键。

## Node selector

`nodeSelector` 包含一个或多个键值对。如果节点没有用 Pod 的每个 `nodeSelector` 键值对进行标记，则 Pod 将无法登陆该节点。

以下示例将 Pod 绑定到任何具有不言自明 `disktype: ssd` 标签的节点：

```yaml
nodeSelector:
  disktype: ssd
```

## Affinity and anti-affinity

Affinity 使 Pod 有资格（或不符合条件 - 所谓的“anti-affinity”）被调度在已经具有具有特定标签的 Pod 的节点上。特别是，这种方法可以降低成本，确保多个具有密集数据交换的 Pod 将占据相同的可用区甚至相同的节点 - 或者相反，使它们落在不同的节点甚至不同的可用区，以实现高可用性和平衡的目的。

Percona Operator for MySQL 提供了两种方法来执行此操作：

- 为 Pod 设置反亲和性的简单方法，内置于 Operator 中，
- 基于使用标准 Kubernetes 约束的更高级方法。

### 简单的方法 - 使用 Percona Operator for MySQL 的 topologyKey

Percona Operator for MySQL 提供了一个 `topologyKey` 选项，该选项可能具有以下值之一：

- `kubernetes.io/hostname` - Pod 将避免驻留在同一个主机中，
- `failure-domain.beta.kubernetes.io/zone` - Pod 将避免驻留在同一个区域内，
- `failure-domain.beta.kubernetes.io/region` - Pod 将避免驻留在同一地区内，
- `none` - 不应用任何约束。

以下示例强制 Percona XtraDB Cluster Pod 避免占用同一节点：

```yaml
affinity:
  topologyKey: "kubernetes.io/hostname"
```

### 高级方法 - 使用标准的 Kubernetes 约束

使用以前的方法，无需特别了解将 Pod 分配给特定节点的 Kubernetes 方式。尽管如此，在某些情况下，可能需要更复杂的调整。在这种情况下 `advanced` ，放置在 [deploy/cr.yaml](https://github.com/percona/percona-xtradb-cluster-operator/blob/main/deploy/cr.yaml) 文件中的选项将 `topologyKey` 关闭并允许使用任何复杂性的标准 Kubernetes 亲和性约束：

```yaml
affinity:
  advanced:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        - labelSelector:
            matchExpressions:
              - key: security
                operator: In
                values:
                  - S1
          topologyKey: failure-domain.beta.kubernetes.io/zone
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
                - key: security
                  operator: In
                  values:
                    - S2
            topologyKey: kubernetes.io/hostname
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
              - key: kubernetes.io/e2e-az-name
                operator: In
                values:
                  - e2e-az1
                  - e2e-az2
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 1
          preference:
            matchExpressions:
              - key: another-node-label-key
                operator: In
                values:
                  - another-node-label-value
```

请参阅 [Kubernetes 文档](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity-beta-feature)中的高级亲和性选项说明。

## Tolerations

容错性允许拥有它们的 Pod 能够登陆具有匹配污点的节点。容差表示为 with `key` 和 `operator` ，即 `exists` 或 `equal` （后一种变体也要求 `value` 键等于）。此外，容忍应该有一个特定的 `effect` ，它可以是不言自明 NoSchedule 的、不那么严格的 PreferNoSchedule ，或者 NoExecute 。最后一个变体意味着，如果节点存在污点 NoExecute，那么任何不容忍此污点的 Pod 都将立即或 tolerationSeconds 在间隔后从节点中删除，如以下示例所示：

```yaml
tolerations:
  - key: "node.alpha.kubernetes.io/unreachable"
    operator: "Exists"
    effect: "NoExecute"
    tolerationSeconds: 6000
```

[Kubernetes Taints 和 Toleratins](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) 包含有关此主题的更多示例。

## Priority Classes

Pod 可能属于某些优先级类。这允许调度器区分更多和不太重要的 Pod，以解决在不驱逐较低优先级的 Pod 的情况下无法调度某些优先级较高的 Pod 的情况。这可以通过在 Kubernetes 集群中添加一个或多个 PriorityClasses，并在 [deploy/cr.yaml](https://github.com/percona/percona-xtradb-cluster-operator/blob/main/deploy/cr.yaml) 文件中指定： `PriorityClassName`

```yaml
priorityClassName: high-priority
```

请参阅 [Kubernetes Pod 优先级和抢占文档](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption/)，了解如何在集群中定义和使用优先级类。

## Pod Disruption Budgets

创建 Pod 中断预算是 Kubernetes 的风格，用于限制应用程序的 Pod 数量，这些 Pod 的数量可能会因集群管理员在更新部署或节点期间的操作等自愿中断而同时关闭。通过这种方式，分发预算允许大型应用程序在维护和其他管理活动时保持其高可用性。

我们建议手动应用 Pod 中断预算，以避免 Kubernetes 停止所有数据库 Pod 的情况。有关详细信息，请参阅[官方 Kubernetes 文档](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/)。
