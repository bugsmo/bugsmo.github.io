import{_ as n,o as s,c as a,a as t}from"./app-8ca7f52c.js";const p={},e=t(`<h1 id="面试官-如何使用css完成视差滚动效果" tabindex="-1"><a class="header-anchor" href="#面试官-如何使用css完成视差滚动效果" aria-hidden="true">#</a> 面试官：如何使用css完成视差滚动效果?</h1><p><img src="https://static.vue-js.com/1b2d33e0-a18d-11eb-85f6-6fac77c0c9b3.png" alt=""></p><h2 id="一、是什么" tabindex="-1"><a class="header-anchor" href="#一、是什么" aria-hidden="true">#</a> 一、是什么</h2><p>视差滚动（Parallax Scrolling）是指多层背景以不同的速度移动，形成立体的运动效果，带来非常出色的视觉体验</p><p>我们可以把网页解刨成：背景层、内容层、悬浮层</p><p><img src="https://static.vue-js.com/57c942a0-a1cc-11eb-85f6-6fac77c0c9b3.png" alt=""></p><p>当滚动鼠标滑轮的时候，各个图层以不同的速度移动，形成视觉差的效果</p><p><img src="https://static.vue-js.com/e57ab280-a1dd-11eb-ab90-d9ae814b240d.png" alt="image.png"></p><h2 id="二、实现方式" tabindex="-1"><a class="header-anchor" href="#二、实现方式" aria-hidden="true">#</a> 二、实现方式</h2><p>使用<code>css</code>形式实现视觉差滚动效果的方式有：</p><ul><li>background-attachment</li><li>transform:translate3D</li></ul><h3 id="background-attachment" tabindex="-1"><a class="header-anchor" href="#background-attachment" aria-hidden="true">#</a> background-attachment</h3><p>作用是设置背景图像是否固定或者随着页面的其余部分滚动</p><p>值分别有如下：</p><ul><li>scroll：默认值，背景图像会随着页面其余部分的滚动而移动</li><li>fixed：当页面的其余部分滚动时，背景图像不会移动</li><li>inherit：继承父元素background-attachment属性的值</li></ul><p>完成滚动视觉差就需要将<code>background-attachment</code>属性设置为<code>fixed</code>，让背景相对于视口固定。及时一个元素有滚动机制，背景也不会随着元素的内容而滚动</p><p>也就是说，背景一开始就已经被固定在初始的位置</p><p>核心的<code>css</code>代码如下：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">section</span> <span class="token punctuation">{</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.g-img</span> <span class="token punctuation">{</span>
    <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>...<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
    <span class="token property">background-attachment</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
    <span class="token property">background-size</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span>
    <span class="token property">background-position</span><span class="token punctuation">:</span> center center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整体例子如下：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">div</span> <span class="token punctuation">{</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
            <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> .7<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
            <span class="token property">line-height</span><span class="token punctuation">:</span> 100vh<span class="token punctuation">;</span>
            <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
            <span class="token property">font-size</span><span class="token punctuation">:</span> 20vh<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.a-img1</span> <span class="token punctuation">{</span>
            <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://images.pexels.com/photos/1097491/pexels-photo-1097491.jpeg<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
            <span class="token property">background-attachment</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
            <span class="token property">background-size</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span>
            <span class="token property">background-position</span><span class="token punctuation">:</span> center center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.a-img2</span> <span class="token punctuation">{</span>
            <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
            <span class="token property">background-attachment</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
            <span class="token property">background-size</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span>
            <span class="token property">background-position</span><span class="token punctuation">:</span> center center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token selector">.a-img3</span> <span class="token punctuation">{</span>
            <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
            <span class="token property">background-attachment</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
            <span class="token property">background-size</span><span class="token punctuation">:</span> cover<span class="token punctuation">;</span>
            <span class="token property">background-position</span><span class="token punctuation">:</span> center center<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>a-text<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>a-img1<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>a-text<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>a-img2<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>a-text<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>5<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>a-img3<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>a-text<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="transform-translate3d" tabindex="-1"><a class="header-anchor" href="#transform-translate3d" aria-hidden="true">#</a> transform:translate3D</h3><p>同样，让我们先来看一下两个概念<code>transform</code>和<code>perspective</code>：</p><ul><li>transform: css3 属性，可以对元素进行变换(2d/3d)，包括平移 translate,旋转 rotate,缩放 scale,等等</li><li>perspective: css3 属性，当元素涉及 3d 变换时，perspective 可以定义我们眼睛看到的 3d 立体效果，即空间感</li></ul><p><code>3D</code>视角示意图如下所示：</p><p><img src="https://static.vue-js.com/24f37dd0-a18d-11eb-85f6-6fac77c0c9b3.png" alt=""></p><p>举个例子：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
    <span class="token selector">html</span> <span class="token punctuation">{</span>
        <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span> 100%
    <span class="token punctuation">}</span>

    <span class="token selector">body</span> <span class="token punctuation">{</span>
        <span class="token comment">/* 视差元素的父级需要3D视角 */</span>
        <span class="token property">perspective</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
        <span class="token property">transform-style</span><span class="token punctuation">:</span> preserve-3d<span class="token punctuation">;</span> 
        <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
        <span class="token property">overflow-y</span><span class="token punctuation">:</span> scroll<span class="token punctuation">;</span>
        <span class="token property">overflow-x</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">#app</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span> 100vw<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span>200vh<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span>skyblue<span class="token punctuation">;</span>
        <span class="token property">padding-top</span><span class="token punctuation">:</span>100px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.one</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span>500px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span>200px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span>#409eff<span class="token punctuation">;</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateZ</span><span class="token punctuation">(</span>0px<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.two</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span>500px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span>200px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span>#67c23a<span class="token punctuation">;</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateZ</span><span class="token punctuation">(</span>-1px<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector">.three</span><span class="token punctuation">{</span>
        <span class="token property">width</span><span class="token punctuation">:</span>500px<span class="token punctuation">;</span>
        <span class="token property">height</span><span class="token punctuation">:</span>200px<span class="token punctuation">;</span>
        <span class="token property">background</span><span class="token punctuation">:</span>#e6a23c<span class="token punctuation">;</span>
        <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateZ</span><span class="token punctuation">(</span>-2px<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 150px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>one<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>one<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>two<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>two<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>three<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>three<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而这种方式实现视觉差动的原理如下：</p><ul><li><p>容器设置上 transform-style: preserve-3d 和 perspective: xpx，那么处于这个容器的子元素就将位于3D空间中，</p></li><li><p>子元素设置不同的 transform: translateZ()，这个时候，不同元素在 3D Z轴方向距离屏幕（我们的眼睛）的距离也就不一样</p></li><li><p>滚动滚动条，由于子元素设置了不同的 transform: translateZ()，那么他们滚动的上下距离 translateY 相对屏幕（我们的眼睛），也是不一样的，这就达到了滚动视差的效果</p></li></ul><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2><ul><li>https://imweb.io/topic/5b73ef73a56e07401e48729d</li><li>https://juejin.cn/post/6844903654458146823#heading-5</li></ul>`,32),c=[e];function o(l,i){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","visual_scrolling.html.vue"]]);export{r as default};
