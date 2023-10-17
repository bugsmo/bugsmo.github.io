---
order: 1
tags: 
  - sync
title: sync 包
date: 2023-10-17 11:03:08
categories: 
  - golang
  - Golang进阶
columns: 
  - 
---

# sync 包

## sync.Map

### 介绍

`sync.Map` 是 `Go` 语言中的一个并发安全的 `map`，它的 `API` 与 `map` 类似，但是它的实现是线程安全的。

### 用法

::: tabs#fruit

@tab 基本用法#基本用法

```go
package main

import (
  "fmt"
  "sync"
)

func main() {
  var m sync.Map
  m.Store("key", "value") // 存储
  v, ok := m.Load("key") // 获取
  if ok {
    fmt.Println(v)
  }
  m.Delete("key") // 删除
  v, ok = m.Load("key") // 获取
  if !ok {
    fmt.Println("key not exist")
  }
}
```

@tab sync.Map 遍历#sync.Map 遍历

```go
package main

import (
  "fmt"
  "sync"
)

func main() {
  var m sync.Map

  for i := 0; i < 10; i++ {
    m.Store(i, i)
  }

  m.Range(func(key, value interface{}) bool {
    fmt.Println(key, value)
    return true
  })
}
```

@tab 并发下使用#并发下使用

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var m sync.Map
	wg := sync.WaitGroup{}
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			m.Store(i, i)
		}(i)
	}
	wg.Wait()
	m.Range(func(key, value interface{}) bool {
		fmt.Println(key, value)
		return true
	})
}
```

:::

### 实现原理

`sync.Map` 的实现原理是分段锁，它将 `map` 分为多个段，每个段都有一个互斥锁，当对 `map` 进行读写操作时，只需要对对应的段加锁即可，这样就可以实现并发安全。

```go
type Map struct {
  // 读写锁
  mu Mutex
  // map
  m map[interface{}]interface{}
  // 读写锁
  readMu Mutex
  // 读写锁
  dirty map[interface{}]interface{}
  // 读写锁
  misses int
}
```

### 总结

`sync.Map` 是 `Go` 语言中的一个并发安全的 `map`，它的 `API` 与 `map` 类似，但是它的实现是线程安全的。

## sync.Pool

### 介绍

`sync.Pool` 是 `Go` 语言中的一个对象池，它可以用来存放临时对象，避免频繁的 `GC`。

### 用法

::: tabs#fruit

@tab 基本用法#基本用法

```go
package main

import (
	"fmt"
	"sync"
)

type Foo struct {
	Bar string
}

func main() {
	var p sync.Pool
	p.Put(&Foo{"bar"})
	p.Put("value")
	v := p.Get()
	fmt.Println(v)

	v = p.Get()
	fmt.Println(v)
}
```

:::

### 实现原理

`sync.Pool` 的实现原理是 `LIFO`，它会维护一个 `LIFO` 的对象池，当我们调用 `Put` 方法时，会将对象放入对象池中，当我们调用 `Get` 方法时，会从对象池中取出对象，如果对象池为空，则会返回 `nil`。

```go
type Pool struct {
  local     unsafe.Pointer // local fixed-size per-P PoolLocal (not a pointer)
  localSize uintptr        // size of the local array

  // New optionally specifies a function to generate
  // a value when Get would otherwise return nil.
  // It may not be changed concurrently with calls to Get.
  New func() interface{}
}

type PoolLocalInternal struct {
  private interface{} // Can be used only by this P.
  shared  PoolChain   // Can be used by any P.
}

type PoolLocal struct {
  PoolLocalInternal
  pad [128 - unsafe.Sizeof(PoolLocalInternal{})%128]byte
}
```

### 总结

`sync.Pool` 是 `Go` 语言中的一个对象池，它可以用来存放临时对象，避免频繁的 `GC`。

## sync.Once

### 介绍

`sync.Once` 是 `Go` 语言中的一个单例模式的实现，它可以保证某个函数只执行一次。

### 用法

::: tabs#fruit

@tab 基本用法#基本用法

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var once sync.Once
	for i := 0; i < 10; i++ {
		once.Do(func() {
			fmt.Println("hello")
		})
	}
}
```

:::

### 实现原理

`sync.Once` 的实现原理是 `CAS`，它会维护一个 `uint32` 类型的 `done` 变量，当我们调用 `Do` 方法时，会将 `done` 变量设置为 `1`，如果 `done` 变量已经为 `1`，则不会执行函数。

```go
type Once struct {
  m    Mutex
  done uint32
}
```

### 总结

`sync.Once` 是 `Go` 语言中的一个单例模式的实现，它可以保证某个函数只执行一次。

## sync.RWMutex

### 介绍

`sync.RWMutex` 是 `Go` 语言中的一个读写锁，它可以保证并发安全的读写。

### 用法

::: tabs#fruit

@tab 基本用法#基本用法

```go
package main

import (
  "fmt"
  "sync"
)

func main() {
  var rw sync.RWMutex
  rw.Lock()
  fmt.Println("hello")
  rw.Unlock()
}
```

:::

### 实现原理

`sync.RWMutex` 的实现原理是 `CAS`，它会维护一个 `uint32` 类型的 `w` 变量，当我们调用 `Lock` 方法时，会将 `w` 变量设置为 `1`，如果 `w` 变量已经为 `1`，则会阻塞，直到 `w` 变量为 `0`。

```go
type RWMutex struct {
  w           Mutex  // held if there are pending writers
  writerSem   uint32 // semaphore for writers to wait for completing readers
  readerSem   uint32 // semaphore for readers to wait for completing writers
  readerCount int32  // number of pending readers
  readerWait  int32  // number of departing readers
}
```

### 总结

`sync.RWMutex` 是 `Go` 语言中的一个读写锁，它可以保证并发安全的读写。

## sync.Mutex

### 介绍

`sync.Mutex` 是 `Go` 语言中的一个互斥锁，它可以保证并发安全。

### 用法

::: tabs#fruit

@tab 基本用法#基本用法

```go
package main

import (
  "fmt"
  "sync"
)

func main() {
  var mu sync.Mutex
  mu.Lock()
  fmt.Println("hello")
  mu.Unlock()
}
```

:::

### 实现原理

`sync.Mutex` 的实现原理是 `CAS`，它会维护一个 `uint32` 类型的 `state` 变量，当我们调用 `Lock` 方法时，会将 `state` 变量设置为 `1`，如果 `state` 变量已经为 `1`，则会阻塞，直到 `state` 变量为 `0`。

```go
type Mutex struct {
  state int32
  sema  uint32
}
```

### 总结

`sync.Mutex` 是 `Go` 语言中的一个互斥锁，它可以保证并发安全。

## sync.WaitGroup

### 介绍

`sync.WaitGroup` 是 `Go` 语言中的一个等待组，它可以保证并发安全的等待。

### 用法

::: tabs#fruit

@tab 基本用法#基本用法

```go
package main

import (
  "fmt"
  "sync"
)

func main() {
  var wg sync.WaitGroup
  wg.Add(1)
  go func() {
    fmt.Println("hello")
    wg.Done()
  }()
  wg.Wait()
}
```

@tab 多任务#多任务

```go
package main

import (
  "fmt"
  "sync"
)

func main() {
  var wg sync.WaitGroup
  for i := 0; i < 10; i++ {
    wg.Add(1)
    go func() {
      fmt.Println("hello")
      wg.Done()
    }()
  }
  wg.Wait()
  fmt.Println("world")
}
```

:::

### 实现原理

`sync.WaitGroup` 的实现原理是 `CAS`，它会维护一个 `uint32` 类型的 `state1` 变量，当我们调用 `Add` 方法时，会将 `state1` 变量加 `1`，当我们调用 `Done` 方法时，会将 `state1` 变量减 `1`，当 `state1` 变量为 `0` 时，`Wait` 方法会返回。

```go
type WaitGroup struct {
  noCopy noCopy

  // 64-bit value: high 32 bits are counter, low 32 bits are waiter count.
  // 64-bit atomic operations require 64-bit alignment, but 32-bit
  // compilers do not ensure it. So we allocate 12 bytes and then use
  // the aligned 8 bytes in them as state, and the other 4 as storage
  // for the sema.
  state1 [3]uint32
}
```

### 总结

`sync.WaitGroup` 是 `Go` 语言中的一个等待组，它可以保证并发安全的等待。

## 参考

[源码文档](https://golang.org/pkg/sync/)
