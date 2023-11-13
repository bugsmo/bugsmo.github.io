import{_ as n,o as a,c as s,a as e}from"./app-8ca7f52c.js";const t={},o=e(`<h1 id="aboutequal-两个值是否约等于" tabindex="-1"><a class="header-anchor" href="#aboutequal-两个值是否约等于" aria-hidden="true">#</a> aboutEqual 两个值是否约等于</h1><p>传入两个数字是否大致相等，误差在可接受范围内</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">aboutEqual</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> epsilon<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>参数</strong></p><ul><li><code>n1 n2</code> 要比较的数字</li><li><code>epsilon</code> 误差可接受范围内</li></ul><p><strong>例子</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">aboutEqual</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0.06</span><span class="token punctuation">)</span>
<span class="token comment">// =&gt; true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">aboutEqual</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> epsilon <span class="token operator">=</span> <span class="token number">0.001</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> Math<span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>n1 <span class="token operator">-</span> n2<span class="token punctuation">)</span> <span class="token operator">&lt;</span> epsilon
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,9),p=[o];function c(l,i){return a(),s("div",null,p)}const r=n(t,[["render",c],["__file","aboutEqual约等于.html.vue"]]);export{r as default};
