---
order: 50
tags:
  - elasticsearch
title: ES 的 shard&replica 机制
date: 2023-10-27 09:22:33
categories:
  - elasticsearch
columns:
  -
---

# ES 的 shard&replica 机制

## shard&replica 机制

1. index 包含多个 shard。
2. 每个 shard 都是一个最小工作单元，承载部分数据，lucene 实例，完整的建立索引和处理请求的能力。
3. 增减节点时，shard 会自动在 nodes 中负载均衡。
4. primary shard 和 replica shard，每个 document 肯定只存在于某一个 primary shard 以及其对应的 replica shard 中，不可能存在于多个 primary shard。
5. replica shard 是 primary shard 的副本，负责容错，以及承担读请求负载。
6. primary shard 的数量在创建索引的时候就固定了，replica shard 的数量可以随时修改。
7. primary shard 的默认数量是 5，replica 默认是 1，默认有 10 个 shard，5 个 primary shard，5 个 replica shard。
8. primary shard 不能和自己的 replica shard 放在同一个节点上（否则节点宕机，primary shard 和副本都丢失，起不到容错的作用），但是可以和其他 primary shard 的 replica shard 放在同一个节点上。

## 单 data node 环境下创建 index 是什么样子的

1. 单 node 环境下，创建一个 index，有 3 个 primary shard，3 个 replica shard。
2. 集群 status 是 yellow。
3. 这个时候，只会将 3 个 primary shard 分配到仅有的一个 node 上去，另外 3 个 replica shard 是无法分配的。
4. 集群可以正常工作，但是一旦出现节点宕机，数据全部丢失，而且集群不可用，无法承接任何请求。

## 2 个 node 环境下 replica shard 是如何分配的

1. replica shard 分配：3 个 primary shard，3 个 replica shard，1 node。
2. primary —> replica 同步。
3. 读请求：primary/replica。
