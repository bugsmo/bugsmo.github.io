import{_ as n,o as a,c as s,a as e}from"./app-8ca7f52c.js";const t={},p=e(`<h1 id="take-截取数组开始指定的元素" tabindex="-1"><a class="header-anchor" href="#take-截取数组开始指定的元素" aria-hidden="true">#</a> take 截取数组开始指定的元素</h1><p>从 array 数组的最开始一个元素开始提取 n 个元素</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">take</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> n<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>参数</strong></p><ul><li><code>array</code>要检索的数组。</li><li><code>n=1</code>要提取的元素<code>n</code>个数。</li></ul><p><strong>例子</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token comment">// =&gt; [2, 3]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">take</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> n <span class="token operator">=</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> arr<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,9),c=[p];function o(i,l){return a(),s("div",null,c)}const u=n(t,[["render",o],["__file","take截取数组开始指定的元素.html.vue"]]);export{u as default};
