---
title: compact 去除数组中的无效值 sticky 3
date: 2022-06-15 17:20:46
categories: 
  - utils
  - Array
  - compact
tags: 
  - compact
sticky: 3
columns: 
  - 
---
# compact 去除数组中的无效值

创建一个新数组，包含原数组中所有的非假值元素。例如`false`, `null`,`0`, `""`, `undefined`, 和 `NaN` 都是被认为是“假值”。

**参数**

- `array` 待处理的数组

**返回值**

(Array): 返回过滤掉假值的新数组。

**例子**

```js
min([0, 1, false, 2, '', 3])
// => [1, 2, 3]
```

**源码**

```js
const compact = arr => arr.filter(Boolean)
```
