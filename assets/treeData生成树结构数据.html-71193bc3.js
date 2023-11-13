import{_ as n,o as a,c as s,a as p}from"./app-8ca7f52c.js";const t={},e=p(`<h1 id="treedata-生成树结构数据" tabindex="-1"><a class="header-anchor" href="#treedata-生成树结构数据" aria-hidden="true">#</a> treeData 生成树结构数据</h1><p>该函数传入一个数组， 每项<code>id</code>对应其父级数据<code>parent_id</code>，返回一个树结构数组</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">treeData</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> id<span class="token punctuation">,</span> parent_id<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>参数</strong></p><ul><li><code>array</code> 要生成树结构的数组</li><li><code>id</code> 自定义属性名</li><li><code>parent_id</code> 父级自定义属性名</li></ul><p><strong>例子</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> comments <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">parent_id</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token literal-property property">parent_id</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token literal-property property">parent_id</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token literal-property property">parent_id</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token literal-property property">parent_id</span><span class="token operator">:</span> <span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>

<span class="token function">treeData</span><span class="token punctuation">(</span>comments<span class="token punctuation">)</span>

<span class="token comment">// =&gt; [ { id: 1, parent_id: null, children: [ [Object], [Object] ] } ]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> treeData <span class="token operator">=</span> <span class="token punctuation">(</span>arr<span class="token punctuation">,</span> id <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> link <span class="token operator">=</span> <span class="token string">&#39;parent_id&#39;</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> arr<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> item<span class="token punctuation">[</span>link<span class="token punctuation">]</span> <span class="token operator">===</span> id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">...</span>item<span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token function">treeData</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> item<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,9),o=[e];function c(r,l){return a(),s("div",null,o)}const u=n(t,[["render",c],["__file","treeData生成树结构数据.html.vue"]]);export{u as default};
