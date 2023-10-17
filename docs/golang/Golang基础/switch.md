---
order: 3
tags:
  - 基础
  - 流程
  - switch
title: switch
date: 2023-10-17 10:30:50
categories:
  - golang
  - Golang基础
columns:
  -
---

# switch

> 1. switch 语句用于基于不同条件执行不同动作，每一个 case 分支都是唯一的，从上直下逐一测试，直到匹配为止。
> 2. 区别于其他语言，Go 语言中的 switch 语句不需要 break 语句来明确退出一个 case 分支，Go 语言中的 switch 语句执行的过程从上至下，直到找到匹配项，匹配项后面也不需要再加 break。
> 3. Go 语言中 switch 语句的 case 无需为常量，且取值不必为整数。
> 4. Go 语言中 switch 语句后面可以不带表达式，这种情况下相当于 switch true。
> 5. Go 语言中 switch 语句可以使用 fallthrough 强制执行后面的 case 语句，fallthrough 语句会强制执行后面的 case 语句，即使后面的 case 语句表达式为 false。
> 6. Go 语言中 switch 语句还可以被用于 type-switch 来判断某个 interface 变量中实际存储的变量类型。

## 语法

```go
switch <表达式> {
case <表达式1>:
    <语句1>
case <表达式2>:
    <语句2>
default:
    <语句>
}
```

## 示例

```go
package main

import "fmt"

func main() {
	// 写法一
	switch 1 {
	case 1:
		fmt.Println("A")
	case 2:
		fmt.Println("B")
	default:
		fmt.Println("C")
	}

	// 写法二
	switch a := 1; a {
	case 1:
		fmt.Println("A")
	case 2:
		fmt.Println("B")
	default:
		fmt.Println("C")
	}

	// 写法三
	switch {
	case 1 > 2:
		fmt.Println("A")
	case 1 < 2:
		fmt.Println("B")
	default:
		fmt.Println("C")
	}

	// 写法四
	switch a := 1; {
	case a > 2:
		fmt.Println("A")
	case a < 2:
		fmt.Println("B")
	default:
		fmt.Println("C")
	}

	// 写法五
	switch a := 1; a {
	case 1:
		fmt.Println("A")
		fallthrough
	case 2:
		fmt.Println("B")
	default:
		fmt.Println("C")
	}

	// 写法六
	switch a := 1; a {
	case 1:
		fmt.Println("A")
		fallthrough
	case 2:
		fmt.Println("B")
		fallthrough
	default:
		fmt.Println("C")
	}

	// 写法七
	switch a := 1; a {
	case 1:
		fmt.Println("A")
		fallthrough
	case 2:
		fmt.Println("B")
		fallthrough
	case 3:
		fmt.Println("C")
	default:
		fmt.Println("D")
	}

	// 写法八
	switch a := interface{}(1); a.(type) {
	case int:
		fmt.Println("A")
	case string:
		fmt.Println("B")
	default:
		fmt.Println("C")
	}

```

## 常见写法

```go
func Print(a interface{}) {
	switch a.(type) {
	case int:
		fmt.Println("A is int")
	case string:
		fmt.Println("B is string")
	case error:
		fmt.Println("C is error")
	default:
		fmt.Println("C")
	}
}
```
