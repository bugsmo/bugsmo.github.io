---
order: 4
tags: 
  - viper
title: viper 包
date: 2023-10-17 11:03:08
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# viper 包

## 介绍

[源码地址](https://github.com/spf13/viper)

`viper` 包提供了一个配置文件的读取和解析的库，它可以读取多种格式的配置文件，比如 `json`、`yaml`、`toml` 等，并且可以通过 `viper` 的 `Set` 方法来设置配置项。

## 用法

::: tabs#fruit

@tab 读取配置文件#读取配置文件

- config.yml

```yml
name: 123
```

- main.go

```go
package main

import (
	"fmt"

	"github.com/spf13/viper"
)

func main() {
	viper.SetConfigName("config") // 设置配置文件名
	viper.AddConfigPath(".")      // 设置配置文件路径
	viper.SetConfigType("yaml")   // 设置文件类型
	err := viper.ReadInConfig()   // 读取配置文件
	if err != nil {
		panic(err)
	}
	fmt.Println(viper.Get("name")) // 读取配置项
}
```

@tab 设置配置项#设置配置项

```go
package main

import (
    "fmt"

    "github.com/spf13/viper"
)

func main() {
    viper.Set("name", "123")
    fmt.Println(viper.Get("name"))
}
```

@tab 读取环境变量#读取环境变量

```go
package main

import (
    "fmt"

    "github.com/spf13/viper"
)

func main() {
    viper.SetEnvPrefix("test") // 设置环境变量前缀
    viper.AutomaticEnv()       // 自动读取环境变量
    fmt.Println(viper.Get("name"))
}
```

@tab 读取命令行参数#读取命令行参数

- main.go

```go
package main

import (
    "fmt"

    "github.com/spf13/viper"
)

func main() {
    viper.BindPFlag("name", rootCmd.Flags().Lookup("name"))
    rootCmd.Execute()
    fmt.Println(viper.Get("name"))
}

var rootCmd = &cobra.Command{
    Use:   "test",
    Short: "test",
    Run: func(cmd *cobra.Command, args []string) {
        fmt.Println("test")
    },
}

func init() {
    rootCmd.Flags().StringP("name", "n", "", "name")
}
```

- 调用示例

```bash
go run main.go test --name biao
# 或者
go run main.go test --n biao
```

:::

## 项目中使用

::: tabs#fruit

@tab 读取项目配置文件#读取项目配置文件

- config.yaml

```yml
server:
  port: 8080
  host: localhost

database:
  host: localhost
  port: 3306
  user: root
  password: 123456

redis:
  host: localhost
  port: 6379
```

- main.go

```go
package main

import (
    "fmt"

    "github.com/spf13/viper"
)

type Config struct {
    Server   ServerConfig
    Database DatabaseConfig
    Redis    RedisConfig
}

type ServerConfig struct {
    Port string
    Host string
}

type DatabaseConfig struct {
    Host     string
    Port     string
    User     string
    Password string
}

type RedisConfig struct {
    Host string
    Port string
}

func main() {
    viper.SetConfigName("config") // 设置配置文件名
    viper.AddConfigPath(".")      // 设置配置文件路径
	// 设置文件类型，不设置默认为json，支持json、yaml、toml
    viper.SetConfigType("yaml")
    err := viper.ReadInConfig()   // 读取配置文件
    if err != nil {
        panic(err)
    }
    var config Config
    err = viper.Unmarshal(&config)
    if err != nil {
        panic(err)
    }
    fmt.Println(config)
}
```

@tab 热加载配置文件#热加载配置文件

```go
package main

import (
    "fmt"
    "time"

    "github.com/fsnotify/fsnotify"
    "github.com/spf13/viper"
)

type Config struct {
    Server   ServerConfig
    Database DatabaseConfig
    Redis    RedisConfig
}

type ServerConfig struct {
    Port string
    Host string
}

type DatabaseConfig struct {
    Host     string
    Port     string
    User     string
    Password string
}

type RedisConfig struct {
    Host string
    Port string
}

func main() {
    viper.SetConfigName("config") // 设置配置文件名
    viper.AddConfigPath(".")      // 设置配置文件路径
    viper.SetConfigType("yaml")   // 设置文件类型
    err := viper.ReadInConfig()   // 读取配置文件
    if err != nil {
        panic(err)
    }
    var config Config
    err = viper.Unmarshal(&config)
    if err != nil {
        panic(err)
    }
    fmt.Println(config)
    viper.WatchConfig()
    viper.OnConfigChange(func(e fsnotify.Event) {
        fmt.Println("配置文件修改了")
        err = viper.Unmarshal(&config)
        if err != nil {
            panic(err)
        }
        fmt.Println(config)
    })
    for {
        time.Sleep(time.Second)
    }
}
```

:::

## 参考

- [viper 包](https://github.com/spf13/viper)
- [cobra](https://github.com/spf13/cobra)
- [fsnotify 包](github.com/fsnotify/fsnotify)
