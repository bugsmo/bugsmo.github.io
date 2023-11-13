import{_ as r,r as l,o as p,c as k,e as o,w as a,d as s,b as n,a as i}from"./app-8ca7f52c.js";const d={},m=i('<h1 id="errors-包" tabindex="-1"><a class="header-anchor" href="#errors-包" aria-hidden="true">#</a> errors 包</h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p><code>errors</code> 包提供了一个 <code>error</code> 接口的实现，它可以用来包装其他 <code>error</code>，并且可以通过 <code>errors.Is</code> 和 <code>errors.As</code> 来判断是否是某个特定的 <code>error</code>。</p><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2>',4),v=n("ul",null,[n("li",null,[n("code",null,"New"),s(" 方法返回一个由所给的 "),n("code",null,"text"),s(" 格式化的错误类型。每一个 "),n("code",null,"New"),s(" 方法返回的错误都是不同的即使 "),n("code",null,"text"),s(" 一致")])],-1),b=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"errors"'),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	err `),n("span",{class:"token operator"},":="),s(" errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"New"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"error"'),n("span",{class:"token punctuation"},")"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),g=n("ul",null,[n("li",null,[n("code",null,"Is"),s(" 方法判断是否存在在 "),n("code",null,"err"),s(" 链中的错误匹配 "),n("code",null,"target")])],-1),f=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"errors"'),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	err `),n("span",{class:"token operator"},":="),s(" errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"New"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"error"'),n("span",{class:"token punctuation"},")"),s(`
	err `),n("span",{class:"token operator"},"="),s(" fmt"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Errorf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"wrap: %w"'),n("span",{class:"token punctuation"},","),s(" err"),n("span",{class:"token punctuation"},")"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Is"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},","),s(" errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"New"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"error"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token comment"},"// 或者"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("err "),n("span",{class:"token operator"},"=="),s(" errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"New"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"error"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),w=n("ul",null,[n("li",null,[n("p",null,[n("code",null,"As"),s(" 方法在 "),n("code",null,"err"),s(" 链中找到和 "),n("code",null,"target"),s(" 错误匹配的第一个错误，并且将该错误赋值给 "),n("code",null,"target"),s("，并返回 "),n("code",null,"true"),s("，否则返回 "),n("code",null,"false")])]),n("li",null,[n("p",null,[s("这个链由 "),n("code",null,"err"),s(" 本身和通过重复调用 "),n("code",null,"Unwrap"),s(" 获得的错误序列组成")])]),n("li",null,[n("p",null,[n("code",null,"As"),s(" 方法会 "),n("code",null,"panic"),s(" 如果 "),n("code",null,"target"),s(" 不是一个指向实现了 "),n("code",null,"error"),s(" 的空指针类型或者接口")])])],-1),h=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"errors"'),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"type"),s(" MyError "),n("span",{class:"token keyword"},"struct"),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token punctuation"},"("),s("e "),n("span",{class:"token operator"},"*"),s("MyError"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token function"},"Error"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token builtin"},"string"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token string"},'"MyError"'),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	err `),n("span",{class:"token operator"},":="),s(" errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"New"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"error"'),n("span",{class:"token punctuation"},")"),s(`
	err `),n("span",{class:"token operator"},"="),s(" fmt"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Errorf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"wrap: %w"'),n("span",{class:"token punctuation"},","),s(" err"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token keyword"},"var"),s(" e "),n("span",{class:"token operator"},"*"),s(`MyError
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"As"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token operator"},"&"),s("e"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),y=n("ul",null,[n("li",null,[n("code",null,"Unwrap"),s(" 方法返回 "),n("code",null,"err"),s(" 的 "),n("code",null,"Unwrap"),s(" 方法的结果")])],-1),_=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"errors"'),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	err `),n("span",{class:"token operator"},":="),s(" errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"New"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"error"'),n("span",{class:"token punctuation"},")"),s(`
	err `),n("span",{class:"token operator"},"="),s(" fmt"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Errorf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"wrap: %w"'),n("span",{class:"token punctuation"},","),s(" err"),n("span",{class:"token punctuation"},")"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Unwrap"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),E=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"errors"'),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	err `),n("span",{class:"token operator"},":="),s(" errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"New"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"error"'),n("span",{class:"token punctuation"},")"),s(`
	err `),n("span",{class:"token operator"},"="),s(" fmt"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Errorf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"wrap: %w"'),n("span",{class:"token punctuation"},","),s(" err"),n("span",{class:"token punctuation"},")"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=n("ul",null,[n("li",null,[s("一般把 error 放在函数的最后一个返回值，如果有多个 error，可以使用 "),n("code",null,"github.com/pkg/errors"),s(" 包")])],-1),A=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"errors"'),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"Curl"),n("span",{class:"token punctuation"},"("),s("url "),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},","),n("span",{class:"token builtin"},"error"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token comment"},"// TODO curl operation"),s(`
	`),n("span",{class:"token keyword"},"if"),s(" url "),n("span",{class:"token operator"},"=="),s(),n("span",{class:"token string"},'""'),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token string"},'""'),n("span",{class:"token punctuation"},","),s(" errors"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"New"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"url is empty"'),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
	`),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token string"},'"content"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token boolean"},"nil"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	content`),n("span",{class:"token punctuation"},","),s(" err "),n("span",{class:"token operator"},":="),s(),n("span",{class:"token function"},"Curl"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'""'),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token keyword"},"if"),s(" err "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),s(`
		`),n("span",{class:"token keyword"},"return"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("content"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),N=n("ul",null,[n("li",null,[s("自定义错误类型，实现 "),n("code",null,"Error"),s(" 方法")])],-1),M=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"type"),s(" MyError "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
	Msg  `),n("span",{class:"token builtin"},"string"),s(`
	Code `),n("span",{class:"token builtin"},"int"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token punctuation"},"("),s("e "),n("span",{class:"token operator"},"*"),s("MyError"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token function"},"Error"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token builtin"},"string"),s(),n("span",{class:"token punctuation"},"{"),s(`
	`),n("span",{class:"token keyword"},"return"),s(" fmt"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Sprintf"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"code: %d, msg: %s"'),n("span",{class:"token punctuation"},","),s(" e"),n("span",{class:"token punctuation"},"."),s("Code"),n("span",{class:"token punctuation"},","),s(" e"),n("span",{class:"token punctuation"},"."),s("Msg"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	err `),n("span",{class:"token operator"},":="),s(),n("span",{class:"token operator"},"&"),s("MyError"),n("span",{class:"token punctuation"},"{"),s(`
		Msg`),n("span",{class:"token punctuation"},":"),s("  "),n("span",{class:"token string"},'"error"'),n("span",{class:"token punctuation"},","),s(`
		Code`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"500"),n("span",{class:"token punctuation"},","),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),P=i(`<h2 id="自定义错误" tabindex="-1"><a class="header-anchor" href="#自定义错误" aria-hidden="true">#</a> 自定义错误</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> MyError <span class="token builtin">string</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>e MyError<span class="token punctuation">)</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">string</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	ErrNotFound <span class="token operator">=</span> <span class="token function">MyError</span><span class="token punctuation">(</span><span class="token string">&quot;not found&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ErrNotFound<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,3),C={href:"https://golang.org/pkg/errors/",target:"_blank",rel:"noopener noreferrer"},I={href:"https://zhuanlan.zhihu.com/p/214159415",target:"_blank",rel:"noopener noreferrer"};function U(q,T){const u=l("Tabs"),c=l("ExternalLinkIcon");return p(),k("div",null,[m,o(u,{id:"12",data:[{id:"New"},{id:"Is"},{id:"As"},{id:"Unwrap"},{id:"包装错误"},{id:"常见用法"},{id:"自定义错误"}],"tab-id":"fruit"},{title0:a(({value:t,isActive:e})=>[s("New")]),title1:a(({value:t,isActive:e})=>[s("Is")]),title2:a(({value:t,isActive:e})=>[s("As")]),title3:a(({value:t,isActive:e})=>[s("Unwrap")]),title4:a(({value:t,isActive:e})=>[s("包装错误")]),title5:a(({value:t,isActive:e})=>[s("常见用法")]),title6:a(({value:t,isActive:e})=>[s("自定义错误")]),tab0:a(({value:t,isActive:e})=>[v,b]),tab1:a(({value:t,isActive:e})=>[g,f]),tab2:a(({value:t,isActive:e})=>[w,h]),tab3:a(({value:t,isActive:e})=>[y,_]),tab4:a(({value:t,isActive:e})=>[E]),tab5:a(({value:t,isActive:e})=>[x,A]),tab6:a(({value:t,isActive:e})=>[N,M]),_:1}),P,n("ul",null,[n("li",null,[n("a",C,[s("源码文档"),o(c)])]),n("li",null,[n("a",I,[s("知乎解释"),o(c)])])])])}const B=r(d,[["render",U],["__file","errors.html.vue"]]);export{B as default};
