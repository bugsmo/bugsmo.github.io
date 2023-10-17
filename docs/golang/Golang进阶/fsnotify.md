---
order: 6
tags: 
  - fsnotify
title: fsnotify 包
date: 2023-10-17 11:01:39
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# fsnotify 包

[fsnotify 包](github.com/fsnotify/fsnotify)

`fsnotify` 包提供了对文件系统事件的监听，它可以监听文件的创建、删除、重命名、修改等事件。

## 用法

```go
package main

import (
	"fmt"
	"log"

	"github.com/fsnotify/fsnotify"
)

func main() {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}
	defer watcher.Close()

	done := make(chan bool)
	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				fmt.Println("event:", event)
				if event.Op&fsnotify.Write == fsnotify.Write {
					fmt.Println("modified file:", event.Name)
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				fmt.Println("error:", err)
			}
		}
	}()

	err = watcher.Add("./config.json") // 监听文件
	if err != nil {
		log.Fatal(err)
	}
	<-done
}
```
