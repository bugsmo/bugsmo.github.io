---
order: 2
tags: 
  - errorgroup
  - goroutine
title: errgroup 包
date: 2023-10-17 11:00:21
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# errgroup 包

## 介绍

`errgroup` 包提供了一个 `sync.WaitGroup` 的替代品，它可以同时等待多个 `goroutine` 的结束，并且可以在任意一个 `goroutine` 出错时立即返回错误。

## 用法

::: tabs#fruit

@tab 基本用法#基本用法

```go
package main

import (
	"fmt"
	"golang.org/x/sync/errgroup"
	"net/http"
)

func main() {
	var g errgroup.Group
	urls := []string{
		"https://www.baidu.com",
		"https://www.google.com",
		"https://www.github.com",
	}
	for _, url := range urls {
		url := url
		g.Go(func() error {
			resp, err := http.Get(url)
			if err != nil {
				return err
			}
			defer resp.Body.Close()
			fmt.Println(url, resp.Status)
			return nil
		})
	}
	if err := g.Wait(); err != nil {
		fmt.Println(err)
	}
}
```

@tab 控制并发数#控制并发数

```go
package main

import (
	"fmt"
	"net/http"

	"golang.org/x/sync/errgroup"
)

func main() {
	var g errgroup.Group
	urls := []string{
		"https://www.baidu.com",
		"https://www.google.com",
		"https://www.github.com",
	}

	// 控制并发数
	g.SetLimit(2)

	for _, url := range urls {
		url := url
		g.Go(func() error {
			resp, err := http.Get(url)
			if err != nil {
				return err
			}
			defer resp.Body.Close()
			fmt.Println(url, resp.Status)
			return nil
		})
	}
	if err := g.Wait(); err != nil {
		fmt.Println(err)
	}
}
```

@tab 控制超时#控制超时

```go
package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"golang.org/x/sync/errgroup"
)

func main() {

	urls := []string{
		"https://www.baidu.com",
		"https://www.google.com",
		"https://www.github.com",
	}

	// 控制超时
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	g, err := errgroup.WithContext(ctx)
	if err != nil {
		fmt.Println(err)
		return
	}

	for _, url := range urls {
		url := url
		g.Go(func() error {
			req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
			if err != nil {
				return err
			}
			resp, err := http.DefaultClient.Do(req)
			if err != nil {
				return err
			}
			defer resp.Body.Close()
			fmt.Println(url, resp.Status)
			return nil
		})
	}
	if err := g.Wait(); err != nil {
		fmt.Println(err)
	}
}
```

@tab TryGo#TryGo

- TryGo 会尝试执行 f，如果 f 返回了一个非 nil 的 error，那么 TryGo 会将这个 error 保存起来，但是不会立即返回，而是继续执行后续的 f，直到所有的 f 都执行完毕，最后 TryGo 会返回所有的 error。

```go
package main

import (
    "fmt"
    "net/http"

    "golang.org/x/sync/errgroup"
)

func main() {
    var g errgroup.Group
    urls := []string{
        "https://www.baidu.com",
        "https://www.google.com",
        "https://www.github.com",
    }

    for _, url := range urls {
        url := url
        g.TryGo(func() error {
            resp, err := http.Get(url)
            if err != nil {
                return err
            }
            defer resp.Body.Close()
            fmt.Println(url, resp.Status)
            return nil
        })
    }
    if err := g.Wait(); err != nil {
        fmt.Println(err)
    }
}
```

:::

## 参考

[源码文档](https://pkg.go.dev/golang.org/x/sync/errgroup#Group)
