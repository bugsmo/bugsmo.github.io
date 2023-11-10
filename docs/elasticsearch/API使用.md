---
order: 3
tags:
  - elasticsearch基础
title: API 使用
date: 2023-10-30 16:41:56
categories:
  - elasticsearch
columns:
  -
---

# API 使用

## 前言

本文示例以 ElasticSearch 7.10.2 版本搭建了 demo 集群来演示，更详细的 API 参数及用法请参考官方文档。测试命令我用的是 Kibana，在输入时会有命令和语法错误提示，可直接复制 CURL 格式、格式化、查看文档，点击导航栏上面的 help，也提供了一些快捷方式，方便学习。

![dev tools](https://assets.moweilong.com/img/20231031150625.png)

API 测试参考：

- [Elasticsearch 7.10 REST APIs](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/rest-apis.html)

## 查看（Cat） API

ES cat 命令是监控 ES 的节点，内存，索引，分片，集群状态等一些基本信息。

```bash
GET /_cat/<some>

路径参数：
  <some>
  	（必需，字符串）节点，内存，索引，分片，集群状态等一些基本信息
请求参数：
  v: 显示详细的查询结果。
  help: 帮助了解cat 相关指令支持哪些功能，返回参数第一列显示完整的名称，第二列显示缩写，第三列提供了关于这个参数的简介。
  h: 指定字段输出。
```

### 查看节点信息

dev tools 方式执行

```json
GET /_cat/nodes?v

ip             heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
10.233.74.25             32          59   3    1.45    1.02     1.03 imr       -      es-master-2
10.233.74.142            12          59   4    1.45    1.02     1.03 dir       -      es-data-simple-3
10.233.75.183             3          79   4    1.76    1.97     2.21 dir       -      es-data-simple-0
10.233.112.169           24          55  20    8.79    8.75     9.41 dir       -      es-data-simple-2
10.233.77.87             39          59   1    0.55    0.50     0.55 imr       -      es-master-1
10.233.77.88             18          92   1    0.55    0.50     0.55 dir       -      es-data-simple-1
10.233.75.185            36          60   4    1.76    1.97     2.21 imr       *      es-master-0
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cat/nodes?v"
```

::: tip
IP：（默认）IP 地址
heap.percent：（默认）最大配置堆数
ram.percent：（默认）已用内存总百分比
:::

返回结果：堆内存，内存，cpu 百分比， 最近 1,5,15 分钟 节点的负载，显示主节点（ \* 标记主节点），节点名等信息。

### 查看各节点机器存储信息

dev tools 方式执行

```json
GET /_cat/allocation?v

shards disk.indices disk.used disk.avail disk.total disk.percent host           ip             node
    32        1.8gb    44.7tb     11.1tb     55.8tb           80 10.233.74.142  10.233.74.142  es-data-simple-3
    40        3.4gb    44.7tb     11.1tb     55.8tb           80 10.233.77.88   10.233.77.88   es-data-simple-1
     1       42.2kb    44.7tb     11.1tb     55.8tb           80 10.233.112.169 10.233.112.169 es-data-simple-2
    36        1.7gb    44.7tb     11.1tb     55.8tb           80 10.233.75.183  10.233.75.183  es-data-simple-0
     8                                                                                         UNASSIGNED
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cat/allocation?v"
```

返回结果：节点分片数，索引占用磁盘大小，磁盘已使用容量大小，磁盘可用容量大小，磁盘总容量大小，磁盘使用率等节点信息。

### 查询索引信息

dev tools 方式执行

```json
GET /_cat/indices?v

health status index                         uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   demo-index                    _Cr0_eLDSN-_8naHNSZ_MA   5   2          0            0      4.1kb          1.3kb
green  open   sw_log-20231030               YPd9l9Z7R2y-jJcKRBkxgQ   5   0          0            0      1.3kb          1.3kb
green  open   sw_zipkin_span-20231030       rD4W-MsiSH2T6hM5DzjTBA   5   0          0            0      1.3kb          1.3kb
green  open   sw_metrics-all-20231026       gGHhLA0sS_2FWRHPRCXGtQ   1   1    1769643        83012      820mb          410mb
green  open   sw_metrics-all-20231027       0pg83gZeSSasOcunuHW1Sw   1   1    3013999       456750      1.1gb        574.4mb
green  open   sw_metrics-all-20231028       ughbEWDsT6CAE9doFjdKuA   1   1    3000642      1328161      1.2gb        642.2mb
green  open   sw_metrics-all-20231029       bQHa8hK4RquJhKfqDEsvIQ   1   1    3000327      1016008      1.1gb        607.6mb
green  open   sw_ui_template                TcWeSgCWSDuKQheyRxMn4w   1   1         46            0    579.7kb        289.8kb
green  open   sw_browser_error_log-20231029 MhGb1KEbQIO6Om9zJArFHQ   5   0          0            0      1.3kb          1.3kb
red    open   sw_browser_error_log-20231028 R-zgyBnETcGl_AOWNHhT0Q   5   0          0            0       849b           849b
green  open   sw_segment-20231030           o2B_RMrsSHinoEwTHEvVPg   5   0     670910            0      423mb          423mb
green  open   sw_records-all-20231030       3dTEON3XTTuW-wxc7C2Bng   1   1        464            0    564.6kb        227.1kb
red    open   sw_log-20231028               zmp5QuoeSjiTBt-JjbX9bA   5   0          0            0      1.1kb          1.1kb
green  open   sw_log-20231029               yh8XDu3sTryzX-DVrZ8HXg   5   0          0            0      1.3kb          1.3kb
green  open   sw_records-all-20231028       1PSAQA_bTLSrTRZaz356ag   1   1        971            0    704.8kb        333.8kb
green  open   sw_records-all-20231029       TUbO6DDUSsixnbweaYMvZQ   1   1        825            0      547kb        273.5kb
green  open   sw_browser_error_log-20231030 YnEmFfjUQIi-2GZ4foIICQ   5   0          0            0      1.3kb          1.3kb
green  open   .kibana_1                     _6BpVrmVRMCUfTkpzbZbUg   1   1         24            0     58.6kb         29.3kb
green  open   sw_zipkin_span-20231029       xyYmXViwTX6UOHpnPjQp8A   5   0          0            0      1.3kb          1.3kb
red    open   sw_zipkin_span-20231028       G9jvfl6KSJuc5ofaRR9F6A   5   0          0            0      1.1kb          1.1kb
red    open   sw_segment-20231028           uLJSqV6nRHe9ruKNazpIEQ   5   0    1337928            0    801.5mb        801.5mb
green  open   sw_segment-20231029           sQ7GO2mOTN-2PlarKVbrXA   5   0    1683395            0        1gb            1gb
green  open   sw_metrics-all-20231030       73gCoQZ_RZWZSpOzCbIJew   1   1    1358265       841906    644.6mb        317.9mb
red    open   demo-index3                   LvEXHv26R_KN2GZzoeycQA   6   0          0            0      1.3kb          1.3kb
red    open   demo-index2                   sBhlncuUR8G3WhHdbU71TA   6   0          0            0      1.1kb          1.1kb
green  open   demo-index1                   AKSwbUMjSgWhFnIsS7Y-mw   5   1          0            0      2.7kb          1.3kb
```

返回结果：索引的健康状态，索引名，索引主分片，副本大小，文档数，被删除文档数，索引主分片，副本，总占用存储空间。

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cat/indices?v"
```

### 查询分片信息

dev tools 方式执行

```json
GET /_cat/shards?v

index                         shard prirep state         docs   store ip             node
sw_segment-20231031           3     p      STARTED     145202  69.6mb 10.233.112.169 es-data-simple-2
sw_segment-20231031           1     p      STARTED     145119  69.6mb 10.233.112.169 es-data-simple-2
sw_segment-20231031           2     p      STARTED     145341  69.2mb 10.233.112.169 es-data-simple-2
sw_segment-20231031           4     p      STARTED     145578  69.6mb 10.233.112.169 es-data-simple-2
sw_segment-20231031           0     p      STARTED     145409  69.2mb 10.233.112.169 es-data-simple-2
sw_ui_template                0     r      STARTED         46 289.8kb 10.233.75.183  es-data-simple-0
sw_ui_template                0     p      STARTED         46 289.8kb 10.233.77.88   es-data-simple-1
sw_segment-20231030           3     p      STARTED     211043  89.8mb 10.233.77.88   es-data-simple-1
sw_segment-20231030           1     p      STARTED     210257    94mb 10.233.74.142  es-data-simple-3
sw_segment-20231030           2     p      STARTED     210459  75.3mb 10.233.75.183  es-data-simple-0
sw_segment-20231030           4     p      STARTED     211316    94mb 10.233.74.142  es-data-simple-3
sw_segment-20231030           0     p      STARTED     209587    75mb 10.233.77.88   es-data-simple-1
sw_records-all-20231029       0     p      STARTED        825 273.5kb 10.233.75.183  es-data-simple-0
sw_records-all-20231029       0     r      STARTED        825 273.5kb 10.233.77.88   es-data-simple-1
sw_metrics-all-20231027       0     p      STARTED    3013999 576.1mb 10.233.75.183  es-data-simple-0
sw_metrics-all-20231027       0     r      STARTED    3013999 576.1mb 10.233.77.88   es-data-simple-1
sw_log-20231030               3     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_log-20231030               1     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_log-20231030               2     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
sw_log-20231030               4     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_log-20231030               0     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
demo-index1                   3     r      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index1                   3     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
demo-index1                   1     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
demo-index1                   1     r      STARTED          0    283b 10.233.77.88   es-data-simple-1
demo-index1                   2     r      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index1                   2     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
demo-index1                   4     r      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index1                   4     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
demo-index1                   0     r      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index1                   0     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_metrics-all-20231028       0     r      STARTED    3000642 606.2mb 10.233.74.142  es-data-simple-3
sw_metrics-all-20231028       0     p      STARTED    3000642 642.2mb 10.233.77.88   es-data-simple-1
sw_metrics-all-20231030       0     r      STARTED    2070495 375.7mb 10.233.75.183  es-data-simple-0
sw_metrics-all-20231030       0     p      STARTED    2070495 410.9mb 10.233.77.88   es-data-simple-1
sw_browser_error_log-20231029 3     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_browser_error_log-20231029 1     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_browser_error_log-20231029 2     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
sw_browser_error_log-20231029 4     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_browser_error_log-20231029 0     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_zipkin_span-20231029       3     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_zipkin_span-20231029       1     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
sw_zipkin_span-20231029       2     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_zipkin_span-20231029       4     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
sw_zipkin_span-20231029       0     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
.kibana_1                     0     r      STARTED         18  31.7kb 10.233.74.142  es-data-simple-3
.kibana_1                     0     p      STARTED         18  31.7kb 10.233.112.169 es-data-simple-2
sw_metrics-all-20231031       0     r      STARTED    1193564 378.6mb 10.233.74.142  es-data-simple-3
sw_metrics-all-20231031       0     p      STARTED    1193564 378.5mb 10.233.112.169 es-data-simple-2
sw_records-all-20231030       0     p      STARTED        554 231.5kb 10.233.75.183  es-data-simple-0
sw_records-all-20231030       0     r      STARTED        554 231.5kb 10.233.77.88   es-data-simple-1
sw_records-all-20231031       0     r      STARTED        523 237.3kb 10.233.74.142  es-data-simple-3
sw_records-all-20231031       0     p      STARTED        523 253.1kb 10.233.112.169 es-data-simple-2
demo-index                    3     r      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index                    3     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
demo-index                    3     r      STARTED          0    283b 10.233.77.88   es-data-simple-1
demo-index                    1     r      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index                    1     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
demo-index                    1     r      STARTED          0    283b 10.233.77.88   es-data-simple-1
demo-index                    2     r      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index                    2     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
demo-index                    2     r      STARTED          0    283b 10.233.77.88   es-data-simple-1
demo-index                    4     r      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index                    4     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
demo-index                    4     r      STARTED          0    283b 10.233.77.88   es-data-simple-1
demo-index                    0     r      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index                    0     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
demo-index                    0     r      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_segment-20231029           3     p      STARTED     335997 205.9mb 10.233.77.88   es-data-simple-1
sw_segment-20231029           1     p      STARTED     336963 206.3mb 10.233.74.142  es-data-simple-3
sw_segment-20231029           2     p      STARTED     336714 206.7mb 10.233.75.183  es-data-simple-0
sw_segment-20231029           4     p      STARTED     337109   207mb 10.233.74.142  es-data-simple-3
sw_segment-20231029           0     p      STARTED     336612 205.9mb 10.233.77.88   es-data-simple-1
sw_metrics-all-20231026       0     p      STARTED    1769643 446.1mb 10.233.75.183  es-data-simple-0
sw_metrics-all-20231026       0     r      STARTED    1769643 446.2mb 10.233.77.88   es-data-simple-1
sw_browser_error_log-20231030 3     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_browser_error_log-20231030 1     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
sw_browser_error_log-20231030 2     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_browser_error_log-20231030 4     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
sw_browser_error_log-20231030 0     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_zipkin_span-20231030       3     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_zipkin_span-20231030       1     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_zipkin_span-20231030       2     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
sw_zipkin_span-20231030       4     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_zipkin_span-20231030       0     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
demo-index3                   3     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
demo-index3                   5     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index3                   1     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
demo-index3                   2     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index3                   4     p      UNASSIGNED
demo-index3                   0     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_metrics-all-20231029       0     r      STARTED    3000327 565.2mb 10.233.74.142  es-data-simple-3
sw_metrics-all-20231029       0     p      STARTED    3000327 607.6mb 10.233.77.88   es-data-simple-1
demo-index2                   3     p      UNASSIGNED
demo-index2                   5     p      UNASSIGNED
demo-index2                   1     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
demo-index2                   2     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
demo-index2                   4     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
demo-index2                   0     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_zipkin_span-20231031       3     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_zipkin_span-20231031       1     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_zipkin_span-20231031       2     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_zipkin_span-20231031       4     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_zipkin_span-20231031       0     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_log-20231029               3     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_log-20231029               1     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_log-20231029               2     p      STARTED          0    283b 10.233.74.142  es-data-simple-3
sw_log-20231029               4     p      STARTED          0    283b 10.233.77.88   es-data-simple-1
sw_log-20231029               0     p      STARTED          0    283b 10.233.75.183  es-data-simple-0
sw_log-20231031               3     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_log-20231031               1     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_log-20231031               2     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_log-20231031               4     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_log-20231031               0     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_browser_error_log-20231031 3     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_browser_error_log-20231031 1     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_browser_error_log-20231031 2     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_browser_error_log-20231031 4     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
sw_browser_error_log-20231031 0     p      STARTED          0    208b 10.233.112.169 es-data-simple-2
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cat/shards?v"
```

返回结果：索引名称，分片序号，主副分片标志，该分片存储空间，分片存储的文档数，分片所属节点 ip，节点名。

### 查询集群健康状态

dev tools 方式执行

```json
GET /_cat/health?v

epoch      timestamp cluster    status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1698716422 01:40:22  es-cluster red             7         4    116  90    0    0        3             0                  -                 97.5%
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cat/health?v"
```

返回结果：集群名称，集群状态，节点数，数据节点数，分片数，主分片数，激活的分片百分比（active_shards_percent）。

### 查询集群所有的别名索引

dev tools 方式执行

```json
GET /_cat/aliases?v

alias                index                         filter routing.index routing.search is_write_index
sw_browser_error_log sw_browser_error_log-20231031 -      -             -              -
sw_metrics-all       sw_metrics-all-20231031       -      -             -              -
sw_log               sw_log-20231029               -      -             -              -
sw_browser_error_log sw_browser_error_log-20231029 -      -             -              -
sw_segment           sw_segment-20231030           -      -             -              -
sw_records-all       sw_records-all-20231030       -      -             -              -
sw_metrics-all       sw_metrics-all-20231026       -      -             -              -
sw_metrics-all       sw_metrics-all-20231028       -      -             -              -
.kibana              .kibana_1                     -      -             -              -
sw_zipkin_span       sw_zipkin_span-20231030       -      -             -              -
sw_segment           sw_segment-20231029           -      -             -              -
sw_records-all       sw_records-all-20231029       -      -             -              -
sw_log               sw_log-20231030               -      -             -              -
sw_zipkin_span       sw_zipkin_span-20231029       -      -             -              -
sw_log               sw_log-20231031               -      -             -              -
sw_metrics-all       sw_metrics-all-20231027       -      -             -              -
sw_zipkin_span       sw_zipkin_span-20231031       -      -             -              -
sw_metrics-all       sw_metrics-all-20231029       -      -             -              -
sw_metrics-all       sw_metrics-all-20231030       -      -             -              -
sw_records-all       sw_records-all-20231031       -      -             -              -
sw_browser_error_log sw_browser_error_log-20231030 -      -             -              -
sw_segment           sw_segment-20231031           -      -             -              -
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cat/aliases?v"
```

### 查询主节点信息

dev tools 方式执行

```json
GET /_cat/master?v

id                     host          ip            node
suKruSkNR0OoQCcv4SgEOQ 10.233.75.185 10.233.75.185 es-master-0
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cat/master?v"
```

### 查询文档数量

快速查询当前整个集群或者指定索引的 document 的数量（不包括删除的但是还没有清理掉的 document）。
dev tools 方式执行

```json
GET /_cat/count?v

#! Deprecation: this request accesses system indices: [.kibana_1], but in a future major version, direct access to system indices will be prevented by default
epoch      timestamp count
1698717037 01:50:37  17580496
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cat/count?v"
```

## 集群（Cluster） API

### 集群健康

获取集群的健康状态有两种方式：

语法：

```bash
GET /_cluster/health/<target>

路径参数：
  <target>
	（可选，字符串） 用于限制的数据流、索引和索引别名的逗号分隔列表 请求。支持通配符表达式 （）。*
	要定位集群中的所有数据流和索引，请省略此参数或使用 或 。_all*
```

dev tools 方式执行

```json
GET /_cluster/health

{
  "cluster_name" : "es-cluster",  // 集群名，默认elasticsearch
  "status" : "red",               // 集群状态
  "timed_out" : false,  // 是否超时
  "number_of_nodes" : 7, // 节点数量
  "number_of_data_nodes" : 4, // 数据节点数量
  "active_primary_shards" : 90, // 活动主分片的数量
  "active_shards" : 116, // 活动主分片和副本分片的总数
  "relocating_shards" : 0, // 正在重新定位的分片数
  "initializing_shards" : 0, // 正在初始化的分片数
  "unassigned_shards" : 3,  // 未分配的分片数
  "delayed_unassigned_shards" : 0,  // 分配延迟的分片数量 超时设置
  "number_of_pending_tasks" : 0, // 尚未更改的群集级别更改数 执行
  "number_of_in_flight_fetch" : 0, // 未完成的读取数
  "task_max_waiting_in_queue_millis" : 0, // 自最早启动任务以来以毫秒为单位表示的时间 正在等待执行
  "active_shards_percent_as_number" : 97.47899159663865 // 集群中活动分片的比率，以百分比表示
}
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cluster/health"
```

### 集群状态

返回用于调试或诊断问题的集群内部状态的信息。

语法：

```bash
GET /_cluster/state/<metrics>/<target>

路径参数：
  <metrics>
	（可选，字符串）以下选项的逗号分隔列表：

	_all
		显示所有指标。
	blocks
		显示响应的一部分。blocks
	master_node
		显示响应的一部分。master_node
	metadata
		显示响应的一部分。如果提供逗号分隔 索引列表，返回的输出将仅包含这些索引的元数据 指标。metadata
	nodes
		显示响应的一部分。nodes
	routing_nodes
		显示响应的一部分。routing_nodes
	routing_table
		显示响应的一部分。如果您提供逗号 分离的索引列表，返回的输出将仅包含 这些索引的路由表。routing_table
	version
		显示群集状态版本。
  <target>
	（可选，字符串）数据流、索引和别名的逗号分隔列表 用于限制请求。支持通配符 （）。以所有数据流为目标 和索引，省略此参数或使用或 .**_all
```

dev tools 方式执行

```json
//请求：
GET /_cluster/state
//返回：
{
  "cluster_name" : "es-cluster", // 集群名
  "cluster_uuid" : "OeBtrse_SceonjeeG0jdvQ", // 集群ID
  "version" : 834, // state命令版本
  "state_uuid" : "9Zvo5zEcQ8iysDfoI9utDQ", // state ID
  "master_node" : "suKruSkNR0OoQCcv4SgEOQ", // 主节点ID
  "blocks" : { }, // 系统限制信息，响应的blocks部分
  "nodes" : {}, // 节点信息
  "metadata" : {} // 元数据信息，响应的metadata部分。如果提供了路径参数index，则只返回指定索引的metadata信息
}

//请求：
GET /_cluster/state/nodes
//返回：
{
  "cluster_name" : "es-cluster", // 集群名
  "cluster_uuid" : "OeBtrse_SceonjeeG0jdvQ", // 集群ID
  "nodes" : { // 节点信息
    "t0XLPQ3mRCyXcNR5dpf2SQ" : { // 节点ID
      "name" : "es-data-simple-1", // 节点名
      "ephemeral_id" : "7V5xIKxWS9mX9DVvW69uRQ", // 临时ID
      "transport_address" : "10.233.77.88:9300", // 节点之间的通讯地址
      "attributes" : { // 属性
        "group" : "simple" // 分组
      }
    },
  }
}
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cluster/state"

curl -XGET "http://es-http.infra:9200/_cluster/state/nodes"
```

### 节点信息

返回集群节点信息。

```bash
GET /_nodes
GET /_nodes/<node_id>
GET /_nodes/<metric>
GET /_nodes/<node_id>/<metric>

路径参数：
  <metric>
	（可选，字符串） 将返回的信息限制为特定指标。支持 逗号分隔的列表，例如 。http,ingest

的有效值<metric>
	aggregations
		有关可用聚合类型的信息。
	http
		有关此节点的 HTTP 接口的信息。
	indices
		与索引相关的节点级配置：
			total_indexing_buffer：此节点上索引缓冲区的最大大小。
	ingest
		有关引入管道和处理器的信息。
	jvm
		JVM 信息，包括其名称、版本和配置。
	os
		操作系统信息，包括其名称和版本。
	plugins
		有关每个节点安装的插件和模块的详细信息。以下 每个插件和模块都有可用的信息：
			name：插件名称
			version：插件构建的 Elasticsearch 版本
			description：插件用途的简短描述
			classname：插件入口点的完全限定类名
			has_native_controller：插件是否具有本机控制器 过程
	process
		进程信息，包括数字进程 ID。
	settings
		列出文件中定义的所有正在使用的节点设置。elasticsearch.yml
	thread_pool
		有关每个线程池的配置的信息。
	transport
		有关节点的传输接口的信息。
		如果您使用此 API 的完整形式，那么您 还可以请求指标以检索所有指标，或者您可以请求 用于抑制所有指标并仅检索 节点。GET /_nodes/<node_id>/<metric>_all_none

  <node_id>
	（可选，字符串）以逗号分隔的节点 ID 或名称列表，用于限制 返回的信息。
```

dev tools 方式执行

```json
//请求：
GET /_nodes
//返回：
{
  "_nodes" : { // 节点数量信息
    "total" : 7, // 节点数量
    "successful" : 7, // 正常节点数量
    "failed" : 0 // 错误节点数量
  },
  "cluster_name" : "es-cluster", // 集群名
  "nodes" : { // 节点信息
    "suKruSkNR0OoQCcv4SgEOQ" : {
      "name" : "es-master-0",
      "transport_address" : "10.233.75.185:9300",
      "host" : "10.233.75.185",
      "ip" : "10.233.75.185",
      "version" : "7.10.2",
      "build_flavor" : "oss",
      "build_type" : "docker",
      "build_hash" : "747e1cc71def077253878a59143c1f785afa92b9",
      "total_indexing_buffer" : 50331648,
      "roles" : [                       //      节点角色，没有设置默认所有角色
        "ingest",                       //      预处理节点
        "master",                       //      主节点
        "remote_cluster_client"         //      跨集群客户端节点
      ],
      "settings": {},					//  	节点设置
      "os": {},						    //  	操作系统信息
      "process": {},					//  	进程信息
      "jvm": {},						//  	JVM 信息
      "thread_pool": {},				//  	线程池配置信息
      "transport": {},				    //  	节点传输接口信息
      "http": {},					    //  	节点 HTTP 接口信息
      "plugins": {},					//  	节点安装的插件和模块的详细信息
      "modules": {},					//      节点的模块信息
      "ingest": {},					    //  	有关引入管道和处理器的信息
      "aggregations": {}				//  	有关可用聚合类型的信息
    }
  }
}
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_nodes"
```

## 索引（Index） API

### 索引是否存在

语法：

```bash
HEAD <index>
```

dev tools 方式执行

```json
//请求：
HEAD test

//存在返回：
200 - OK

//不存在返回：
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "404 - Not Found"
}
```

命令行方式执行

```bash
curl -XHEAD "http://es-http.infra:9200/test"
```

### 创建索引

没有索引前，第一次创建文档的时候也会创建索引。

语法：

```bash
PUT <index>
{
  "aliases": {},	# 别名
  "mappings": {},	# 映射
  "settings": {},	# 配置
}

路径参数：
  <index>
	（必需，字符串）要创建的索引的名称。

请求体：
  <aliases>
	（可选，对象的对象）索引的别名。
  <mappings>
	（可选，映射对象）索引中字段的映射。如果 指定时，此映射可以包括：
		字段名称
		字段数据类型
		映射参数
  <settings>
    （可选，索引设置对象）配置 索引的选项。
```

:::tip
请参阅 [映射](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/mapping.html)

请参阅[索引设置](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/index-modules.html#index-modules-settings)
:::

索引名称必须满足以下条件：

- 仅小写
- 不能包含 \， /，\*，?， "，<，>，|， (空格)，,，#
- 7.0 之前的索引可能包含 : ，但该冒号已弃用，在 7.0+ 中不受支持
- 不能以 \_ ，-，+ 开头
- 不能是 . 或 ..
- 不能超过 255 字节（请注意它是字节，因此多字节字符将更快地计入 255 限制）
- 以 . 开头的名称已被弃用，隐藏索引和插件管理的内部索引除外.

dev tools 方式执行

```json
//请求：
PUT test
//返回：
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "index" : "test"
}

//请求：
GET test
//返回：
{
  "test" : {
    "aliases" : { },
    "mappings" : { },
    "settings" : {
      "index" : {
        "creation_date" : "1698719350111",
        "number_of_shards" : "1",
        "number_of_replicas" : "1",
        "uuid" : "R1ZIwc64QVyIMekFiJILrw",
        "version" : {
          "created" : "7100299"
        },
        "provided_name" : "test"
      }
    }
  }
}
```

命令行方式执行

```bash
curl -XPUT "http://es-http.infra:9200/test"

curl -XGET "http://es-http.infra:9200/test"
```

创建索引时有三个重要的参数：aliases，mappings，settings。

**aliases**

ES 的 aliases（别名） 就类似数据库的视图，我们为索引 test 创建一个别名 test_alias，这样我们对 test_alias 的操作就像对 test 的操作一样。

dev tools 方式执行

```json
//请求：
POST _aliases
{
  "actions": [
    {
      "add": {
        "index": "test",
        "alias": "test_alias"
      }
    }
  ]
}
//返回：
{
  "acknowledged" : true
}

//请求：
GET _cat/aliases
//返回：
test_alias           test                          - - - -
```

命令行方式执行

```bash
curl -XPOST "http://es-http.infra:9200/_aliases" -H 'Content-Type: application/json' -d'{  "actions": [    {      "add": {        "index": "test",        "alias": "test_alias"      }    }  ]}'

curl -XGET "http://es-http.infra:9200/_cat/aliases"
```

别名不仅仅可以关联一个索引，它能聚合多个索引。也对于同一个 index，给不同人看到不同的数据，假设 test 有个字段是 team，team 字段记录了该数据是哪个人添加的，设置别名可以使不同人之间的 team 数据是不可见的。

可参考: [Elasticsearch 基础 11——索引之别名使用](https://blog.csdn.net/qq330983778/article/details/102980861)

**mappings**

ES 的 mappings（映射） 相当于数据库中的表结构，对表的字段类型长度索引做设置，而在 ES 中 映射是定义一个文档和它所包含的字段如何被存储和索引的过程，分为 自动映射（Dynamic mapping） 和 显式映射（Explicit mapping）。

::: tip
动态映射：

- 动态映射允许您试验 并在刚开始时探索数据。Elasticsearch 添加了新字段 自动，只需为文档编制索引即可。您可以将字段添加到顶级 映射，以及内部对象和嵌套字段。
- 使用动态模板定义自定义映射，这些映射是 应用于基于匹配条件动态添加的字段。

显式映射：

- 显式映射允许您精确选择如何 定义映射定义，例如：

  - 哪些字符串字段应被视为全文字段。
  - 哪些字段包含数字、日期或地理位置。
  - 日期值的格式。
  - 用于控制动态添加字段映射的自定义规则。

- 使用运行时字段进行架构更改，而无需 重新索引。可以将运行时字段与索引字段结合使用，以 平衡资源使用情况和性能。您的索引会更小，但 搜索性能较慢。
  :::

在 ElasticSearch 中一旦创建了映射是不被允许进行修改的，因为对于数据存储、分析、检索,都是按照 mapping 中的配置进行的,如果前期 根据 mapping 存储好了之后，又对 mapping 进行更改，那么就会导致前面存储的数据和后面的检索策略后面的存储 数据不一致的情况，导致检索行为不准确。 只能在创建 index 的时候手动配置 mapping，或者新增 fieId mapping。

给索引 test 设置映射，id:long，name:keyword。

dev tools 方式执行

```json
//请求：
POST test/_doc/_mapping?include_type_name=true
{
  "properties":{
    "id":{
      "type":"long"
    },
    "name":{
      "type":"keyword"
    }
  }
}
//返回：
#! Deprecation: [types removal] Using include_type_name in put mapping requests is deprecated. The parameter will be removed in the next major version.
{
  "acknowledged" : true
}

//请求：
GET test/_mapping
//返回：
{
  "test" : {
    "mappings" : {
      "properties" : {
        "id" : {
          "type" : "long"
        },
        "name" : {
          "type" : "keyword"
        }
      }
    }
  }
}
```

命令行方式执行

```bash
curl -XPOST "http://es-http.infra:9200/test/_doc/_mapping?include_type_name=true" -H 'Content-Type: application/json' -d'{  "properties":{    "id":{      "type":"long"    },    "name":{      "type":"keyword"    }  }}'

curl -XGET "http://es-http.infra:9200/test/_mapping"
```

**settings**

索引的配置项可以分为 静态配置 与 动态配置，所谓的静态配置即索引创建后不能修改。

- index.number_of_shards：索引分片的数量。在 ES 层面可以通过 es.index.max_number_of_shards 属性设置索引最大的分片数，默认为 1024，index.number_of_shards 的默认值为 Math.min(es.index.max_number_of_shards,5)，故通常默认值为 5。
- index.shard.check_on_startup：分片在打开之前是否应该检查该分片是否损坏。当检测到损坏时，它将阻止分片被打开。可选值：false：不检测；checksum：只检查物理结构；true：检查物理和逻辑损坏，相对比较耗 CPU；fix：类同与 false，7.0 版本后将废弃。默认值：false。
- index.codec：数据存储的压缩算法，默认值为 LZ4，可选择值 best_compression ，比 LZ4 可以获得更好的压缩比(即占据较小的磁盘空间，但存储性能比 LZ4 低)。
- index.routing_partition_size：路由分区数，如果设置了该参数，其路由算法为：(hash(\_routing) + hash(\_id) % - index.routing_parttion_size ) % number_of_shards。如果该值不设置，则路由算法为 hash(\_routing) % number_of_shardings，\_routing 默认值为\_id。

更多配置这里不多说，可参考[Elasticsearch Index Setting 一览表](https://cloud.tencent.com/developer/article/1443568)

dev tools 方式执行

```json
//请求：
GET /test/_settings
//返回：
{
  "test" : {
    "settings" : {
      "index" : {
        "creation_date" : "1698719350111",
        "number_of_shards" : "1",
        "number_of_replicas" : "1",
        "uuid" : "R1ZIwc64QVyIMekFiJILrw",
        "version" : {
          "created" : "7100299"
        },
        "provided_name" : "test"
      }
    }
  }
}
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/test/_settings"
```

### 查看索引

语法：

```bash
GET /<index>			# 查看指定索引信息
GET _cat/indices		# 查看所有索引
```

dev tools 方式执行

```json
//请求：
GET /test
//返回：
{
  "test" : {
    "aliases" : {
      "test_alias" : { }
    },
    "mappings" : {
      "properties" : {
        "id" : {
          "type" : "long"
        },
        "name" : {
          "type" : "keyword"
        }
      }
    },
    "settings" : {
      "index" : {
        "creation_date" : "1698719350111",
        "number_of_shards" : "1",
        "number_of_replicas" : "1",
        "uuid" : "R1ZIwc64QVyIMekFiJILrw",
        "version" : {
          "created" : "7100299"
        },
        "provided_name" : "test"
      }
    }
  }
}

//请求：
GET _cat/indices?v
//返回：
health status index                         uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   demo-index                    _Cr0_eLDSN-_8naHNSZ_MA   5   2          0            0      4.1kb          1.3kb
green  open   sw_log-20231030               YPd9l9Z7R2y-jJcKRBkxgQ   5   0          0            0      1.3kb          1.3kb
green  open   sw_zipkin_span-20231031       SSwiZLJ1S0mGwL2N9s18Ug   5   0          0            0        1kb            1kb
green  open   sw_zipkin_span-20231030       rD4W-MsiSH2T6hM5DzjTBA   5   0          0            0      1.3kb          1.3kb
green  open   sw_metrics-all-20231026       gGHhLA0sS_2FWRHPRCXGtQ   1   1    1769643       115198    899.8mb        449.8mb
green  open   sw_metrics-all-20231027       0pg83gZeSSasOcunuHW1Sw   1   1    3013999       458792      1.1gb        576.3mb
green  open   sw_metrics-all-20231028       ughbEWDsT6CAE9doFjdKuA   1   1    3000642      1328161      1.2gb        642.2mb
green  open   sw_metrics-all-20231029       bQHa8hK4RquJhKfqDEsvIQ   1   1    3000327      1016008      1.1gb        607.6mb
green  open   sw_ui_template                TcWeSgCWSDuKQheyRxMn4w   1   1         46            0    579.7kb        289.8kb
green  open   sw_browser_error_log-20231029 MhGb1KEbQIO6Om9zJArFHQ   5   0          0            0      1.3kb          1.3kb
green  open   sw_segment-20231030           o2B_RMrsSHinoEwTHEvVPg   5   0    1052662            0    428.3mb        428.3mb
green  open   sw_segment-20231031           fBvb30DkR3OeETziG3pDHQ   5   0     836278            0    390.3mb        390.3mb
green  open   sw_records-all-20231030       3dTEON3XTTuW-wxc7C2Bng   1   1        554            0    463.1kb        231.5kb
green  open   sw_records-all-20231031       72ZLdeDaRZW4RRZ3TkLBEQ   1   1        597            0    540.1kb        277.4kb
green  open   sw_log-20231029               yh8XDu3sTryzX-DVrZ8HXg   5   0          0            0      1.3kb          1.3kb
green  open   test                          R1ZIwc64QVyIMekFiJILrw   1   1          0            0       416b           208b
green  open   sw_records-all-20231029       TUbO6DDUSsixnbweaYMvZQ   1   1        825            0      547kb        273.5kb
green  open   sw_browser_error_log-20231030 YnEmFfjUQIi-2GZ4foIICQ   5   0          0            0      1.3kb          1.3kb
green  open   sw_browser_error_log-20231031 e1rLWA6MSNif52tdBMZ1FQ   5   0          0            0        1kb            1kb
green  open   .kibana_1                     _6BpVrmVRMCUfTkpzbZbUg   1   1         38            2     97.8kb         47.1kb
green  open   sw_zipkin_span-20231029       xyYmXViwTX6UOHpnPjQp8A   5   0          0            0      1.3kb          1.3kb
green  open   sw_segment-20231029           sQ7GO2mOTN-2PlarKVbrXA   5   0    1683395            0        1gb            1gb
green  open   sw_metrics-all-20231030       73gCoQZ_RZWZSpOzCbIJew   1   1    2070495       253967    786.8mb        410.9mb
green  open   sw_metrics-all-20231031       pN3egAP0RISrpLElEBV2lA   1   1    1415566       361787    845.9mb        422.1mb
green  open   sw_log-20231031               MIzCYUWMQEiKQn6QU2lLmA   5   0          0            0        1kb            1kb
red    open   demo-index3                   LvEXHv26R_KN2GZzoeycQA   6   0          0            0      1.3kb          1.3kb
red    open   demo-index2                   sBhlncuUR8G3WhHdbU71TA   6   0          0            0      1.1kb          1.1kb
green  open   demo-index1                   AKSwbUMjSgWhFnIsS7Y-mw   5   1          0            0      2.7kb          1.3kb
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/test"

curl -XGET "http://es-http.infra:9200/_cat/indices?v"
```

### 删除索引

语法：

```bash
DELETE <index>
```

dev tools 方式执行

```json
//请求：
DELETE test
//返回：
{
  "acknowledged" : true
}
```

命令行方式执行

```bash
curl -XDELETE "http://es-http.infra:9200/test"
```

## 文档（Document） API

### 文档是否存在

语法：

```bash
HEAD <index>/_doc/<_id>
HEAD <index>/_source/<_id>

路径参数：
  <index>
	（必需，字符串）包含文档的索引的名称。
  <_id>
	（必需，字符串）文档的唯一标识符。
```

dev tools 方式执行

```json
//请求：
HEAD test/_doc/1

//存在返回：
200 - OK

//不存在返回：
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "404 - Not Found"
}
```

命令行方式执行

```bash
curl -XHEAD "http://es-http.infra:9200/test/_doc/1"
```

### 索引文档

索引文档就是创建文档，这里的索引表示创建文档这个动作。

语法：

```bash
PUT /<target>/_doc/<_id>
POST /<target>/_doc/<_id>
PUT /<target>/_create/<_id>
POST /<target>/_create/<_id>

路径参数：
  <target>
	（必需，字符串）目标数据流或索引的名称。

  <_id>
	（可选，字符串）文档的唯一标识符。省略此参数会自动生成文档 ID。
```

dev tools 方式执行，如果没有还没有创建索引 test，那么在第一次创建文档的时候会自动创建 test。

```json
//请求：
POST test/_doc/1
{
    "id":"1",
    "name":"张三",
    "avatar":"https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0",
    "age":20
}
//返回：
{
  "_index" : "test", // 文档所在索引
  "_type" : "_doc",
  "_id" : "1", // 文档ID，这是ES 的文档ID 和 源数据中的id关联需要业务维护
  "_version" : 1, // 版本
  "result" : "created", // 执行结果 - 成功
  "_shards" : { // 分片
    "total" : 2, // 分片总数 - 一主一副
    "successful" : 2, // 正常运行的分片数量，因为是单机，主副分片在一起，只会使用主分片
    "failed" : 0 // 失败数量，副分片没用到并不是运行失败，主副分片本就是为了数据冗余而存在的，单机的话副分片就用不到了，宕机一起死
  },
  "_seq_no" : 0, // _seq_no是严格递增的顺序号，每个文档一个，Shard级别严格递增，保证后写入的Doc的_seq_no大于先写入的Doc的_seq_no。任何类型的写操作，包括index、create、update和Delete，都会生成一个_seq_no。
  "_primary_term" : 1 // _primary_term主要是用来恢复数据时处理当多个文档的_seq_no一样时的冲突，比如当一个shard宕机了，raplica需要用到最新的数据，就会根据_primary_term和_seq_no这两个值来拿到最新的document
}

//测试：
POST test/_doc
{
    "id":"2",
    "name":"李四",
    "avatar":"https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0",
    "age":22
}
//返回：
{
  "_index" : "test",
  "_type" : "_doc",
  "_id" : "b2G7g4sBv86TIBhXY44l", // 自动生成的文档ID
  "_version" : 1,
  "result" : "created",
  "_shards" : {
    "total" : 2,
    "successful" : 2,
    "failed" : 0
  },
  "_seq_no" : 1,
  "_primary_term" : 1
}
```

命令行方式执行

```bash
curl -XPOST "http://es-http.infra:9200/test/_doc/1" -H 'Content-Type: application/json' -d'{    "id":"1",    "name":"张三",    "avatar":"https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0",    "age":20}'

curl -XPOST "http://es-http.infra:9200/test/_doc" -H 'Content-Type: application/json' -d'{    "id":"2",    "name":"李四",    "avatar":"https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0",    "age":22}'
```

### 获取文档

语法：

```bash
# 获取索引下所有文档
GET /<index>/_search

# 获取指定文档
GET <index>/_doc/<_id>
GET <index>/_source/<_id>

路径参数：
  <index>
	（必需，字符串）包含文档的索引的名称。
  <_id>
	（必需，字符串）文档的唯一标识符。
  stored_fields
	（可选，布尔值）如果 ，则检索存储在 索引而不是文档。默认值为false 。
  _source
	（可选，字符串）真或假返回字段与否，或 要返回的字段列表。
  version
	（可选，整数）用于并发控制的显式版本号。 指定的版本必须与文档的当前版本匹配 请求成功。
```

:::tip
[部分查询参数，详细用法参考官网](https://www.elastic.co/guide/en/elasticsearch/reference/7.10/docs-get.html#docs-get-api-prereqs)
:::

**元数据**

这里关于获取文档返回信息中的参数叫做 元数据：

- \_index：文档所属索引的名称。
- \_id：文档的唯一标识符。
- \_version：文档版本。每次更新文档时递增。
- \_seq_no：分配给文档以编制索引的序列号 操作。序列号用于确保文档的较旧版本 不会覆盖较新的版本。请参阅 乐观并发控制。
- \_primary_term：为索引操作分配给文档的主要术语。 请参阅 乐观并发控制。
- found：指示文档是否存在：true 或 false。
- \_source：如果 found 是 true，则包含以 JSON 格式设置的文档数据。如果 \_source 参数设置为 false 或 stored_fields 参数设置为 true，则排除。

:::tip
元数据和源数据不要搞混了，源数据是元数据 \_source 下的内容，就是我们存到 ES 中的信息。
:::

dev tools 方式执行

```json
//请求：
GET test/_doc/1
//返回：
{
  "_index" : "test",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 1,
  "_seq_no" : 0,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "id" : "1",
    "name" : "张三",
    "avatar" : "https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0",
    "age" : 20
  }
}

//请求：
GET test/_source/1
//返回：
{
  "id" : "1",
  "name" : "张三",
  "avatar" : "https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0",
  "age" : 20
}

//请求：
GET /test/_search
//返回：
{
  "took" : 8,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "1",
        "_score" : 1.0,
        "_source" : {
          "id" : "1",
          "name" : "张三",
          "avatar" : "https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0",
          "age" : 20
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "b2G7g4sBv86TIBhXY44l",
        "_score" : 1.0,
        "_source" : {
          "id" : "2",
          "name" : "李四",
          "avatar" : "https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0",
          "age" : 22
        }
      }
    ]
  }
}
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/test/_doc/1"

curl -XGET "http://es-http.infra:9200/test/_source/1"

curl -XGET "http://es-http.infra:9200/test/_search"
```

### 修改文档

官方提供 Update API 实际上是局部更新，能够编写文档更新脚本。要完全替换现有文档，则使用 索引文档 API。

**局部更新**

更新 API 支持传递合并到现有文档中的部分文档。

更新 API 还能够编写文档更新脚本，脚本可以更新、删除或跳过修改文档。

语法：

```bash
POST /<index>/_update/<_id>

路径参数：
  <index>
	（必需，字符串）包含文档的索引的名称。
  <_id>
	（必需，字符串）文档的唯一标识符。

请求体：
  doc：修改信息。
  script：脚本内容。
```

dev tools 方式执行

```json
修改源数据：
//请求：
POST /test/_update/1
{
  "doc": {
    "name":"张三222",
    "age":30
  }
}
//返回：
{
  "_index" : "test",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 2,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 2,
    "failed" : 0
  },
  "_seq_no" : 2,
  "_primary_term" : 1
}

//请求：
GET test/_source/1
//返回：
{
  "id" : "1",
  "name" : "张三222",
  "avatar" : "https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0",
  "age" : 30
}

//执行脚本测试（年龄加10）：
//请求：
POST test/_update/1
{
  "script" : {
    "source": "ctx._source.age+= params.add",
    "lang": "painless",
    "params" : {
      "add" : 10
    }
  }
}
//返回：
{
  "_index" : "test",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 3,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 2,
    "failed" : 0
  },
  "_seq_no" : 3,
  "_primary_term" : 1
}

//请求：
GET test/_source/1
//返回：
{
  "id" : "1",
  "name" : "张三222",
  "avatar" : "https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0",
  "age" : 40
}
```

命令行方式执行

```bash
curl -XPOST "http://es-http.infra:9200/test/_update/1" -H 'Content-Type: application/json' -d'{  "doc": {    "name":"张三222",    "age":30  }}'

curl -XGET "http://es-http.infra:9200/test/_source/1"

curl -XPOST "http://es-http.infra:9200/test/_update/1" -H 'Content-Type: application/json' -d'{  "script" : {    "source": "ctx._source.age+= params.add",    "lang": "painless",    "params" : {      "add" : 10    }  }}'
```

**全量更新**

和新增文档一样，如果请求体变化，会将原有的数据内容覆盖。

dev tools 方式执行

```json
//请求：
POST test/_doc/1
{
  "name":"李四"
}
//返回:
{
  "_index" : "test",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 4,
  "result" : "updated",
  "_shards" : {
    "total" : 2,
    "successful" : 2,
    "failed" : 0
  },
  "_seq_no" : 4,
  "_primary_term" : 1
}

```

命令行方式执行

```bash
curl -XPOST "http://es-http.infra:9200/test/_doc/1" -H 'Content-Type: application/json' -d'{  "name":"李四"}'
```

### 删除文档

语法：

```bash
DELETE /<index>/_doc/<_id>
```

dev tools 方式执行

```json
//请求：
DELETE test/_doc/1
//返回:
{
  "_index" : "test",
  "_type" : "_doc",
  "_id" : "1",
  "_version" : 5,
  "result" : "deleted",
  "_shards" : {
    "total" : 2,
    "successful" : 2,
    "failed" : 0
  },
  "_seq_no" : 5,
  "_primary_term" : 1
}

//请求：
GET test/_doc/1
//返回:
{
  "_index" : "test",
  "_type" : "_doc",
  "_id" : "1",
  "found" : false
}
```

命令行方式执行

```bash
curl -XDELETE "http://es-http.infra:9200/test/_doc/1"

curl -XGET "http://es-http.infra:9200/test/_doc/1"
```

## 搜索（Search） API

Search API 执行搜索查询并返回与查询匹配的搜索命中。可以使用 查询字符串参数 或 请求体 提供搜索查询。

```bash
GET /<target>/_search
GET /_search
POST /<target>/_search
POST /_search

路径参数：
  <target>
	（可选，字符串）以逗号分隔的数据流、索引和别名列表 搜索。支持通配符 （）。省略则搜索所有数据流和索引。
  q:
    （可选，字符串）使用Lucene查询字符串语法进行查询。您可以使用q参数来运行查询参数搜索。查询参数搜索不支持完整的Elasticsearch查询DSL，但便于测试。
  from:
	（可选，整数）起始文档偏移量。需要为非负，默认值为0。默认情况下，使用from和size参数，页面浏览次数不能超过10000次。要浏览更多点击，请使用search_after参数。
  size:
	（可选，整数）定义要返回的命中数。默认值为 10。默认情况下，使用from和size参数，页面浏览次数不能超过10000次。要浏览更多点击，请使用search_after参数。
  sort:
	（可选，字符串）以逗号分隔的＜field＞：＜direction＞对列表。
  _source:
	（可选） （可选）指示为匹配的文档返回哪些源字段。这些字段在命中时返回_搜索响应的源属性。默认为true。请参见源过滤。
		true:（布尔值）返回整个文档源。
		false:（布尔值）不返回文档源。
		<string>:（string）要返回的源字段的逗号分隔列表。支持通配符（*）模式。
  timeout:
	（可选，时间单位）指定等待每个碎片响应的时间段。如果在超时到期之前没有收到响应，则请求失败并返回错误。默认为无超时。
  version:
	（可选，布尔值）如果为true，则返回文档版本作为命中的一部分。默认为false。
```

:::tip
部分查询参数[更多参考](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/search-search.html)
:::

准备数据：

```json
POST test/_doc
{
    "id":"1",
    "name":"张三",
    "address": "江苏省苏州市苏州工业园区",
    "age":25
}

POST test/_doc
{
    "id":"2",
    "name":"李四",
    "age": 22,
    "address": "上海市浦东新区锦绣路1001号世纪公园"
}

POST test/_doc
{
    "id":"3",
    "name":"王五",
    "age": 30,
    "address": "江苏省南通市崇川区兴通路98-99号南通国际会展中心"
}
```

### Query 参数查询 与 请求体查询

**Query 参数查询 测试：**

dev tools 方式执行

```json
//请求：
GET test/_search?q=name:张三
//返回：
{
  "took" : 5,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.9616582,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 1.9616582,
        "_source" : {
          "id" : "1",
          "name" : "张三",
          "address" : "江苏省苏州市苏州工业园区",
          "age" : 25
        }
      }
    ]
  }
}


//请求：
GET test/_search?q=name:张三&from=0&size=2&_source=name
//返回：
{
  "took" : 6,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.9616582,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 1.9616582,
        "_source" : {
          "name" : "张三" // _source 限制返回字段
        }
      }
    ]
  }
}
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/test/_search?q=name:张三"

curl -XGET "http://es-http.infra:9200/test/_search?q=name:张三&from=0&size=2&_source=name"
```

**请求体查询 测试：**

dev tools 方式执行

```json
// 请求：
GET test/_search

// match_all ：等同于上面的空查询，没有任何条件，最简单的查询，它匹配所有文档就相当于空搜索，给它们的_score 默认都是1.0，可以通过boost 设置，可以进行一些排序之类的。
//请求：
GET test/_search
{
	"query":{
		"match_all":{}
	}
}
```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/test/_search"

curl -XGET "http://es-http.infra:9200/test/_search" -H 'Content-Type: application/json' -d'{	"query":{		"match_all":{}	}}'
```

## 单条件筛选之匹配关键字

首先我们需要知道 ES 中默认使用分词器为 标准分词器(StandardAnalyzer)，标准分词器对于英文 单词分词 ，对于中文 单字分词。

在 ES 的 映射类型（Mapping Type） 中 keyword，date，integer，long，double ，boolean or ip 这些类型不分词，只有 text 类型分词。

**短语模糊匹配**

match ：先对搜索词进行分词，分词完毕后再逐个对分词结果进行匹配，因此相比于 term 的精确搜索，match 是分词匹配搜索，相当于模糊匹配，只包含其中一部分关键词就行 。

:::tip
这里的 match 和 下面的 match_pharse 查询都是属于 全文查询，全文查询会给当前的句子进行分词，通常来讲，索引的时候怎么分的词，查询的时候就是用的什么分词器，默认是不用设置的，但是如果有个别场景，也可以自己设置分词器。
:::

dev tools 方式执行

```json
//请求：
GET test/_search
{
  "query": {
    "match": {
      "address": "江南"  // 匹配江南，搜索到包含江苏和南通的两条数据
    }
  }
}
//返回：
{
  "took" : 3,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 1.6375607,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "dJ0ChIsB-UyH_cqbc8ll",
        "_score" : 1.6375607,
        "_source" : {
          "id" : "3",
          "name" : "王五",
          "age" : 30,
          "address" : "江苏省南通市崇川区兴通路98-99号南通国际会展中心"
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 0.53428984,
        "_source" : {
          "id" : "1",
          "name" : "张三",
          "address" : "江苏省苏州市苏州工业园区",
          "age" : 25
        }
      }
    ]
  }
}

```

命令行方式执行

```bash
curl -XGET "http://es-http.infra:9200/_cat/shards?v"
```

**模糊查询：**

在实际的搜索中，我们有时候会打错字，从而导致搜索不到。在 ES 中，我们可以使用 fuzziness 属性 设置 编辑距离 来进行模糊查询，从而达到搜索有错别字的情形。

match 查询具有 fuziness 属性。它可以被设置为 0， 1， 2 或 auto。auto 是推荐的选项，它会根据查询词的长度定义距离。在实际的使用中，当我们使用 auto 时，如果字符串的长度大于 5，那么 funziness 的值自动设置为 2，如果字符串的长度小于 2，那么 fuziness 的值自动设置为 0。

编辑距离 是将一个术语转换为另一个术语所需的一个字符更改的次数。 这些更改可以包括：

- 更改字符（box→fox）
- 删除字符（black→lack）
- 插入字符（sic→sick）
- 转置两个相邻字符（act→cat）

准备数据：

```json
POST /test3/doc/1
{
    "hobby": "football, basketball"
}

POST /test3/_update/1
{
  "doc": {
    "hobby": "football, basketball"  // 使用英文测试，中文是分析器处理后是单字，英文是多个字母，更适合测试
  }
}
```

测试

```json
//请求：
GET /test3/_search
{
  "query": {
    "match": {
      "hobby": "footbalf"  // 当只有一个字母不同，正常匹配搜索不到
    }
  }
}
//返回：
{
  "took" : 3,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 0,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  }
}

//请求：
GET /test3/_search
{
  "query": {
    "match": {
      "hobby": {
        "query": "footbalf",
        "fuzziness": "1"	// 编辑距离为 1，football 和 footbalf 只有一个字母不同，这时就可以搜索到。
      }
    }
  }
}
//返回：
{
  "took" : 26,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 0.25172183,
    "hits" : [
      {
        "_index" : "test3",
        "_type" : "doc",
        "_id" : "1",
        "_score" : 0.25172183,
        "_source" : {
          "hobby" : "football, basketball"
        }
      }
    ]
  }
}
```

fuziness 设置是针对每个词语而言的，而不是总的错误的数值，所以可以查询多个单词。

```json
//请求：
GET /test3/_search
{
  "query": {
    "match": {
      "hobby": {
        "query": "footbalf basketbalf",
        "fuzziness": "1"
      }
    }
  }
}
//返回：
{
  "took" : 49,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 0.51063573,
    "hits" : [
      {
        "_index" : "test3",
        "_type" : "doc",
        "_id" : "1",
        "_score" : 0.51063573,
        "_source" : {
          "hobby" : "football, basketball"
        }
      }
    ]
  }
}
```

ES 的 fuzzy 查询，功能和上面一样，但是这个只针对一个 term 比较有用。

```json
//请求：
GET /test3/_search
{
  "query": {
    "fuzzy": {
      "hobby": {
        "value": "footbalf",
        "fuzziness": "1"
      }
    }
  }
}
//返回：
{
  "took" : 14,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 0.25172183,
    "hits" : [
      {
        "_index" : "test3",
        "_type" : "doc",
        "_id" : "1",
        "_score" : 0.25172183,
        "_source" : {
          "hobby" : "football, basketball"
        }
      }
    ]
  }
}
```

**短语精确匹配**

match_phrase ：短语匹配查询，要求必须全部精确匹配，且顺序必须与指定的短语相同。首先解析查询字符串来产生一个词条列表，然后会搜索所有的词条，但只保留包含了所有搜索词条的文档。match_phrase 还支持词条列表各词项间隔距离多少的设置。

```json
//请求：
GET test/_search
{
	"query":{
		"match_phrase": {
		  "address": "江南" 	// 未匹配到江南，三条数据地址有包含江苏或南通，但是没有江南
		}
	}
}
//返回：
{
  "took" : 14,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 0,
      "relation" : "eq"
    },
    "max_score" : null,
    "hits" : [ ]
  }
}
```

**关键词精确匹配**

term ：单词或单字精确匹配，只是查分词，不会对查询语句进行分词，所以会区分大小写。

terms ：多个 term 的并集。

:::tip
term 查询是基于词项的查询，当使用 term 查询时，ES 不会对这个词做任何处理，但是在文本进行分词时，通常都会将大写转为小写，这个时候就会出现查不出来的情况。
:::

```json
//请求：
GET test/_search
{
	"query":{
		"term": {
		  "address": {
		    "value": "江"  // 匹配包含江字的数据，两条
		  }
		}
	}
}
//返回：
{
  "took" : 2,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 0.53428984,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 0.53428984,
        "_source" : {
          "id" : "1",
          "name" : "张三",
          "address" : "江苏省苏州市苏州工业园区",
          "age" : 25
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "dJ0ChIsB-UyH_cqbc8ll",
        "_score" : 0.41070414,
        "_source" : {
          "id" : "3",
          "name" : "王五",
          "age" : 30,
          "address" : "江苏省南通市崇川区兴通路98-99号南通国际会展中心"
        }
      }
    ]
  }
}

//请求：
GET test/_search
{
	"query":{
		"terms": {
		  "address": ["江","南"] 	// terms 就相当于多个 term 的并集
		}
	}
}
//返回：
{
  "took" : 3,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 1.0,
        "_source" : {
          "id" : "1",
          "name" : "张三",
          "address" : "江苏省苏州市苏州工业园区",
          "age" : 25
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "dJ0ChIsB-UyH_cqbc8ll",
        "_score" : 1.0,
        "_source" : {
          "id" : "3",
          "name" : "王五",
          "age" : 30,
          "address" : "江苏省南通市崇川区兴通路98-99号南通国际会展中心"
        }
      }
    ]
  }
}
```

**多字段查询**

multi_match 查询提供了一个简便的方法用来对多个字段执行相同的查询。

更改一下数据：

```json
GET test/_doc/R2UChIsBgsntjsp2aK2I

POST /test/_update/R2UChIsBgsntjsp2aK2I
{
  "doc": {
    "address": "上海市浦东新区锦绣路1001号世纪公园张三家旁边"
  }
}
```

测试

```json
//请求：
GET /test/_search
{
  "query": {
    "multi_match": {
      "query": "张三",
      "fields": ["name","address"]
    }
  }
}
//返回：
{
  "took" : 18,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 1.9616582,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 1.9616582,
        "_source" : {
          "id" : "1",
          "name" : "张三",
          "address" : "江苏省苏州市苏州工业园区",
          "age" : 25
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "R2UChIsBgsntjsp2aK2I",
        "_score" : 1.8662264,
        "_source" : {
          "id" : "2",
          "name" : "李四",
          "age" : 22,
          "address" : "上海市浦东新区锦绣路1001号世纪公园张三家旁边"
        }
      }
    ]
  }
}
```

**前缀查询**

prefix：查询返回在提供的字段中包含特定前缀的文档。

前缀匹配只适用于 keyword ，是不做分词的且大小写敏感， 因为前缀匹配不涉及索引分词，所以只能匹配 关键字 keyword，因此效率很低，不推荐生产环境使用。

```json
//请求：
GET /test/_search
{
 "query": {
    "prefix": {
      "address.keyword": "上海" #
    }
  }
}
//返回：
{
  "took" : 11,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "R2UChIsBgsntjsp2aK2I",
        "_score" : 1.0,
        "_source" : {
          "id" : "2",
          "name" : "李四",
          "age" : 22,
          "address" : "上海市浦东新区锦绣路1001号世纪公园张三家旁边"
        }
      }
    ]
  }
}
```

参考[ElasticSearch 中字符串.keyword 和.text 类型区别和模糊查询](https://blog.csdn.net/sfh2018/article/details/118083634)

**通配符查询**

wildcard：ES 中可以实现通配符搜索，通配符匹配也是扫描完整索引，通配符可以在 索引中使用，也可以在 keyword 中使用。

ElsticSearch 支持的通配符有 2 个，分别是：

\*：0 个或多个任意字符
?：任意单个字符
注意： 为了防止极慢的通配符匹配，查询字符串不要以通配符开头，只在查询字符串中间或末尾使用通配符。

```json
//请求：
GET /test/_search
{
 "query": {
    "wildcard": {
      "address.keyword": { // 如果是address 的话只能匹配 单字 才有数据
        "value": "上海*"
      }
    }
  }
}
//返回：
{
  "took" : 9,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "R2UChIsBgsntjsp2aK2I",
        "_score" : 1.0,
        "_source" : {
          "id" : "2",
          "name" : "李四",
          "age" : 22,
          "address" : "上海市浦东新区锦绣路1001号世纪公园张三家旁边"
        }
      }
    ]
  }
}
```

### 范围查询

**数字范围**

range 查询可同时提供包含（inclusive）和不包含（exclusive）这两种范围表达式，可供组合的选项如下：

- gt: > 大于（greater than）
- lt: < 小于（less than）
- gte: >= 大于或等于（greater than or equal to）
- lte: <= 小于或等于（less than or equal to）

```json
//请求：
GET test/_search
{
  "query":{
	"range": {
	  "age": {		// 查询年龄在 10~20 之间的数据
	    "gte": 10,
	    "lte": 22
	  }
	}
  }
}
//返回：
{
  "took" : 5,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "R2UChIsBgsntjsp2aK2I",
        "_score" : 1.0,
        "_source" : {
          "id" : "2",
          "name" : "李四",
          "age" : 22,
          "address" : "上海市浦东新区锦绣路1001号世纪公园张三家旁边"
        }
      }
    ]
  }
}
```

**日期范围**

添加下时间 time：

```json
GET /test/_search

POST /test/_update/cWEChIsBv86TIBhXXI7_
{
  "doc": {
    "time":"2021/01/01"
  }
}
POST /test/_update/R2UChIsBgsntjsp2aK2I
{
  "doc": {
    "time":"2022/01/01"
  }
}
POST /test/_update/dJ0ChIsB-UyH_cqbc8ll
{
  "doc": {
    "time": "2023/01/01"
  }
}
```

range 查询同样可以应用在日期字段上：

```json
//请求：
GET test/_search
{
  "query":{
	"range": {
      "time": {
        "gt": "2022/03/01",
        "lt": "2023/03/01"
      }
  	}
  }
}
//返回：
{
  "took" : 854,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "dJ0ChIsB-UyH_cqbc8ll",
        "_score" : 1.0,
        "_source" : {
          "id" : "3",
          "name" : "王五",
          "age" : 30,
          "address" : "江苏省南通市崇川区兴通路98-99号南通国际会展中心",
          "time" : "2023/01/01"
        }
      }
    ]
  }
}
```

**多 id 查询**

根据 ID 返回文档。此查询使用存储在 \_id 字段中的文档 ID。

```bash
请求参数：
	ids.values：(必填, 字符串数组) 文档的_id的数组
```

```json
//请求：
GET /test/_search
{
  "query": {
    "ids": {
      "values": ["R2UChIsBgsntjsp2aK2I","dJ0ChIsB-UyH_cqbc8ll"]
    }
  }
}
//返回：
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "R2UChIsBgsntjsp2aK2I",
        "_score" : 1.0,
        "_source" : {
          "id" : "2",
          "name" : "李四",
          "age" : 22,
          "address" : "上海市浦东新区锦绣路1001号世纪公园张三家旁边",
          "time" : "2022/01/01"
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "dJ0ChIsB-UyH_cqbc8ll",
        "_score" : 1.0,
        "_source" : {
          "id" : "3",
          "name" : "王五",
          "age" : 30,
          "address" : "江苏省南通市崇川区兴通路98-99号南通国际会展中心",
          "time" : "2023/01/01"
        }
      }
    ]
  }
}
```

### 多条件筛选

现实的查询需求从来都没有那么简单；它们需要在多个字段上查询多种多样的文本，并且根据一系列的标准来过滤。为了构建类似的高级查询，你需要一种能够将多查询组合成单一查询的查询方法。

**布尔查询**

bool 查询：可以实现你的需求。这种查询将多查询组合在一起，成为用户自己想要的布尔查询。它接收以下参数：

- must：文档 必须 匹配这些条件才能被包含进来。
- must_not：文档 必须不 匹配这些条件才能被包含进来。
- should：如果满足这些语句中的任意语句，将增加 \_score ，否则，无任何影响。它们主要用于修正每个文档的相关性得分。
- filter：必须 匹配，但它以不评分、过滤模式来进行。这些语句对评分没有贡献，只是根据过滤标准来排除或包含文档。

:::tip
Filter Context 和 Query Context 的区别:

进行 query context 查询时，ES 除了要判断某个文档是否与查询值匹配，还要计算相关度评分（relevance score），并放入到返回结果的\_score 字段中！
而当进行 filter context 查询时，仅仅判断某个文档是否与查询值匹配，不但无需进行相关度评分的计算，而且对于高频率的 filter 查询，ES 还会自动将查询结果缓存起来，以提高 filter 查询的性能。

must 和 should 属于 Query Context，会对 \_score 结果产生影响；
filter 和 must_not 属于 Filter Context，不会对 \_score 结果产生影响；
:::

```json
//请求：
GET /test/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "name": "张三" }}   		// name 包含张三
      ],
      "must_not": [
        { "match": { "address": "上海" }}		// 地址不能包含 上海
      ],
      "should": [
        { "term": { "hobby": "football" }} 		// 匹配到的数据中包含 football，_score 增加，未匹配到 _score 不变
      ],
      "filter": [
        { "range": { "age": { "gte": "20" }}}  // 过滤，筛选 age 大于等于 20 的数据
      ]
    }
  }
}
//返回：
{
  "took" : 6,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 1,
      "relation" : "eq"
    },
    "max_score" : 1.9616582,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 1.9616582,
        "_source" : {
          "id" : "1",
          "name" : "张三",
          "address" : "江苏省苏州市苏州工业园区",
          "age" : 25,
          "time" : "2021/01/01"
        }
      }
    ]
  }
}
```

### 指定字段

\_source ：指定返回的源数据字段。

```json
//请求：
GET test/_search
{
  "_source": ["name"]
}
//返回：
{
  "took" : 5,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 3,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 1.0,
        "_source" : {
          "name" : "张三"
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "R2UChIsBgsntjsp2aK2I",
        "_score" : 1.0,
        "_source" : {
          "name" : "李四"
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "dJ0ChIsB-UyH_cqbc8ll",
        "_score" : 1.0,
        "_source" : {
          "name" : "王五"
        }
      }
    ]
  }
}
```

### 高亮查询

如果返回的结果集中很多符合条件的结果，那怎么能一眼就能看到我们想要的那个结果呢？比如像百度所示的那样，将搜索词高亮显示：

**默认高亮显示**

highlight：ES 会从查询到的数据中，找到匹配的短语或关键字词，并以 `<em></em>` 标签包裹起来。

```json
//请求：
GET /test/_search
{
  "query": {
    "match": {
      "address": "江南"
    }
  },
  "highlight": {
    "fields": {
      "address": {}
    }
  }
}
//返回：
{
  "took" : 88,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 1.6952236,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "dJ0ChIsB-UyH_cqbc8ll",
        "_score" : 1.6952236,
        "_source" : {
          "id" : "3",
          "name" : "王五",
          "age" : 30,
          "address" : "江苏省南通市崇川区兴通路98-99号南通国际会展中心",
          "time" : "2023/01/01"
        },
        "highlight" : {
          "address" : [
            "<em>江</em>苏省<em>南</em>通市崇川区兴通路98-99号<em>南</em>通国际会展中心"
          ]
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 0.5504225,
        "_source" : {
          "id" : "1",
          "name" : "张三",
          "address" : "江苏省苏州市苏州工业园区",
          "age" : 25,
          "time" : "2021/01/01"
        },
        "highlight" : {
          "address" : [
            "<em>江</em>苏省苏州市苏州工业园区"
          ]
        }
      }
    ]
  }
}
```

**自定义高亮 html 标签**

ES 可以在 highlight 中使用 pre_tags 和 post_tags 来自定义匹配内容前后高亮的 html 标签 。

```json
//请求：
GET /test/_search
{
  "query": {
    "match": {
      "address": "江南"
    }
  },
  "highlight": {
    "pre_tags": "<b style='color:red'>",
    "post_tags": "</b>",
    "fields": {
      "address": {}
    }
  }
}
//返回：
{
  "took" : 89,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 2,
      "relation" : "eq"
    },
    "max_score" : 1.6952236,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "dJ0ChIsB-UyH_cqbc8ll",
        "_score" : 1.6952236,
        "_source" : {
          "id" : "3",
          "name" : "王五",
          "age" : 30,
          "address" : "江苏省南通市崇川区兴通路98-99号南通国际会展中心",
          "time" : "2023/01/01"
        },
        "highlight" : {
          "address" : [
            "<b style='color:red'>江</b>苏省<b style='color:red'>南</b>通市崇川区兴通路98-99号<b style='color:red'>南</b>通国际会展中心"
          ]
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 0.5504225,
        "_source" : {
          "id" : "1",
          "name" : "张三",
          "address" : "江苏省苏州市苏州工业园区",
          "age" : 25,
          "time" : "2021/01/01"
        },
        "highlight" : {
          "address" : [
            "<b style='color:red'>江</b>苏省苏州市苏州工业园区"
          ]
        }
      }
    ]
  }
}
```

### 排序

sort：指定字段排序方式。

数据模型的复杂程度决定了排序的复杂程度，排序的复杂程度随着模型的复杂程度成指数级增加。这里就简单的介绍普通用法。

```json
//请求：
GET test/_search
{
  "sort": {
    "id": {
      "order": "asc"
    }
  }
}
//返回：
{
  "took": 0,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 3,
      "relation": "eq"
    },
    "max_score": null,
    "hits": [
      {
        "_index": "test",
        "_id": "1",
        "_score": null,
        "_source": {
          "id": 1,
          "name": "张三",
          "age": 25,
          "address": "江苏省苏州市苏州工业园区",
          "time": "2021/01/01"
        },
        "sort": [
          1
        ]
      },
      {
        "_index": "test",
        "_id": "2",
        "_score": null,
        "_source": {
          "id": 2,
          "name": "李四",
          "age": 22,
          "address": "上海市浦东新区锦绣路1001号世纪公园",
          "time": "2022/01/01"
        },
        "sort": [
          2
        ]
      },
      {
        "_index": "test",
        "_id": "3",
        "_score": null,
        "_source": {
          "id": 3,
          "name": "王五",
          "age": 3,
          "address": "江苏省南通市崇川区兴通路98-99号南通国际会展中心",
          "time": "2023/01/01"
        },
        "sort": [
          3
        ]
      }
    ]
  }
}
```

### 分页

from：起始数据位置。
size：返回数据数量。

ES 分页查询限制总数能不超过 10000，原因是基本用不到 10000 条以后数据，如果前面 10000 条数据还没有找到你想要的数据，那么后面的匹配度更低，找到的概率更小，查询速度也会越来越慢，合理没必要查 10000 以后的。

```json
//请求：
GET test/_search
{
	"from": 0, // 0 开始
	"size": 2  // 获取两条数据
}
//返回：
{
  "took" : 5,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 3,
      "relation" : "eq"
    },
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "cWEChIsBv86TIBhXXI7_",
        "_score" : 1.0,
        "_source" : {
          "id" : "1",
          "name" : "张三",
          "address" : "江苏省苏州市苏州工业园区",
          "age" : 25,
          "time" : "2021/01/01"
        }
      },
      {
        "_index" : "test",
        "_type" : "_doc",
        "_id" : "R2UChIsBgsntjsp2aK2I",
        "_score" : 1.0,
        "_source" : {
          "id" : "2",
          "name" : "李四",
          "age" : 22,
          "address" : "上海市浦东新区锦绣路1001号世纪公园张三家旁边",
          "time" : "2022/01/01"
        }
      }
    ]
  }
}
```

## 批量操作（Mget、Bulk） API

批量操作的好处在于可以一次请求完成多次操作，不需要发送多次，可以解决很多网络的开销，可以显著的提高索引的速度。

### 批量查询

\_mget：可以同时执行不同的 get 操作，多个 API 操作之间的结果互不影响。

```json
//请求：
GET /test/_mget
{
  "docs":[
    {
      "_id": 1
    },
    {
      "_id": 2
    }
  ]
}
//都是根据id，查询的话，也可以使用下面 ids 这种写法，结果一样：
GET /test/_mget
{
  "ids": [1,2]
}
```

**不同索引**

创建索引 test2，添加一条数据：

```json
POST test2/_doc/1
{
    "id":1,
    "name":"赵六",
    "age":30,
    "address": "杭州市上城区万松岭路81号"
}
```

```json
GET /_mget
{
  "docs":[
    {
      "_index":"test",
      "_id": "cWEChIsBv86TIBhXXI7_"
    },
    {
      "_index":"test2",
      "_id": 1
    }
  ]
}
```

### 批量修改

\_bulk：可以同时执行不同的 CUD 操作，多个 API 操作之间的结果互不影响。

bulk request 会加载到内存中，如果太大的话，性能反而下降，因此需要反复尝试一个最大的 bulk size。一般从 1000~5000 条数据开始，尝试逐渐增加。另外，如果看大小的话，最好在 5M。

注意:bulk 操作不能进行代码换行。

语法

```bash
POST /_bulk
{action1:{metadata1}}
{requestbody1}
{action2:{metadata2}}
{requestbody2}
```

```json
POST /_bulk
{"index":{"_index":"test3","_id":1}}
{"doc":{"id":1,"name":"孙七","age":50,"address":"地球"}}
{"create":{"_index":"member","_id":999}}
{"doc":{"id":1,"name":"周八","age":80,"address":"地球2"}}
{"delete":{"_index":"test2","_id":"1"}}
{"update":{"_index":"test","_id":1}}
{"doc":{"name":"张三222"}}
```

## 离线文档下载

elastic 官网 访问缓慢已常态，还经常无法访问，为了方便看文档，我使用 DownGit 从 GitHub 下载了离线文档，但是下载的离线文档没有左侧 API 导航栏这个比较坑。

还有一点是关于翻译的问题，ES 的中文版版本太低，我们常用的还是英文版，谷歌的翻译功能又不可用，想要翻译成中文可以使用 Edge 浏览器。

下载离线文档参考：

- [DownGit](http://tool.mkblog.cn/downgit/#/home)
- [GitHub ES 7.10 文档地址（也可选择其他版本）](https://github.com/elastic/built-docs/tree/master/html/en/elasticsearch/reference/7.10)
- [GitHub ES 7.10 文档样式渲染地址](https://github.com/elastic/built-docs/tree/master/html/static)
- [Elasticsearch 进阶教程：生成离线官方文档](https://cloud.tencent.com/developer/article/2059896)
