---
order: 5
tags: 
  - cobra
title: cobra 包
date: 2023-10-17 10:57:25
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# cobra 包

## 介绍

[cobra](https://github.com/spf13/cobra)

`cobra` 包提供了一个命令行的解析和执行的库，它可以通过 `cobra` 的 `AddCommand` 方法来添加子命令。

## 用法

::: tabs#fruit

@tab 添加子命令#添加子命令

- main.go

```go
package main

import (
	"fmt"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use: "root",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("this is root")
	},
}

var subCmd = &cobra.Command{
	Use: "sub",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("this is sub")
	},
}

func main() {
	rootCmd.AddCommand(subCmd)
	rootCmd.Execute()
}
```

- 执行

```bash
$ go run main.go
this is root
$ go run main.go sub
this is sub
```

@tab 添加参数#添加参数

- main.go

```go
package main

import (
    "fmt"

    "github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
    Use: "root",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Println("this is root")
    },
}

var subCmd = &cobra.Command{
    Use: "sub",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Println("this is sub")
    },
}

func main() {
    rootCmd.AddCommand(subCmd)
    rootCmd.PersistentFlags().StringP("name", "n", "", "name")
    rootCmd.Execute()

	name := rootCmd.Flag("name").Value.String()
	if name != "" {
        fmt.Println("name:", name)
    }
}
```

- 执行

```bash
$ go run main.go
this is root
$ go run main.go sub
this is sub []
$ go run main.go sub -n biao
this is sub
name: biao
$ go run main.go sub --name biao
this is sub
name: biao
```

@tab 添加子命令参数#添加子命令参数

- main.go

```go
package main

import (
	"fmt"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use: "root",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("this is root")
	},
}

var subCmd = &cobra.Command{
	Use: "sub",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("this is sub")
	},
}

func main() {
	rootCmd.AddCommand(subCmd)
	rootCmd.PersistentFlags().StringP("name", "n", "", "name")
	subCmd.Flags().StringP("age", "a", "", "age")
	rootCmd.Flags().StringP("path", "p", "", "path")
	rootCmd.Execute()

	name := rootCmd.Flag("name").Value.String()
	if name != "" {
		fmt.Println("name:", name)
	}

	path := rootCmd.Flag("path").Value.String()
	if path != "" {
		fmt.Println("path:", path)
	}

	age := subCmd.Flag("age").Value.String()
	if age != "" {
		fmt.Println("age:", age)
	}
}
```

- 执行

```bash
$ go run main.go
this is root
$ go run main.go sub
this is sub
$ go run main.go sub -n biao
this is sub
name: biao
$ go run main.go sub --name biao
this is sub
name: biao
$ go run main.go sub -n biao -a 18
this is sub
name: biao
age: 18
$ go run main.go sub -n biao --age 18
this is sub
name: biao
age: 18
$ go run main.go -n biao -p /home
this is root
name: biao
path: /home
```

:::
