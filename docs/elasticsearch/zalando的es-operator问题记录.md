---
order: 199
tags: 
  - elasticsearch
categories: 
  - elasticsearch
columns: 
  - null
title: zalando 的 es-operator 问题记录.md
date: 2023-10-27 14:46:20
---

# zalando 的 es-operator 问题记录.md

## failed to obtain node locks

```bash
java.lang.IllegalStateException: failed to obtain node locks, tried [[/usr/share/elasticsearch/data]] with lock id [0]; maybe these locations are not writable or multiple nodes were started without increasing [node.max_local_storage_nodes] (was [1])?
```

登录 pod 所在节点，进入 pod 挂载目录删除 lock 文件。

```bash
df |grep 100.13

cd /var/lib/kubelet/pods/2cfdab69-9dea-4b16-b3bf-56c7d226f442/volumes/kubernetes.io~nfs/pvc-2aef60b5-6d75-4fce-a4b3-2f5e6d7e417a

cd nodes/0/

rm -f node.lock
```

::: tip
master 节点有 2 个 lock 文件。

node 节点有 1 个 lock 文件。
:::
