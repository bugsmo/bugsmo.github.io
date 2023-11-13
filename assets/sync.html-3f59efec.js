import{_ as p,r as l,o as d,c as r,e as c,w as a,d as s,b as n,a as o}from"./app-8ca7f52c.js";const k={},m=o('<h1 id="sync-包" tabindex="-1"><a class="header-anchor" href="#sync-包" aria-hidden="true">#</a> sync 包</h1><h2 id="sync-map" tabindex="-1"><a class="header-anchor" href="#sync-map" aria-hidden="true">#</a> sync.Map</h2><h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3><p><code>sync.Map</code> 是 <code>Go</code> 语言中的一个并发安全的 <code>map</code>，它的 <code>API</code> 与 <code>map</code> 类似，但是它的实现是线程安全的。</p><h3 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h3>',5),v=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token string"},'"fmt"'),s(`
  `),n("span",{class:"token string"},'"sync"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"var"),s(" m sync"),n("span",{class:"token punctuation"},"."),s(`Map
  m`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Store"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"key"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"value"'),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// 存储"),s(`
  v`),n("span",{class:"token punctuation"},","),s(" ok "),n("span",{class:"token operator"},":="),s(" m"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Load"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"key"'),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// 获取"),s(`
  `),n("span",{class:"token keyword"},"if"),s(" ok "),n("span",{class:"token punctuation"},"{"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("v"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  m`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Delete"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"key"'),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// 删除"),s(`
  v`),n("span",{class:"token punctuation"},","),s(" ok "),n("span",{class:"token operator"},"="),s(" m"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Load"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"key"'),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// 获取"),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token operator"},"!"),s("ok "),n("span",{class:"token punctuation"},"{"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"key not exist"'),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),b=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token string"},'"fmt"'),s(`
  `),n("span",{class:"token string"},'"sync"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"var"),s(" m sync"),n("span",{class:"token punctuation"},"."),s(`Map

  `),n("span",{class:"token keyword"},"for"),s(" i "),n("span",{class:"token operator"},":="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(" i "),n("span",{class:"token operator"},"<"),s(),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},";"),s(" i"),n("span",{class:"token operator"},"++"),s(),n("span",{class:"token punctuation"},"{"),s(`
    m`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Store"),n("span",{class:"token punctuation"},"("),s("i"),n("span",{class:"token punctuation"},","),s(" i"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  m`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Range"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("key"),n("span",{class:"token punctuation"},","),s(" value "),n("span",{class:"token keyword"},"interface"),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token builtin"},"bool"),s(),n("span",{class:"token punctuation"},"{"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("key"),n("span",{class:"token punctuation"},","),s(" value"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token boolean"},"true"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),h=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
	`),n("span",{class:"token string"},'"sync"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"var"),s(" m sync"),n("span",{class:"token punctuation"},"."),s(`Map
	wg `),n("span",{class:"token operator"},":="),s(" sync"),n("span",{class:"token punctuation"},"."),s("WaitGroup"),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token keyword"},"for"),s(" i "),n("span",{class:"token operator"},":="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(" i "),n("span",{class:"token operator"},"<"),s(),n("span",{class:"token number"},"100"),n("span",{class:"token punctuation"},";"),s(" i"),n("span",{class:"token operator"},"++"),s(),n("span",{class:"token punctuation"},"{"),s(`
		wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Add"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token keyword"},"go"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("i "),n("span",{class:"token builtin"},"int"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
			`),n("span",{class:"token keyword"},"defer"),s(" wg"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Done"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
			m`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Store"),n("span",{class:"token punctuation"},"("),s("i"),n("span",{class:"token punctuation"},","),s(" i"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},"("),s("i"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
	wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Wait"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	m`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Range"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("key"),n("span",{class:"token punctuation"},","),s(" value "),n("span",{class:"token keyword"},"interface"),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token builtin"},"bool"),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("key"),n("span",{class:"token punctuation"},","),s(" value"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token boolean"},"true"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),g=o(`<h3 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h3><p><code>sync.Map</code> 的实现原理是分段锁，它将 <code>map</code> 分为多个段，每个段都有一个互斥锁，当对 <code>map</code> 进行读写操作时，只需要对对应的段加锁即可，这样就可以实现并发安全。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Map <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  <span class="token comment">// 读写锁</span>
  mu Mutex
  <span class="token comment">// map</span>
  m <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// 读写锁</span>
  readMu Mutex
  <span class="token comment">// 读写锁</span>
  dirty <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// 读写锁</span>
  misses <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><p><code>sync.Map</code> 是 <code>Go</code> 语言中的一个并发安全的 <code>map</code>，它的 <code>API</code> 与 <code>map</code> 类似，但是它的实现是线程安全的。</p><h2 id="sync-pool" tabindex="-1"><a class="header-anchor" href="#sync-pool" aria-hidden="true">#</a> sync.Pool</h2><h3 id="介绍-1" tabindex="-1"><a class="header-anchor" href="#介绍-1" aria-hidden="true">#</a> 介绍</h3><p><code>sync.Pool</code> 是 <code>Go</code> 语言中的一个对象池，它可以用来存放临时对象，避免频繁的 <code>GC</code>。</p><h3 id="用法-1" tabindex="-1"><a class="header-anchor" href="#用法-1" aria-hidden="true">#</a> 用法</h3>`,9),y=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
	`),n("span",{class:"token string"},'"sync"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"type"),s(" Foo "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
	Bar `),n("span",{class:"token builtin"},"string"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"var"),s(" p sync"),n("span",{class:"token punctuation"},"."),s(`Pool
	p`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Put"),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"&"),s("Foo"),n("span",{class:"token punctuation"},"{"),n("span",{class:"token string"},'"bar"'),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
	p`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Put"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"value"'),n("span",{class:"token punctuation"},")"),s(`
	v `),n("span",{class:"token operator"},":="),s(" p"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("v"),n("span",{class:"token punctuation"},")"),s(`

	v `),n("span",{class:"token operator"},"="),s(" p"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("v"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),f=o(`<h3 id="实现原理-1" tabindex="-1"><a class="header-anchor" href="#实现原理-1" aria-hidden="true">#</a> 实现原理</h3><p><code>sync.Pool</code> 的实现原理是 <code>LIFO</code>，它会维护一个 <code>LIFO</code> 的对象池，当我们调用 <code>Put</code> 方法时，会将对象放入对象池中，当我们调用 <code>Get</code> 方法时，会从对象池中取出对象，如果对象池为空，则会返回 <code>nil</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Pool <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  local     unsafe<span class="token punctuation">.</span>Pointer <span class="token comment">// local fixed-size per-P PoolLocal (not a pointer)</span>
  localSize <span class="token builtin">uintptr</span>        <span class="token comment">// size of the local array</span>

  <span class="token comment">// New optionally specifies a function to generate</span>
  <span class="token comment">// a value when Get would otherwise return nil.</span>
  <span class="token comment">// It may not be changed concurrently with calls to Get.</span>
  New <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> PoolLocalInternal <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  private <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// Can be used only by this P.</span>
  shared  PoolChain   <span class="token comment">// Can be used by any P.</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> PoolLocal <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  PoolLocalInternal
  pad <span class="token punctuation">[</span><span class="token number">128</span> <span class="token operator">-</span> unsafe<span class="token punctuation">.</span><span class="token function">Sizeof</span><span class="token punctuation">(</span>PoolLocalInternal<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">%</span><span class="token number">128</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1" aria-hidden="true">#</a> 总结</h3><p><code>sync.Pool</code> 是 <code>Go</code> 语言中的一个对象池，它可以用来存放临时对象，避免频繁的 <code>GC</code>。</p><h2 id="sync-once" tabindex="-1"><a class="header-anchor" href="#sync-once" aria-hidden="true">#</a> sync.Once</h2><h3 id="介绍-2" tabindex="-1"><a class="header-anchor" href="#介绍-2" aria-hidden="true">#</a> 介绍</h3><p><code>sync.Once</code> 是 <code>Go</code> 语言中的一个单例模式的实现，它可以保证某个函数只执行一次。</p><h3 id="用法-2" tabindex="-1"><a class="header-anchor" href="#用法-2" aria-hidden="true">#</a> 用法</h3>`,9),w=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
	`),n("span",{class:"token string"},'"sync"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"var"),s(" once sync"),n("span",{class:"token punctuation"},"."),s(`Once
	`),n("span",{class:"token keyword"},"for"),s(" i "),n("span",{class:"token operator"},":="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(" i "),n("span",{class:"token operator"},"<"),s(),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},";"),s(" i"),n("span",{class:"token operator"},"++"),s(),n("span",{class:"token punctuation"},"{"),s(`
		once`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Do"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
			fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"hello"'),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=o(`<h3 id="实现原理-2" tabindex="-1"><a class="header-anchor" href="#实现原理-2" aria-hidden="true">#</a> 实现原理</h3><p><code>sync.Once</code> 的实现原理是 <code>CAS</code>，它会维护一个 <code>uint32</code> 类型的 <code>done</code> 变量，当我们调用 <code>Do</code> 方法时，会将 <code>done</code> 变量设置为 <code>1</code>，如果 <code>done</code> 变量已经为 <code>1</code>，则不会执行函数。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Once <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  m    Mutex
  done <span class="token builtin">uint32</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结-2" tabindex="-1"><a class="header-anchor" href="#总结-2" aria-hidden="true">#</a> 总结</h3><p><code>sync.Once</code> 是 <code>Go</code> 语言中的一个单例模式的实现，它可以保证某个函数只执行一次。</p><h2 id="sync-rwmutex" tabindex="-1"><a class="header-anchor" href="#sync-rwmutex" aria-hidden="true">#</a> sync.RWMutex</h2><h3 id="介绍-3" tabindex="-1"><a class="header-anchor" href="#介绍-3" aria-hidden="true">#</a> 介绍</h3><p><code>sync.RWMutex</code> 是 <code>Go</code> 语言中的一个读写锁，它可以保证并发安全的读写。</p><h3 id="用法-3" tabindex="-1"><a class="header-anchor" href="#用法-3" aria-hidden="true">#</a> 用法</h3>`,9),_=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token string"},'"fmt"'),s(`
  `),n("span",{class:"token string"},'"sync"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"var"),s(" rw sync"),n("span",{class:"token punctuation"},"."),s(`RWMutex
  rw`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Lock"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
  fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"hello"'),n("span",{class:"token punctuation"},")"),s(`
  rw`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Unlock"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),P=o(`<h3 id="实现原理-3" tabindex="-1"><a class="header-anchor" href="#实现原理-3" aria-hidden="true">#</a> 实现原理</h3><p><code>sync.RWMutex</code> 的实现原理是 <code>CAS</code>，它会维护一个 <code>uint32</code> 类型的 <code>w</code> 变量，当我们调用 <code>Lock</code> 方法时，会将 <code>w</code> 变量设置为 <code>1</code>，如果 <code>w</code> 变量已经为 <code>1</code>，则会阻塞，直到 <code>w</code> 变量为 <code>0</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> RWMutex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  w           Mutex  <span class="token comment">// held if there are pending writers</span>
  writerSem   <span class="token builtin">uint32</span> <span class="token comment">// semaphore for writers to wait for completing readers</span>
  readerSem   <span class="token builtin">uint32</span> <span class="token comment">// semaphore for readers to wait for completing writers</span>
  readerCount <span class="token builtin">int32</span>  <span class="token comment">// number of pending readers</span>
  readerWait  <span class="token builtin">int32</span>  <span class="token comment">// number of departing readers</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结-3" tabindex="-1"><a class="header-anchor" href="#总结-3" aria-hidden="true">#</a> 总结</h3><p><code>sync.RWMutex</code> 是 <code>Go</code> 语言中的一个读写锁，它可以保证并发安全的读写。</p><h2 id="sync-mutex" tabindex="-1"><a class="header-anchor" href="#sync-mutex" aria-hidden="true">#</a> sync.Mutex</h2><h3 id="介绍-4" tabindex="-1"><a class="header-anchor" href="#介绍-4" aria-hidden="true">#</a> 介绍</h3><p><code>sync.Mutex</code> 是 <code>Go</code> 语言中的一个互斥锁，它可以保证并发安全。</p><h3 id="用法-4" tabindex="-1"><a class="header-anchor" href="#用法-4" aria-hidden="true">#</a> 用法</h3>`,9),A=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token string"},'"fmt"'),s(`
  `),n("span",{class:"token string"},'"sync"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"var"),s(" mu sync"),n("span",{class:"token punctuation"},"."),s(`Mutex
  mu`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Lock"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
  fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"hello"'),n("span",{class:"token punctuation"},")"),s(`
  mu`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Unlock"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),G=o(`<h3 id="实现原理-4" tabindex="-1"><a class="header-anchor" href="#实现原理-4" aria-hidden="true">#</a> 实现原理</h3><p><code>sync.Mutex</code> 的实现原理是 <code>CAS</code>，它会维护一个 <code>uint32</code> 类型的 <code>state</code> 变量，当我们调用 <code>Lock</code> 方法时，会将 <code>state</code> 变量设置为 <code>1</code>，如果 <code>state</code> 变量已经为 <code>1</code>，则会阻塞，直到 <code>state</code> 变量为 <code>0</code>。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Mutex <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  state <span class="token builtin">int32</span>
  sema  <span class="token builtin">uint32</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结-4" tabindex="-1"><a class="header-anchor" href="#总结-4" aria-hidden="true">#</a> 总结</h3><p><code>sync.Mutex</code> 是 <code>Go</code> 语言中的一个互斥锁，它可以保证并发安全。</p><h2 id="sync-waitgroup" tabindex="-1"><a class="header-anchor" href="#sync-waitgroup" aria-hidden="true">#</a> sync.WaitGroup</h2><h3 id="介绍-5" tabindex="-1"><a class="header-anchor" href="#介绍-5" aria-hidden="true">#</a> 介绍</h3><p><code>sync.WaitGroup</code> 是 <code>Go</code> 语言中的一个等待组，它可以保证并发安全的等待。</p><h3 id="用法-5" tabindex="-1"><a class="header-anchor" href="#用法-5" aria-hidden="true">#</a> 用法</h3>`,9),M=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token string"},'"fmt"'),s(`
  `),n("span",{class:"token string"},'"sync"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"var"),s(" wg sync"),n("span",{class:"token punctuation"},"."),s(`WaitGroup
  wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Add"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token keyword"},"go"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"hello"'),n("span",{class:"token punctuation"},")"),s(`
    wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Done"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
  wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Wait"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),W=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token string"},'"fmt"'),s(`
  `),n("span",{class:"token string"},'"sync"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"var"),s(" wg sync"),n("span",{class:"token punctuation"},"."),s(`WaitGroup
  `),n("span",{class:"token keyword"},"for"),s(" i "),n("span",{class:"token operator"},":="),s(),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},";"),s(" i "),n("span",{class:"token operator"},"<"),s(),n("span",{class:"token number"},"10"),n("span",{class:"token punctuation"},";"),s(" i"),n("span",{class:"token operator"},"++"),s(),n("span",{class:"token punctuation"},"{"),s(`
    wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Add"),n("span",{class:"token punctuation"},"("),n("span",{class:"token number"},"1"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"go"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"hello"'),n("span",{class:"token punctuation"},")"),s(`
      wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Done"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  wg`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Wait"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
  fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"world"'),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),L=o(`<h3 id="实现原理-5" tabindex="-1"><a class="header-anchor" href="#实现原理-5" aria-hidden="true">#</a> 实现原理</h3><p><code>sync.WaitGroup</code> 的实现原理是 <code>CAS</code>，它会维护一个 <code>uint32</code> 类型的 <code>state1</code> 变量，当我们调用 <code>Add</code> 方法时，会将 <code>state1</code> 变量加 <code>1</code>，当我们调用 <code>Done</code> 方法时，会将 <code>state1</code> 变量减 <code>1</code>，当 <code>state1</code> 变量为 <code>0</code> 时，<code>Wait</code> 方法会返回。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> WaitGroup <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  noCopy noCopy

  <span class="token comment">// 64-bit value: high 32 bits are counter, low 32 bits are waiter count.</span>
  <span class="token comment">// 64-bit atomic operations require 64-bit alignment, but 32-bit</span>
  <span class="token comment">// compilers do not ensure it. So we allocate 12 bytes and then use</span>
  <span class="token comment">// the aligned 8 bytes in them as state, and the other 4 as storage</span>
  <span class="token comment">// for the sema.</span>
  state1 <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token builtin">uint32</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结-5" tabindex="-1"><a class="header-anchor" href="#总结-5" aria-hidden="true">#</a> 总结</h3><p><code>sync.WaitGroup</code> 是 <code>Go</code> 语言中的一个等待组，它可以保证并发安全的等待。</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,6),C={href:"https://golang.org/pkg/sync/",target:"_blank",rel:"noopener noreferrer"};function S(I,O){const i=l("Tabs"),u=l("ExternalLinkIcon");return d(),r("div",null,[m,c(i,{id:"15",data:[{id:"基本用法"},{id:"sync.Map 遍历"},{id:"并发下使用"}],"tab-id":"fruit"},{title0:a(({value:e,isActive:t})=>[s("基本用法")]),title1:a(({value:e,isActive:t})=>[s("sync.Map 遍历")]),title2:a(({value:e,isActive:t})=>[s("并发下使用")]),tab0:a(({value:e,isActive:t})=>[v]),tab1:a(({value:e,isActive:t})=>[b]),tab2:a(({value:e,isActive:t})=>[h]),_:1},8,["data"]),g,c(i,{id:"51",data:[{id:"基本用法"}],"tab-id":"fruit"},{title0:a(({value:e,isActive:t})=>[s("基本用法")]),tab0:a(({value:e,isActive:t})=>[y]),_:1}),f,c(i,{id:"81",data:[{id:"基本用法"}],"tab-id":"fruit"},{title0:a(({value:e,isActive:t})=>[s("基本用法")]),tab0:a(({value:e,isActive:t})=>[w]),_:1}),x,c(i,{id:"111",data:[{id:"基本用法"}],"tab-id":"fruit"},{title0:a(({value:e,isActive:t})=>[s("基本用法")]),tab0:a(({value:e,isActive:t})=>[_]),_:1}),P,c(i,{id:"141",data:[{id:"基本用法"}],"tab-id":"fruit"},{title0:a(({value:e,isActive:t})=>[s("基本用法")]),tab0:a(({value:e,isActive:t})=>[A]),_:1}),G,c(i,{id:"171",data:[{id:"基本用法"},{id:"多任务"}],"tab-id":"fruit"},{title0:a(({value:e,isActive:t})=>[s("基本用法")]),title1:a(({value:e,isActive:t})=>[s("多任务")]),tab0:a(({value:e,isActive:t})=>[M]),tab1:a(({value:e,isActive:t})=>[W]),_:1}),L,n("p",null,[n("a",C,[s("源码文档"),c(u)])])])}const D=p(k,[["render",S],["__file","sync.html.vue"]]);export{D as default};
