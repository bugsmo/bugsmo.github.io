---
order: 512
tags: 
  - percona-operator-for-mysql
categories: 
  - mysql
columns: 
  - null
title: 暂停 or 恢复 Percona XtraDB 集群
date: 2023-11-10 14:33:25
---

# 暂停 or 恢复 Percona XtraDB 集群

在外部情况下，可能需要关闭 Percona XtraDB 集群一段时间，然后重新启动它（一些与企业基础设施维护相关的工作等）。

该文件 `deploy/cr.yaml` 包含用于此目的的特殊 `spec.pause` 键。将其设置为 true 正常停止群集：

```yaml
spec:
  .......
  pause: true
```

```bash
kubectl apply -f deploy/cr.yaml
```

暂停集群可能需要一些时间，当该过程结束时，您将只看到 Operator Pod 正在运行：

```bash
kubectl get pods

NAME                                               READY   STATUS    RESTARTS   AGE
percona-xtradb-cluster-operator-79966668bd-rswbk   1/1     Running   0          12m
```

要在集群关闭后启动集群，只需将 `spec.pause` 密钥恢复为 `false` 。

```bash
kubectl apply -f deploy/cr.yaml
```

启动群集需要一些时间。当所有 Pod 都达到其 Running 状态时，该过程结束：

```bash
NAME                                               READY   STATUS    RESTARTS   AGE
cluster1-haproxy-0                                 2/2     Running   0          6m17s
cluster1-haproxy-1                                 2/2     Running   0          4m59s
cluster1-haproxy-2                                 2/2     Running   0          4m36s
cluster1-pxc-0                                     3/3     Running   0          6m17s
cluster1-pxc-1                                     3/3     Running   0          5m3s
cluster1-pxc-2                                     3/3     Running   0          3m56s
percona-xtradb-cluster-operator-79966668bd-rswbk   1/1     Running   0          9m54s
```
