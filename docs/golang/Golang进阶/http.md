---
order: 8
tags: 
  - http
title: http 包
date: 2023-10-17 11:03:02
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# http 包

## 介绍

[http 包](https://golang.org/pkg/net/http/)

`http` 包提供了一些与 HTTP 协议相关的函数和变量。

## 基础用法

::: tabs#fruit

@tab 创建一个简单的服务器#创建一个简单的服务器

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %q", r.URL.Path)
    })
    http.ListenAndServe(":8080", nil)
}
```

@tab 创建一个简单的客户端#创建一个简单的客户端

```go
package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
)

func main() {
    resp, err := http.Get("https://www.baidu.com")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(body))
}
```

:::

## 自定义 `http` 框架

### 实现各种请求的路由

```go
package main

import (
    "fmt"
    "net/http"
)

type Engine struct{}

func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
    switch req.URL.Path {
    case "/":
        fmt.Fprintf(w, "URL.Path = %q\n", req.URL.Path)
    case "/hello":
        for k, v := range req.Header {
            fmt.Fprintf(w, "Header[%q] = %q\n", k, v)
        }
    default:
        fmt.Fprintf(w, "404 NOT FOUND: %s\n", req.URL)
    }
}

func main() {
    engine := new(Engine)
    http.ListenAndServe(":9999", engine)
}
```

### 自定义请求方式

```go
package main

import (
	"fmt"
	"net/http"
)

type HandlerFunc func(http.ResponseWriter, *http.Request)

type Engine struct {
	router map[string]HandlerFunc
}

func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	key := req.Method + "-" + req.URL.Path
	if handler, ok := engine.router[key]; ok {
		handler(w, req)
	} else {
		fmt.Fprintf(w, "404 NOT FOUND: %s\n", req.URL)
	}
}

func (engine *Engine) addRoute(method string, pattern string, handler HandlerFunc) {
	key := method + "-" + pattern
	engine.router[key] = handler
}

func (engine *Engine) GET(pattern string, handler HandlerFunc) {
	engine.addRoute("GET", pattern, handler)
}

func (engine *Engine) POST(pattern string, handler HandlerFunc) {
	engine.addRoute("POST", pattern, handler)
}

func (engine *Engine) Run(addr string) (err error) {
	return http.ListenAndServe(addr, engine)
}

func New() *Engine {
    return &Engine{router: make(map[string]HandlerFunc)}
}

func main() {
	r := New()
	r.router = make(map[string]HandlerFunc)
	r.GET("/", func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(w, "URL.Path = %q\n", req.URL.Path)
	})
	r.GET("/hello", func(w http.ResponseWriter, req *http.Request) {
		for k, v := range req.Header {
			fmt.Fprintf(w, "Header[%q] = %q\n", k, v)
		}
	})
	r.POST("/hello", func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(w, "hello post request!\n")
	})
	fmt.Println("server http://localhost:9999")
	r.Run(":9999")
}
```
