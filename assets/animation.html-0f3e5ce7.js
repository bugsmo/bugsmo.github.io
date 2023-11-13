import{_ as n,o as s,c as a,a as t}from"./app-8ca7f52c.js";const e={},p=t(`<h1 id="面试官-css3动画有哪些" tabindex="-1"><a class="header-anchor" href="#面试官-css3动画有哪些" aria-hidden="true">#</a> 面试官：css3动画有哪些？</h1><p><img src="https://static.vue-js.com/d12e2380-9c0a-11eb-ab90-d9ae814b240d.png" alt=""></p><h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2><p>CSS动画（CSS Animations）是为层叠样式表建议的允许可扩展标记语言（XML）元素使用CSS的动画的模块</p><p>即指元素从一种样式逐渐过渡为另一种样式的过程</p><p>常见的动画效果有很多，如平移、旋转、缩放等等，复杂动画则是多个简单动画的组合</p><p><code>css</code>实现动画的方式，有如下几种：</p><ul><li>transition 实现渐变动画</li><li>transform 转变动画</li><li>animation 实现自定义动画</li></ul><h2 id="二、实现方式" tabindex="-1"><a class="header-anchor" href="#二、实现方式" aria-hidden="true">#</a> 二、实现方式</h2><h3 id="transition-实现渐变动画" tabindex="-1"><a class="header-anchor" href="#transition-实现渐变动画" aria-hidden="true">#</a> transition 实现渐变动画</h3><p><code>transition</code>的属性如下：</p><ul><li>property:填写需要变化的css属性</li><li>duration:完成过渡效果需要的时间单位(s或者ms)</li><li>timing-function:完成效果的速度曲线</li><li>delay: 动画效果的延迟触发时间</li></ul><p>其中<code>timing-function</code>的值有如下：</p><table><thead><tr><th>值</th><th>描述</th></tr></thead><tbody><tr><td>linear</td><td>匀速（等于 cubic-bezier(0,0,1,1)）</td></tr><tr><td>ease</td><td>从慢到快再到慢（cubic-bezier(0.25,0.1,0.25,1)）</td></tr><tr><td>ease-in</td><td>慢慢变快（等于 cubic-bezier(0.42,0,1,1)）</td></tr><tr><td>ease-out</td><td>慢慢变慢（等于 cubic-bezier(0,0,0.58,1)）</td></tr><tr><td>ease-in-out</td><td>先变快再到慢（等于 cubic-bezier(0.42,0,0.58,1)），渐显渐隐效果</td></tr><tr><td>cubic-bezier(<em>n</em>,<em>n</em>,<em>n</em>,<em>n</em>)</td><td>在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值</td></tr></tbody></table><p>注意：并不是所有的属性都能使用过渡的，如<code>display:none&lt;-&gt;display:block</code></p><p>举个例子，实现鼠标移动上去发生变化动画效果</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
       <span class="token selector">.base</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #0EA9FF<span class="token punctuation">;</span>
            <span class="token property">border-width</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
            <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
            <span class="token property">border-color</span><span class="token punctuation">:</span> #5daf34<span class="token punctuation">;</span>
            <span class="token property">transition-property</span><span class="token punctuation">:</span> width<span class="token punctuation">,</span> height<span class="token punctuation">,</span> background-color<span class="token punctuation">,</span> border-width<span class="token punctuation">;</span>
            <span class="token property">transition-duration</span><span class="token punctuation">:</span> 2s<span class="token punctuation">;</span>
            <span class="token property">transition-timing-function</span><span class="token punctuation">:</span> ease-in<span class="token punctuation">;</span>
            <span class="token property">transition-delay</span><span class="token punctuation">:</span> 500ms<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/*简写*/</span>
        <span class="token comment">/*transition: all 2s ease-in 500ms;*/</span>
        <span class="token selector">.base:hover</span> <span class="token punctuation">{</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
            <span class="token property">background-color</span><span class="token punctuation">:</span> #5daf34<span class="token punctuation">;</span>
            <span class="token property">border-width</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
            <span class="token property">border-color</span><span class="token punctuation">:</span> #3a8ee6<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>base<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="transform-转变动画" tabindex="-1"><a class="header-anchor" href="#transform-转变动画" aria-hidden="true">#</a> transform 转变动画</h3><p>包含四个常用的功能：</p><ul><li>translate：位移</li><li>scale：缩放</li><li>rotate：旋转</li><li>skew：倾斜</li></ul><p>一般配合<code>transition</code>过度使用</p><p>注意的是，<code>transform</code>不支持<code>inline</code>元素，使用前把它变成<code>block</code></p><p>举个例子</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
    <span class="token selector">.base</span> <span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token property">display</span><span class="token punctuation">:</span> inline-block<span class="token punctuation">;</span>
        <span class="token property">background-color</span><span class="token punctuation">:</span> #0EA9FF<span class="token punctuation">;</span>
        <span class="token property">border-width</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
        <span class="token property">border-style</span><span class="token punctuation">:</span> solid<span class="token punctuation">;</span>
        <span class="token property">border-color</span><span class="token punctuation">:</span> #5daf34<span class="token punctuation">;</span>
        <span class="token property">transition-property</span><span class="token punctuation">:</span> width<span class="token punctuation">,</span> height<span class="token punctuation">,</span> background-color<span class="token punctuation">,</span> border-width<span class="token punctuation">;</span>
        <span class="token property">transition-duration</span><span class="token punctuation">:</span> 2s<span class="token punctuation">;</span>
        <span class="token property">transition-timing-function</span><span class="token punctuation">:</span> ease-in<span class="token punctuation">;</span>
        <span class="token property">transition-delay</span><span class="token punctuation">:</span> 500ms<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.base2</span> <span class="token punctuation">{</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
        <span class="token property">transition-property</span><span class="token punctuation">:</span> transform<span class="token punctuation">;</span>
        <span class="token property">transition-delay</span><span class="token punctuation">:</span> 5ms<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.base2:hover</span> <span class="token punctuation">{</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.8<span class="token punctuation">,</span> 1.5<span class="token punctuation">)</span> <span class="token function">rotate</span><span class="token punctuation">(</span>35deg<span class="token punctuation">)</span> <span class="token function">skew</span><span class="token punctuation">(</span>5deg<span class="token punctuation">)</span> <span class="token function">translate</span><span class="token punctuation">(</span>15px<span class="token punctuation">,</span> 25px<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>base base2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到盒子发生了旋转，倾斜，平移，放大</p><h3 id="animation-实现自定义动画" tabindex="-1"><a class="header-anchor" href="#animation-实现自定义动画" aria-hidden="true">#</a> animation 实现自定义动画</h3><p><code>animation</code>是由 8 个属性的简写，分别如下：</p><table><thead><tr><th>属性</th><th>描述</th><th>属性值</th></tr></thead><tbody><tr><td>animation-duration</td><td>指定动画完成一个周期所需要时间，单位秒（s）或毫秒（ms），默认是 0</td><td></td></tr><tr><td>animation-timing-function</td><td>指定动画计时函数，即动画的速度曲线，默认是 &quot;ease&quot;</td><td>linear、ease、ease-in、ease-out、ease-in-out</td></tr><tr><td>animation-delay</td><td>指定动画延迟时间，即动画何时开始，默认是 0</td><td></td></tr><tr><td>animation-iteration-count</td><td>指定动画播放的次数，默认是 1</td><td></td></tr><tr><td>animation-direction 指定动画播放的方向</td><td>默认是 normal</td><td>normal、reverse、alternate、alternate-reverse</td></tr><tr><td>animation-fill-mode</td><td>指定动画填充模式。默认是 none</td><td>forwards、backwards、both</td></tr><tr><td>animation-play-state</td><td>指定动画播放状态，正在运行或暂停。默认是 running</td><td>running、pauser</td></tr><tr><td>animation-name</td><td>指定 @keyframes 动画的名称</td><td></td></tr></tbody></table><p><code>CSS</code> 动画只需要定义一些关键的帧，而其余的帧，浏览器会根据计时函数插值计算出来，</p><p>通过 <code>@keyframes</code> 来定义关键帧</p><p>因此，如果我们想要让元素旋转一圈，只需要定义开始和结束两帧即可：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@keyframes</span> rotate</span><span class="token punctuation">{</span>
    <span class="token selector">from</span><span class="token punctuation">{</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>0deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">to</span><span class="token punctuation">{</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>360deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>from</code> 表示最开始的那一帧，<code>to</code> 表示结束时的那一帧</p><p>也可以使用百分比刻画生命周期</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@keyframes</span> rotate</span><span class="token punctuation">{</span>
    <span class="token selector">0%</span><span class="token punctuation">{</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>0deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">50%</span><span class="token punctuation">{</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>180deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">100%</span><span class="token punctuation">{</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>360deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定义好了关键帧后，下来就可以直接用它了：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token property">animation</span><span class="token punctuation">:</span> rotate 2s<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2><table><thead><tr><th>属性</th><th>含义</th></tr></thead><tbody><tr><td>transition（过度）</td><td>用于设置元素的样式过度，和animation有着类似的效果，但细节上有很大的不同</td></tr><tr><td>transform（变形）</td><td>用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于color一样用来设置元素的“外表”</td></tr><tr><td>translate（移动）</td><td>只是transform的一个属性值，即移动</td></tr><tr><td>animation（动画）</td><td>用于设置动画属性，他是一个简写的属性，包含6个属性</td></tr></tbody></table><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><ul><li>https://segmentfault.com/a/1190000022540857</li><li>https://zh.m.wikipedia.org/wiki/CSS%E5%8A%A8%E7%94%BB</li><li>https://vue3js.cn/interview</li></ul>`,41),o=[p];function i(c,l){return s(),a("div",null,o)}const r=n(e,[["render",i],["__file","animation.html.vue"]]);export{r as default};
