---
order: 11
tags: 
  - graphql
title: graphql
date: 2023-10-17 11:02:32
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# graphql

## 介绍

[GraphQL]() 是一种用于 API 的查询语言，由 Facebook 在 2012 年开源。它提供了一种客户端可以准确地获取所需数据的方式，而无需过多担心其返回的数据结构。GraphQL 旨在成为 API 的替代品，而不是 RESTful API。

## 优点

- 通过 GraphQL，客户端可以准确地获取所需数据，而无需过多担心其返回的数据结构。

## 缺点

- 由于 GraphQL 是一种新的技术，因此在生产环境中使用它可能会有一些风险。
- GraphQL 仅适用于 HTTP 协议，因此无法与其他协议一起使用。

## 适用场景

- 适用于需要快速开发 API 的场景。

## go 项目使用 graphQL

```go
package main

import (
    "context"
    "fmt"
    "log"
    "net/http"

    "github.com/graph-gophers/graphql-go"
    "github.com/graph-gophers/graphql-go/relay"
)

type Resolver struct{}

func (r *Resolver) Hello() string {
    return "Hello world!"
}

func main() {
    schema := graphql.MustParseSchema(Schema, &Resolver{})
    http.Handle("/query", &relay.Handler{Schema: schema})
    log.Fatal(http.ListenAndServe(":8080", nil))
}

const Schema = `
    type Query {
        hello: String!
    }
`
```

## go 相关 graphQL

- [graphql-go/graphql](https://github.com/graphql-go/graphql)
- [graph-gophers/graphql-go](https://github.com/graph-gophers/graphql-go)
- [99designs/gqlgen](https://github.com/99designs/gqlgen)
- [aide-cloud/graphql-http](https://github.com/aide-cloud/graphql-http) 基于 graph-gophers 的最佳实践

## 参考

- [GraphQL](https://graphql.org/)
- [GraphQL 教程](https://www.codingdict.com/article/23269)
