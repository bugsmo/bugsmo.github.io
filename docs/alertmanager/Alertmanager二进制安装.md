---
tags:
  - alertmanager
order: 1
title: Alertmanager 二进制安装
date: 2023-10-25 11:14:26
categories:
  - alertmanager
columns:
  -
---

# Alertmanager 二进制安装

## 下载

由于 alertmanager 是一个独立的二进制文件，可以直接从 [Prometheus 下载页面](https://prometheus.io/download/#alertmanager) 下载解压运行：

```bash
# 下载
VERSION=0.26.0

wget https://github.com/prometheus/alertmanager/releases/download/v${VERSION}/alertmanager-${VERSION}.linux-amd64.tar.gz

# 国内加速可以使用下面的命令下载
wget https://ghproxy.com/https://github.com/prometheus/alertmanager/releases/download/v${VERSION}/alertmanager-${VERSION}.linux-amd64.tar.gz

# 解压
tar xf alertmanager-${VERSION}.linux-amd64.tar.gz

mv alertmanager-${VERSION}.linux-amd64/ /data/alertmanager
```

## systemd 管理

我们是直接在宿主机上运行的，我们可以用 systemd 来管理，创建一个如下所示的 service unit 文件：

```bash
cat >/etc/systemd/system/alertmanager.service<<\EOF
[Unit]
Description=Prometheus: the alerting system
Documentation=http://prometheus.io/docs/
After=prometheus.service

[Service]
ExecStart=/data/alertmanager/alertmanager --config.file=/data/alertmanager/alertmanager.yml
Restart=always
StartLimitInterval=0
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

然后就可以使用 systemd 来管理 alertmanager 了：

```bash
systemctl daemon-reload

systemctl enable alertmanager --now

systemctl status alertmanager
```

## 简化版快速安装

```bash
# 下载
VERSION=0.26.0

# 国内加速可以使用下面的命令下载
wget https://ghproxy.com/https://github.com/prometheus/alertmanager/releases/download/v${VERSION}/alertmanager-${VERSION}.linux-amd64.tar.gz
# 解压
tar xf alertmanager-${VERSION}.linux-amd64.tar.gz
mv alertmanager-${VERSION}.linux-amd64/ /data/alertmanager

cat >/etc/systemd/system/alertmanager.service<<\EOF
[Unit]
Description=Prometheus: the alerting system
Documentation=http://prometheus.io/docs/
After=prometheus.service

[Service]
ExecStart=/data/alertmanager/alertmanager --config.file=/data/alertmanager/alertmanager.yml
Restart=always
StartLimitInterval=0
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable alertmanager --now
systemctl status alertmanager
```

## 邮箱通知配置参考

配置参考

```yaml
global:
  resolve_timeout: 5m
  smtp_from: "xxx@163.com"
  smtp_smarthost: "smtp.163.com:465"
  smtp_auth_username: "xxx@163.com"
  smtp_auth_password: "xxx"
  smtp_require_tls: false
templates:
  - "/data/alertmanager/email.tmpl"
route:
  group_by: ["alertname"]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 1h
  receiver: "email"
receivers:
  - name: "email"
    email_configs:
      - to: "xx@xx.com"
        send_resolved: true
        html: '{{template "email-monitor.html" . }}' #这里为下方 email.tmpl 自定义的邮箱模板
inhibit_rules:
  - source_match:
      severity: "critical"
    target_match:
      severity: "warning"
    equal: ["alertname", "dev", "instance"]
```

重启服务

```bash
systemctl restart alertmanager
```

## 邮箱通知模版

### 自定义邮件通知模版

待调试，value 没值。

```js
{{ define "email-monitor.html" }}
    {{- if gt (len .Alerts.Firing) 0 -}}
    <h1>告警</h1>
    <table border="5">
        <tr>
            <td>报警项</td>
            <td>实例</td>
            <td>报警详情</td>
            <td>报警阀值</td>
            <td>开始时间</td>
        </tr>
        {{ range $i, $alert := .Alerts }}
            <tr><td>{{ index $alert.Labels "alertname" }}</td>
                <td>{{ index $alert.Labels "instance" }}</td>
                <td>{{ index $alert.Annotations "description" }}</td>
                <td>{{ index $alert.Value "value" }}</td>
                <td>{{ $alert.StartsAt.Format "2006-01-02 15:04:05" }}</td>
            </tr>
        {{ end }}
    </table>
    {{ end }}
    {{- if gt (len .Alerts.Resolved) 0 -}}
    <h1>恢复</h1>
    <table border="5">
        <tr>
            <td>报警项</td>
            <td>实例</td>
            <td>报警详情</td>
            <td>报警阀值</td>
            <td>开始时间</td>
        </tr>
        {{ range $i, $alert := .Alerts }}
            <tr>
                <td>{{ index $alert.Labels "alertname" }}</td>
                <td>{{ index $alert.Labels "instance" }}</td>
                <td>{{ index $alert.Annotations "description" }}</td>
                <td>{{ index $alert.Annotations "value" }}</td>
                <td>{{ $alert.StartsAt.Format "2006-01-02 15:04:05" }}</td>
            </tr>
        {{ end }}
    </table>
    {{ end }}{{- end }}
```

### 官方邮件通知模版

[Github 地址](https://github.com/prometheus/alertmanager/blob/main/template/email.tmpl)

- `email.default.subject` 是标题
- `email.default.html` 模板，分组集合告警。

## Webhooks

### 钉钉通知配置参考

alertmanager 不支持钉钉通知，通过[第三方 webhook](https://github.com/bugsmo/infra-prometheus-webhook)实现钉钉通知，需要自行按照文档部署 webhook 服务。

- `http://127.0.0.1:8099/alerts/dingtalk/p0` 自己部署的 webhook 服务地址

```yaml
global:
  resolve_timeout: 5m
route:
  group_by: ["alertname"]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 1h
  receiver: "default-receiver_web.hook"
receivers:
  - name: "default-receiver_web.hook"
    webhook_configs:
      - url: "http://127.0.0.1:8099/alerts/dingtalk/p0"
inhibit_rules:
  - source_match:
      severity: "critical"
    target_match:
      severity: "warning"
    equal: ["alertname", "dev", "instance"]
```
