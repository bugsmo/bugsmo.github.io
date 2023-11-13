import{_ as p,r as l,o as i,c as u,e as k,w as a,d as s,a as c,b as n}from"./app-8ca7f52c.js";const r={},d=c(`<h1 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h1><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 普通写法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r ReceiverType<span class="token punctuation">)</span> <span class="token function">funcName</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span> <span class="token punctuation">(</span>results<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">&lt;</span>函数体<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>ReceiverType<span class="token punctuation">)</span> <span class="token function">funcNamePtr</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span> <span class="token punctuation">(</span>results<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">&lt;</span>函数体<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 范型写法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r ReceiverType<span class="token punctuation">[</span>T<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token function">funcName</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span> <span class="token punctuation">(</span>results<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">&lt;</span>函数体<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>ReceiverType<span class="token punctuation">[</span>T<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token function">funcNamePtr</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span> <span class="token punctuation">(</span>results<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">&lt;</span>函数体<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2>`,4),v=n("ul",null,[n("li",null,"普通方法")],-1),m=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token string"},'"fmt"'),s(`

`),n("span",{class:"token keyword"},"type"),s(" Person "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
    name `),n("span",{class:"token builtin"},"string"),s(`
    age  `),n("span",{class:"token builtin"},"int"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    p `),n("span",{class:"token operator"},":="),s(" Person"),n("span",{class:"token punctuation"},"{"),s(`
        name`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"张三"'),n("span",{class:"token punctuation"},","),s(`
        age`),n("span",{class:"token punctuation"},":"),s("  "),n("span",{class:"token number"},"18"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    p`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"sayHello"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token punctuation"},"("),s("p Person"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token function"},"sayHello"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Printf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},`"Hello, my name is %s, I'm %d years old.\\n"`),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},"."),s("name"),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},"."),s("age"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),b=n("ul",null,[n("li",null,"指针方法")],-1),g=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token string"},'"fmt"'),s(`

`),n("span",{class:"token keyword"},"type"),s(" Person "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
    name `),n("span",{class:"token builtin"},"string"),s(`
    age  `),n("span",{class:"token builtin"},"int"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    p `),n("span",{class:"token operator"},":="),s(" Person"),n("span",{class:"token punctuation"},"{"),s(`
        name`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"张三"'),n("span",{class:"token punctuation"},","),s(`
        age`),n("span",{class:"token punctuation"},":"),s("  "),n("span",{class:"token number"},"18"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    p`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"sayHello"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token punctuation"},"("),s("p "),n("span",{class:"token operator"},"*"),s("Person"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token function"},"sayHello"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Printf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},`"Hello, my name is %s, I'm %d years old.\\n"`),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},"."),s("name"),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},"."),s("age"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),f=n("ul",null,[n("li",null,"范型方法")],-1),y=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token string"},'"fmt"'),s(`

`),n("span",{class:"token keyword"},"type"),s(" Person"),n("span",{class:"token punctuation"},"["),s("T any"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
	name  `),n("span",{class:"token builtin"},"string"),s(`
	age   `),n("span",{class:"token builtin"},"int"),s(`
	value T
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	p `),n("span",{class:"token operator"},":="),s(" Person"),n("span",{class:"token punctuation"},"["),n("span",{class:"token builtin"},"float64"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"{"),s(`
		name`),n("span",{class:"token punctuation"},":"),s("  "),n("span",{class:"token string"},'"张三"'),n("span",{class:"token punctuation"},","),s(`
		age`),n("span",{class:"token punctuation"},":"),s("   "),n("span",{class:"token number"},"18"),n("span",{class:"token punctuation"},","),s(`
		value`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"1.2"),n("span",{class:"token punctuation"},","),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
	p`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"sayHello"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token punctuation"},"("),s("p Person"),n("span",{class:"token punctuation"},"["),s("T"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token function"},"sayHello"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Printf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},`"Hello, my name is %s, I'm %d years old. value %v\\n"`),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},"."),s("name"),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},"."),s("age"),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},"."),s("value"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),h=n("ul",null,[n("li",null,"范型指针方法")],-1),w=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token string"},'"fmt"'),s(`

`),n("span",{class:"token keyword"},"type"),s(" Person"),n("span",{class:"token punctuation"},"["),s("T any"),n("span",{class:"token punctuation"},"]"),s(),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
	name  `),n("span",{class:"token builtin"},"string"),s(`
	age   `),n("span",{class:"token builtin"},"int"),s(`
	value T
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	p `),n("span",{class:"token operator"},":="),s(" Person"),n("span",{class:"token punctuation"},"["),n("span",{class:"token builtin"},"float64"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},"{"),s(`
		name`),n("span",{class:"token punctuation"},":"),s("  "),n("span",{class:"token string"},'"张三"'),n("span",{class:"token punctuation"},","),s(`
		age`),n("span",{class:"token punctuation"},":"),s("   "),n("span",{class:"token number"},"18"),n("span",{class:"token punctuation"},","),s(`
		value`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"1.2"),n("span",{class:"token punctuation"},","),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
	p`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"sayHello"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token punctuation"},"("),s("p "),n("span",{class:"token operator"},"*"),s("Person"),n("span",{class:"token punctuation"},"["),s("T"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token function"},"sayHello"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Printf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},`"Hello, my name is %s, I'm %d years old. value %v\\n"`),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},"."),s("name"),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},"."),s("age"),n("span",{class:"token punctuation"},","),s(" p"),n("span",{class:"token punctuation"},"."),s("value"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),_=c(`<h2 id="接口实现" tabindex="-1"><a class="header-anchor" href="#接口实现" aria-hidden="true">#</a> 接口实现</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
    age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Human <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    p <span class="token operator">:=</span> Person<span class="token punctuation">{</span>
        name<span class="token punctuation">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
        age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    p<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, my name is %s, I&#39;m %d years old.\\n&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">.</span>name<span class="token punctuation">,</span> p<span class="token punctuation">.</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法重写" tabindex="-1"><a class="header-anchor" href="#方法重写" aria-hidden="true">#</a> 方法重写</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> Person <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    name <span class="token builtin">string</span>
    age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Person
    school <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    s <span class="token operator">:=</span> Student<span class="token punctuation">{</span>
        Person<span class="token punctuation">:</span> Person<span class="token punctuation">{</span>
            name<span class="token punctuation">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
            age<span class="token punctuation">:</span>  <span class="token number">18</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        school<span class="token punctuation">:</span> <span class="token string">&quot;清华大学&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    s<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p Person<span class="token punctuation">)</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, my name is %s, I&#39;m %d years old.\\n&quot;</span><span class="token punctuation">,</span> p<span class="token punctuation">.</span>name<span class="token punctuation">,</span> p<span class="token punctuation">.</span>age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s Student<span class="token punctuation">)</span> <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, my name is %s, I&#39;m %d years old. I&#39;m a student of %s.\\n&quot;</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span>name<span class="token punctuation">,</span> s<span class="token punctuation">.</span>age<span class="token punctuation">,</span> s<span class="token punctuation">.</span>school<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function P(H,x){const o=l("Tabs");return i(),u("div",null,[d,k(o,{id:"10",data:[{id:"普通方法"},{id:"指针方法"},{id:"范型方法"},{id:"范型指针方法"}],"tab-id":"fruit"},{title0:a(({value:t,isActive:e})=>[s("普通方法")]),title1:a(({value:t,isActive:e})=>[s("指针方法")]),title2:a(({value:t,isActive:e})=>[s("范型方法")]),title3:a(({value:t,isActive:e})=>[s("范型指针方法")]),tab0:a(({value:t,isActive:e})=>[v,m]),tab1:a(({value:t,isActive:e})=>[b,g]),tab2:a(({value:t,isActive:e})=>[f,y]),tab3:a(({value:t,isActive:e})=>[h,w]),_:1}),_])}const T=p(r,[["render",P],["__file","方法.html.vue"]]);export{T as default};
