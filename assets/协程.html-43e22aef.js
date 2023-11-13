import{_ as u,r as c,o as p,c as r,b as n,d as s,e as l,w as a,a as d}from"./app-8ca7f52c.js";const k={},m=d(`<h1 id="协程" tabindex="-1"><a class="header-anchor" href="#协程" aria-hidden="true">#</a> 协程</h1><blockquote><p>协程（goroutine）是轻量级线程，由 Go 运行时管理</p></blockquote><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">go</span> 函数名<span class="token punctuation">(</span>参数列表<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="说明" tabindex="-1"><a class="header-anchor" href="#说明" aria-hidden="true">#</a> 说明</h2><ul><li>协程是由 Go 运行时管理的轻量级线程</li><li>协程的调度是由 Go 运行时进行管理的</li><li>协程是非抢占式多任务处理，由协程主动交出控制权</li><li>协程是编译器/解释器/虚拟机层面的多任务，比线程更加轻量级</li><li>主协程退出了，其他协程也会退出</li></ul><h2 id="调度模型" tabindex="-1"><a class="header-anchor" href="#调度模型" aria-hidden="true">#</a> 调度模型</h2>`,9),v={href:"https://zhuanlan.zhihu.com/p/352964026",target:"_blank",rel:"noopener noreferrer"},b=n("ul",null,[n("li",null,"Go 运行时会维护一个协程队列，队列中的协程会被多个线程轮流调度，每个线程被称为 M，每个协程被称为 G，每个协程会绑定到一个线程上，一个线程可以同时运行多个协程，但是一个协程只能绑定到一个线程上"),n("li",null,"竞争状态：当协程被调度到线程上时，如果线程上已经有协程在运行，那么这个协程就会进入竞争状态，等待线程上的协程运行完毕后，才能继续运行，这个过程中会发生上下文切换，会消耗一定的性能，所以协程的调度是非抢占式的，协程只有在主动交出控制权时，才会被调度到其他线程上，否则一直运行在当前线程上，这样就避免了频繁的上下文切换，提高了性能，但是也会导致协程长时间占用线程，导致其他协程无法运行，所以协程的调度也是需要合理的设计的，不能让协程长时间占用线程，否则会导致其他协程无法运行，这就是协程的调度模型，也是 Go 语言的调度模型。"),n("li",null,"GMP 关系：G 代表协程，M 代表线程，P 代表处理器，一个处理器可以管理多个线程，一个线程可以管理多个协程，所以 GMP 是一种多对多的关系。")],-1),h=n("h2",{id:"协程通信",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#协程通信","aria-hidden":"true"},"#"),s(" 协程通信")],-1),g=n("ul",null,[n("li",null,"利用 channel 通信")],-1),f=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token string"},'"fmt"'),s(`
    `),n("span",{class:"token string"},'"time"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    ch `),n("span",{class:"token operator"},":="),s(),n("span",{class:"token function"},"make"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"chan"),s(),n("span",{class:"token builtin"},"int"),n("span",{class:"token punctuation"},")"),s(`

    `),n("span",{class:"token keyword"},"go"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"A"'),n("span",{class:"token punctuation"},")"),s(`
        ch `),n("span",{class:"token operator"},"<-"),s(),n("span",{class:"token number"},"1"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

    `),n("span",{class:"token operator"},"<-"),s(`ch
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),_=n("ul",null,[n("li",null,"利用共享内存通信")],-1),w=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token string"},'"fmt"'),s(`
    `),n("span",{class:"token string"},'"time"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"var"),s(" a "),n("span",{class:"token builtin"},"int"),s(`

    `),n("span",{class:"token keyword"},"go"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"A"'),n("span",{class:"token punctuation"},")"),s(`
        a `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"1"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

    `),n("span",{class:"token keyword"},"for"),s(" a "),n("span",{class:"token operator"},"=="),s(),n("span",{class:"token number"},"0"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=n("ul",null,[n("li",null,"利用上下文通信")],-1),y=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token string"},'"fmt"'),s(`
    `),n("span",{class:"token string"},'"time"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    ctx`),n("span",{class:"token punctuation"},","),s(" cancel "),n("span",{class:"token operator"},":="),s(" context"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"WithCancel"),n("span",{class:"token punctuation"},"("),s("context"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Background"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`

    `),n("span",{class:"token keyword"},"go"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"A"'),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token function"},"cancel"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

    `),n("span",{class:"token operator"},"<-"),s("ctx"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Done"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1);function A(G,q){const i=c("ExternalLinkIcon"),o=c("Tabs");return p(),r("div",null,[m,n("p",null,[n("a",v,[s("调度模型详解"),l(i)])]),b,h,l(o,{id:"72",data:[{id:"channel 通信"},{id:"共享内存通信"},{id:"context 通信"}],"tab-id":"fruit"},{title0:a(({value:e,isActive:t})=>[s("channel 通信")]),title1:a(({value:e,isActive:t})=>[s("共享内存通信")]),title2:a(({value:e,isActive:t})=>[s("context 通信")]),tab0:a(({value:e,isActive:t})=>[g,f]),tab1:a(({value:e,isActive:t})=>[_,w]),tab2:a(({value:e,isActive:t})=>[x,y]),_:1})])}const B=u(k,[["render",A],["__file","协程.html.vue"]]);export{B as default};
