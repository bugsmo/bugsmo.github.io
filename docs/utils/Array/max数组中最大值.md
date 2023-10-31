---
title: max 数组中最大值 sticky 9
date: 2022-06-15 17:20:46
categories:
  - utils
  - Array
  - max
tags:
  - max
# sticky: 9
columns:
  -
---

# max 数组中最大值

过滤原数组中所有的非假值元素，返回数组中的最大值

```js
max(array);
```

**参数**

- `array`待处理的数组

**例子**

```js
max([0, -1, -2, -3, false]);
// => 0
```

**源码**

```js
const max = (arr) => Math.max(...arr.filter((v) => Boolean(v) || v === 0));
```
