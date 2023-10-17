---
order: 9
tags: 
  - context
title: context 包
date: 2023-10-17 10:59:34
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# context 包

## 介绍

[context 包](https://golang.org/pkg/context/)

`context` 包提供了一些与上下文相关的函数和变量。

## 基础用法

### 创建一个简单的上下文

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()
    go func() {
        time.Sleep(5 * time.Second)
        cancel()
    }()
    select {
    case <-ctx.Done():
        fmt.Println("done")
    }
}
```

::: tabs#fruit

@tab 超时#超时

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    select {
    case <-ctx.Done():
        fmt.Println("done")
    }
}
```

@tab 截止时间#截止时间

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    deadline := time.Now().Add(5 * time.Second)
    ctx, cancel := context.WithDeadline(context.Background(), deadline)
    defer cancel()
    select {
    case <-ctx.Done():
        fmt.Println("done")
    }
}
```

@tab 值#值

```go
package main

import (
    "context"
    "fmt"
)

func main() {
    ctx := context.WithValue(context.Background(), "key", "value")
    fmt.Println(ctx.Value("key"))
}
```

:::

### 把 context 作为函数/方法的第一个参数（官方建议这样使用）

```go
package main

import (
    "context"
    "fmt"
    "time"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    go func() {
        time.Sleep(10 * time.Second)
        cancel()
    }()
    fmt.Println(do(ctx))
}

func do(ctx context.Context) string {
    select {
    case <-ctx.Done():
        return ctx.Err().Error()
    default:
        return "ok"
    }
}
```

### 总结

- context 包提供了一些与上下文相关的函数和变量。
- context 包提供了一个简单的上下文，可以用来取消一个操作。
- context 包提供了一个简单的上下文，可以用来设置一个超时时间。
- context 包提供了一个简单的上下文，可以用来设置一个截止时间。
- context 包提供了一个简单的上下文，可以用来设置一个值。
- context 包提供了一个简单的上下文，可以用来传递参数。
- context 包提供了一个简单的上下文，可以用来取消一个操作。
