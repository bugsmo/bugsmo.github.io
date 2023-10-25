---
order: 1
tags:
  - nginx
columns:
  - null
title: Nginx WebSocket 配置
date: 2023-10-23 14:55:59
categories:
  - sre
  - nginx
---

# Nginx WebSocket 配置

HTTP 是基于 TCP 的，通过 TCP 收发的消息用 HTTP 的应用层协议解析。WebSocket 是首先通过 HTTP 协议把 TCP 连接建立好，然后通过 Upgrade 字段进行协议转换，在收到服务器的 101 Switching Protocols 应答之后，后续的 TCP 消息就通过 WebSocket 协议解析。

## Nginx 开启 WebSocket

编辑 nginx.conf，在 http 区域内一定要添加下面配置：

```conf
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}
```

解释一下 map 指令的作用：该作用主要是根据客户端请求中的值，来构造改变 connection_upgrade 的值，即根据变量的值创建新的变量 connection_upgrade，创建的规则就是{}里面的东西。其中的规则没有做匹配，因此使用默认的，即 http_upgrade 为空字符串的话，那么值就是 close。

编辑 vhosts 下虚拟主机的配置文件，在 location 匹配配置中添加如下内容：

```conf
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "$connection_upgrade";
# proxy_set_header Connection "Upgrade"; 写死为 Upgrade 也可以
```

::: tip
默认情况下，如果代理服务器在 60 秒内没有传输任何数据，连接将被关闭。可以使用 proxy_read_timeout 指令增加此超时 。
:::

## Nginx 代理 webSocket 保持长连接

这个问题在于 nginx 的配置上，需要配置几个超时的设置。如下：

```conf
http {
    server {
        location / {
            root   html;
            index  index.html index.htm;
            proxy_pass http://sre_backend;
            proxy_http_version 1.1;
            proxy_connect_timeout 5s;
            proxy_read_timeout 60s;
            proxy_send_timeout 30s;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "$connection_upgrade";
        }
    }
}
```

`proxy_read_timeout` 参数默认值 60 秒,该指令设置与代理服务器的读超时时间。它决定了 nginx 会等待多长时间来获得请求的响应。这个时间不是获得整个 response 的时间，而是两次 reading 操作的时间。即是服务器对你等待最大的时间，也就是说当你使用 nginx 转发 webSocket 的时候，如果 60 秒内没有通讯，依然是会断开的，所以，你可以按照你的需求来设定。比如说，我设置了 5 分钟，那么如果我 5 分钟内有通讯，或者 5 分钟内有做心跳的话，是可以保持连接不中断的。所以这个时间是看你的业务需求来调整时间长短的。

`proxy_send_timeout` 参数默认值 60s,设置了发送请求给 upstream 服务器的超时时间。超时设置不是为了整个发送期间，而是在两次 write 操作期间。如果超时后，upstream 没有收到新的数据，nginx 会关闭连接。
