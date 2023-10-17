---
order: 1
date: 2023-10-17 17:12:03
tags:
  - gitlab
columns:
  - gitlab
categories:
  - sre
  - gitlab
title: Node_exporter 提供外部 Prometheus 使用
---

# Node_exporter 提供外部 Prometheus 使用

## 修改配置

编辑配置文件 `/etc/gitlab/gitlab.rb`

```rb
# 搜索 node_exporter
node_exporter['listen_address'] = '0.0.0.0:9100'
```

```bash
gitlab-ctl reconfigure
```
