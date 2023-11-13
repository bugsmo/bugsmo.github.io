import{_ as n,o as s,c as a,a as t}from"./app-8ca7f52c.js";const e={},p=t(`<h1 id="thousands-数字每隔三位数加分号" tabindex="-1"><a class="header-anchor" href="#thousands-数字每隔三位数加分号" aria-hidden="true">#</a> thousands 数字每隔三位数加分号</h1><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">thousands</span><span class="token punctuation">(</span>number<span class="token punctuation">,</span> chars<span class="token operator">=</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>返回</strong> 返回填充后的字符串。</p><p><strong>参数</strong></p><ol><li><code>number</code> 数字或者浮点数</li><li><code>chars</code> 填充字符</li></ol><p><strong>例子</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">thousands</span><span class="token punctuation">(</span><span class="token number">12255552323</span><span class="token punctuation">)</span>
<span class="token comment">// =&gt; 12,255,552,323</span>

<span class="token function">thousands</span><span class="token punctuation">(</span><span class="token number">12255552323</span><span class="token punctuation">,</span> <span class="token string">&#39;、&#39;</span><span class="token punctuation">)</span>
<span class="token comment">// =&gt; 12、255、552、323</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> thousands <span class="token operator">=</span> <span class="token punctuation">(</span>num<span class="token punctuation">,</span> chars<span class="token operator">=</span><span class="token string">&#39;,&#39;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">String</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token function">String</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">&#39;.&#39;</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">?</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\\d)(?=(\\d{3})+\\.)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span> <span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\\d)(?=(\\d{3})+$)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">$1</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>chars<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,9),o=[p];function c(l,i){return s(),a("div",null,o)}const u=n(e,[["render",c],["__file","thousands每隔三位数字添加逗号.html.vue"]]);export{u as default};
