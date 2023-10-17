---
order: 13
tags:
  - 基础
  - new
  - make
title: new 和 make
date: 2023-10-17 10:36:14
categories:
  - golang
  - Golang基础
columns:
  -
---

# new 和 make

## new 和 make 的异同

- new 和 make 都是用来分配内存的。
- new 用于值类型和用户自定义的类型，如自定义的 struct、int、float 等。
- make 用于内建的引用类型，如 channel、map、slice 等。
- new 返回指针，make 返回引用类型本身。
- new 分配的空间被清零，make 分配空间后，会进行初始化，初始化的结果和类型有关。
- new 分配的空间大小总是确定的，make 分配的空间大小则不确定，取决于具体的类型。
- new 和 make 都是在堆上分配内存，但是 new 分配的内存空间是连续的，make 分配的内存空间是不连续的。

## new 的使用

```go
// new(T)分配了零值填充的T类型的内存空间，并返回其地址，即一个*T类型的值。
// 用Go的术语说，它返回了一个指向新分配类型T的指针，该指针指向的值为T类型的零值。
// 也就是说，new(T)为T类型的新值分配了一片内存空间，并返回指向这片内存空间的指针。

// new(T)的语法和T{}是等价的，但是new(T)会分配更多的内存空间，因为它还会为T类型的字段分配内存空间，并将其初始化为零值。
// 也就是说，new(T)为T类型的每个导出字段分配了内存空间，并将其初始化为零值。
// 但是T{}只会为T类型的每个导出字段分配内存空间，但不会初始化。

// new(T)的返回值是*T类型的，即指向T类型的指针。
// 但是T{}的返回值是T类型的，即T类型的值。

a := new(int) // a是一个指针，指向一个int类型的值，该值为0
b := new(bool) // b是一个指针，指向一个bool类型的值，该值为false
```

## make 的使用

```go
// make(T, args)返回一个类型为T的初始值，它只适用于3种内建的引用类型：切片、map和channel。
// make(T, args)和new(T)的语法上的区别在于，它们各自的返回值的类型不同。
// make(T, args)返回的是T类型，而new(T)返回的是*T类型。

// make(T, args)的返回值是T类型的，即T类型的值。

a := make([]int, 5) // a是一个切片，长度为5，容量为5，切片中的元素为0
a1 := make([]int, 5, 10) // a1是一个切片，长度为5，容量为10，切片中的元素为0
b := make(map[string]int) // b是一个map，长度为0，map中的元素为0
c := make(chan int) // c是一个channel，长度为0，channel中的元素为0
c1 := make(chan int, 5) // c1是一个channel，长度为5，channel中的元素为0
```

## 总结

- `new`用来初始化基本数据类型和自定义类型，返回值为该类型的指针类型，值为该类型 0 值
- `make`用来初始化`slice` `map` `chan`类型，返回该类型的引用
