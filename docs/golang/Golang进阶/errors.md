---
order: 3
tags: 
  - errors
title: errors 包
date: 2023-10-17 11:01:28
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# errors 包

## 介绍

`errors` 包提供了一个 `error` 接口的实现，它可以用来包装其他 `error`，并且可以通过 `errors.Is` 和 `errors.As` 来判断是否是某个特定的 `error`。

## 用法

::: tabs#fruit

@tab New#New

- `New` 方法返回一个由所给的 `text` 格式化的错误类型。每一个 `New` 方法返回的错误都是不同的即使 `text` 一致

```go
package main

import (
	"errors"
	"fmt"
)

func main() {
	err := errors.New("error")
	fmt.Println(err)
}
```

@tab Is#Is

- `Is` 方法判断是否存在在 `err` 链中的错误匹配 `target`

```go
package main

import (
	"errors"
	"fmt"
)

func main() {
	err := errors.New("error")
	err = fmt.Errorf("wrap: %w", err)
	fmt.Println(errors.Is(err, errors.New("error")))
    // 或者
    fmt.Println(err == errors.New("error"))
}
```

@tab As#As

- `As` 方法在 `err` 链中找到和 `target` 错误匹配的第一个错误，并且将该错误赋值给 `target`，并返回 `true`，否则返回 `false`

- 这个链由 `err` 本身和通过重复调用 `Unwrap` 获得的错误序列组成

- `As` 方法会 `panic` 如果 `target` 不是一个指向实现了 `error` 的空指针类型或者接口

```go
package main

import (
	"errors"
	"fmt"
)

type MyError struct{}

func (e *MyError) Error() string {
	return "MyError"
}

func main() {
	err := errors.New("error")
	err = fmt.Errorf("wrap: %w", err)
	var e *MyError
	fmt.Println(errors.As(err, &e))
}
```

@tab Unwrap#Unwrap

- `Unwrap` 方法返回 `err` 的 `Unwrap` 方法的结果

```go
package main

import (
	"errors"
	"fmt"
)

func main() {
	err := errors.New("error")
	err = fmt.Errorf("wrap: %w", err)
	fmt.Println(errors.Unwrap(err))
}
```

@tab 包装错误#包装错误

```go
package main

import (
	"errors"
	"fmt"
)

func main() {
	err := errors.New("error")
	err = fmt.Errorf("wrap: %w", err)
	fmt.Println(err)
}
```

@tab 常见用法

- 一般把 error 放在函数的最后一个返回值，如果有多个 error，可以使用 `github.com/pkg/errors` 包

```go
package main

import (
	"errors"
	"fmt"
)

func Curl(url string) (string,error) {
	// TODO curl operation
	if url == "" {
		return "", errors.New("url is empty")
	}
	return "content", nil
}

func main() {
	content, err := Curl("")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(content)
}
```

@tab 自定义错误

- 自定义错误类型，实现 `Error` 方法

```go
package main

import (
	"fmt"
)

type MyError struct {
	Msg  string
	Code int
}

func (e *MyError) Error() string {
	return fmt.Sprintf("code: %d, msg: %s", e.Code, e.Msg)
}

func main() {
	err := &MyError{
		Msg:  "error",
		Code: 500,
	}
	fmt.Println(err)
}
```

:::

## 自定义错误

```go
package main

import (
	"fmt"
)

type MyError string

func (e MyError) Error() string {
	return string(e)
}

const (
	ErrNotFound = MyError("not found")
)

func main() {
	fmt.Println(ErrNotFound)
}
```

## 参考

- [源码文档](https://golang.org/pkg/errors/)
- [知乎解释](https://zhuanlan.zhihu.com/p/214159415)
