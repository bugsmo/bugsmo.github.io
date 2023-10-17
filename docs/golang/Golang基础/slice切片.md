---
order: 11
tags:
  - 基础
  - 数组
  - 切片
  - slice
title: slice 切片
date: 2023-10-17 10:36:14
categories:
  - golang
  - Golang基础
columns:
  -
---

# slice 切片

## slice 定义

slice 是一个引用类型，它的内部结构包含地址、长度和容量。

```go
type slice struct {
    array unsafe.Pointer
    len   int
    cap   int
}
```

- slice 的底层是一个数组，slice 的长度可以改变，因此它是一个可变的数组。
- slice 的长度是它所包含的元素个数，slice 的容量是从它的第一个元素开始数，到其底层数组元素末尾的个数。
- slice 的零值是 nil，长度和容量都是 0。
- slice 可以向后扩展，但是不能向前扩展。
- slice 的容量可以通过`slice[i:j]`来扩展，其中 i 是数组的开始位置，j 是数组的结束位置。
- slice 的长度可以通过`slice = slice[0:n]`来截取，其中 n 是 slice 的长度。
- slice 的容量可以通过`slice = slice[:n]`来截取，其中 n 是 slice 的容量。

## slice 的创建

### 1. 通过 make 函数创建

```go
slice1 := make([]int, 5, 10) // len(slice1)=5, cap(slice1)=10
```

### 2. 通过数组创建

```go
// main.go
package main

import "fmt"

func main() {
	array1 := [5]int{1, 2, 3, 4, 5}

	slice1 := array1[0:5] // len(slice1)=5, cap(slice1)=5
	fmt.Println("slice1: ", len(slice1), cap(slice1))
	slice2 := array1[0:5:5] // len(slice2)=5, cap(slice2)=5
	fmt.Println("slice2: ", len(slice2), cap(slice2))
	slice3 := array1[:] // len(slice3)=5, cap(slice3)=5
	fmt.Println("slice3: ", len(slice3), cap(slice3))
	slice4 := array1[0:] // len(slice4)=5, cap(slice4)=5
	fmt.Println("slice4: ", len(slice4), cap(slice4))
	slice5 := array1[:5] // len(slice5)=5, cap(slice5)=5
	fmt.Println("slice5: ", len(slice5), cap(slice5))
	//slice6 := array1[0:5:10] // 无效的slice，因为容量不能超过数组的容量

	slice7 := array1[:2] // len(slice7)=2, cap(slice7)=5
	fmt.Println("slice7: ", len(slice7), cap(slice7))
	slice8 := array1[2:] // len(slice8)=3, cap(slice8)=3
	fmt.Println("slice8: ", len(slice8), cap(slice8))
	slice9 := array1[2:4] // len(slice9)=2, cap(slice9)=3
	fmt.Println("slice9: ", len(slice9), cap(slice9))
}
```

### 3. 通过切片创建

```go
slice1 := []int{1, 2, 3, 4, 5}
slice2 := slice1[0:5] // len(slice2)=5, cap(slice2)=5
slice3 := slice1[:] // len(slice3)=5, cap(slice3)=5
slice4 := slice1[0:] // len(slice4)=5, cap(slice4)=5
slice5 := slice1[:5] // len(slice5)=5, cap(slice5)=5
slice6 := slice1[0:5:5] // len(slice6)=5, cap(slice6)=5
```

### 4. 通过 append 函数创建

```go
slice1 := []int{1, 2, 3, 4, 5}

slice2 := append(slice1, 6) // len(slice2)=6, cap(slice2)=10
slice3 := append(slice1, 6, 7, 8) // len(slice3)=8, cap(slice3)=10
slice4 := append(slice1, slice2...) // len(slice4)=10, cap(slice4)=10
```

## slice 的遍历

```go
slice1 := []int{1, 2, 3, 4, 5}

for i := 0; i < len(slice1); i++ {
    fmt.Println(slice1[i])
}

for i, v := range slice1 {
    fmt.Println(i, v)
}
```

## slice 的扩容

```go
slice1 := []int{1, 2, 3, 4, 5}
slice2 := append(slice1, 6) // len(slice2)=6, cap(slice2)=10
slice3 := append(slice2, 7) // len(slice3)=7, cap(slice3)=10
slice4 := append(slice3, 8) // len(slice4)=8, cap(slice4)=10
slice5 := append(slice4, 9) // len(slice5)=9, cap(slice5)=10
slice6 := append(slice5, 10) // len(slice6)=10, cap(slice6)=10
slice7 := append(slice6, 11) // len(slice7)=11, cap(slice7)=20
```

## slice 的拷贝

```go
slice1 := []int{1, 2, 3, 4, 5}

slice2 := make([]int, 5)
copy(slice2, slice1)
// slice2 = [1, 2, 3, 4, 5]
// slice1 = [1, 2, 3, 4, 5]
// slice2和slice1的底层数组是不同的, slice2的底层数组是新创建的, slice1的底层数组是原来的
```

## slice 的删除

```go
slice1 := []int{1, 2, 3, 4, 5}

slice2 := append(slice1[:2], slice1[3:]...)
// slice2 = [1, 2, 4, 5]
// slice1 = [1, 2, 3, 4, 5]
```

## slice 的插入

```go
slice1 := []int{1, 2, 3, 4, 5}

slice2 := append(slice1[:2], append([]int{6}, slice1[2:]...)...)
// slice2 = [1, 2, 6, 3, 4, 5]
// slice1 = [1, 2, 3, 4, 5]
```

## slice 的替换

```go
slice1 := []int{1, 2, 3, 4, 5}

slice2 := append(slice1[:2], append([]int{6, 7}, slice1[4:]...)...)
// slice2 = [1, 2, 6, 7, 5]
// slice1 = [1, 2, 3, 4, 5]
```

## slice 的反转

```go
slice1 := []int{1, 2, 3, 4, 5}

for i := 0; i < len(slice1)/2; i++ {
    slice1[i], slice1[len(slice1)-1-i] = slice1[len(slice1)-1-i], slice1[i]
}
// slice1 = [5, 4, 3, 2, 1]
```

## slice 的排序

```go
slice1 := []int{1, 2, 3, 4, 5}

sort.Ints(slice1)
// slice1 = [1, 2, 3, 4, 5]
```

## slice 的去重

```go
slice1 := []int{1, 2, 3, 4, 5, 1, 2, 3, 4, 5}

slice2 := make([]int, 0)
for _, v := range slice1 {
    if !contains(slice2, v) {
        slice2 = append(slice2, v)
    }
}
// slice2 = [1, 2, 3, 4, 5]
// slice1 = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

func contains(slice []int, v int) bool {
    for _, v1 := range slice {
        if v1 == v {
            return true
        }
    }
    return false
}
```

## slice 的合并

```go
slice1 := []int{1, 2, 3, 4, 5}

slice2 := []int{6, 7, 8, 9, 10}

slice3 := append(slice1, slice2...)
// slice3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// slice1 = [1, 2, 3, 4, 5]
// slice2 = [6, 7, 8, 9, 10]
```

## slice 的查找

```go
slice1 := []int{1, 2, 3, 4, 5}

index := sort.SearchInts(slice1, 3)
// index = 2
```

## 注意

- slice 的底层是数组, slice 的长度和容量都是数组的长度和容量
- slice 的长度是 slice 中元素的个数, slice 的容量是 slice 的第一个元素到底层数组的最后一个元素的个数
- slice 的长度和容量都是可以变化的, 但是容量不能超过底层数组的容量，容量超过底层数组的容量会发生扩容
- slice 扩容的时候，如果扩容后的容量小于 1024，那么扩容后的容量是原来的 2 倍，如果扩容后的容量大于等于 1024，那么扩容后的容量是原来的 1.25 倍
- slice 的底层数组是可以共享的, slice 的底层数组是只读的, slice 的长度和容量是可以修改的
- slice 的长度和容量都是可以修改的, 但是长度不能超过容量，长度超过容量会发生 panic
