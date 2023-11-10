---
order: 5
tags:
  - elasticsearch基础
categories:
  - elasticsearch
columns:
  - null
title: 字段映射类型测试
date: 2023-11-10 17:10:25
---

# 字段映射类型测试

映射字段类型时我们都需要去设置映射参数，更多用法查看[官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-params.html)。下面对映射参数简单整理出一个表格，方便查看：

| 参数                   | 作用                                                                                                                                                                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| analyzer               | 定义文本字段的分词器，默认对索引和查询都是有效的。默认分词器使用的关键字分词，英文和汉字都会分成一个个，这是当我们使用 term 只能匹配单个关键字，我们需要根据需求去设置分词器。                                                                        |
| coerce                 | 强制尝试清除脏值以适合字段的数据类型，默认为 true，可以将字符串强制转换为数字和浮点将被截断为整数值。例：设置数字为 integer 类型，存入字符串 “1”，文档依然可以创建，如果设置成 false，则必须传入 integer 类型。                                       |
| copy_to                | 可以将多个字段的值，复制到同一个字段中。                                                                                                                                                                                                              |
| doc_values             | 支持排序、聚合 会占用额外存储空间，与 source 独立，同时开启 doc_values 和 \_source 则会将该字段原始内容保存两份。doc_values 数据在磁盘上采用列式存储，关闭后无法使用排序和聚合。                                                                      |
| dynamic                | 动态映射，默认 true。自动设置字段类型。                                                                                                                                                                                                               |
| eager_global_ordinals  | 提升高基数聚合性能，默认 false。开启会影响写入性能，适用场景：高基数聚合 。高基数聚合场景中的高基数含义：一个字段包含很大比例的唯一值。                                                                                                               |
| enabled                | 是否对该字段进行索引，默认 true。ES 默认会索引所有的字段，但是有的字段可能只需要存储，不需要索引。关闭后，只在 \_source 中存储。                                                                                                                      |
| format                 | 日期格式。format 可以规范日期格式，而且一次可以定义多个 format。                                                                                                                                                                                      |
| ignore_above           | 用于指定分词和索引的字符串最大长度，超过最大长度的话，该字段将不会被索引，这个字段只适用于 keyword 类型。                                                                                                                                             |
| ignore_malformed       | 忽略格式不对的数据，默认 false。                                                                                                                                                                                                                      |
| index                  | 字段是否被索引，默认 true。关闭后无法对其进行搜索，但字段仍会存储到 \_source 和 doc_values，字段可以被排序和聚合。                                                                                                                                    |
| index_options          | 控制索引时哪些信息被存储到倒排索引中（用在 text 字段中），可设置：docs（默认，只存储文档编号），freqs（在 docs 基础上，存储词项频率），positions（在 freqs 基础上，存储词项偏移位置），offsets（在 positions 基础上，存储词项开始和结束的字符位置）。 |
| index_phrases          | 将两个词的组合词索引到一个单独的字段中。默认 false。                                                                                                                                                                                                  |
| index_prefixes         | 为字段值的前缀编制索引，以加快前缀搜索速度。                                                                                                                                                                                                          |
| meta                   | 附加到字段的元数据。                                                                                                                                                                                                                                  |
| fields                 | 为不同的目的以不同的方式对同一字段建立索引。                                                                                                                                                                                                          |
| normalizer             | 用于解析前（索引或者查询）的标准化配置，可以在索引和查询时，分别对文档进行预处理，比如索引和查询单词全部小写。                                                                                                                                        |
| norms                  | 用于计算查询的文档分数，默认 true。对于仅用于过滤或聚合的字段，不需要对字段进行打分排序时设置为 false。                                                                                                                                               |
| null_value             | 使用指定的值替换为 null 值，以便可以进行索引和搜索。                                                                                                                                                                                                  |
| position_increment_gap | 当为具有多个值的文本字段建立索引时，将在值之间添加“假”间隙，以防止大多数短语查询在值之间进行匹配，默认值为 100。                                                                                                                                      |
| properties             | 类型映射，object 字段和 nested 字段包含子字段叫 properties。                                                                                                                                                                                          |
| search_analyzer        | 查询时候的分词器。默认情况下，如果没有配置 search_analyzer，则查询时，首先查看有没有 search_analyzer，有的话，就用 search_analyzer 来进行分词，如果没有，则看有没有 analyzer，如果有，则用 analyzer 来进行分词，否则使用 es 默认的分词器。            |
| similarity             | 字段打分的相似性算法，默认 BM25。                                                                                                                                                                                                                     |
| store                  | 单独存储属性值。默认对字段值进行索引以使其可搜索，但不单独存储它们，但是已存储在\_source 字段中。                                                                                                                                                     |
| subobjects             | 8.3 版本以后新增映射参数，默认为 true，用于保留字段名称中的 . ，这些字段将扩展到相应的对象结构。子对象设置为 false 的对象只能保存叶子子字段，而不能保存其他对象。                                                                                     |
| term_vector            | 存储分析过程的词矢量（Term vectors）信息。包括：词、位置、偏移量、有效载荷。                                                                                                                                                                          |

## 核心类型

### 字符串类型

text：

- 会分词，然后进行索引，用于全文搜索。
- 支持模糊、精确查询
- 不支持聚合

keyword：

- 不进行分词，直接索引，keyword 用于关键词搜索
- 支持模糊、精确查询
- 支持聚合

有时候对同一字段同时使用 text 和 keyword 两种类型会很有用 ：一个用于全文搜索和其他用于聚合和排序。

#### text

[官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/text.html)

文本字段最适合非结构化但可读的内容，比如 Email 内容、产品描述，应该使用 text 类型。当一个字段设置 text 类型以后，字段内容会被分析，字符串会被分析器分成一个一个词项，生成倒排索引。text 类型的字段不用于排序，很少用于聚合。

```json
//请求
PUT test
{
  "mappings": {
    "properties": {
      "address": {
        "type":  "text"
      }
    }
  }
}
//返回：
{
  "acknowledged": true,
  "shards_acknowledged": true,
  "index": "test"
}
```

ES 自动为 字符串类型添加 text 和 keyword 类型：

```json
//添加数据：
POST test/_doc/1
{
  "address": "江苏省苏州市苏州工业园区"
}

//查看映射：
GET test/_mapping
{
  "test": {
    "mappings": {
      "properties": {					// 定义属性关键字
        "address": {					// 声明字段
          "type": "text",				// 声明字段类型
          "fields": {					// 多字段属性
            "keyword": {				// 多字段属性名，可使用 address.keyword 进行操作
              "type": "keyword",		// 声明字段类型
              "ignore_above": 256		// 索引最大程度，超过不被索引
            }
          }
        }
      }
    }
  }
}
```

##### synthetic source 源数据合成重建

倒排索引可以提供全文检索能力，但是无法提供对排序和数据聚合的支持。`doc_values` 本质上是一个序列化的列式存储结构，适用于聚合（aggregations）、排序（Sorting）、脚本（scripts access to field）等操作。默认情况下，ES 几乎会为所有类型的字段存储 `doc_value`，但是 text 或 text_annotated 等可分词字段不支持 `doc values` 。如果不需要对某个字段进行排序或者聚合，则可以关闭该字段的 `doc_value` 存储。

ES 为了存储原始数据，设计了 `_source` 来存储， 为了解决设计排序与聚合统计，又设计了 `doc_values` 存储对应的列，这造成了数据重复存储，现在通过混合方式，重建构建 source，部分数据可以来自 列式 doc_values，这会显著节约索引存储占用。

```json
// 设置 synthetic 模式
PUT test
{
  "mappings": {
    "_source": { "mode": "synthetic" },
    "properties": {
      "address": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword"
          }
        }
      }
    }
  }
}
//添加数据：
PUT test/_doc/1
{
  "address": [
    "address 11",
    "address 11",
    "address 222"
  ]
}
//查询文档,数据会被去重：
GET test/_source/1
{
  "address": [
    "address 11",
    "address 222"
  ]
}
```

如果文本字段将 store 设置为 true，则保留顺序和重复项：

```json
PUT test
{
  "mappings": {
    "_source": { "mode": "synthetic" },
    "properties": {
      "address": {
        "type": "text",
        "store": true 		// 字段是否要被单独存储
      }
    }
  }
}
//添加数据：
PUT test/_doc/1
{
  "address": [
    "address 11",
    "address 11",
    "address 222"
  ]
}
//查询文档：
GET test/_source/1
{
  "address": [
    "address 11",
    "address 11",
    "address 222"
  ]
}
```

##### fielddata 映射参数

默认情况下，文本字段是可搜索的，但默认情况下不可用于聚合、排序或脚本编写。

`fielddata` 默认是关闭的，映射时在你的字段上设置 `"fielddata": true`，以便通过取消倒排索引将 `fielddata` 加载到内存中。注意，这可能会占用大量内存。

```json
PUT <index>/_mapping
{
  "properties": {
    "my_field": {
      "type":     "text",
      "fielddata": true
    }
  }
}
```

在 `text` 字段上启用 `fielddata` 通常没有意义。因为 `fielddata` 与 `fielddata 缓存` 一起存储在堆中，计算起来很昂贵。计算 `fielddata` 会导致延迟峰值，而堆使用率的增加会导致集群性能问题。

大多数希望对 `text` 字段进行更多操作的用户都使用 `fields` 多字段映射，既有用于全文搜索的文本字段，也有用于聚合的未分析关键字字段。

### keyword

[官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/keyword.html)

keyword 用于结构化内容，如 ID、电子邮件地址、主机名、状态码、邮政编码或标记。通常用来排序(sorting)、聚合(aggregations)和 term-level 查询，例如 `term`。

#### synthetic source 源数据合成重建

keyword 的 synthetic 模式和 text 是一样的：

```json
//设置映射：
PUT test
{
  "mappings": {
    "_source": { "mode": "synthetic" },
    "properties": {
      "address": {
        "type": "keyword"
      }
    }
  }
}
//添加数据：
PUT test/_doc/1
{
  "address": [
    "address 11",
    "address 11",
    "address 222"
  ]
}
//查询文档,数据会被去重：
GET test/_source/1
{
  "address": [
    "address 11",
    "address 222"
  ]
}
```

如果文本字段将 store 设置为 true，则保留顺序和重复项。

#### ignore_above 忽略

长度超过 ignore_above 设置的字段文档会被存储，但不会被索引。

```json
//设置映射：
PUT test
{
  "mappings": {
    "properties": {
      "name": {
        "type": "keyword",
        "ignore_above": 10
      }
    }
  }
}

//添加数据：
POST test/_doc/1
{
  "name": "abcdefghijklmn"
}

//搜索数据：
GET /test/_search
{
  "query": {
    "term": {
      "name": "a"
    }
  }
}
//索引不到结果：
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
      "value": 0,
      "relation": "eq"
    },
    "max_score": null,
    "hits": []
  }
}

//查询文档：
GET test/_source/1
{
  "name": "abcdefghijklmn"
}
```

#### constant keyword 常量关键字

constant_keyword 是索引中所有文档都具有相同值的情况下关键字字段的特例。

constant_keyword 支持与 keyword 字段相同的查询和聚合，但利用所有文档每个索引具有相同值的事实来更有效地执行查询。允许提交没有字段值或值等于映射中配置的值的文档。

```json
//设置映射：
PUT test
{
  "mappings": {
    "properties": {
      "message": {
        "type": "text"
      },
      "level": {
        "type": "constant_keyword",
        "value": "debug"
      }
    }
  }
}

//添加数据：
POST test/_doc
{
  "message": "Starting up Elasticsearch 1",
  "level": "debug"
}
POST test/_doc
{
  "message": "Starting up Elasticsearch 2"
}

//搜索：
GET /test/_search
{
  "query": {
    "match": {
      "level": "debug"
    }
  }
}
//两个文档都会被索引到
{
  "took": 36,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 2,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "test",
        "_id": "T62Lz4YBD3T716op1iuU",
        "_score": 1,
        "_source": {
          "message": "Starting up Elasticsearch 1",
          "level": "debug"
        }
      },
      {
        "_index": "test",
        "_id": "UK2Lz4YBD3T716op3CtV",
        "_score": 1,
        "_source": {
          "message": "Starting up Elasticsearch 2"
        }
      }
    ]
  }
}
```

当第一个文档里定义的 `level` 的值为 `debug`，那么之后所有的文档将视 `debug` 为索引 `test` 字段 `level` 的默认值。设置映射时如果没有设置 `value` 值，那么第一个文档中的 `value` 就是默认值。

#### wildcard 通配符

`wildcard` 字段类型是一个专门的 `keyword` 字段，用于非结构化机器生成的内容，你计划使用 `grep-like` 的 wildcard 和 regexp 查询进行搜索。wildcard 类型针对具有大值或高基数的字段进行了优化。

在内部，wildcard 字段使用 `ngrams` 索引整个字段值，并存储完整字符串。索引用作粗过滤器，通过检索和检查完整值来减少随后检查的值的数量。此字段特别适合在日志行上运行类似 `grep` 的查询。`存储成本通常低于 keyword 字段的存储成本`，但在完整术语上精确匹配的搜索速度较慢。如果字段值共享许多前缀，例如同一网站的 URL，则 wildcard 字段的存储成本可能高于等效 keyword 字段。

```json
//映射：
PUT test
{
  "mappings": {
    "properties": {
      "address": {
        "type": "wildcard"
      }
    }
  }
}

//添加数据
POST test/_doc/1
{
  "address" : "江苏省苏州市苏州工业园区"
}

//搜索文档
GET /test/_search
{
  "query": {
    "wildcard": {
      "address": "*苏州*"
    }
  }
}
//匹配结果：
{
  "took": 5,
  "timed_out": false,
  "_shards": {
    "total": 1,
    "successful": 1,
    "skipped": 0,
    "failed": 0
  },
  "hits": {
    "total": {
      "value": 1,
      "relation": "eq"
    },
    "max_score": 1,
    "hits": [
      {
        "_index": "test",
        "_id": "1",
        "_score": 1,
        "_source": {
          "address": "江苏省苏州市苏州工业园区"
        }
      }
    ]
  }
}
```

wildcard 字段与 keyword 字段一样是未排序的，因此不支持依赖于单词位置的查询，例如短语(phrase)查询。

运行 wildcard 查询时，将忽略任何重写参数。得分总是一个恒定的分数。
