---
order: 998
tags: 
  - java
  - jasperreport
title: jasperreport 生成 pdf 报错
date: 2023-11-03 11:04:45
categories: 
  - java
columns: 
  - 
---

# jasperreport 生成 pdf 报错

## Error loading font

背景：java 服务容器化部署，服务运行中报错：

```bash
net.sf.jasperreports.engine.fonts.InvalidFontException: Error loading font "net/sf/jasperreports/fonts/dejavu/DejaVuSans.ttf".
```

排查过程：查看 git 提交记录，前几天为了使用 jdk 的一些工具，更换了 Dockerfile 的基础镜像：

- 旧镜像：harbor.example.cn/library/jre:8u271
- 新镜像：harbor.example.cn/library/openjdk:8-jdk-alpine-tini

原因：新基础镜像缺失了很多字体。

解决：改回原有镜像重新打包发布，测试功能正常使用。
