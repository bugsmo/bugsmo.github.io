import{_ as s,o as a,c as n,a as e}from"./app-8ca7f52c.js";const p={},t=e(`<h1 id="面试官-说说对-typescript-中命名空间与模块的理解-区别" tabindex="-1"><a class="header-anchor" href="#面试官-说说对-typescript-中命名空间与模块的理解-区别" aria-hidden="true">#</a> 面试官：说说对 TypeScript 中命名空间与模块的理解？区别？</h1><p><img src="https://static.vue-js.com/9378d760-137e-11ec-8e64-91fdec0f05a1.png" alt=""></p><h2 id="一、模块" tabindex="-1"><a class="header-anchor" href="#一、模块" aria-hidden="true">#</a> 一、模块</h2><p><code>TypeScript</code> 与<code> ECMAScript</code> 2015 一样，任何包含顶级 <code>import</code> 或者 <code>export</code> 的文件都被当成一个模块</p><p>相反地，如果一个文件不带有顶级的<code>import</code>或者<code>export</code>声明，那么它的内容被视为全局可见的</p><p>例如我们在在一个 <code>TypeScript</code> 工程下建立一个文件 <code>1.ts</code>，声明一个变量<code>a</code>，如下：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在另一个文件同样声明一个变量<code>a</code>，这时候会出现错误信息</p><p><img src="https://static.vue-js.com/a239d970-137e-11ec-a752-75723a64e8f5.png" alt=""></p><p>提示重复声明<code>a</code>变量，但是所处的空间是全局的</p><p>如果需要解决这个问题，则通过<code>import</code>或者<code>export</code>引入模块系统即可，如下：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>typescript</code>中，<code>export</code>关键字可以导出变量或者类型，用法与<code>es6</code>模块一致，如下：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">Person</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> String
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code>import</code> 引入模块，如下：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> Person <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./export&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="二、命名空间" tabindex="-1"><a class="header-anchor" href="#二、命名空间" aria-hidden="true">#</a> 二、命名空间</h2><p>命名空间一个最明确的目的就是解决重名问题</p><p>命名空间定义了标识符的可见范围，一个标识符可在多个名字空间中定义，它在不同名字空间中的含义是互不相干的</p><p>这样，在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中</p><p><code>TypeScript</code> 中命名空间使用 <code>namespace</code> 来定义，语法格式如下：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">namespace</span> SomeNameSpaceName <span class="token punctuation">{</span>
   <span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">ISomeInterfaceName</span> <span class="token punctuation">{</span>      <span class="token punctuation">}</span>
   <span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">SomeClassName</span> <span class="token punctuation">{</span>      <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上定义了一个命名空间 <code>SomeNameSpaceName</code>，如果我们需要在外部可以调用 <code>SomeNameSpaceName</code> 中的类和接口，则需要在类和接口添加 <code>export</code> 关键字</p><p>使用方式如下：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>SomeNameSpaceName<span class="token punctuation">.</span>SomeClassName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命名空间本质上是一个对象，作用是将一系列相关的全局变量组织到一个对象的属性，如下：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">namespace</span> Letter <span class="token punctuation">{</span>
  <span class="token keyword">export</span> <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">export</span> <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">export</span> <span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token comment">// ...</span>
  <span class="token keyword">export</span> <span class="token keyword">let</span> z <span class="token operator">=</span> <span class="token number">26</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编译成<code>js</code>如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> Letter<span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">Letter</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Letter<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    Letter<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    Letter<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token comment">// ...</span>
    Letter<span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token number">26</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Letter <span class="token operator">||</span> <span class="token punctuation">(</span>Letter <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、区别" tabindex="-1"><a class="header-anchor" href="#三、区别" aria-hidden="true">#</a> 三、区别</h2><ul><li><p>命名空间是位于全局命名空间下的一个普通的带有名字的 JavaScript 对象，使用起来十分容易。但就像其它的全局命名空间污染一样，它很难去识别组件之间的依赖关系，尤其是在大型的应用中</p></li><li><p>像命名空间一样，模块可以包含代码和声明。 不同的是模块可以声明它的依赖</p></li><li><p>在正常的TS项目开发过程中并不建议用命名空间，但通常在通过 d.ts 文件标记 js 库类型的时候使用命名空间，主要作用是给编译器编写代码的时候参考使用</p></li></ul><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><ul><li>https://www.tslang.cn/docs/handbook/modules.html</li><li>https://www.tslang.cn/docs/handbook/namespaces.html</li><li>https://www.tslang.cn/docs/handbook/namespaces-and-modules.html</li></ul>`,33),c=[t];function o(i,l){return a(),n("div",null,c)}const r=s(p,[["render",o],["__file","namespace_module.html.vue"]]);export{r as default};
