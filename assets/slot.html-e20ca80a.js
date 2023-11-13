import{_ as p,r as e,o,c,b as n,d as a,e as t,a as l}from"./app-8ca7f52c.js";const i={},u=l(`<h1 id="面试官-说说你对slot的理解-slot使用场景有哪些" tabindex="-1"><a class="header-anchor" href="#面试官-说说你对slot的理解-slot使用场景有哪些" aria-hidden="true">#</a> 面试官：说说你对slot的理解？slot使用场景有哪些？</h1><p><img src="https://static.vue-js.com/141ca660-3dbc-11eb-85f6-6fac77c0c9b3.png" alt=""></p><h2 id="一、slot是什么" tabindex="-1"><a class="header-anchor" href="#一、slot是什么" aria-hidden="true">#</a> 一、slot是什么</h2><p>在HTML中 <code>slot</code> 元素 ，作为 <code>Web Components</code> 技术套件的一部分，是Web组件内的一个占位符</p><p>该占位符可以在后期使用自己的标记语言填充</p><p>举个栗子</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>element-details-template<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>element-name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Slot template<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>element-details</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>element-name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>element-details</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>element-details</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>element-name<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>element-details</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>template</code>不会展示到页面中，需要用先获取它的引用，然后添加到<code>DOM</code>中，</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>customElements<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;element-details&#39;</span><span class="token punctuation">,</span>
  <span class="token keyword">class</span> <span class="token class-name">extends</span> HTMLElement <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> template <span class="token operator">=</span> document
        <span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;element-details-template&#39;</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span>content<span class="token punctuation">;</span>
      <span class="token keyword">const</span> shadowRoot <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">attachShadow</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;open&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>Vue</code>中的概念也是如此</p><p><code>Slot</code> 艺名插槽，花名“占坑”，我们可以理解为<code>solt</code>在组件模板中占好了位置，当使用该组件标签时候，组件标签里面的内容就会自动填坑（替换组件模板中<code>slot</code>位置），作为承载分发内容的出口</p><p>可以将其类比为插卡式的FC游戏机，游戏机暴露卡槽（插槽）让用户插入不同的游戏磁条（自定义内容）</p><p>放张图感受一下 <img src="https://static.vue-js.com/63c0dff0-3dbd-11eb-85f6-6fac77c0c9b3.png" alt=""></p><h2 id="二、使用场景" tabindex="-1"><a class="header-anchor" href="#二、使用场景" aria-hidden="true">#</a> 二、使用场景</h2><p>通过插槽可以让用户可以拓展组件，去更好地复用组件和对其做定制化处理</p><p>如果父组件在使用到一个复用组件的时候，获取这个组件在不同的地方有少量的更改，如果去重写组件是一件不明智的事情</p><p>通过<code>slot</code>插槽向组件内部指定位置传递内容，完成这个复用组件在不同场景的应用</p><p>比如布局组件、表格列、下拉选、弹框显示内容等</p><h2 id="三、分类" tabindex="-1"><a class="header-anchor" href="#三、分类" aria-hidden="true">#</a> 三、分类</h2><p><code>slot</code>可以分来以下三种：</p><ul><li>默认插槽</li><li>具名插槽</li><li>作用域插槽</li></ul><h3 id="默认插槽" tabindex="-1"><a class="header-anchor" href="#默认插槽" aria-hidden="true">#</a> 默认插槽</h3><p>子组件用<code>&lt;slot&gt;</code>标签来确定渲染的位置，标签里面可以放<code>DOM</code>结构，当父组件使用的时候没有往插槽传入内容，标签内<code>DOM</code>结构就会显示在页面</p><p>父组件在使用的时候，直接在子组件的标签内写入内容即可</p><p>子组件<code>Child.vue</code></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>插槽后备的内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>父组件</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Child</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>默认插槽<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>  
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Child</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="具名插槽" tabindex="-1"><a class="header-anchor" href="#具名插槽" aria-hidden="true">#</a> 具名插槽</h3><p>子组件用<code>name</code>属性来表示插槽的名字，不传为默认插槽</p><p>父组件中在使用时在默认插槽的基础上加上<code>slot</code>属性，值为子组件插槽<code>name</code>属性值</p><p>子组件<code>Child.vue</code></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span><span class="token punctuation">&gt;</span></span>插槽后备的内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>content<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>插槽后备的内容<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>父组件</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>default</span><span class="token punctuation">&gt;</span></span>具名插槽<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 具名插槽⽤插槽名做参数 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>content</span><span class="token punctuation">&gt;</span></span>内容...<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="作用域插槽" tabindex="-1"><a class="header-anchor" href="#作用域插槽" aria-hidden="true">#</a> 作用域插槽</h3><p>子组件在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件<code>v-slot</code>接受的对象上</p><p>父组件中在使用时通过<code>v-slot:</code>（简写：#）获取子组件的信息，在内容中使用</p><p>子组件<code>Child.vue</code></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span> 
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>slot</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>footer<span class="token punctuation">&quot;</span></span> <span class="token attr-name">testProps</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>子组件的值<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>没传footer插槽<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>slot</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>父组件</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>child</span><span class="token punctuation">&gt;</span></span> 
    <span class="token comment">&lt;!-- 把v-slot的值指定为作⽤域上下⽂对象 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>default</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slotProps<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      来⾃⼦组件数据：{{slotProps.testProps}}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#default</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>slotProps<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      来⾃⼦组件数据：{{slotProps.testProps}}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>child</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3><ul><li><code>v-slot</code>属性只能在<code>&lt;template&gt;</code>上使用，但在只有默认插槽时可以在组件标签上使用</li><li>默认插槽名为<code>default</code>，可以省略default直接写<code>v-slot</code></li><li>缩写为<code>#</code>时不能不写参数，写成<code>#default</code></li><li>可以通过解构获取<code>v-slot={user}</code>，还可以重命名<code>v-slot=&quot;{user: newName}&quot;</code>和定义默认值<code>v-slot=&quot;{user = &#39;默认值&#39;}&quot;</code></li></ul><h2 id="四、原理分析" tabindex="-1"><a class="header-anchor" href="#四、原理分析" aria-hidden="true">#</a> 四、原理分析</h2><p><code>slot</code>本质上是返回<code>VNode</code>的函数，一般情况下，<code>Vue</code>中的组件要渲染到页面上需要经过<code>template -&gt; render function -&gt; VNode -&gt; DOM</code> 过程，这里看看<code>slot</code>如何实现：</p><p>编写一个<code>buttonCounter</code>组件，使用匿名插槽</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">&#39;button-counter&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;div&gt; &lt;slot&gt;我是默认内容&lt;/slot&gt;&lt;/div&gt;&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用该组件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">&#39;#app&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;&lt;button-counter&gt;&lt;span&gt;我是slot传入内容&lt;/span&gt;&lt;/button-counter&gt;&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">components</span><span class="token operator">:</span><span class="token punctuation">{</span>buttonCounter<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取<code>buttonCounter</code>组件渲染函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">anonymous</span><span class="token punctuation">(</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">with</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token function">_c</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token function">_t</span><span class="token punctuation">(</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token function">_v</span><span class="token punctuation">(</span><span class="token string">&quot;我是默认内容&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>_v</code>表示穿件普通文本节点，<code>_t</code>表示渲染插槽的函数</p><p>渲染插槽函数<code>renderSlot</code>（做了简化）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">renderSlot</span> <span class="token punctuation">(</span>
  <span class="token parameter">name<span class="token punctuation">,</span>
  fallback<span class="token punctuation">,</span>
  props<span class="token punctuation">,</span>
  bindObject</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 得到渲染插槽内容的函数    </span>
  <span class="token keyword">var</span> scopedSlotFn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$scopedSlots<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> nodes<span class="token punctuation">;</span>
  <span class="token comment">// 如果存在插槽渲染函数，则执行插槽渲染函数，生成nodes节点返回</span>
  <span class="token comment">// 否则使用默认值</span>
  nodes <span class="token operator">=</span> <span class="token function">scopedSlotFn</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token operator">||</span> fallback<span class="token punctuation">;</span>
  <span class="token keyword">return</span> nodes<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>name</code>属性表示定义插槽的名字，默认值为<code>default</code>，<code>fallback</code>表示子组件中的<code>slot</code>节点的默认值</p><p>关于<code>this.$scopredSlots</code>是什么，我们可以先看看<code>vm.slot</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initRender</span> <span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  vm<span class="token punctuation">.</span>$slots <span class="token operator">=</span> <span class="token function">resolveSlots</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>_renderChildren<span class="token punctuation">,</span> renderContext<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>resolveSlots</code>函数会对<code>children</code>节点做归类和过滤处理，返回<code>slots</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">resolveSlots</span> <span class="token punctuation">(</span>
    <span class="token parameter">children<span class="token punctuation">,</span>
    context</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>children <span class="token operator">||</span> <span class="token operator">!</span>children<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">var</span> slots <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> children<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> child <span class="token operator">=</span> children<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">var</span> data <span class="token operator">=</span> child<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
      <span class="token comment">// remove slot attribute if the node is resolved as a Vue slot node</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>data <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">.</span>attrs <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">.</span>attrs<span class="token punctuation">.</span>slot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">delete</span> data<span class="token punctuation">.</span>attrs<span class="token punctuation">.</span>slot<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// named slots should only be respected if the vnode was rendered in the</span>
      <span class="token comment">// same context.</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>child<span class="token punctuation">.</span>context <span class="token operator">===</span> context <span class="token operator">||</span> child<span class="token punctuation">.</span>fnContext <span class="token operator">===</span> context<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        data <span class="token operator">&amp;&amp;</span> data<span class="token punctuation">.</span>slot <span class="token operator">!=</span> <span class="token keyword">null</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果slot存在(slot=&quot;header&quot;) 则拿对应的值作为key</span>
        <span class="token keyword">var</span> name <span class="token operator">=</span> data<span class="token punctuation">.</span>slot<span class="token punctuation">;</span>
        <span class="token keyword">var</span> slot <span class="token operator">=</span> <span class="token punctuation">(</span>slots<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">(</span>slots<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 如果是tempalte元素 则把template的children添加进数组中，这也就是为什么你写的template标签并不会渲染成另一个标签到页面</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>child<span class="token punctuation">.</span>tag <span class="token operator">===</span> <span class="token string">&#39;template&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          slot<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>slot<span class="token punctuation">,</span> child<span class="token punctuation">.</span>children <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          slot<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果没有就默认是default</span>
        <span class="token punctuation">(</span>slots<span class="token punctuation">.</span>default <span class="token operator">||</span> <span class="token punctuation">(</span>slots<span class="token punctuation">.</span>default <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>child<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ignore slots that contains only whitespace</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> name$1 <span class="token keyword">in</span> slots<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>slots<span class="token punctuation">[</span>name$1<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span>isWhitespace<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">delete</span> slots<span class="token punctuation">[</span>name$1<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> slots
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>_render</code>渲染函数通过<code>normalizeScopedSlots</code>得到<code>vm.$scopedSlots</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>vm<span class="token punctuation">.</span>$scopedSlots <span class="token operator">=</span> <span class="token function">normalizeScopedSlots</span><span class="token punctuation">(</span>
  _parentVnode<span class="token punctuation">.</span>data<span class="token punctuation">.</span>scopedSlots<span class="token punctuation">,</span>
  vm<span class="token punctuation">.</span>$slots<span class="token punctuation">,</span>
  vm<span class="token punctuation">.</span>$scopedSlots
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作用域插槽中父组件能够得到子组件的值是因为在<code>renderSlot</code>的时候执行会传入<code>props</code>，也就是上述<code>_t</code>第三个参数，父组件则能够得到子组件传递过来的值</p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>`,64),d={href:"https://juejin.cn/post/6844903817746628615#heading-4",target:"_blank",rel:"noopener noreferrer"},k={href:"https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots",target:"_blank",rel:"noopener noreferrer"},r={href:"https://vue3js.cn/docs/zh",target:"_blank",rel:"noopener noreferrer"},v={href:"https://segmentfault.com/a/1190000019492734?utm_source=tag-newest",target:"_blank",rel:"noopener noreferrer"};function m(g,b){const s=e("ExternalLinkIcon");return o(),c("div",null,[u,n("ul",null,[n("li",null,[n("a",d,[a("https://juejin.cn/post/6844903817746628615#heading-4"),t(s)])]),n("li",null,[n("a",k,[a("https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots"),t(s)])]),n("li",null,[n("a",r,[a("https://vue3js.cn/docs/zh"),t(s)])]),n("li",null,[n("a",v,[a("https://segmentfault.com/a/1190000019492734?utm_source=tag-newest"),t(s)])])])])}const f=p(i,[["render",m],["__file","slot.html.vue"]]);export{f as default};
