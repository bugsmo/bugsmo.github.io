---
order: 7
tags: 
  - os
title: os 包
date: 2023-10-17 11:03:02
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# os 包

## 介绍

`os` 包提供了一些与操作系统相关的函数和变量。

## 基础用法

::: tabs#fruit

@tab 获取环境变量#获取环境变量

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    fmt.Println(os.Getenv("GOPATH"))
}
```

@tab 设置环境变量#设置环境变量

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    os.Setenv("GOPATH", "/home/123")
    fmt.Println(os.Getenv("GOPATH"))
}
```

@tab 获取当前工作目录#获取当前工作目录

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    dir, err := os.Getwd()
    if err != nil {
        panic(err)
    }
    fmt.Println(dir)
}
```

@tab 设置当前工作目录#设置当前工作目录

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    err := os.Chdir("/home/123")
    if err != nil {
        panic(err)
    }
    dir, err := os.Getwd()
    if err != nil {
        panic(err)
    }
    fmt.Println(dir)
}
```

@tab 获取当前用户#获取当前用户

```go
package main

import (
    "fmt"
    "os/user"
)

func main() {
    user, err := user.Current()
    if err != nil {
        panic(err)
    }
    fmt.Println(user.Name)
}
```

@tab 获取当前用户的家目录#获取当前用户的家目录

```go
package main

import (
    "fmt"
    "os/user"
)

func main() {
    user, err := user.Current()
    if err != nil {
        panic(err)
    }
    fmt.Println(user.HomeDir)
}
```

@tab 获取当前用户的 uid#获取当前用户的 uid

```go
package main

import (
    "fmt"
    "os/user"
)

func main() {
    user, err := user.Current()
    if err != nil {
        panic(err)
    }
    fmt.Println(user.Uid)
}
```

@tab 获取当前用户的 gid#获取当前用户的 gid

```go
package main

import (
    "fmt"
    "os/user"
)

func main() {
    user, err := user.Current()
    if err != nil {
        panic(err)
    }
    fmt.Println(user.Gid)
}
```

:::

## 进程

::: tabs#fruit

@tab 获取进程 id#获取进程 id

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    fmt.Println(os.Getpid())
}
```

@tab 获取父进程 id#获取父进程 id

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    fmt.Println(os.Getppid())
}
```

:::

## 文件

::: tabs#fruit

@tab 获取文件信息#获取文件信息

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    file, err := os.Open("test.txt")
    if err != nil {
        panic(err)
    }
    defer file.Close()
    fileInfo, err := file.Stat()
    if err != nil {
        panic(err)
    }
    fmt.Println(fileInfo.Name())
    fmt.Println(fileInfo.Size())
    fmt.Println(fileInfo.Mode())
    fmt.Println(fileInfo.ModTime())
    fmt.Println(fileInfo.IsDir())
    fmt.Println(fileInfo.Sys())
}
```

:::

## 文件夹

::: tabs#fruit

@tab 创建文件夹#创建文件夹

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    err := os.Mkdir("test", 0755)
    if err != nil {
        panic(err)
    }
}
```

@tab 创建多级文件夹#创建多级文件夹

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    err := os.MkdirAll("test/test1/test2", 0755)
    if err != nil {
        panic(err)
    }
}
```

@tab 删除文件夹#删除文件夹

- 只能删除空文件夹

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    err := os.Remove("test")
    if err != nil {
        panic(err)
    }
}
```

@tab 删除多级文件夹#删除多级文件夹

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    err := os.RemoveAll("test")
    if err != nil {
        panic(err)
    }
}
```

@tab 获取文件夹下的文件列表#获取文件夹下的文件列表

- 返回的是文件名列表
- 如果是多级文件夹，返回的是相对路径
- 如果是单级文件夹，返回的是文件名
- 如果是空文件夹，返回的是空列表

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    files, err := os.ReadDir("test")
    if err != nil {
        panic(err)
    }
    for _, file := range files {
        fmt.Println(file.Name())
    }
}
```

:::

## 文件操作

::: tabs#fruit

@tab 创建文件#创建文件

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    file, err := os.Create("test.txt")
    if err != nil {
        panic(err)
    }
    defer file.Close()
    fmt.Println(file.Name())
}
```

@tab 打开文件#打开文件

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    file, err := os.Open("test.txt")
    if err != nil {
        panic(err)
    }
    defer file.Close()
    fmt.Println(file.Name())
}
```

@tab 打开文件并追加内容#打开文件并追加内容

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	file, err := os.OpenFile("test.txt", os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	fmt.Println(file.Name())

	_, err = file.WriteString("hello world")
	if err != nil {
		panic(err)
	}
}
```

@tab 读取文件#读取文件

```go
package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {
	file, err := os.Open("test.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()
	content, err := ioutil.ReadAll(file)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(content))
}
```

@tab 读取文件并按行读取#读取文件并按行读取

```go
package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    file, err := os.Open("test.txt")
    if err != nil {
        panic(err)
    }
    defer file.Close()
    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        fmt.Println(scanner.Text())
    }
}
```

@tab 读取文件并按行读取并去除空行#读取文件并按行读取并去除空行

```go
package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {
    file, err := os.Open("test.txt")
    if err != nil {
        panic(err)
    }
    defer file.Close()
    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        line := scanner.Text()
        if strings.TrimSpace(line) == "" {
            continue
        }
        fmt.Println(line)
    }
}
```

@tab 删除文件#删除文件

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    err := os.Remove("test.txt")
    if err != nil {
        panic(err)
    }
}
```

:::
