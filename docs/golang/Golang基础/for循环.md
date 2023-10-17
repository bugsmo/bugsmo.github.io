---
order: 4
tags:
  - 基础
  - 循环
  - for
title: for 循环
date: 2023-10-17 10:31:44
categories:
  - golang
  - Golang基础
columns:
  -
---

# for 循环

## 语法

```go
# 写法一
for <布尔表达式> {
    fmt.Println("A")
}

# 写法二
for i := 0; i < 10; i++ {
    fmt.Println("A")
}
```

## 示例

::: tabs#fruit

@tab 字符串遍历#字符串遍历

- 字符串遍历

```go
package main

import "fmt"

func main() {
    str := "hello"
    for index, value := range str {
        fmt.Println(index, value)
    }
}
```

@tab 数组遍历#数组遍历

- 数组遍历

```go
package main

import "fmt"

func main() {
    array := [5]int{1, 2, 3, 4, 5}
    for index, value := range array {
        fmt.Println(index, value)
    }
}
```

@tab 切片遍历#切片遍历

- 切片遍历

```go
package main

import "fmt"

func main() {
    slice := []int{1, 2, 3, 4, 5}
    for index, value := range slice {
        fmt.Println(index, value)
    }
}
```

@tab map 遍历#map 遍历

- map 遍历

```go
package main

import "fmt"

func main() {
    myMap := map[string]string{"a": "A", "b": "B"}
    for index, value := range myMap {
        fmt.Println(index, value)
    }
}
```

@tab 通道遍历#通道遍历

- channel 遍历

```go
package main

import "fmt"

func main() {
    ch := make(chan int, 10)
    for index, value := range ch {
        fmt.Println(index, value)
    }
}
```

@tab 无限循环#无限循环

- 无限循环

```go
package main

import "fmt"

func main() {
    for {
        fmt.Println("A")
    }
}
```

@tab 定长循环#定长循环

- 定长循环

```go
package main

import "fmt"

func main() {
    for i := 0; i < 10; i++ {
        fmt.Println("i = ", i)
    }
}
```

@tab 条件循环#条件循环

- 条件循环

```go
package main

import "fmt"

func main() {
    i := 0
    for i < 10 {
        fmt.Println("i = ", i)
        i++
    }
}
```

:::

## 关键字

```go
break
continue
goto
```

::: tabs#fruit

@tab break#break

- break

```go
package main

import "fmt"

func main() {
    for i := 0; i < 10; i++ {
        if i == 5 {
            break
        }
        fmt.Println("i = ", i)
    }
    // i = 0
    // i = 1
    // i = 2
    // i = 3
    // i = 4
}
```

@tab continue#continue

- continue

```go
package main

import "fmt"

func main() {
    for i := 0; i < 10; i++ {
        if i == 5 {
            continue
        }
        fmt.Println("i = ", i)
    }
    // i = 0
    // i = 1
    // i = 2
    // i = 3
    // i = 4
    // i = 6
    // i = 7
    // i = 8
    // i = 9
}
```

@tab goto#goto

- goto

```go
package main

import "fmt"

func main() {
    i := 0
    LOOP:
        fmt.Println("i = ", i)
        i++
        if i < 10 {
            goto LOOP
        }
    // i = 0
    // i = 1
    // i = 2
    // i = 3
    // i = 4
    // i = 5
    // i = 6
    // i = 7
    // i = 8
    // i = 9
}
```

:::
