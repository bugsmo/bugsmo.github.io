import{_ as t,r as e,o as p,c as o,b as n,d as s,e as i,a as c}from"./app-8ca7f52c.js";const l={},u=n("h1",{id:"redis",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#redis","aria-hidden":"true"},"#"),s(" redis")],-1),r=n("h2",{id:"redis-相关包",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#redis-相关包","aria-hidden":"true"},"#"),s(" redis 相关包")],-1),d={href:"https://github.com/go-redis/redis",target:"_blank",rel:"noopener noreferrer"},k=c(`<h2 id="redis-相关命令" tabindex="-1"><a class="header-anchor" href="#redis-相关命令" aria-hidden="true">#</a> redis 相关命令</h2><h3 id="redis-cli" tabindex="-1"><a class="header-anchor" href="#redis-cli" aria-hidden="true">#</a> redis-cli</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 连接redis</span>
redis-cli <span class="token parameter variable">-h</span>
<span class="token comment"># 查看所有key</span>
keys *
<span class="token comment"># 查看key的类型</span>
<span class="token builtin class-name">type</span> key
<span class="token comment"># 查看key的值</span>
get key
<span class="token comment"># 查看key的过期时间</span>
ttl key
<span class="token comment"># 查看key的长度</span>
strlen key
<span class="token comment"># 查看key的值的长度</span>
strlen key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="redis-1" tabindex="-1"><a class="header-anchor" href="#redis-1" aria-hidden="true">#</a> redis</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看所有key</span>
keys *
<span class="token comment"># 查看key的类型</span>
<span class="token builtin class-name">type</span> key

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redis-相关操作" tabindex="-1"><a class="header-anchor" href="#redis-相关操作" aria-hidden="true">#</a> redis 相关操作</h2><h3 id="连接" tabindex="-1"><a class="header-anchor" href="#连接" aria-hidden="true">#</a> 连接</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;github.com/go-redis/redis&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client <span class="token operator">:=</span> redis<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>redis<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
        Addr<span class="token punctuation">:</span>     <span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">,</span>
        Password<span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// no password set</span>
        DB<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// use default DB</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    pong<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Result</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>pong<span class="token punctuation">,</span> err
    <span class="token comment">// Output: PONG &lt;nil&gt;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置" tabindex="-1"><a class="header-anchor" href="#设置" aria-hidden="true">#</a> 设置</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;github.com/go-redis/redis&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client <span class="token operator">:=</span> redis<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>redis<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
        Addr<span class="token punctuation">:</span>     <span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">,</span>
        Password<span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// no password set</span>
        DB<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// use default DB</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;value&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    val<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Result
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span>
    <span class="token comment">// Output: key value</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取" tabindex="-1"><a class="header-anchor" href="#获取" aria-hidden="true">#</a> 获取</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;github.com/go-redis/redis&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client <span class="token operator">:=</span> redis<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>redis<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
        Addr<span class="token punctuation">:</span>     <span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">,</span>
        Password<span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// no password set</span>
        DB<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// use default DB</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    val<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Result
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span>
    <span class="token comment">// Output: key value</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除" tabindex="-1"><a class="header-anchor" href="#删除" aria-hidden="true">#</a> 删除</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;github.com/go-redis/redis&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client <span class="token operator">:=</span> redis<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>redis<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
        Addr<span class="token punctuation">:</span>     <span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">,</span>
        Password<span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// no password set</span>
        DB<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// use default DB</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Del</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="过期" tabindex="-1"><a class="header-anchor" href="#过期" aria-hidden="true">#</a> 过期</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;github.com/go-redis/redis&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client <span class="token operator">:=</span> redis<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>redis<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
        Addr<span class="token punctuation">:</span>     <span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">,</span>
        Password<span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// no password set</span>
        DB<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// use default DB</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Expire</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token operator">*</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    ttl<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">TTL</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Result
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;key&quot;</span><span class="token punctuation">,</span> ttl<span class="token punctuation">)</span>
    <span class="token comment">// Output: key 10s</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="计数器" tabindex="-1"><a class="header-anchor" href="#计数器" aria-hidden="true">#</a> 计数器</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;github.com/go-redis/redis&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client <span class="token operator">:=</span> redis<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>redis<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
        Addr<span class="token punctuation">:</span>     <span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">,</span>
        Password<span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// no password set</span>
        DB<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// use default DB</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Incr</span><span class="token punctuation">(</span><span class="token string">&quot;counter&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    val<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">&quot;counter&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Result
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;counter&quot;</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span>
    <span class="token comment">// Output: counter 1</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="列表" tabindex="-1"><a class="header-anchor" href="#列表" aria-hidden="true">#</a> 列表</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;github.com/go-redis/redis&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client <span class="token operator">:=</span> redis<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>redis<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
        Addr<span class="token punctuation">:</span>     <span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">,</span>
        Password<span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// no password set</span>
        DB<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// use default DB</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">LPush</span><span class="token punctuation">(</span><span class="token string">&quot;languages&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;go&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    err <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">LPush</span><span class="token punctuation">(</span><span class="token string">&quot;languages&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    val<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">LRange</span><span class="token punctuation">(</span><span class="token string">&quot;languages&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Result
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;languages&quot;</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span>
    <span class="token comment">// Output: languages [java go]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集合" tabindex="-1"><a class="header-anchor" href="#集合" aria-hidden="true">#</a> 集合</h3><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;github.com/go-redis/redis&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client <span class="token operator">:=</span> redis<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>redis<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
        Addr<span class="token punctuation">:</span>     <span class="token string">&quot;localhost:6379&quot;</span><span class="token punctuation">,</span>
        Password<span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span> <span class="token comment">// no password set</span>
        DB<span class="token punctuation">:</span>       <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// use default DB</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">SAdd</span><span class="token punctuation">(</span><span class="token string">&quot;languages&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;go&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    err <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">SAdd</span><span class="token punctuation">(</span><span class="token string">&quot;languages&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;java&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    val<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">SMembers</span><span class="token punctuation">(</span><span class="token string">&quot;languages&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Result
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;languages&quot;</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span>
    <span class="token comment">// Output: languages [java go]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22);function v(m,b){const a=e("ExternalLinkIcon");return p(),o("div",null,[u,r,n("p",null,[n("a",d,[s("github.com/go-redis/redis"),i(a)])]),k])}const f=t(l,[["render",v],["__file","1.html.vue"]]);export{f as default};
