---
order: 1000
tags:
  - nfs,pv
title: 清理废弃 pv 和其对应的文件夹
date: 2023-11-10 16:10:50
categories:
  - kubernetes
columns:
  -
---

# 清理废弃 pv 和其对应的文件夹

pv 是 k8s 中重要的重要的存储资源。既然是存储，那就涉及占用磁盘空间。在使用 k8s 集群的过程中，如果不注意清理废弃 pv，那么就很容易积累大量垃圾 pv，不仅不方便 k8s 的管理，还可能导致磁盘空间不足。

本文以由 storage class 动态供应的 pv 为例，演示废弃 pv 和 nfs 服务器上对应文件夹的清理。

## 导出废弃 pv 在 nfs 服务器上的对应路径

```bash
kubectl get pv \
	-o custom-columns=STATUS:.status.phase,PATH:.spec.nfs.path \
	|grep Released  \
	|awk '{print $2}' \
	> 200.txt
```

这里的 `200.txt` 为存储路径信息的文本，因本集群的 master 节点的内网 IP 为 `192.168.130.200`，因此命名为 `200.txt`，在自己的清理过程中，您可以任意命名这个文件。

导出的文本：

```bash
/volume2/kubesphere-devops-system-devops-jenkins-pvc-09188c53-a4a5-4e2f-994b-ab97c59d386b
/volume2/kubesphere-devops-system-data-sonarqube-postgresql-0-pvc-19092a4c-a12b-4201-a359-4094d2918884
......
/volume2/default-pvc-43490a5e64-pvc-2d454bf7-8b4b-4e2a-9e2a-4956d564c00e
```

## 清理 k8s 中的废弃 pv

将下面的代码写入文件，并运行，即可清理 pv。

```bash
#!/bin/bash
whiteList=`kubectl get pv |grep  Released |awk '{print $1}'`
echo "${whiteList}" | while read line
do
  kubectl patch pv ${line}  -p '{"spec":{"persistentVolumeReclaimPolicy":"Delete"}}'
done
```

## 清理 nfs 服务器上的废弃文件

将第 1 步生成的文本文件处理为以下格式

```bash
/volume2/archived-kubesphere-devops-system-devops-jenkins-pvc-09188c53-a4a5-4e2f-994b-ab97c59d386b
/volume2/archived-kubesphere-devops-system-data-sonarqube-postgresql-0-pvc-19092a4c-a12b-4201-a359-4094d2918884
......
/volume2/archived-default-pvc-43490a5e64-pvc-2d454bf7-8b4b-4e2a-9e2a-4956d564c00e
```

::: warning
因为 pv 删除后自动归档会添加前缀 `archived-`，删除前最好抽选一个目录来验证。
:::

将下面的代码写入 nfs 服务器，并运行${脚本路径} ${文本路径}，如 ./cleaner.sh 200.txt，即可以清理废弃文件。

```bash
#!/bin/bash
whiteList=`cat $1`
echo "${whiteList}" | while read line
do
  rm -rf  "$line"
done
```

::: warning
删除前可以修改 `rm -rf` 命令为 `ls -d`，确认每个目录都是正确的。
:::
