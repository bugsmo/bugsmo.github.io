---
order: 50
tags:
  - kibana
title: Helm 安装 Kibana
date: 2023-10-30 16:30:34
categories:
  - elasticsearch
columns:
  -
---

# Helm 安装 Kibana

[官方文档](https://artifacthub.io/packages/helm/bitnami/kibana)

## 安装

需要[兼容 ES 版本](https://www.elastic.co/cn/support/matrix#matrix_compatibility)，这里使用 7.10.2

[bitnami 的 kibana 镜像地址](https://hub.docker.com/r/bitnami/kibana/tags?page=1&name=7.10.)，这里我上传到内网 harbor 仓库了。

```bash
helm upgrade --install my-release oci://registry-1.docker.io/bitnamicharts/kibana --set elasticsearch.hosts[0]=es-http.infra --set elasticsearch.port=9200 --set image.tag=7.10.2-debian-10-r340 --set image.registry=harbor.test.com --set image.repository=library/kibana --set livenessProbe.enabled=false --set service.type=NodePort --set service.nodePorts.http=30810 -n infra
```
