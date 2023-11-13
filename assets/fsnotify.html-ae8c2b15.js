import{_ as n,o as s,c as a,a as t}from"./app-8ca7f52c.js";const e={},p=t(`<h1 id="fsnotify-包" tabindex="-1"><a class="header-anchor" href="#fsnotify-包" aria-hidden="true">#</a> fsnotify 包</h1><p><a href="github.com/fsnotify/fsnotify">fsnotify 包</a></p><p><code>fsnotify</code> 包提供了对文件系统事件的监听，它可以监听文件的创建、删除、重命名、修改等事件。</p><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;log&quot;</span>

	<span class="token string">&quot;github.com/fsnotify/fsnotify&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	watcher<span class="token punctuation">,</span> err <span class="token operator">:=</span> fsnotify<span class="token punctuation">.</span><span class="token function">NewWatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> watcher<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	done <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">select</span> <span class="token punctuation">{</span>
			<span class="token keyword">case</span> event<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>watcher<span class="token punctuation">.</span>Events<span class="token punctuation">:</span>
				<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
					<span class="token keyword">return</span>
				<span class="token punctuation">}</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;event:&quot;</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span>
				<span class="token keyword">if</span> event<span class="token punctuation">.</span>Op<span class="token operator">&amp;</span>fsnotify<span class="token punctuation">.</span>Write <span class="token operator">==</span> fsnotify<span class="token punctuation">.</span>Write <span class="token punctuation">{</span>
					fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;modified file:&quot;</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token keyword">case</span> err<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token operator">&lt;-</span>watcher<span class="token punctuation">.</span>Errors<span class="token punctuation">:</span>
				<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
					<span class="token keyword">return</span>
				<span class="token punctuation">}</span>
				fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;error:&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	err <span class="token operator">=</span> watcher<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token string">&quot;./config.json&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 监听文件</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token operator">&lt;-</span>done
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(e,[["render",c],["__file","fsnotify.html.vue"]]);export{r as default};
