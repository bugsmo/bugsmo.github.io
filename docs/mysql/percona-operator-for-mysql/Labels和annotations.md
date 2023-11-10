---
order: 504
tags: 
  - percona-operator-for-mysql
categories: 
  - mysql
columns: 
  - null
title: Labels 和 annotations
date: 2023-11-09 14:42:47
---

# Labels 和 annotations

[Labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)和[annotations](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/)用于将其他元数据信息附加到 Kubernetes 资源。

标签和注释非常相似。它们之间的区别在于，Kubernetes 使用标签来识别和选择对象，而注解则为资源分配额外的非标识信息。因此，注解的典型作用是促进与某些外部工具的集成。

## 在自定义资源中设置 labels 和 annotations

您可以在自定义资源元数据部分中将标签和/或注释设置为键/值字符串对， `deploy/cr.yaml` 如下所示：

```yaml
apiVersion: pxc.percona.com/v1
kind: PerconaXtraDBCluster
metadata:
  name: cluster1
  annotations:
    percona.com/issue-vault-token: "true"
  labels:
    xx: "xx"
```

检查哪些标签附加到特定对象的最简单方法是使用 `kubectl get` 命令的附加 `--show-labels` 选项。

检查注解并不困难：可以按照以下示例所示完成：

```bash
kubectl get pod cluster1-pxc-0 -o jsonpath='{.metadata.annotations}'
```

## 指定 Operator 忽略的 labels 和 annotations

有时，各种 Kubernetes 组件可以向 Operator 管理的对象添加自己的注解。

操作员跟踪对其对象的所有更改，并可以删除在没有其参与的情况下出现的注释。

如果自定义资源中没有注释或标签，则在将新标签或注释添加到对象时，Operator 不会执行任何操作。

如果在自定义资源中指定了注释或标签，则 Operator 将开始管理注释和标签。在这种情况下，它会删除未知的注释和标签。

尽管如此，还是可以通过在`deploy/cr.yaml` 中的键 `spec.ignoreAnnotations` 或 `spec.ignoreLabels` 来指定 Operator 应忽略哪些注释和标签，如下所示：

```yaml
spec:
  ignoreAnnotations:
    - some.custom.cloud.annotation/smth
  ignoreLabels:
    - some.custom.cloud.label/smth
```

Operator 将忽略任何 Service 注解或标签，其键以上述示例开头。例如，应用上述 cr.yaml 片段后，将忽略以下注释和标签：

```yaml
annotations:
  some.custom.cloud.annotation/smth: somethinghere
labels:
  some.custom.cloud.label/smth: somethinghere
```
