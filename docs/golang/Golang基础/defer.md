---
order: 15
tags:
  - 基础
  - defer
title: defer
date: 2023-10-17 10:36:14
categories:
  - golang
  - Golang基础
columns:
  -
---

# defer

## defer 是什么

defer 是 Go 语言中的一个关键字，用于注册延迟调用。当函数执行到最后时，这些调用会按照逆序执行，最后该函数返回。也就是说，defer 语句会将其后面跟随的语句进行延迟处理。

## defer 的用法

defer 语句会将其后面跟随的语句进行延迟处理。在 defer 归属的函数即将返回时，将延迟处理的语句按 defer 定义的逆序进行执行，最后该函数返回。

```go
func main() {
    fmt.Println("start")
    defer fmt.Println(1)
    defer fmt.Println(2)
    defer fmt.Println(3)
    fmt.Println("end")
}
```

输出：

```bash
start
end
3
2
1
```

## defer 在循环中

```go
func main() {
    for i := 0; i < 5; i++ {
        defer fmt.Println(i)
    }
}
```

输出：

```bash
4
3
2
1
0
```

- 由于 defer 语句会将其后面跟随的语句进行延迟处理，所以在循环中，每次循环都会将 defer 语句放入到延迟调用的函数中，最后按照逆序执行。
- 在上面的例子中，i 的值在循环结束后才会被赋值，所以输出的结果是 4、3、2、1、0。
- defer 在函数退出时才能执行，在 for 执行 defer 会导致资源延迟释放。

> 换种写法

```go
func main() {
    for i := 0; i < 5; i++ {
        defer func() {
            fmt.Println(i)
        }()
    }
}
```

输出：

```bash
5
5
5
5
5
```

- 在上面的例子中，i 的值在循环结束后才会被赋值，所以输出的结果是 5、5、5、5、5。

> 正确写法

```go
func main() {
    for i := 0; i < 5; i++ {
        defer func(i int) {
            fmt.Println(i)
        }(i)
    }
}
```

输出：

```bash
4
3
2
1
0
```

- 该示例可能发生资源泄漏，在 `for` 循环中调用 `defer`

## defer 应用场景

### 1. 错误处理

```go
func main() {
    f, err := os.Open("test.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer f.Close()
    // do something
}
```

- 在上面的例子中，如果打开文件失败，我们需要返回错误信息，然后结束函数。但是如果打开文件成功，我们还需要关闭文件，这时候就可以使用`defer`语句。

### 2. 锁的释放

```go
func main() {
    mu.Lock()
    defer mu.Unlock()
    // do something
}
```

- 在上面的例子中，我们需要对临界区加锁，然后在函数退出时释放锁。

### 3. 文件打开和关闭

```go
func main() {
    f, err := os.Open("test.txt")
    if err != nil {
        fmt.Println(err)
        return
    }
    defer f.Close()
    // do something
}
```

- 在上面的例子中，我们需要打开文件，然后在函数退出时关闭文件。

### 4. 数据库连接和关闭

```go
func main() {
    db, err := GetDB()
    if err != nil {
        fmt.Println(err)
        return
    }
    defer db.Close()
    // do something
}
```

- 在上面的例子中，我们需要打开数据库连接，然后在函数退出时关闭数据库连接。

### 5. 事务的提交和回滚

```go
func main() {
    tx, err := db.Begin()
    if err != nil {
        fmt.Println(err)
        return
    }
    defer tx.Rollback()
    // do something
    tx.Commit()
}
```

- 在上面的例子中，我们需要开启事务，然后在函数退出时, 如果没有提交事务，就回滚事务。
