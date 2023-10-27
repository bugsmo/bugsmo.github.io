---
order: 1
tags: 
  - PromQL
title: PromQL
date: 2023-10-27 09:50:50
categories: 
  - prometheus
columns: 
  - 
---

# PromQL

## 向量匹配

[官方文档](https://prometheus.io/docs/prometheus/latest/querying/operators/#vector-matching)

向量之间的操作尝试在右侧向量中为左侧的每个条目找到匹配元素。匹配行为有两种基本类型：一对一和多对一/一对多。

### 向量匹配关键词

这些向量匹配关键字允许在具有不同标签集的系列之间进行匹配，提供：

- on
- ignoring

提供给匹配关键字的标签列表将决定向量的组合方式。示例可以在一对一向量匹配以及多对一和一对多向量匹配中找到

### 组修饰符

这些组修饰符支持多对一/一对多向量匹配：

- group_left
- group_right

可以将标签列表提供给组修改器，其中包含来自要包含在结果度量中的“一”侧的标签。

多对一和一对多匹配是应仔细考虑的高级用例。通常，正确使用 `ignoring(<labels>)` 可以提供所需的结果。

分组修饰符只能用于比较和算术。默认情况下， and 、 unless 和 or 操作与右侧向量中的所有可能条目匹配。

### 一对一向量匹配例子

一对一从操作的每一侧找到一对唯一的条目。在默认情况下，这是遵循格式 `vector1 <operator> vector2` 的操作。如果两个条目具有完全相同的标签集和相应的值，则它们匹配。 ignoring 关键字允许在匹配时忽略某些标签，而 on 关键字允许将考虑的标签集减少到提供的列表：

```PromQL
<vector expr> <bin-op> ignoring(<label list>) <vector expr>
<vector expr> <bin-op> on(<label list>) <vector expr>
```

输入示例：

```PromQL
method_code:http_errors:rate5m{method="get", code="500"}  24
method_code:http_errors:rate5m{method="get", code="404"}  30
method_code:http_errors:rate5m{method="put", code="501"}  3
method_code:http_errors:rate5m{method="post", code="500"} 6
method_code:http_errors:rate5m{method="post", code="404"} 21

method:http_requests:rate5m{method="get"}  600
method:http_requests:rate5m{method="del"}  34
method:http_requests:rate5m{method="post"} 120
```

查询示例：

```PromQL
method_code:http_errors:rate5m{code="500"} / ignoring(code) method:http_requests:rate5m
```

这将返回一个结果向量，其中包含每个方法状态代码为 500 的 HTTP 请求的比例（在过去 5 分钟内测量）。如果没有 ignoring(code) ，则不会有匹配，因为指标不共享同一组标签。具有方法 put 和 del 的条目没有匹配项，不会显示在结果中：

```PromQL
{method="get"}  0.04            //  24 / 600
{method="post"} 0.05            //   6 / 120
```

### 多对一&一对多向量匹配例子

多对一和一对多匹配是指“一”侧的每个向量元素可以与“多”侧的多个元素匹配的情况。这必须使用 group_left 或 group_right 修饰符显式请求，其中左/右确定哪个向量具有更高的基数。

```PromQL
<vector expr> <bin-op> ignoring(<label list>) group_left(<label list>) <vector expr>
<vector expr> <bin-op> ignoring(<label list>) group_right(<label list>) <vector expr>
<vector expr> <bin-op> on(<label list>) group_left(<label list>) <vector expr>
<vector expr> <bin-op> on(<label list>) group_right(<label list>) <vector expr>
```

随组修饰符提供的标签列表包含来自要包含在结果度量中的“一”侧的附加标签。对于 on ，标签只能出现在其中一个列表中。结果向量的每个时间序列必须是唯一可识别的。

输入示例：

```PromQL
method_code:http_errors:rate5m{method="get", code="500"}  24
method_code:http_errors:rate5m{method="get", code="404"}  30
method_code:http_errors:rate5m{method="put", code="501"}  3
method_code:http_errors:rate5m{method="post", code="500"} 6
method_code:http_errors:rate5m{method="post", code="404"} 21

method:http_requests:rate5m{method="get"}  600
method:http_requests:rate5m{method="del"}  34
method:http_requests:rate5m{method="post"} 120
```

查询示例：

```PromQL
method_code:http_errors:rate5m / ignoring(code) group_left method:http_requests:rate5m
```

在这种情况下，左向量每个 method 标签值包含多个条目。因此，我们使用 group_left 来表示这一点。右侧的元素现在与左侧具有相同 method 标签的多个元素匹配：

```PromQL
{method="get", code="500"}  0.04            //  24 / 600
{method="get", code="404"}  0.05            //  30 / 600
{method="post", code="500"} 0.05            //   6 / 120
{method="post", code="404"} 0.175           //  21 / 120
```
