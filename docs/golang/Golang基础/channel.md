---
order: 6
tags:
  - 基础
  - 流程
  - select
  - channel
title: channel
date: 2023-10-17 10:35:33
categories:
  - golang
  - Golang基础
columns:
  -
---

# channel

> 通道（channel）是用来传递数据的一个数据结构

## 语法

```go
# 声明
var 变量 chan 数据类型

# 初始化
变量 = make(chan 数据类型)

# 发送数据
变量 <- 数据

# 接收数据
数据 = <-变量
```

## 示例

```go
package main

import "fmt"

func main() {
    // 声明
    var ch chan int

    // 初始化
    ch = make(chan int)

    // 发送数据
    ch <- 1

    // 接收数据
    a := <-ch
    fmt.Println(a)
}
```

## 说明

- 通道是引用类型，声明后需要初始化才能使用
- 通道是线程安全的，可以在多个协程中使用
- 通道是有类型的，只能存储指定类型的数据
- 通道是有容量的，可以指定通道的容量，也可以不指定
  - 指定容量后，通道中最多可以存储指定数量的数据
  - 不指定容量时，通道的容量为 0，只能存储一个数据，即发送数据后，必须立即接收数据
- 通道未初始化时，值为 nil，不能直接使用，需要使用 make 函数初始化
  - 向未初始化的通道发送数据会报错
- 通道关闭后，不能再向通道中发送数据，但是可以从通道中接收数据
  - 通道关闭后，通道中还有数据，可以继续接收数据
  - 通道关闭后，通道中没有数据，再接收数据，返回通道类型的零值
  - 向已关闭的通道发送数据会报错

## 案例

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	var ch chan int
	ch = make(chan int, 10)
	for i := 0; i < 10; i++ {
		ch <- i
	}
	time.Sleep(time.Second)
	fmt.Println(<-ch)
	fmt.Println(<-ch)
	close(ch)
	fmt.Println(<-ch)
	fmt.Println(<-ch)
	ch <- 1
	fmt.Println(<-ch)
}

/**
0
1
2
3
panic: send on closed channel
*/
```
