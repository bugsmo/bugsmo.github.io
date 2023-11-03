---
order: 2
tags:
  - gitlab
---

# Prometheus 设置

## 自定义数据存储时长

发现系统磁盘告警了，通过排查确认是 gitlab 组件 prometheus 存储的数据过大导致。

决定修改数据存储时长，新增配置

```bash
vim /etc/gitlab/gitlab.rb

prometheus['flags'] = {
 'storage.tsdb.retention.time' => "7d",
}
```

应用配置，数据会自动清理。

```bash
gitlab-ctl reconfigure
```
