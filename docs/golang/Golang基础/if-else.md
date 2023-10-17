---
order: 2
tags:
  - 基础
  - 流程
  - if
  - if else
  - else
title: if-else
date: 2023-10-17 10:25:14
categories:
  - golang
  - Golang基础
columns:
  -
---

# if-else

> 可以在 if 表达式之前添加一个执行语句，再根据变量值进行判断

## 语法

```go
# 写法一
if <布尔表达式1> {
	fmt.Println("A")
} else if<布尔表达式2> {
    fmt.Println("B")
} else {
    fmt.Println("C")
}

# 写法二
if <表达式>;<布尔表达式1> {
    fmt.Println("A")
} else {
    fmt.Println("E")
}
```

## 示例

```go
package main

import "fmt"

func main() {
    // 写法一
    if 1 > 2 {
        fmt.Println("A")
    } else if 1 < 2 {
        fmt.Println("B")
    } else {
        fmt.Println("C")
    }

    // 写法二
    if a := 1; a > 2 {
        fmt.Println("A")
    } else {
        fmt.Println("E")
    }
}
```

## 常见写法

```go
package main

import (
	"errors"
	"fmt"
)

func checkAge(age int) {
	if age > 18 {
		fmt.Println("成年")
	} else {
		fmt.Println("未成年")
	}
}

func checkErr(err error) {
	if err != nil {
		fmt.Println(err)
	}
}

func returnErr(err error) error {
	return errors.New("my error")
}

func main() {
	checkAge(20)
	checkAge(10)

	var err error
	checkErr(err)

	err = fmt.Errorf("error")
	checkErr(err)

	if err := returnErr(err); err != nil {
        fmt.Println(err)
    }
}
```
