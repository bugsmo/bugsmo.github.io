---
order: 7
tags: 
  - du
title: du 命令使用
date: 2023-11-07 15:19:08
categories: 
  - linux
columns: 
  - 
---

# du 命令使用

## 统计第一级目录大小&排除指定目录

`–max-depth=n` 表示查询的最大层数（n），当前目录为 0 层，下级目录为 1 层，以此类推；此命令也可以使用 `-d n`（n 为层数）
`--exclude=n` 统计除 n 以外的所有文件及目录。

```bash
du -h --max-depth=1 ./ --exclude="release" --exclude="snapshot"
```

等同于

```bash
du -h -d 1 ./ --exclude="release" --exclude="snapshot"
```
