import{_ as e,o as a,c as s,a as n}from"./app-8ca7f52c.js";const t={},p=n(`<h1 id="面试官-说说em-px-rem-vh-vw区别" tabindex="-1"><a class="header-anchor" href="#面试官-说说em-px-rem-vh-vw区别" aria-hidden="true">#</a> 面试官：说说em/px/rem/vh/vw区别?</h1><p><img src="https://static.vue-js.com/51b036e0-9131-11eb-85f6-6fac77c0c9b3.png" alt=""></p><h2 id="一、介绍" tabindex="-1"><a class="header-anchor" href="#一、介绍" aria-hidden="true">#</a> 一、介绍</h2><p>传统的项目开发中，我们只会用到<code>px</code>、<code>%</code>、<code>em</code>这几个单位，它可以适用于大部分的项目开发，且拥有比较良好的兼容性</p><p>从<code>CSS3</code>开始，浏览器对计量单位的支持又提升到了另外一个境界，新增了<code>rem</code>、<code>vh</code>、<code>vw</code>、<code>vm</code>等一些新的计量单位</p><p>利用这些新的单位开发出比较良好的响应式页面，适应多种不同分辨率的终端，包括移动设备等</p><h2 id="二、单位" tabindex="-1"><a class="header-anchor" href="#二、单位" aria-hidden="true">#</a> 二、单位</h2><p>在<code>css</code>单位中，可以分为长度单位、绝对单位，如下表所指示</p><table><thead><tr><th>CSS单位</th><th></th></tr></thead><tbody><tr><td>相对长度单位</td><td>em、ex、ch、rem、vw、vh、vmin、vmax、%</td></tr><tr><td>绝对长度单位</td><td>cm、mm、in、px、pt、pc</td></tr></tbody></table><p>这里我们主要讲述px、em、rem、vh、vw</p><h3 id="px" tabindex="-1"><a class="header-anchor" href="#px" aria-hidden="true">#</a> px</h3><p>px，表示像素，所谓像素就是呈现在我们显示器上的一个个小点，每个像素点都是大小等同的，所以像素为计量单位被分在了绝对长度单位中</p><p>有些人会把<code>px</code>认为是相对长度，原因在于在移动端中存在设备像素比，<code>px</code>实际显示的大小是不确定的</p><p>这里之所以认为<code>px</code>为绝对单位，在于<code>px</code>的大小和元素的其他属性无关</p><h3 id="em" tabindex="-1"><a class="header-anchor" href="#em" aria-hidden="true">#</a> em</h3><p>em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸（<code>1em = 16px</code>）</p><p>为了简化 <code>font-size</code> 的换算，我们需要在<code>css</code>中的 <code>body</code> 选择器中声明<code>font-size</code>= <code>62.5%</code>，这就使 em 值变为 <code>16px*62.5% = 10px</code></p><p>这样 <code>12px = 1.2em</code>, <code>10px = 1em</code>, 也就是说只需要将你的原来的<code> px</code> 数值除以 10，然后换上 <code>em </code>作为单位就行了</p><p>特点：</p><ul><li>em 的值并不是固定的</li><li>em 会继承父级元素的字体大小</li><li>em 是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸</li><li>任意浏览器的默认字体高都是 16px</li></ul><p>举个例子</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>big<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    我是14px=1.4rem<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>small<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>我是12px=1.2rem<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>样式为</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">&lt;style&gt;
    html</span> <span class="token punctuation">{</span><span class="token property">font-size</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>  <span class="token punctuation">}</span> <span class="token comment">/*  公式16px*62.5%=10px  */</span>  
    <span class="token selector">.big</span><span class="token punctuation">{</span><span class="token property">font-size</span><span class="token punctuation">:</span> 1.4rem<span class="token punctuation">}</span>
    <span class="token selector">.small</span><span class="token punctuation">{</span><span class="token property">font-size</span><span class="token punctuation">:</span> 1.2rem<span class="token punctuation">}</span>
&lt;/style&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时候<code>.big</code>元素的<code>font-size</code>为14px，而<code>.small</code>元素的<code>font-size</code>为12px</p><h3 id="rem" tabindex="-1"><a class="header-anchor" href="#rem" aria-hidden="true">#</a> rem</h3><p>rem，相对单位，相对的只是HTML根元素<code>font-size</code>的值</p><p>同理，如果想要简化<code>font-size</code>的转化，我们可以在根元素<code>html</code>中加入<code>font-size: 62.5%</code></p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">html</span> <span class="token punctuation">{</span><span class="token property">font-size</span><span class="token punctuation">:</span> 62.5%<span class="token punctuation">;</span>  <span class="token punctuation">}</span> <span class="token comment">/*  公式16px*62.5%=10px  */</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样页面中1rem=10px、1.2rem=12px、1.4rem=14px、1.6rem=16px;使得视觉、使用、书写都得到了极大的帮助</p><p>特点：</p><ul><li>rem单位可谓集相对大小和绝对大小的优点于一身</li><li>和em不同的是rem总是相对于根元素，而不像em一样使用级联的方式来计算尺寸</li></ul><h3 id="vh、vw" tabindex="-1"><a class="header-anchor" href="#vh、vw" aria-hidden="true">#</a> vh、vw</h3><p>vw ，就是根据窗口的宽度，分成100等份，100vw就表示满宽，50vw就表示一半宽。（vw 始终是针对窗口的宽），同理，<code>vh</code>则为窗口的高度</p><p>这里的窗口分成几种情况：</p><ul><li><p>在桌面端，指的是浏览器的可视区域</p></li><li><p>移动端指的就是布局视口</p></li></ul><p>像<code>vw</code>、<code>vh</code>，比较容易混淆的一个单位是<code>%</code>，不过百分比宽泛的讲是相对于父元素：</p><ul><li>对于普通定位元素就是我们理解的父元素</li><li>对于position: absolute;的元素是相对于已定位的父元素</li><li>对于position: fixed;的元素是相对于 ViewPort（可视窗口）</li></ul><h2 id="三、总结" tabindex="-1"><a class="header-anchor" href="#三、总结" aria-hidden="true">#</a> 三、总结</h2><p><strong>px</strong>：绝对单位，页面按精确像素展示</p><p><strong>em</strong>：相对单位，基准点为父节点字体的大小，如果自身定义了<code>font-size</code>按自身来计算，整个页面内<code>1em</code>不是一个固定的值</p><p><strong>rem</strong>：相对单位，可理解为<code>root em</code>, 相对根节点<code>html</code>的字体大小来计算</p><p><strong>vh、vw</strong>：主要用于页面视口大小布局，在页面布局上更加方便简单</p>`,43),c=[p];function o(d,l){return a(),s("div",null,c)}const r=e(t,[["render",o],["__file","em_px_rem_vh_vw.html.vue"]]);export{r as default};
