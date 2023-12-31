---
order: 1
tags:
  - elasticsearch基础
title: ES 概念及原理
date: 2023-10-27 15:31:08
categories:
  - elasticsearch
columns:
  -
---

# ES 概念及原理

## 架构图

![ES 架构图](https://assets.moweilong.com/img/20231027174636.png)

## 集群

### Cluster

互联网应用中，随着站点对硬件性能、响应速度、服务稳定性、数据可靠性等要求越来越高，单台服务器开始无法满足负载均衡及高可用的需求，集群因此应运而生。

ES 集群是由一个或多个节点组成，对外表现为一个整体，提供索引和搜索功能，在所有节点，一个集群有一个唯一的名称默认为 elasticsearch，当节点被设置为相同的集群名称中，就会自动加入集群，当需要有多个集群的时候，需要确保每个集群的名称不能重复，否则节点可能加入错误的集群，一个节点只能添加一个集群。当有节点加入集群中或者从集群中移除节点时，集群将会重新平均分布所有的数据。

### Node

节点是组成 ES 集群的基本单位，一个节点就是一个 ES 服务的实例，也可以理解为一个 es 的进程，每个物理机器上可以有多个节点，使用不同的端口和节点名称。每个节点可以配置不同的角色。

当一个节点被选举成为 主节点 时， 它将负责管理集群范围内的所有变更，例如增加、删除索引，或者增加、删除节点等。 而主节点并不需要涉及到文档级别的变更和搜索等操作，所以当集群只拥有一个主节点的情况下，即使流量的增加它也不会成为瓶颈。 任何节点都可以成为主节点。

### Roles

在高可用系统架构中，节点角色发挥着至关重要的作用，如果前期没有对业务系统和技术架构做足准备，没有充分考虑后期的扩展问题，是比会为将来的性能优化留下潜在问题。

常见的角色：

- 主节点（active master）：活跃的主节点，一个集群中的只能有一个，主要对集群的管理。
- 候选节点（master eligible）：当主节点发生故障时，能够参与选举，是主节点的替代节点，直接在配置文件中配置 node.roles 为 master。
- 数据节点（data node）：数据节点保存包含已编入索引的文档的分片，数据节点处理数据相关操作，如 CURD、搜索和聚合。这些操作是 I/O 密集型、内存密集型和 CPU 密集型的。监控这些资源并在它们过载的时候添加更所的数据节点非常重要。
- 预处理节点（ingset node）：预处理节点有点类似于 logstash 的消息管道，所以也叫 ingset pippline，常用于一些数据写入之前的预处理操作，如垃圾数据的过滤等。

默认情况下，node.roles 是没有配置，为注释状态，那么当前节点具备所有角色状态。8.x 版本配置文件中修改： node.roles:[master, data, xxx]，角色配置项参考官网 节点角色。

### Shard

分片就是把一份数据分散的存储到不同的节点上，分为 主分片(Primary shard) 和 副本分片(Replica shard)：

- 主分片（Primary shard）：用于解决数据水平扩展的问题，通过主分片，可以将数据分布到集群内的所有节点之上，将一份索引数据划分为多小份的能力，允许水平分割和扩展容量。多个分片可以响应请求，提高性能和吞吐量。一个节点(Node)一般会管理多个分片，分片有两种，主分片和副本分片。
- 副本分片（Replica shard）：副本分片只是一个主分片的拷贝。 副本分片作为硬件故障时保护数据不丢失的冗余备份，从而提高整个集群的容错性，并为搜索和返回文档等读操作提供服务，且需要注意的是副本分片不能与主分片在同一个节点。。一般来说，Elasticsearch 会尽量把一个索引的不同分片存储在不同的主机上，分片的副本也尽可能存在不同的主机上，这样可以提高容错率，从而提高高可用性。

一个索引（Index）数据在物理上被分布在一个或多个主分片中，每个主分片只存放部分数据，每个主分片可以有多个副本。

- 主分片的作用是对索引的扩容，使一个索引的容量可以突破单机的限制。
- 副本分片是对数据的保护，每个主分片对应一个或多个副本分片，当主分片所在节点宕机时，副本分片会被提升为对应的主分片使用。
- 一个主分片和它的副本分片，不会分配到同一个节点上。
- 一个分片就是一个 Lucene 实例，并且它本身就是一个完整的搜索引擎。应用程序不会和它直接通信，ES 会自动管理集群中的所有分片，当发生故障的时候会把分片移动到不同的节点或者添加新节点。
- 在 7.0 之前默认五个主分片，每个主分片一个副本；在 7.0 之后默认一个主分片。
- 当索引创建完成的时候，主分片的数量就固定了，如果要修改需要重建索引，代价很高，如果要修改则需 Reindex，但是复制分片的数量可以随时调整。

### 集群健康

Elasticsearch 的集群监控信息中包含了许多的统计数据，其中最为重要的一项就是 集群健康 ， 它在 status 字段中展示为 green 、yellow 或者 red 。status 字段指示着当前集群在总体上是否工作正常。它的三种颜色含义如下：

- green：所有的主分片和副本分片都正常运行。
- yellow：所有的主分片都正常运行，但不是所有的副本分片都正常运行。
- red：有主分片没能正常运行。

```json
GET /_cluster/health
{
   "cluster_name":          "elasticsearch",
   "status":                "green",
   "timed_out":             false,
   "number_of_nodes":       1,
   "number_of_data_nodes":  1,
   "active_primary_shards": 0,
   "active_shards":         0,
   "relocating_shards":     0,
   "initializing_shards":   0,
   "unassigned_shards":     0
}
```

### 空节点

如果我们启动了一个单独的节点，里面不包含任何的数据和索引，那我们的集群看起来如下图：

![ES master](https://assets.moweilong.com/img/20231027174705.png)

当一个节点被选举成为 主节点 时，它将负责管理集群范围内的所有变更，例如增加、删除索引，或者增加、删除节点等。当一个节点被选举成为 主节点 时，它将负责管理集群范围内的所有变更，例如增加、删除索引，或者增加、删除节点等。而主节点并不需要涉及到文档级别的变更和搜索等操作，所以当集群只拥有一个主节点的情况下，即使流量的增加它也不会成为瓶颈。任何节点都可以成为主节点。

### 单节点

对索引还不了解的话可以先看看下面的索引部分操作。

让我们在包含一个空节点的集群内创建名为 blogs 的索引。 7.0 之后索引在默认情况下会被分配 1 个主分片和 1 个副分片， 但是为了演示目的，我们将分配 3 个主分片和一份副本（每个主分片拥有一个副本分片）：

```json
PUT /blogs
{
   "settings" : {
      "number_of_shards" : 3,
      "number_of_replicas" : 1
   }
}
```

![ES 单节点](https://assets.moweilong.com/img/20231027174713.png)

查看集群健康：

```json
GET /_cluster/health
{
  "cluster_name": "elasticsearch",
  "status": "yellow",
  "timed_out": false,
  "number_of_nodes": 1,
  "number_of_data_nodes": 1,
  "active_primary_shards": 3,
  "active_shards": 3,
  "relocating_shards": 0,
  "initializing_shards": 0,
  "unassigned_shards": 3,
  "delayed_unassigned_shards": 0,
  "number_of_pending_tasks": 0,
  "number_of_in_flight_fetch": 0,
  "task_max_waiting_in_queue_millis": 0,
  "active_shards_percent_as_number": 50
}
```

集群的健康状况为 yellow 则表示全部 主分片都正常运行（集群可以正常服务所有请求），但是 副本分片没有全部处在正常状态。 实际上，所有 3 个副本分片都是 unassigned —— 它们都没有被分配到任何节点。 在同一个节点上既保存原始数据又保存副本是没有意义的，因为一旦失去了那个节点，我们也将丢失该节点上的所有副本数据。

当前我们的集群是正常运行的，但是在硬件故障时有丢失数据的风险。

### 追加节点

当集群中只有一个节点在运行时，意味着会有一个单点故障问题——没有冗余。 幸运的是，我们只需再启动一个节点即可防止数据丢失。

如果启动了第二个节点，我们的集群将会如下所示：

![ES 追加节点](https://assets.moweilong.com/img/20231027174724.png)

当第二个节点加入到集群后，3 个 副本分片 将会分配到这个节点上——每个主分片对应一个副本分片。 这意味着当集群内任何一个节点出现问题时，我们的数据都完好无损。

所有新近被索引的文档都将会保存在主分片上，然后被并行的复制到对应的副本分片上。这就保证了我们既可以从主分片又可以从副本分片上获得文档。

cluster-health 现在展示的状态为 green ，这表示所有 6 个分片（包括 3 个主分片和 3 个副本分片）都在正常运行。

```json
GET /_cluster/health
{
  "cluster_name": "elasticsearch",
  "status": "green",
  "timed_out": false,
  "number_of_nodes": 2,
  "number_of_data_nodes": 2,
  "active_primary_shards": 3,
  "active_shards": 6,
  "relocating_shards": 0,
  "initializing_shards": 0,
  "unassigned_shards": 0,
  "delayed_unassigned_shards": 0,
  "number_of_pending_tasks": 0,
  "number_of_in_flight_fetch": 0,
  "task_max_waiting_in_queue_millis": 0,
  "active_shards_percent_as_number": 100
}
```

### 水平扩容

当启动了第三个节点，我们的集群将会看起来如下所示：

![ES 水平扩容之扩容节点](https://assets.moweilong.com/img/20231027174732.png)

Node 1 和 Node 2 上各有一个分片被迁移到了新的 Node 3 节点，现在每个节点上都拥有 2 个分片，而不是之前的 3 个。 这表示每个节点的硬件资源（CPU, RAM, I/O）将被更少的分片所共享，每个分片的性能将会得到提升。

分片是一个功能完整的搜索引擎，它拥有使用一个节点上的所有资源的能力。 我们这个拥有 6 个分片（3 个主分片和 3 个副本分片）的索引可以最大扩容到 6 个节点，每个节点上存在一个分片，并且每个分片拥有所在节点的全部资源。

但是如果我们想要扩容超过 6 个节点怎么办呢？

主分片的数目在索引创建时就已经确定了下来。实际上，这个数目定义了这个索引能够 存储 的最大数据量。（实际大小取决于你的数据、硬件和使用场景。） 但是，读操作（搜索和返回数据）可以同时被主分片 或 副本分片所处理，所以当你拥有越多的副本分片时，也将拥有越高的吞吐量。

在运行中的集群上是可以动态调整副本分片数目的，我们可以按需伸缩集群。让我们把副本数从默认的 1 增加到 2 ：

```json
PUT /blogs/_settings
{
   "number_of_replicas" : 2
}
```

如下图所示， blogs 索引现在拥有 9 个分片：3 个主分片和 6 个副本分片。 这意味着我们可以将集群扩容到 9 个节点，每个节点上一个分片。相比原来 3 个节点时，集群搜索性能可以提升 3 倍。

[]()

![ES 水平扩容之扩容副本分片](https://assets.moweilong.com/img/20231027174741.png)

::: tip
当然，如果只是在相同节点数目的集群上增加更多的副本分片并不能提高性能，因为每个分片从节点上获得的资源会变少。 你需要增加更多的硬件资源来提升吞吐量。

但是更多的副本分片数提高了数据冗余量：按照上面的节点配置，我们可以在失去 2 个节点的情况下不丢失任何数据。
:::

### 应对故障

我们之前说过 Elasticsearch 可以应对节点故障，接下来让我们尝试下这个功能。 如果我们关闭第一个节点，这时集群的状态如下：

![ES 应对故障](https://assets.moweilong.com/img/20231027174845.png)

我们关闭的节点是一个主节点。而集群必须拥有一个主节点来保证正常工作，所以发生的第一件事情就是选举一个新的主节点： Node 2 。

在我们关闭 Node 1 的同时也失去了主分片 1 和 2 ，并且在缺失主分片的时候索引也不能正常工作。 如果此时来检查集群的状况，我们看到的状态将会为 red ：不是所有主分片都在正常工作。

幸运的是，在其它节点上存在着这两个主分片的完整副本， 所以新的主节点立即将这些分片在 Node 2 和 Node 3 上对应的副本分片提升为主分片， 此时集群的状态将会为 yellow 。 这个提升主分片的过程是瞬间发生的，如同按下一个开关一般。

为什么我们集群状态是 yellow 而不是 green 呢？ 虽然我们拥有所有的三个主分片，但是同时设置了每个主分片需要对应 2 份副本分片，而此时只存在一份副本分片。 所以集群不能为 green 的状态，不过我们不必过于担心：如果我们同样关闭了 Node 2 ，我们的程序 依然 可以保持在不丢任何数据的情况下运行，因为 Node 3 为每一个分片都保留着一份副本。

如果我们重新启动 Node 1 ，集群可以将缺失的副本分片再次进行分配，那么集群的状态也将如 `水平扩容` 的第二张图所示。 如果 Node 1 依然拥有着之前的分片，它将尝试去重用它们，同时仅从主分片复制发生了修改的数据文件。

## 索引数据

Elasticsearch 使用 JSON 作为文档的序列化格式，分布式的 文档 存储。它能以实时的方式存储和检索复杂的数据结构 —​ 序列化成为 JSON 文档 。 换句话说，一旦一个文档被存储在 Elasticsearch 中，它就是可以被集群中的任意节点检索到。

在 Elasticsearch 中，每个字段的所有数据都是默认被索引的。 即每个字段都有为了快速检索设置的专用 倒排索引。而且，不像其他多数的数据库，它能在同一个查询中使用所有这些倒排索引，并以惊人的速度返回结果。

为什么选择 JSON 格式？ 我们经常会遇到下面这种情况：

现实中一个人可能有一个家庭电话号码，而另一个人只有一个手机号码，再一个人可能两者兼有。 一个人可能有三个电子邮件地址，而另一个人却一个都没有。一位西班牙人可能有两个姓，而讲英语的人可能只有一个姓。

面向对象编程语言中的对象可以帮我们表示和处理这种复杂的数据结构的实体对象，但是当我们需要存储这些实体对象时问题来了，传统上，我们以行和列的形式存储数据到关系型数据库中，相当于使用电子表格。 正因为我们使用了这种不灵活的存储媒介导致所有我们使用对象的灵活性都丢失了。

而 JSON 就是一种以人可读的文本表示对象的方法，它已经变成 NoSQL 世界交换数据的事实标准。当一个对象被序列化成为 JSON，它被称为一个 JSON 文档 。JSON 序列化被大多数编程语言所支持，并且已经成为 nosql 领域的标准格式，简单、简洁、易于阅读。

为了方便理解下面的数据结构，我们把 Elasticsearch 与关系型数据库 MySQL 做下简单类比：
|Elasticsearch 8.x| MySQL|
|---|---|
|Index（索引）|Table（数据表）|
|Type（类型）废弃||
|Dcoument（文档）|Row（行）|
|Mapping（映射）|Schema|
|Fields（字段）|Column（列）|

::: tip
ES7.X 之后不推荐使用 type 类型，8.0 之后不能使用 type。
:::

Segment：段，分片的 Lucene 由多个子索引（Lucene.index）组成，这些子索引就是段。每个段都包含索引文件和数据文件

### Index

ES 中的索引有三种概念：

- 表示源文件数据：当做数据的载体，即类比为数据表，通常称作 index。例如：通常说及群众有 product 索引，即表述在 ES 的服务中存储了 product 这样一张“表”。
- 表示索引文件：以加速查询检索为目的而设计和创建的数据文件，通常承载与某些特定的数据结构，如哈希、FST 等。例如：通常所说的正排索引和倒排索引（也叫正向索引和反向索引）。就是当前这个表述，索引文件和源数据是完全独立的，索引文件存在的目的仅仅是为了加快数据的检索，不会对源数据造成任何影响。
- 表示创建数据的动作：通常说创建或添加一条数据，在 ES 的表述为索引的一条数据或所以一条文档，或者一个 doc 进去，此时索引一条文档的含义为向索引中添加数据。

### Type 废弃

ES 7.x 之后不推荐使用 type 类型，8.0 之后不能使用 type。

为什么删除 type?

- 逻辑不合理：然而这是错误的类比，官方后来也意识到了这是个错误。在 SQL 数据库中，表是相互独立的。一个表中的列与另一个表中的同名列无关。对于映射类型中的字段，情况并非如此。
- 数据结构混乱：在 Elasticsearch 索引中，不同映射类型中具有相同名称的字段在内部由相同的 Lucene 字段支持。
- 影响性能：最重要的是，在同一索引中存储具有很少或没有共同字段的不同实体会导致数据稀疏并干扰 Lucene 有效压缩文档的能力。

基于以上原因，官方决定从 Elasticsearch 中删除映射类型的概念。

### Document

文档是存储在 ES 中的一个 JSON 格式的字符串，它就像在关系数据库中表的一行，每个存储在索引中的一个文档都有一个类型和一个 ID，每个文档搜狐一个 JSON 对象，类似于数据库中的行。

### Fields

文档中包含零个或多个字段，获取文档时可以指定字段返回。

### Text

文本是一段普通的非结构化文字，通常文本会被拆成一个个的索引词，存储在 elasticsearch 的索引库中，为了让文本能够进行搜索，文本字段需要事先进行分析，当对文本中的关键词进行查询的时候，搜索引擎应该根据搜索条件搜索出原文件。

### Term

在 ES 中索引词（term）是一个能够被索引的精确值，索引的最小单位，是经过分词处理后的字符串。

- 如果是英文，忽略大小写，保存为小写格式，忽略一些无效词（比如 the）；
- 如果是中文，忽略一些无效词（比如“的”）

### Analyze

分析是将文本转换为索引词的过程，分析的结果依赖于分词器。在文档被加入索引之前，ES 让每个被分析字段经过一系列的处理步骤。

- 字符过滤：使用字符过滤器转变字符。
- 文本切分为分词：将文本切分为单个或多个分词。
- 分词过滤：使用分词过滤器转变每个分词。
- 分词索引：将这些分词存储到索引中。

### Mapping

映射就像关系数据库中的表结构，每一个索引都有一个映射，它定义了索引中的每一个字段类型以及一个索引范围内的设置。

ES 中的 mapping 有点类似与关系数据库中 表结构 的概念，在 MySQL 中，表结构里包含了字段名称，字段的类型还有索引信息等。在 Mapping 里也包含了一些属性，比如字段名称、类型、字段使用的分词器、是否评分、是否创建索引等属性，并且在 ES 中一个字段可以有对个类型。

在我们创建索引的时候并不需要设置 mapping，是因为 ES 的映射有自己的默认的映射类型，参考下图：

![ES 映射类型](https://assets.moweilong.com/img/20231027174853.png)

### Routing

当存储一个文档的时候，它会存储在唯一的主分片中，具体哪个分片是通过散列值进行选择。（所以路由就是计算散列值计算需要路由到哪个分片）。

### 路由文档到分片

Elasticsearch 在创建文档时，文档会被存储到一个主分片中，决定这个文档应当被存储哪个分片中肯定不是随机的，否则将来要获取文档的时候我们就不知道从何处寻找了。实际上，这个过程是根据下面这个公式决定的：

```bash
shard = hash(routing) % number_of_primary_shards
```

routing 是一个可变值，默认是文档的 \_id ，也可以设置成一个自定义的值。 routing 通过 hash 函数生成一个数字，然后这个数字再除以 number_of_primary_shards （主分片的数量）后得到 余数 。这个分布在 0 到 number_of_primary_shards-1 之间的余数，就是我们所寻求的文档所在分片的位置。

这就解释了为什么我们要在创建索引的时候就确定好主分片的数量 并且永远不会改变这个数量：因为如果数量变化了，那么所有之前路由的值都会无效，文档也再也找不到了。

所有的文档 API （CURD） 都接受一个叫做 routing 的路由参数 ，通过这个参数我们可以自定义文档到分片的映射。一个自定义的路由参数可以用来确保所有相关的文档——例如所有属于同一个用户的文档——都被存储到同一个分片中。

### 主分片和副本分片如何交互

假设有一个集群由三个节点组成。 它包含一个叫 blogs 的索引，有两个主分片，每个主分片有两个副本分片。相同分片的副本不会放在同一节点，如下图：

![ES 主分片和副本分片如何交互](https://assets.moweilong.com/img/20231027174900.png)

我们可以发送请求到集群中的任一节点。 每个节点都有能力处理任意请求。 每个节点都知道集群中任一文档位置，所以可以直接将请求转发到需要的节点上。 在下面的例子中，将所有的请求发送到 Node 1 ，我们将其称为 协调节点(coordinating node) 。

::: tip
当发送请求的时候， 为了扩展负载，更好的做法是轮询集群中所有的节点。
:::

### 索引和删除文档

索引和删除请求都是写操作， 必须在主分片上面完成之后才能被复制到相关的副本分片，如下图所示：

![ES 索引和删除文档](https://assets.moweilong.com/img/20231027174907.png)
以下是在主副分片和任何副本分片上面 成功索引和删除文档所需要的步骤顺序：

1. 客户端向 Node1 发送新建、索引或者删除请求。
2. 节点使用文档的 `_id` 确定文档属于分片 0 。请求会被转发到 Node3，因为分片 0 的主分片目前被分配在 Node3 上。
3. Node3 在主分片上面执行请求。如果成功了，它将请求并行转发到 Node1 和 Node2 的副本分片上。一旦所有的副本分片都报告成功, Node3 将向协调节点报告成功，协调节点向客户端报告成功。

在客户端收到成功响应时，文档变更已经在主分片和所有副本分片执行完成，变更是安全的。

### 取回文档

可以从主分片或者从其它任意副本分片检索文档 ，如下图所示：

![ES 取回文档](https://assets.moweilong.com/img/20231027175019.png)

以下是从主分片或者副本分片检索文档的步骤顺序：

1. 客户端向 Node1 发送获取请求。
2. 节点使用文档的 `_id` 来确定文档属于分片 0 。分片 0 的副本分片存在于所有的三个节点上。 在这种情况下，它将请求转发到 Node2 。
3. Node2 将文档返回给 Node1 ，然后将文档返回给客户端。

在处理读取请求时，协调结点在每次请求的时候都会通过轮询所有的副本分片来达到负载均衡。

在文档被检索时，已经被索引的文档可能已经存在于主分片上但是还没有复制到副本分片。 在这种情况下，副本分片可能会报告文档不存在，但是主分片可能成功返回文档。 一旦索引请求成功返回给用户，文档在主分片和副本分片都是可用的。

### 局部更新文档

update API 结合了先前说明的读取和写入模式，如下图：

![ES 局部更新文档](https://assets.moweilong.com/img/20231027175024.png)

以下是部分更新一个文档的步骤：

1. 客户端向 Node1 发送更新请求。
2. 它将请求转发到主分片所在的 Node3 。
3. Node3 从主分片检索文档，修改 \_source 字段中的 JSON ，并且尝试重新索引主分片的文档。 如果文档已经被另一个进程修改，它会重试步骤 3 ，超过 retry_on_conflict 次后放弃。
4. 如果 Node3 成功地更新文档，它将新版本的文档并行转发到 Node1 和 Node2 上的副本分片，重新建立索引。 一旦所有副本分片都返回成功， Node3 向协调节点也返回成功，协调节点向客户端返回成功。

:::tip
基于文档的复制：当主分片把更改转发到副本分片时， 它不会转发更新请求。 相反，它转发完整文档的新版本。请记住，这些更改将会异步转发到副本分片，并且不能保证它们以发送它们相同的顺序到达。 如果 Elasticsearch 仅转发更改请求，则可能以错误的顺序应用更改，导致得到损坏的文档。
:::

### 多文档模式

ES 提供了两个批量操作的 API：mget 和 bulk API，类似于单文档模式。区别在于协调节点知道每个文档存在于哪个分片中。 它将整个多文档请求分解成`每个分片`的多文档请求，并且将这些请求并行转发到每个参与节点。

**使用 mget 取回多个文档：**

协调节点一旦收到来自每个节点的应答，就将每个节点的响应收集整理成单个响应，返回给客户端，如下图所示。

![ES mget 取回多个文档](https://assets.moweilong.com/img/20231027175030.png)

以下是使用单个 mget 请求取回多个文档所需的步骤顺序：

1. 客户端向 Node1 发送 mget 请求。
2. Node1 为每个分片构建多文档获取请求，然后并行转发这些请求到托管在每个所需的主分片或者副本分片的节点上。一旦收到所有答复， Node1 构建响应并将其返回给客户端。
3. 可以对 docs 数组中每个文档设置 routing 参数。

**使用 bulk 修改多个文档：**

bulk API：允许在单个批量请求中执行多个创建、索引、删除和更新请求，如下图所示：

![ES bulk 修改多个文档](https://assets.moweilong.com/img/20231027175057.png)

bulk API 按如下步骤顺序执行：

1. 客户端向 Node1 发送 bulk 请求。
2. Node1 为每个节点创建一个批量请求，并将这些请求并行转发到每个包含主分片的节点主机。
3. 主分片一个接一个按顺序执行每个操作。当每个操作成功时，主分片并行转发新文档（或删除）到副本分片，然后执行下一个操作。 一旦所有的副本分片报告所有操作成功，该节点将向协调节点报告成功，协调节点将这些响应收集整理并返回给客户端。
