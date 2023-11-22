---
order: 1001
tags:
  - scheduler
title: Scheduler 源码分析
date: 2023-11-21 09:34:25
categories:
  - kubernetes
  - practise
columns:
  -
---

# Scheduler 源码分析

在 Kubernetes 中，**调度** 是指将 Pod 放置到合适的节点上，以便对应节点上的 Kubelet 能够运行这些 Pod。

## 论 Pod 调度

在 kubernetes 中，无论是 Deployment、StatefulSet 等多种控制器，它最终都是创建 Pod，Pod 创建是需要被调度到 Kubernetes 集群的 Node 节点中的，此处分析影响 Pod 调度到节点的几种因素。

**定向调度**

- 修改 Pod 编排模板中的 spec.nodeName
- nodeSelector 选择标签

**亲和性调度**

- Pod 亲和性与反亲和性
- Node 亲和性

**污点与容忍**

- 污点
- 容忍

**调度器打分**

- 调度器打分

**自研发调度功能**

- 自研的调度器或者控制器

## 调度器框架

![调度器框架](https://assets.moweilong.com/img/scheduling-framework-extensions.svg)

调度 Pod 可以分为以下几个阶段：

- 预入队列：将 Pod 被添加到内部活动队列之前被调用，在此队列中 Pod 被标记为准备好进行调度
- 排队：用于对调度队列中的 Pod 进行排序。
- 过滤：过滤掉不满足条件的节点
- 打分：对通过的节点按照优先级排序
- 保留资源：因为是 Pod 的创建是异步的，所以需要在找到最合适的机器后先进行资源的保留
- 批准、拒绝、等待：调度完成后对于发送 Pod 的信息进行批准、拒绝、等待
- 绑定：最后从中选择优先级最高的节点，如果中间任何一步骤有错误，就直接返回错误
