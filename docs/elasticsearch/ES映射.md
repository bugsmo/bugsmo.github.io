---
order: 4
tags:
  - elasticsearch基础
categories:
  - elasticsearch
columns:
  - null
title: ES 映射
date: 2023-11-10 12:18:26
---

# ES 映射

## 映射（Mapping）简介

`映射（Mapping）` 是定义文档及其包含的字段如何存储和索引的过程。

每个文档都是字段的集合，每个字段都有自己的数据类型。映射数据时，创建映射定义，其中包含与文档相关的字段列表，决定字段使用什么分词器解析，是否有子字段等。映射定义还包括元数据字段，如`_source` 字段，用于自定义如何处理文档的关联元数据。

| Elasticsearch 8.x | MySQL           |
| ----------------- | --------------- |
| Index（索引）     | Table（数据表） |
| Dcoument（文档）  | Row（行）       |
| Fields（字段）    | Column（列）    |

在 ES 7.0.0 之前，映射定义包含一个类型名。ES 7.0.0 及更高版本不再接受默认映射。请参见 [删除映射类型](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/removal-of-types.html#_what_are_mapping_types)。

ES 使用 `动态映射` 和 `显式映射` 来定义数据。

动态映射（Dynamic mapping）：可以根据写入文档的内容，来推断字段和数据类型，创建索引结构。
显式映射（Explicit mapping）：不希望使用默认值的字段，或获得对创建字段的更大控制，可以允许 ES 动态添加修改其他字段。

查看索引的映射：可以使用 [获取映射](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/indices-get-mapping.html) API 查看 现有索引。

语法：

```json
GET /<index>/_mapping
```

```json
{
  "infra_percona-xtradb-cluster": {
    "mappings": {
      "properties": {
        "@timestamp": {
          "type": "date"
        },
        "file": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "log": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        }
      }
    }
  }
}
```

## 动态映射（Dynamic mapping）

自动检测和添加新字段称为 `动态映射`。可以自定义动态映射规则以适合您的情况 目的：

- 动态字段映射：管理动态字段检测的规则。
- 动态模板：用于配置动态添加字段映射的自定义规则。

### 动态字段映射

当 ES 检测到文档中的新字段时，默认情况下会将该字段动态添加到类型映射中。dynamic 参数控制此行为，通过将参数 dynamic 设置为 true 或 runtime，您可以明确指示 ES 根据传入的文档动态创建字段。

| dynamic 参数 | 意义                                                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| true         | 新字段被添加到映射中（默认）。                                                                                                    |
| runtime      | 新字段作为运行时字段添加到映射中。这些字段未编入索引，而是查询时加载在 `_source` 中。                                             |
| false        | 新字段被忽略。这些字段将不会被索引或搜索，但仍会出现在 `_source` 返回的匹配字段中。这些字段不会添加到映射中，必须显式添加新字段。 |
| strict       | 如果检测到新字段，则会引发异常并拒绝文档。必须将新字段显式添加到映射中。                                                          |

启用动态字段映射后，ES 使用下表中的规则来确定如何映射每个字段的数据类型，下表中的字段数据类型是 ES 动态检测的唯一字段数据类型，所有其他数据类型必须显式映射。

| JSON data type                   | "dynamic":"true"               | "dynamic":"runtime"           |
| -------------------------------- | ------------------------------ | ----------------------------- |
| null                             | 不添加字段映射                 | 不添加字段映射                |
| true or false                    | boolean                        | boolean                       |
| double                           | float                          | double                        |
| long                             | long                           | long                          |
| object                           | object                         | No field added                |
| array                            | 取决于数组中的第一个非值 null  | 取决于数组中的第一个非值 null |
| 通过日期检测的字符串             | date                           | date                          |
| 通过数值检测的字符串             | float or long                  | double or long                |
| 未通过日期检测或数值检测的字符串 | text with a .keyword sub-field | keyword                       |

#### 日期检测

如果启用日期检测 `date_detection`（默认），则选中新字符串字段以查看其内容是否与 `dynamic_date_formats` 中指定的任何日期模式匹配。如果找到匹配项，则新的日期字段为 添加了相应的格式。

dynamic_date_formats 默认值为：

```json
[ “strict_date_optional_time”,"yyyy/MM/dd HH:mm:ss Z||yyyy/MM/dd Z"]
```

strict_date_optional_time 是 date_optional_time 的严格级别，这个严格指的是年份、月份、天必须分别以 4 位、2 位、2 位表示，不足两位的话第一位需用 0 补齐。

##### 禁用日期检测

可以通过设置为：`date_detection:false`。

```json
PUT <index>
{
  "mappings": {
    "date_detection": false
  }
}
```

开始测试：

```json
DELETE test2			# 删除之前的测试索引
PUT test2				# 禁用日期检测
{
  "mappings": {
    "date_detection": false
  }
}
PUT /test2/_doc/1 		# 索引文档

{
  "time": "2020/10/01"
}

//请求：
GET /test2/_mapping 	# 查看映射,time 类型变为 text 了
{
  "test2" : {
    "mappings" : {
      "date_detection" : false,
      "properties" : {
        "time" : {
          "type" : "text",
          "fields" : {
            "keyword" : {
              "type" : "keyword",
              "ignore_above" : 256
            }
          }
        }
      }
    }
  }
}
```

##### 自定义检测到的日期格式

或者，你可以设置 `dynamic_date_formats` 定制想要的 自己的日期格式：

```json
PUT <index>
{
  "mappings": {
    "dynamic_date_formats": ["MM/dd/yyyy"]
  }
}
```

测试：

```json
// 准备：
DELETE test2
PUT test2
{
  "mappings": {
    "dynamic_date_formats": ["yyyy-MM-dd"]
  }
}
PUT /test2/_doc/1
{
  "time": "2020-10-01"
}

// 查看映射：
GET /test2/_mapping
{
  "test2" : {
    "mappings" : {
      "dynamic_date_formats" : [
        "yyyy-MM-dd"
      ],
      "properties" : {
        "time" : {
          "type" : "date",
          "format" : "yyyy-MM-dd"
        }
      }
    }
  }
}
```

#### 数值检测

虽然 JSON 支持本机浮点和整数数据类型，但一些 应用程序或语言有时可能会将数字呈现为字符串。通常 正确的解决方案是显式映射这些字段，但 `数字检测默认情况下禁用`，想要启用使用以下操作：

```json
PUT <index>
{
  "mappings": {
    "numeric_detection": true
  }
}
```

测试：

```json
// 准备
DELETE test2
PUT test2
{
  "mappings": {
    "numeric_detection": true
  }
}
PUT /test2/_doc/1
{
  "test_int": "100",
  "test_float": "100.01"
}

// 查看映射类型
GET /test2/_mapping
{
  "test2": {
    "mappings": {
      "numeric_detection": true,
      "properties": {
        "test_float": {
          "type": "float"			# test_float 自动映射为 float 类型
        },
        "test_int": {
          "type": "long"			# test_int 自动映射为 long 类型
        }
      }
    }
  }
}
```

### 动态模板

`动态模板（Dynamic templates）` 允许您更好地控制 ES 如何将数据映射到默认的动态字段映射规则之外，通过将参数 dynamic 设置为 true 或 runtime，可以启用动态映射。然后，您可以使用动态模板定义自定义映射，这些映射可以根据匹配条件应用于动态添加的字段。

::: tip
只有当字段包含具体值时，才会添加动态字段映射。当字段包含 null 或空数组时，ES 不会添加动态字段映射。如果在 dynamic_template 中使用了 null_value 选项，则只有在为字段指定了具体值的第一个文档编制索引后，才会应用该选项。
:::

详细内容参考：[动态模板示例](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/dynamic-templates.html#template-examples)。

## 显示映射（Explicit mapping）

您对自己的数据了解比 ES 所能猜到的还要多，因此，虽然 `动态映射（Dynamic mapping）` 对入门很有用，但在某些时候，您可能需要指定自己的 `显式映射（Explicit mapping）`。

创建索引并将字段添加到现有索引时，可以创建字段映射。

### 使用显式映射创建索引

您可以使用创建索引 API 创建具有显式映射的新索引。

当我们创建一份数据查看它的动态映射：

```json
// 1、创建测试文档
POST /test2/_doc/1
{
    "name":"王五",
    "age":1,
    "email": "11111@qq.com"
}

// 2、查看动态映射
GET /test2/_mapping
{
  "test2": {
    "mappings": {
      "properties": {
        "age": {
          "type": "long"
        },
        "email": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        },
        "name": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 256
            }
          }
        }
      }
    }
  }
}
```

动态映射结果：

- age ：默认`long` 类型；但是我们并不需要这么大的长度，目前人类最大年龄是 134 岁，所以设置 short 就够了；
- name ：默认 `text + keyword`；这里的名称只要求 keyword 类型，不分词；
- email ：默认 `text + keyword`；邮箱强制只要求 text 类型，只分词；

::: tip
text ：会分词，先把对象进行分词处理，然后再再存入到 es 中。
keyword：不分词，没有把对象进行分词处理，而是存入了整个对象，这时候等值查询才能查到。
:::

当我们新建一个索引时，我们可以先索引一个文档，去查看映射，复制下来再修改成我们想要的效果。

```json
//设置新索引映射：
//请求：
DELETE test2
PUT /test2
{
  "mappings": {
    "properties": {
      "age": {
        "type": "long"
      },
      "email": {
        "type": "text"
      },
      "name": {
        "type": "keyword"
      }
    }
  }
}
//返回：
{
  "acknowledged": true,
  "shards_acknowledged": true,
  "index": "test2"
}

//查看映射
//请求：
GET /test2/_mapping
//返回：
{
  "test2": {
    "mappings": {
      "properties": {
        "age": {
          "type": "long"
        },
        "email": {
          "type": "text"
        },
        "name": {
          "type": "keyword"
        }
      }
    }
  }
}
```

### 添加新字段到现有映射

可以使用 [更新映射 API](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/indices-put-mapping.html) 添加一个或多个新的字段到现有索引。

测试：为新字段 `address` 添加映射。

```json
//请求：
PUT /test2/_mapping
{
  "properties": {
    "address": {
      "type": "keyword"
    }
  }
}
//返回：
{
  "acknowledged": true
}

//请求：
GET /test2/_mapping
//返回：
{
  "test2": {
    "mappings": {
      "properties": {
        "address": {
          "type": "keyword"
        },
        "age": {
          "type": "long"
        },
        "email": {
          "type": "text"
        },
        "name": {
          "type": "keyword"
        }
      }
    }
  }
}
```

### 更新字段的映射

除了支持的 [映射参数](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-params.html) 外，您不能更改现有字段的映射或字段类型。更改现有字段可能会使已编入索引的数据失效。

如果需要更改其他索引中字段的映射，请使用正确的映射创建一个新索引，然后将数据 [reindex](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/docs-reindex.html) 到该索引中。

重命名字段将使已在旧字段名称下索引的数据无效。相反，添加 [alias](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/field-alias.html) 字段以创建备用字段名。

### 查看特定字段的映射

如果只想查看一个或多个特定字段的映射，则可以使用 [获取字段映射 API](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/indices-get-field-mapping.html)。如果您不需要索引的完整映射，或者索引包含大量字段，这将非常有用。

语法：

```json
GET /<index>/_mapping/field/<field>
```

测试：

```json
//请求：
GET /test2/_mapping/field/email
//返回：
{
  "test2": {
    "mappings": {
      "email": {
        "full_name": "email",
        "mapping": {
          "email": {
            "type": "text"
          }
        }
      }
    }
  }
}
```

## 运行时字段（Runtime fields）

我们知道， 从历史上看，ES 依靠 `写时模式（Schema on write）` 的模式来快速搜索数据。如果一个索引，在一开始是没有定义映射的，那么当我们写入第一个数据时，ES 会根据自己的猜测来给写入的文档的字段定义类型。现在，我们向 ES 添加了 `Schema on read 模式`，以便用户可以灵活地在读取后更改文档的 `schema`，还可以生成仅作为搜索查询一部分存在的字段。这个字段只存在于 read 的时候，也就是在查询的时候。`Schema on read` 和 `Schema on write` 一起为用户提供了选择，可以根据他们的需求来平衡性能和灵活性。

::: tip
**写时模式（Schema on write）**：在写入文档的同时，如果该字段从来没有被创建过，ES 会自动帮我们生产相应的字段 content。
**读时模式（Schema on read）**： 当对数据运行查询时，可以即时创建其他字段。 你不需要提前对数据有深入的了解，也不必预测数据最终可能被查询的所有可能方式。 你可以随时更改数据结构，即使在文档已被索引之后 —— 读时模式的巨大好处。
:::

`Runtime fields` 的使用，让 `Schema on read 模式`成为可能。

::: tip
如果我们想根据日志总结我们的服务投放了多少广告，我们需要先提取这些日志消息相关信息以便进行聚合。

最简单的方法是使用 运行时字段（runtime fields）。 此功能允许你在文档中定义其他字段，即使它们不存在于你发送到 Elasticsearch 的原始值中。
:::

`Runtime field` 也被称为运行时字段。运行时字段是在查询时评估的字段。 运行时字段使你能够：

- 在不重新索引数据的情况下向现有文档添加字段；
- 在不了解数据结构的情况下开始处理数据；
- 在查询时覆盖从索引字段返回的值；
- 为特定用途定义字段而不修改底层 mapping；

::: tip
运行时字段的好处： 因为运行时字段没有索引，所以添加运行时字段不会增加索引大小。 你直接在索引映射中定义运行时字段，从而节省存储成本并提高摄取速度。 当你定义一个运行时字段时，你可以立即在搜索请求、聚合、过滤和排序中使用它，而无需额外重新索引你的数据。

运行时字段的缺点： 每次你对运行时字段运行搜索时，Elasticsearch 都必须再次评估该字段的值，因为它不是你文档中被索引的真实字段。 如果此字段是你打算在将来经常查询的字段，那么你应该考虑将其提取为摄取管道的一部分。
:::

更多参考：

- [ES Doc - runtime](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/runtime.html)
- [Elasticsearch：Runtime fields 及其应用（一）](https://elasticstack.blog.csdn.net/article/details/125308805)
- [Elasticsearch：Runtime fields 及其应用（二）](https://blog.csdn.net/UbuntuTouch/article/details/125331373)

## 元数据字段（Metadata fields）

更新详细内容可参考：

- [Elasticsearch：Metadata fields - 元数据字段介绍](https://blog.csdn.net/UbuntuTouch/article/details/125410952)
- [Elastic Docs › Elasticsearch Guide [8.6] › Mapping › Metadata fields](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-fields.html)

- `_id`：文档的 ID。
- `_index`：文档所属的索引。

文档源元数据字段

- `_source`：表示文档正文的原始 JSON。
- `_size：_source`： 字段的大小（以字节为单位），由 mapper-size 插件提供。
- `_doc_count`：当文档表示预聚合（pre-aggregation）数据时，用于存储文档计数的自定义字段。
- `_field_names`：档中包含非空值的所有字段。
- `_ignored`：由于 ignore_malformed 而在索引时被忽略的文档中的所有字段。
- `_routing`： 将文档路由到特定分片的自定义路由值。
- `_meta`：应用程序特定的元数据，参考 Elasticsearch：添加 metadata 到 mapping 中。
- `_tier`：文档所属索引的当前数据层首选项。

| 分类               | 字段                       |
| ------------------ | -------------------------- |
| 身份元数据字段     | `_id`、`_index`            |
| 文档源元数据字段   | `_source`、`_size`         |
| 文档计数元数据字段 | `_doc_count`               |
| 索引元数据字段     | `_field_names`、`_ignored` |
| 路由元数据字段     | `_routing`                 |
| 其它元数据字段     | `_meta`、`_tier`           |

### `_id`

每个文档都有一个唯一标识它的 `_id`，该 `_id` 被索引，以便可以使用 `GET API` 或 `ids` 查询来查找文档。`_id` 可以在索引时分配，也可以由 ES 生成唯一的 `_id`。该字段在映射中不可配置。

在 `term`、`terms`、`match`、`query_string` 等查询中可以访问 `_id` 字段的值。

```json
GET <index>/_search
{
  "query": {
    "terms": {
      "_id": [ "ID1", "ID2" ]
    }
  }
}
```

也可使用 ids 查询：

```json
GET /_search
{
  "query": {
    "ids" : {
      "values" : ["ID1", "ID2", "ID3", "..."]
    }
  }
}
```

::: tip

- `_id` 字段限制在聚合、排序和脚本中使用。如果需要对 `_id` 字段进行排序或聚合，建议将 `_id` 字段的内容复制到另一个启用了 doc_values 的字段中。
- `_id` 的大小限制为 512 字节，较大的值将被拒绝。
  :::

## `_index`

`_index` 字段允许指定索引去匹配文档。它的值可以在某些查询和聚合中访问，以及在排序或编写脚本时:

```json
GET index_1,index_2/_search
{
  "query": {
    "terms": {
      "_index": ["index_1", "index_2"]  # 查询_index字段，指定索引
    }
  },
  "aggs": {
    "indices": {
      "terms": {
        "field": "_index", 				# 在_index字段上聚合
        "size": 10
      }
    }
  },
  "sort": [
    {
      "_index": { 						# 对_index字段进行排序
        "order": "asc"
      }
    }
  ],
  "script_fields": {
    "index_name": {
      "script": {
        "lang": "painless",
        "source": "doc['_index']" 		# 访问脚本中的_index字段
      }
    }
  }
}
```

`_index` 字段是虚的——它不会作为一个真实的字段添加到 Lucene 索引中。这意味着您可以在一个或多个术语查询(或任何被重写为术语查询的查询，例如 match、query_string 或 simple_query_string 查询，以及`前缀和通配符查询` 中使用 `_index` 字段。但是，它不支持 `regexp` 和 `模糊查询`。

对 `_index` 字段的查询除了接受具体的索引名外，还接受索引别名。

::: tip
当指定远端索引名称时，如 `cluster_1:index_3`，查询时必须包含分隔符 `:`。例如，对 `cluster_*:index_3` 的通配符查询将匹配来自远程索引的文档。但是，对集群 `*index_1` 的查询只匹配本地索引，因为没有分隔符。此行为与远程索引名的通常解析规则一致。
:::

### `_source`（磁盘使用率相关）

`_source` 字段包含在索引时传递的原始 JSON 文档体，就是我们存到 ES 中的内容。`_source` 字段本身没有索引（因此不可搜索），但它被存储，以便在执行获取请求（如 get 或 search）时可以返回。

如果磁盘使用率对您来说很重要，那么查看一下 [synthetic \_source](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-source-field.html#synthetic-source) ，它以仅支持映射子集和较慢的回迁为代价来减少磁盘使用率，或者（不推荐）禁用 [\_source](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-source-field.html#disable-source-field)字段，该字段也会减少磁盘使用量，但会禁用许多功能。

#### synthetic

尽管源字段非常方便，但它占用了磁盘上大量的空间。ES 可以在检索源内容时动态重构源内容，而不是在发送源文档时将其存储在磁盘上。通过在 `_source` 中设置 `mode: synthetic` 来启用此功能:

```json
PUT <index>
{
  "mappings": {
    "_source": {
      "mode": "synthetic"
    }
  }
}
```

虽然这种动态重建通常比逐字保存源文档并在查询时加载它们慢，但它节省了大量存储空间。有几个限制需要注意：

- 当您检索合成的 `_source` 内容时，与原始 JSON 相比，它会进行少量修改。
- 参数`_`源在脚本中不可用。而是使用文档 API 或字段。
- 合成源可以与仅包含以下字段类型的索引一起使用：aggregate_metric_double，boolean，byte，date，date_nanos，dense_vector，double，float，
  geo_point，half_float，histogram，integer，ip，keyword，long，scaled_float，short，text，version，wildcard。

当 `_source` 启用 `synthetic` 时，与原始 JSON 相比，检索到的文档会进行一些修改。

```json
PUT idx/_doc/1
{
  "foo": [
    {
      "bar": 1
    },
    {
      "bar": 2
    }
  ]
}
//结果
{
  "foo": {
    "bar": [1, 2]
  }
}
```

##### 映射时命名的字段

在映射中命名的合成源名称字段。与动态映射一起使用时，默认情况下，名称中带有点 .的字段被解释为多个对象，而字段名称中的点保留在禁用子对象的对象中。例如：

```json
PUT idx/_doc/1
{
  "foo.bar.baz": 1
}
//结果：
{
  "foo": {
    "bar": {
      "baz": 1
    }
  }
}
```

#### 禁用`_source`

```json
PUT <index>
{
  "mappings": {
    "_source": {
      "enabled": false
    }
  }
}
```

::: warning
用户通常会在不考虑后果的情况下禁用`_source`字段，然后后悔不已。如果`_source`字段不可用，那么许多特性都不受支持。

禁用源字段 `_source` 之前请先考虑：

- update、update_by_query 和 reindex API。
- 动态高亮显示。
- 能够从一个 Elasticsearch 索引重新索引到另一个索引，或者更改映射或分析，或者将索引升级到新的主要版本。
- 通过查看索引时使用的原始文档来调试查询或聚合的能力。
- 未来可能会自动修复索引损坏。

:::

#### includes&excludes

一个仅限专家使用的功能是，在文档编制索引之后，但在存储 `_source` 字段之前，可以删除 `_source` 域的内容。

::: tip
从`_source`中删除字段与禁用`_source`有类似的缺点，尤其是不能将文档从一个 Elasticsearch 索引重新索引到另一个索引。请考虑改用源筛选。
:::

```json
PUT logs
{
  "mappings": {
    "_source": {
      "includes": [				// 保留 *.count 和 meta.*，其他字段将从存储的_source字段中删除。
        "*.count",
        "meta.*"
      ],
      "excludes": [ 			// 我们仍然可以搜索该字段，即使它不在存储的_source中。
        "meta.description",
        "meta.other.*"
      ]
    }
  }
}

PUT logs/_doc/1
{
  "requests": {
    "count": 10, // 保留
    "foo": "bar" // 删除
  },
  "meta": {
    "name": "Some metric", // 保留
    "description": "Some metric description", // 删除
    "other": {		// 保留
      "foo": "one", // 删除
      "baz": "two" 	// 删除
    }
  }
}

GET logs/_search
{
  "query": {
    "match": {
      "meta.other.foo": "one"
    }
  }
}
//search结果：
{
  "_index": "logs",
  "_id": "1",
  "_score": 0.2876821,
  "_source": {
    "meta": {
      "other": {},
      "name": "Some metric"
    },
    "requests": {
      "count": 10
    }
  }
}
```

### `_routing`

使用以下公式将文档路由到索引中的特定分片：

```json
routing_factor = num_routing_shards / num_primary_shards
shard_num = (hash(_routing) % num_routing_shards) / routing_factor
```

- `num_routing_shards` 是 `index.number_of_routing_shards` 索引设置的值。
- `num_primary_shards` 是 `index.number_of_shards` 索引设置的值。

默认的 `_routing` 值是文档的 `_id` 。可以通过为每个文档指定自定义路由值来实现自定义路由模式。例如:

```json
PUT test/_doc/1?routing=user1&refresh=true  # 此文档使用user1作为其路由值，而不是其ID。
{
  "title": "This is a document"
}

GET test/_doc/1?routing=user1  # 获取、删除或更新文档时需要提供相同的路由值。


GET test/_search
{
  "query": {
    "terms": {
      "_routing": [ "user1" ]  // 也可以是用 _routing 字段来查询
    }
  }
}
```

::: tip
除非在模板中启用了 `allow_custom_routing` 设置，否则数据流不支持自定义路由。
:::

#### 使用自定义路由搜索

自定义路由可以减少搜索的影响。不必将搜索请求扇出到索引中的所有分片，只需将请求发送到与特定路由值匹配的分片即可：

```json
GET test/_search?routing=user1,user2  # 此搜索请求将只在与user1和user2路由值关联的分片上执行。
{
  "query": {
    "match": {
      "title": "document"
    }
  }
}
```

#### 强制使用路由

使用自定义路由时，无论何时索引、获取、删除或更新文档，都必须提供路由值。

忘记路由值可能会导致文档在多个分片上被索引。作为一种保护措施，`_routing` 字段可以配置为生成所有 CRUD 操作所需的自定义路由值：

```json
PUT test2
{
  "mappings": {
    "_routing": {
      "required": true  // 所有文件都需要路由。
    }
  }
}

PUT test2/_doc/1 		// 此索引请求引发 routing_missing_exception，必须使用路由。
{
  "text": "No routing value provided"
}
```

#### 文档使用唯一 ID（Unique IDs）

当为指定自定义 `_routing` 的文档编制索引时，不能保证索引中所有分片的 `_id` 的唯一性。事实上，如果使用不同的 `_routing` 值进行索引，那么具有相同 `_id` 的文档可能会出现在不同的碎片上。

用户需要确保索引中的 ID 是唯一的。

#### 路由到索引分区

可以配置索引，以便自定义路由值将转到分片的子集，而不是单个分片。这有助于降低最终出现不平衡集群的风险，同时仍能减少搜索的影响。

这是通过在创建索引时提供索引级别设置 `index.routing_partition_size` 来实现的。随着分区大小的增加，数据将变得更加均匀，代价是每个请求必须搜索更多分片。

当此设置存在时，计算 shard 的公式为:

```json
routing_value = hash(_routing) + hash(_id) % routing_partition_size
shard_num = (routing_value % num_routing_shards) / routing_factor
```

也就是说，`_routing` 字段用于计算索引中的一组分片，然后 `_id` 用于在该集合中选择一个分片。

要启用此功能，`index.routing_partition_size` 的值应大于 1 且小于 `index.number_of_shards`。

一旦启用，分区索引将有以下限制:

- 不能在其中创建具有连接字段关系的映射。
- 索引中的所有映射都必须根据需要标记 `_routing` 字段。

### `_meta`

映射类型可以具有与其关联的自定义元数据。ES 根本不使用这些元数据，但可以用于存储特定于应用程序的元数据，例如文档所属的类：

```json
PUT test
{
  "mappings": {
    "_meta": { 	// 这个_meta信息可以用GET映射API检索。
      "class": "MyApp::User",
      "version": {
        "min": "1.0",
        "max": "1.3"
      }
    }
  }
}
```

可以使用更新映射 API 在现有类型上更新 `_meta` 字段：

```json
PUT test/_mapping
{
  "_meta": {
    "class": "MyApp2::User3",
    "version": {
      "min": "1.3",
      "max": "1.5"
    }
  }
}
```

### `_field_names`

`_field_names` 字段，用于索引文档中包含除 null 以外的任何值的每个字段的名称。exists 查询使用此字段查找特定字段具有或不具有任何非空值的文档。

现在，`_field_names` 字段只对禁用了 `doc_values` 和规范的字段的名称进行索引。对于启用了`doc_values` 或 `norm` 的字段，exists 查询仍然可用，但不会使用 `_field_name` 字段。

::: tip
禁用 `_field_names`：无法再禁用`_field_name`。它现在默认启用，因为它不再承载以前的索引开销。
:::

## 映射参数（Mapping parameters）

详细内容请参考：[Elastic Docs › Elasticsearch Guide [8.6] › Mapping › Mapping parameters](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-params.html)

以下映射参数是某些或所有字段数据类型的通用参数：

- `index`：控制是否对字段值建立索引。接受 true 或 false 值，默认 true 值；未索引的字段不能通过检索查询到数据。
- `store`：标记字段是否需要被 额外的 单独的 存储在和 index 不同的 fragment 中。接受 yes/no 和 true/false 值，默认为 no/false 值，即不单独存储。
  - 默认情况下，文档添加到索引后是不需要再单独储存的，因为 \_source 默认已经存储了整个原始文档，而默认情况下，提取出来的字段值也是从 `_source` 中解析出来的。
  - 字段开启独立存储时，需要占用额外的磁盘空间，独立的字段越多，索引就越大，但在单独获取一个被独立 store 的字段值时，要比从 `_source` 中解析要快。
  - 提取数据时，每一个被 store 独立存储的字段，都需要一次单独的 IO 从对应的存储块中获取；而未被 store 标记的其他的字段，则只需要一次 IO 即可从 `_source` 中全部获取。
  - 文档被添加到索引后可被查询检索，文档被指定到存储后可被返回显示，因而，常规情况下，需要返回原始值的字段至少保证 store 或 `_source` 中有存储。
- `analyzer`：用于指定 text 文本字段在创建文档索引或查询检索文档时使用的文本分析器；仅支持 text 字段使用，除非被 `search_analyzer` 参数覆盖，否则将同时应用于索引和搜索。
- `search_analyzer`：指定查询搜索文档时对查询条件使用的分析器。默认情况下，查询条件将使用被查询字段 analyzer 参数定义的索引分析器，但是可以通过此参数设置覆盖。
- `boost`：在索引期间指定字段在查询时的相关性得分（不推荐）；也可以直接在查询时指定。
- `format`：自定义日期的解析格式。在 JSON 文档中，日期表示为字符串，在 ES 中预配置了一组格式来识别这些字符串并将其解析为一个 long 类型的毫秒数。
- `fields`：为不同的目的以不同的方式对同一字段建立索引，这就是多字段的目的。多字段不会更改原始 `_source` 字段。
- `null_value`：一个空的值不能被索引或搜索，参数用于将显式的空（null）值替换为指定的值。
- `meta`：附加到字段的元数据。只对在相同索引上工作的多个应用程序有用，以共享关于字段(如单位)的元信息；可以通过提交映射更新进行更新。

## 映射限制设置（Mapping limit settings）

使用以下设置限制字段映射的数量（手动或动态创建），并防止文档导致映射爆炸：

- `index.mapping.total_fields.limit`：索引中的最大字段数。字段和对象映射以及字段别名都属于此限制。映射的运行时字段也计算到此限制。默认值为 1000。

::: tip
该限制已到位，以防止映射和搜索变得太大。较高的值可能会导致性能下降和内存问题，特别是在负载高或资源少的集群中。

如果增加此设置，我们建议您也增加 [indices.query.bool.max_clause_count](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/search-settings.html) 设置，该设置限制查询中子句的最大数量。

如果字段映射包含一组大的任意键，请考虑使用 [扁平数据类型](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/flattened.html)。
:::

- `index.mapping.depth.limit`：字段的最大深度，以内部对象的数量度量。例如，如果所有字段都在根对象级别定义，则深度为 1。如果有一个对象映射，则深度为 2 等。默认值为 20。
- `index.mapping.nested_fields.limit`：索引中不同嵌套映射的最大数量。嵌套类型只能在特殊情况下使用，当需要独立查询对象数组时。为了防止设计不良的映射，此设置限制了每个索引的唯一嵌套类型的数量。默认值为 50。
- `index.mapping.nested_objects.limit`：单个文档在所有嵌套类型中可以包含的最大嵌套 JSON 对象数。当文档包含太多嵌套对象时，此限制有助于防止内存不足错误。默认值为 10000。
- `index.mapping.field_name_length.limit`：字段名称的最大长度设置。这个设置并不能解决映射爆炸的问题，但如果您想限制字段长度，它可能仍然有用。通常不需要设置此设置。默认值是可以的，除非用户开始添加大量具有真正长名称的字段。默认值为 Long.MAX_VALUE（无限制）。
- `index.mapping.dimension_fields.limit`：[预览]此功能处于技术预览中，可能会在将来的版本中更改或删除。Elastic 将尽最大努力解决任何问题，但技术预览中的功能不受正式 GA 功能支持 SLA 的约束。（[dynamic](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/index-modules.html#dynamic-index-settings)，integer）索引的最大 时间序列维度数。默认值为 [16](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/tsds.html#time-series-dimension)。
