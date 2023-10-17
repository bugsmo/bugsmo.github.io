---
order: 5
tags:
  - 基础
  - 流程
  - select
  - channel
title: select
date: 2023-10-17 10:35:33
categories:
  - golang
  - Golang基础
columns:
  -
---

# select

> 1. select 语句类似于 switch 语句，但是 select 会随机执行一个可运行的 case。如果没有 case 可运行，它将阻塞，直到有 case 可运行。
> 2. select 语句中的每个 case 都必须是一个通信操作，要么是发送要么是接收。

## 语法

```go
select {
case <-ch1:
   fmt.Println("A")
case ch2 <- 1:
   fmt.Println("B")
default:
   fmt.Println("C")
}
```

## 常见写法

::: tabs#fruit

@tab 退出信号监听#退出信号监听

- 退出信号监听

```go
exit := make(chan bool)
go func() {
    for {
        select {
        case <-exit:
            fmt.Println("exit")
            return
        default:
            fmt.Println("default")
        }
    }
}()
time.Sleep(time.Second * 3)
exit <- true
```

@tab 超时控制#超时控制

- 超时控制

```go
timeout := make(chan bool, 1)
go func() {
    time.Sleep(time.Second * 2)
    timeout <- true
}()
select {
case <-timeout:
    fmt.Println("timeout")
}
```

@tab 通道监听#通道监听

- 通道监听

```go
ch := make(chan int, 1)
go func() {
    for {
        select {
        case <-ch:
            fmt.Println("ch")
        default:
            fmt.Println("default")
        }
    }
}()
time.Sleep(time.Second * 3)
ch <- 1
```
