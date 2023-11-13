import{_ as n,o as s,c as a,a as t}from"./app-8ca7f52c.js";const p={},e=t(`<h1 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h1><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> <span class="token operator">&lt;</span>接口名<span class="token operator">&gt;</span> <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token operator">&lt;</span>方法名<span class="token number">1</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>参数列表<span class="token number">1</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span>返回值列表<span class="token number">1</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>方法名<span class="token number">2</span><span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>参数列表<span class="token number">2</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span>返回值列表<span class="token number">2</span><span class="token operator">&gt;</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
    age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Human <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token comment">// 唱</span>
    <span class="token function">sing</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 跳</span>
    <span class="token function">jump</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 打篮球</span>
    <span class="token function">playBasketball</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// rap</span>
    <span class="token function">rap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// 自我介绍</span>
    <span class="token function">introduce</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    p <span class="token operator">:=</span> Person<span class="token punctuation">{</span>
        name<span class="token punctuation">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
        age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    p<span class="token punctuation">.</span><span class="token function">introduce</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span><span class="token function">sing</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span><span class="token function">jump</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span><span class="token function">playBasketball</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    p<span class="token punctuation">.</span><span class="token function">rap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, I&#39;m&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">sing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;I can sing&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">jump</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;I can jump&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">playBasketball</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;I can play basketball&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">rap</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;I can rap&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">introduce</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;I&#39;m&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token string">&quot;I&#39;m&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">.</span>age<span class="token punctuation">,</span> <span class="token string">&quot;years old&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="说明" tabindex="-1"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h2><ul><li>接口是一种类型，是一种抽象的类型，它定义了一组方法，但是这些方法没有具体的实现，它只是规定了这些方法的签名，由具体的类型去实现这些方法。</li></ul><h2 id="内置接口" tabindex="-1"><a class="header-anchor" href="#内置接口" aria-hidden="true">#</a> 内置接口</h2><ul><li><code>error</code>：错误接口，所有实现了 <code>Error() string</code> 方法的类型都是 <code>error</code> 类型。</li><li><code>fmt.Stringer</code>：字符串接口，所有实现了 <code>String() string</code> 方法的类型都是 <code>fmt.Stringer</code> 类型。</li></ul>`,9),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","接口.html.vue"]]);export{r as default};
