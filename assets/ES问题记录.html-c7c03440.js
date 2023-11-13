import{_ as n,o as s,c as a,a as e}from"./app-8ca7f52c.js";const t={},p=e(`<h1 id="es-问题记录" tabindex="-1"><a class="header-anchor" href="#es-问题记录" aria-hidden="true">#</a> ES 问题记录</h1><h2 id="types-cannot-be-provided-in-put-mapping-requests-unless-the-include-type-name-parameter-is-set-to-true" tabindex="-1"><a class="header-anchor" href="#types-cannot-be-provided-in-put-mapping-requests-unless-the-include-type-name-parameter-is-set-to-true" aria-hidden="true">#</a> Types cannot be provided in put mapping requests, unless the include_type_name parameter is set to true</h2><p>原始请求</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST test/_doc/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;long&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;keyword&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST test/_doc/_mapping?include_type_name=<span class="token boolean">true</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;long&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;keyword&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[p];function i(c,l){return s(),a("div",null,o)}const u=n(t,[["render",i],["__file","ES问题记录.html.vue"]]);export{u as default};
