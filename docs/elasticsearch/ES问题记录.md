---
order: 99
tags: 
  - elasticsearch
title: ES 问题记录
date: 2023-10-31 10:44:06
categories: 
  - elasticsearch
columns: 
  - 
---

# ES 问题记录

## Types cannot be provided in put mapping requests, unless the include_type_name parameter is set to true

原始请求

```json
POST test/_doc/_mapping
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
```

修改

```json
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
```
