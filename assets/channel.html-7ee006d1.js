import{_ as n,o as s,c as a,a as e}from"./app-8ca7f52c.js";const i={},t=e(`<h1 id="channel" tabindex="-1"><a class="header-anchor" href="#channel" aria-hidden="true">#</a> channel</h1><blockquote><p>通道（channel）是用来传递数据的一个数据结构</p></blockquote><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code># 声明
<span class="token keyword">var</span> 变量 <span class="token keyword">chan</span> 数据类型

# 初始化
变量 <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> 数据类型<span class="token punctuation">)</span>

# 发送数据
变量 <span class="token operator">&lt;-</span> 数据

# 接收数据
数据 <span class="token operator">=</span> <span class="token operator">&lt;-</span>变量
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 声明</span>
    <span class="token keyword">var</span> ch <span class="token keyword">chan</span> <span class="token builtin">int</span>

    <span class="token comment">// 初始化</span>
    ch <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">)</span>

    <span class="token comment">// 发送数据</span>
    ch <span class="token operator">&lt;-</span> <span class="token number">1</span>

    <span class="token comment">// 接收数据</span>
    a <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ch
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="说明" tabindex="-1"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h2><ul><li>通道是引用类型，声明后需要初始化才能使用</li><li>通道是线程安全的，可以在多个协程中使用</li><li>通道是有类型的，只能存储指定类型的数据</li><li>通道是有容量的，可以指定通道的容量，也可以不指定 <ul><li>指定容量后，通道中最多可以存储指定数量的数据</li><li>不指定容量时，通道的容量为 0，只能存储一个数据，即发送数据后，必须立即接收数据</li></ul></li><li>通道未初始化时，值为 nil，不能直接使用，需要使用 make 函数初始化 <ul><li>向未初始化的通道发送数据会报错</li></ul></li><li>通道关闭后，不能再向通道中发送数据，但是可以从通道中接收数据 <ul><li>通道关闭后，通道中还有数据，可以继续接收数据</li><li>通道关闭后，通道中没有数据，再接收数据，返回通道类型的零值</li><li>向已关闭的通道发送数据会报错</li></ul></li></ul><h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> ch <span class="token keyword">chan</span> <span class="token builtin">int</span>
	ch <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		ch <span class="token operator">&lt;-</span> i
	<span class="token punctuation">}</span>
	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
	<span class="token function">close</span><span class="token punctuation">(</span>ch<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
	ch <span class="token operator">&lt;-</span> <span class="token number">1</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&lt;-</span>ch<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
0
1
2
3
panic: send on closed channel
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),l=[t];function c(p,o){return s(),a("div",null,l)}const d=n(i,[["render",c],["__file","channel.html.vue"]]);export{d as default};
