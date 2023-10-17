---
order: 10
tags: 
  - time
title: time 包
date: 2023-10-17 11:03:08
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# time 包

## 介绍

[time 包](https://golang.org/pkg/time/)

`time` 包提供了一些与时间相关的函数和变量。

特殊的格式化字符串`2006-01-02 15:04:05`，用于格式化时间。

- `2006` 表示年，`01` 表示月，`02` 表示日，`15` 表示小时，`04` 表示分钟，`05` 表示秒。
- 快速记忆：`6` `1` `2` `3`(15 点) `4` `5`

## 基础用法

::: tabs#fruit

@tab 获取当前时间#获取当前时间

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println(time.Now())
}
```

@tab 获取当前时间戳#获取当前时间戳

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println(time.Now().Unix()) // 秒
    fmt.Println(time.Now().UnixNano()) // 纳秒
    fmt.Println(time.Now().UnixNano() / 1e6) // 毫秒
}
```

@tab 时间戳转时间#时间戳转时间

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println(time.Unix(1620000000, 0))
}
```

@tab 时间转时间戳#时间转时间戳

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println(time.Date(2021, 5, 1, 0, 0, 0, 0, time.Local).Unix())
}
```

@tab 时间格式化#时间格式化

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
}
```

@tab 时间解析#时间解析

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    t, err := time.Parse("2006-01-02 15:04:05", "2021-05-01 00:00:00")
    if err != nil {
        fmt.Println(err)
    }
    fmt.Println(t)
}
```

:::

## 时间计算

::: tabs#fruit

@tab 时间加减#时间加减

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    t := time.Now()
    fmt.Println(t.Add(time.Hour * 24)) // 加一天
    fmt.Println(t.Add(time.Hour * -24)) // 减一天
}
```

@tab 时间比较#时间比较

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    t1 := time.Now()
    t2 := time.Now().Add(time.Hour * 24)
    fmt.Println(t1.Before(t2)) // t1是否在t2之前
    fmt.Println(t1.After(t2)) // t1是否在t2之后
    fmt.Println(t1.Equal(t2)) // t1是否等于t2
}
```

@tab 时间差#时间差

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    t1 := time.Now()
    t2 := time.Now().Add(time.Hour * 24)
    fmt.Println(t2.Sub(t1)) // t2与t1的时间差，返回time.Duration，可以用time.Duration的方法进行格式化
}
```

:::

## 定时器

::: tabs#fruit

@tab 定时器#定时器

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    ticker := time.NewTicker(time.Second * 2)
    for {
        select {
        case <-ticker.C:
            fmt.Println("tick")
        }
    }
}
```

@tab 延时器#延时器

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    timer := time.NewTimer(time.Second * 2)
    <-timer.C
    fmt.Println("tick")
}
```

:::

## 时间格式化

::: tabs#fruit

@tab 时间格式化#时间格式化

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println(time.Now().Format("2006-01-02 15:04:05")) // 2021-05-01 00:00:00
    fmt.Println(time.Now().Format("2006/01/02 15:04:05")) // 2021/05/01 00:00:00
    fmt.Println(time.Now().Format("2006-01-02")) // 2021-05-01
    fmt.Println(time.Now().Format("2006/01/02")) // 2021/05/01
    fmt.Println(time.Now().Format("15:04:05")) // 00:00:00
    fmt.Println(time.Now().Format("15:04")) // 00:00
    fmt.Println(time.Now().Format("2006-01-02 15:04:05.000")) // 2021-05-01 00:00:00.000
    fmt.Println(time.Now().Format("2006-01-02 15:04:05.000000")) // 2021-05-01 00:00:00.000000
    fmt.Println(time.Now().Format("2006-01-02 15:04:05.000000000")) // 2021-05-01 00:00:00.000000000
}
```

:::

## 时区

::: tabs#fruit

@tab 时区#时区

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    fmt.Println(time.Now().Format("2006-01-02 15:04:05")) // 2021-05-01 00:00:00
    fmt.Println(time.Now().In(time.UTC).Format("2006-01-02 15:04:05")) // 2021-05-01 08:00:00
    fmt.Println(time.Now().In(time.Local).Format("2006-01-02 15:04:05")) // 2021-05-01 00:00:00
}
```

:::
