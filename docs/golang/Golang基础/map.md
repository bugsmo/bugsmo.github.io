---
order: 12
tags:
  - 基础
  - map
  - hash
title: map
date: 2023-10-17 10:36:14
categories:
  - golang
  - Golang基础
columns:
  -
---

# map

## 定义

map 是一种无序的基于 key-value 的数据结构，Go 语言中的 map 是引用类型，必须初始化才能使用。

```go
var map1 map[keyType]valueType
map1 = make(map[keyType]valueType)
```

- map 底层实现

```go
type hmap struct {
    count     int // 元素个数
    flags     uint8 // 标志位
    B         uint8 // 桶的数量
    noverflow uint16 // 溢出桶的数量
    hash0     uint32 // hash种子
    buckets   unsafe.Pointer // 桶数组
    oldbuckets unsafe.Pointer // 旧桶数组
    nevacuate uintptr // 需要迁移的桶的数量
    extra     *mapextra // 扩展信息
}

type mapextra struct {
    // 如果溢出桶的数量超过了桶的数量，那么就会触发扩容
    // 如果溢出桶的数量超过了桶的数量的一半，那么就会触发迁移
}
```

## 初始化

```go
// 方式一
var map1 map[string]int
map1 = make(map[string]int, 10)
map1["张三"] = 90
map1["李四"] = 100
fmt.Println(map1) // map[张三:90 李四:100]

// 方式二
map2 := map[string]int{
    "张三": 90,
    "李四": 100,
}
fmt.Println(map2) // map[张三:90 李四:100]

// 方式三
map3 := make(map[string]int, 10)
map3["张三"] = 90
map3["李四"] = 100
fmt.Println(map3) // map[张三:90 李四:100]
```

## 遍历

```go
map1 := map[string]int{
    "张三": 90,
    "李四": 100,
}

// 方式一
for k, v := range map1 {
    fmt.Println(k, v)
}

// 方式二
for k := range map1 {
    fmt.Println(k)
}

// 方式三
for _, v := range map1 {
    fmt.Println(v)
}
```

## 删除

```go
map1 := map[string]int{
    "张三": 90,
    "李四": 100,
}

delete(map1, "张三")

fmt.Println(map1) // map[李四:100]
```

## 查找

```go
map1 := map[string]int{
    "张三": 90,
    "李四": 100,
}

value, ok := map1["张三"]
if ok {
    fmt.Println(value)
} else {
    fmt.Println("查无此人")
}
```

## 长度

```go
map1 := map[string]int{
    "张三": 90,
    "李四": 100,
}

fmt.Println(len(map1)) // 2
```

## 注意事项和细节

- map 是引用类型，必须初始化才能使用。
- 初始化方式有很多种。
- 长度是不固定的，也就是和 slice 一样，也是一种引用类型。
- map 可以通过 key 来进行快速检索，比如获取或者删除元素，但是 map 不保证遍历的顺序。
- key 不能重复，如果重复了，后面的值会覆盖前面的值。
- value 可以重复。
- key 是无序的，每次打印出来的 map 可能都会不一样（发生`hash`碰撞的情况下）。
- map 是线程不安全的
