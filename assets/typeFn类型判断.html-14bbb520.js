import{_ as n,o as s,c as a,a as t}from"./app-8ca7f52c.js";const p={},e=t(`<h1 id="typefn-判断类型" tabindex="-1"><a class="header-anchor" href="#typefn-判断类型" aria-hidden="true">#</a> typeFn 判断类型</h1><p>判断是否是 <code>Array</code> <code>Object</code> <code>String</code> <code>Number</code>类型</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>typeFn<span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>参数</strong></p><ul><li><code>type</code> 数据类型</li><li><code>value</code>要检验的值</li></ul><p><strong>例子</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>typeFn<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">&#39;1&#39;</span><span class="token punctuation">)</span>
typeFn<span class="token punctuation">.</span><span class="token function">Number</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
typeFn<span class="token punctuation">.</span><span class="token function">Boolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
typeFn<span class="token punctuation">.</span><span class="token function">Null</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
typeFn<span class="token punctuation">.</span><span class="token function">Array</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
typeFn<span class="token punctuation">.</span><span class="token function">Object</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
typeFn<span class="token punctuation">.</span><span class="token function">Function</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// =&gt; true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> typeFn <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">curring</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> len <span class="token operator">=</span> fn<span class="token punctuation">.</span>length
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        arr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">curring</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> arr<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>arr<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">isType</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">[object </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">]</span><span class="token template-punctuation string">\`</span></span>
<span class="token punctuation">}</span>
<span class="token punctuation">;</span><span class="token punctuation">[</span><span class="token string">&#39;String&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Number&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Boolean&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Null&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Array&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Object&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Function&#39;</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">type</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    typeFn<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">curring</span><span class="token punctuation">(</span>isType<span class="token punctuation">)</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),o=[e];function c(l,u){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","typeFn类型判断.html.vue"]]);export{r as default};
