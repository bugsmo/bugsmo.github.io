---
order: 1
tags:
  - minio
title: minio 单机
date: 2023-11-13 17:04:13
categories:
  - minio
columns:
  -
---

# minio 单机

## License

最新版的 MinIO 使用 AGPL v3 开源协议

最后一个使用 Apache 2.0 协议的版本是 [21 年 4 月 22 日](https://github.com/minio/minio/tree/RELEASE.2021-04-22T15-44-28Z)发布的

## Docker 安装

1. 安装 21-04-22 的版本 minio

```bash
docker pull minio/minio:RELEASE.2021-04-22T15-44-28Z.hotfix.56647434e
```

2. 运行

```bash
# 将下面的变量按实际情况进行替换
# yourPort, docker映射的端口, e.g. 7500
# yourUsername, 账号, e.g. root
# yourPassword, 密码, e.g. root@123
# yourDataPath, 数据存储路径映射, e.g. /data/minio/data
# yourConfPath, 配置路径映射, e.g. /data/minio/conf
# 下面配置映射了容器内的时区配置，请确保时间正确，否则https请求可能出现签名不通过的错误

docker run -d -it \
--name minio -p yourPort:9000 \
-e MINIO_ACCESS_KEY=yourUsername \
-e MINIO_SECRET_KEY=yourPassword \
-e TZ=Asia/Shanghai \
-v /etc/localtime:/etc/localtime:ro \
-v /etc/timezone:/etc/timezone:ro \
-v yourDataPath:/data \
-v yourConfPath:/root/.minio \
minio/minio:RELEASE.2021-04-22T15-44-28Z.hotfix.56647434e server /data --address ":9000"
```

3. 安装 21-04-22 的版本 minio client (mc)

```bash
docker pull minio/mc:RELEASE.2021-04-22T17-40-00Z
```

4. 运行

```bash
docker run -d -it --name mc --entrypoint=/bin/sh minio/mc:RELEASE.2021-04-22T17-40-00Z
```

## 使用

http://ip:port 进入 web 端

![](https://assets.moweilong.com/img/minio-login.svg)

输入运行 docker 容器时设置的账号密码

![](https://assets.moweilong.com/img/minio-web.svg)

点击右下角加号创建桶

![](https://assets.moweilong.com/img/minio-create-bucket.svg)

点击右下角加号上传文件

![](https://assets.moweilong.com/img/minio-upload-file.svg)

## SSL

1. 准备好 SSL 证书

2. 使用 Nginx 将域名代理到配置的端口

```nginx
upstream minio_s3 {
  least_conn;
  server 127.0.0.1:yourtPort; # 端口
}

server {
    listen 80;
    listen 443 ssl http2;
    server_name yourDomain; # 你的域名
    ssl_certificate    /path/to/fullchain.pem;
    ssl_certificate_key    /path/to/privkey.pem;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    add_header Strict-Transport-Security "max-age=31536000";
    error_page 497  https://$host$request_uri;

    location ^~/ {
        proxy_pass https://minio_s3;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
        proxy_http_version 1.1;
    }
}
```

3. 进入 docker 容器设置的 MinIO 配置目录，里面有一个 certs 文件夹，将你的 SSL 证书公钥私钥都放进去，命名为 public.crt 和 private.key

如果公钥是 pem 格式，直接改后缀名就可以，最后 cert 目录结构如下

```bash
-rw-r--r--. 1 root root 4200 Dec 23  2022 public.crt
-rw-r--r--. 1 root root 1700 Dec 23  2022 private.key
drwx------. 2 root root    6 Nov 13 17:48 CAs
```

4. 重启服务

```bash
docker restart minio
```

## MinIO Client

mc 是 minio 的命令行管理工具，上面已经使用 Docker 安装

如果你的 minio 需要使用 https，请完成 ssl 配置后再回到这一章节

1. 进入容器内命令行

```bash
docker exec -it mc /bin/sh
```

2. 建立连接

```bash
mc config host add 随意命名 地址 用户名 密码
```

例如：

```bash
mc config host add my-minio https://oss.test.cn root root
```

成功后显示：Added 'my-minio' successfully.

mc 使用帮助

```bash
sh-4.4# mc -h
NAME:
  mc - MinIO 客户端用于云存储和文件系统。

USAGE:
  mc [FLAGS] COMMAND [COMMAND FLAGS | -h] [ARGUMENTS...]

COMMANDS:
  alias      在配置文件中设置、删除和列出别名
  ls         列出存储桶和对象
  mb         创建一个存储桶
  rb         删除一个存储桶
  cp         复制对象
  mirror     将对象同步到远程站点
  cat        显示对象内容
  head       显示对象的前 “n” 行
  pipe       将 STDIN 流传输到对象
  share      生成临时访问对象的 URL
  find       搜索对象
  sql        对对象运行 sql 查询
  stat       显示对象元数据
  mv         移动对象
  tree       使用树形状的格式显示存储桶和对象
  du         递归统计磁盘使用情况
  retention  为对象设置持有
  legalhold  管理对象的合法持有
  diff       列出两个存储桶之间对象名称、大小和日期的差异
  rm         删除对象
  version    管理存储桶版本控制
  ilm        管理存储桶生命周期
  encrypt    管理存储桶加密配置
  event      管理对象通知
  watch      监听对象通知事件
  undo       撤消 PUT/DELETE 操作
  policy     管理对存储桶和对象的匿名访问
  tag        管理存储桶和对象的标签
  replicate  配置服务器端存储桶复制
  admin      管理 MinIO 服务器
  update     将 mc 更新到最新版本

GLOBAL FLAGS:
  --autocompletion              为您的 shell 安装自动完成功能
  --config-dir value, -C value  配置文件夹的路径 (默认: "/root/.mc")
  --quiet, -q                   禁用进度条显示
  --no-color                    禁用颜色主题
  --json                        启用 JSON 行格式化输出
  --debug                       启用调试输出
  --insecure                    禁用 SSL 证书验证
  --help, -h                    显示帮助
  --version, -v                 打印版本
```

## 开发

[js](https://min.io/docs/minio/linux/developers/javascript/minio-javascript.html)
