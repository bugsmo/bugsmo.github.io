---
order: 14
tags:
  - 基础
  - panic
  - recover
title: recover 和 panic
date: 2023-10-17 10:36:14
categories:
  - golang
  - Golang基础
columns:
  -
---

# recover 和 panic

## 什么是 panic

`panic` 是一个内建函数，用于中断正常的控制流程，进入一个 `panic` 状态，当函数 `F` 调用 `panic`，函数 `F` 的执行被中断，但是 `F` 中的 `defer` 语句会正常执行，然后 `F` 返回到调用它的地方，过程不断重复，直到发生以下情况：

- `panic` 的输入值被 `recover` 捕获
- `goroutine` 中所有调用的函数返回
- `goroutine` 死亡

## 什么是 recover

`recover` 是一个内建函数，用于从 `panic` 中恢复。如果当前的 `goroutine` 未发生 `panic`，调用 `recover` 会返回 `nil` 并且没有别的副作用。如果当前的 `goroutine` 发生了 `panic`，调用 `recover` 可以捕获到 `panic` 的输入值，并且恢复正常的执行。

## 什么时候用 recover

`recover` 用于捕获 `panic`，但是 `panic` 通常是不可恢复的错误，所以 `recover` 通常用于处理不可恢复的错误，例如：

```go
func main() {
    defer func() {
        if err := recover(); err != nil {
            fmt.Println("recover from panic:", err)
        }
    }()
    panic("test panic")
}
```

## 为什么要用 recover

程序在运行过程中，可能会发生不可预知的错误，例如：数组越界、空指针、除数为 0 等，这些错误会导致程序崩溃，这时候就需要用到 `recover` 来捕获这些错误，然后进行处理，避免程序崩溃。

## recover 的限制

`recover` 只能在 `defer` 中调用，而且 `defer` 必须在 `panic` 之前定义。

## recover 错误使用姿势

```go
func function1() {
    recover()
    panic(1)
}

func function2() {
    defer recover()
    panic(1)
}

func function3() {
    defer func() {
        func() {
            recover()
        }()
    }()
    panic(1)
}
```

## recover 正确使用方式

```go
func OK1() {
    defer func() {
        recover()
    }()
    panic(1)
}

func OK2() {
    defer func() {
        if err := recover(); err != nil {
            fmt.Println("recover from panic:", err)
            // TODO 处理错误
        }
    }()
    panic(1)
}
```
