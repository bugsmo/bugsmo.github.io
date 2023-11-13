import{_ as e,o as a,c as E,a as i}from"./app-8ca7f52c.js";const c={},r=i(`<h1 id="javascript-前端高效开发工具库" tabindex="-1"><a class="header-anchor" href="#javascript-前端高效开发工具库" aria-hidden="true">#</a> Javascript 前端高效开发工具库</h1><p>🚀 <code>nutils-js</code> 是一套在开发中实践积累起来的实用 JavaScript 工具库。其次为学习而生，在当今有很多类似库，基本教我们如何去使用它，作为工具我觉得最最要一点是理解工具的精髓，它是如何去实现的。</p><p>作为 Web 开发人员，在日常开发中难免遇到<code>Array</code> <code>Object</code> <code>String</code> <code>Number</code>等数据处理，或者是<code>防抖节流函数</code>等性能优化亦或者<code>URL参数处理</code> <code>类型判断</code>等等这些都是使用率较高的 JavaScript 模块，避免在不同项目中复制粘贴的麻烦，发布在 npm 上，如果你有好的建议或者想为本项目贡献一份力的话，欢迎为本项目提交 pr，一起探讨和交流学习。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> ⬇️ 安装</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">--save</span> nutils-js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 🍻 使用</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> nutils <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;nutils-js&#39;</span><span class="token punctuation">)</span>
nutils<span class="token punctuation">.</span><span class="token function">chunk</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="api-文档" tabindex="-1"><a class="header-anchor" href="#api-文档" aria-hidden="true">#</a> 📦 API 文档</h2><h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3><ul><li><a href="/utils/Array/chunk%E8%BD%AC%E6%8D%A2%E4%BA%8C%E7%BB%B4%E6%95%B0%E7%BB%84"><code>chunk</code>二维数组转换</a></li><li><a href="/utils/Array/flatten%E6%89%81%E5%B9%B3%E5%8C%96%E6%95%B0%E7%BB%84"><code>flatten</code>扁平化数组</a></li><li><a href="/utils/Array/flattenDeep%E6%8C%87%E5%AE%9A%E5%B1%82%E7%BA%A7%E6%89%81%E5%B9%B3%E5%8C%96%E6%95%B0%E7%BB%84"><code>flattenDeep</code>指定层级扁平化数组</a></li><li><a href="/utils/Array/isArrayEqual%E6%A3%80%E6%9F%A5%E4%B8%A4%E4%B8%AA%E6%95%B0%E7%BB%84%E5%90%84%E9%A1%B9%E7%9B%B8%E7%AD%89"><code>isArrayEqual</code>检查两个数组各项相等</a></li><li><a href="/utils/Array/diffArray%E5%94%AF%E4%B8%80%E5%80%BC%E6%95%B0%E7%BB%84"><code>difference</code>具有唯一<code>array</code>值的数组</a></li><li><a href="/utils/Array/intersection%E5%85%B1%E6%9C%89%E5%80%BC%E6%95%B0%E7%BB%84"><code>intersection</code>具有共同<code>array</code>值的数组</a></li><li><a href="/utils/Array/unique%E6%95%B0%E7%BB%84%E5%8E%BB%E9%87%8D"><code>unique</code>数组去重</a></li><li><a href="/utils/Array/uniqueBy%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1%E5%8E%BB%E9%87%8D"><code>uniqueBy</code>数组对象去重</a></li><li><a href="/utils/Array/treeData%E7%94%9F%E6%88%90%E6%A0%91%E7%BB%93%E6%9E%84%E6%95%B0%E6%8D%AE"><code>treeData</code>生成树结构数据</a></li><li><a href="/utils/Array/sortAsc%E6%95%B0%E7%BB%84%E5%8D%87%E5%BA%8F"><code>sortAsc</code>数组升序</a></li><li><a href="/utils/Array/sortDesc%E6%95%B0%E7%BB%84%E9%99%8D%E5%BA%8F"><code>sortDesc</code>数组降序</a></li><li><a href="/utils/Array/shuffle%E6%89%93%E4%B9%B1%E6%95%B0%E7%BB%84"><code>shuffle</code>打乱数组</a></li><li><a href="/utils/Array/take%E6%88%AA%E5%8F%96%E6%95%B0%E7%BB%84%E5%BC%80%E5%A7%8B%E6%8C%87%E5%AE%9A%E7%9A%84%E5%85%83%E7%B4%A0"><code>take</code>截取数组开始指定的元素</a></li><li><a href="/utils/Array/takeLast%E6%88%AA%E5%8F%96%E6%95%B0%E7%BB%84%E6%9C%80%E5%90%8E%E6%8C%87%E5%AE%9A%E7%9A%84%E5%85%83%E7%B4%A0"><code>takeLast</code>截取数组最后指定的元素</a></li><li><a href="/utils/Array/clone%E5%85%8B%E9%9A%86%E6%95%B0%E7%BB%84"><code>clone</code>克隆数组</a></li><li><a href="/utils/Array/max%E6%95%B0%E7%BB%84%E4%B8%AD%E6%9C%80%E5%A4%A7%E5%80%BC"><code>max</code>数组中最大值</a></li><li><a href="/utils/Array/min%E6%95%B0%E7%BB%84%E4%B8%AD%E6%9C%80%E5%A4%A7%E5%80%BC"><code>min</code>数组中最大值</a></li><li><a href="/utils/Array/compact%E5%8E%BB%E9%99%A4%E6%95%B0%E7%BB%84%E4%B8%AD%E7%9A%84%E6%97%A0%E6%95%88%E5%80%BC"><code>compact</code>去除数组中的无效值</a></li></ul><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3><ul><li><a href="###%60debounce%60%E5%87%BD%E6%95%B0%E9%98%B2%E6%8A%96"><code>debounce</code>函数防抖</a></li><li><a href="###%60throttle%60%E5%87%BD%E6%95%B0%E8%8A%82%E6%B5%81"><code>throttle</code>函数节流</a></li><li><a href="###%60typeFn%60%E7%B1%BB%E5%9E%8B%E5%88%A4%E6%96%AD"><code>typeFn</code>类型判断</a></li><li><a href="###%60calcFn%60%E5%8A%A0%E5%87%8F%E4%B9%98%E9%99%A4%E8%BF%90%E7%AE%97"><code>calcFn</code> 加减乘除运算</a></li></ul><h3 id="字符串" tabindex="-1"><a class="header-anchor" href="#字符串" aria-hidden="true">#</a> 字符串</h3><ul><li><a href="###%60isNil%60%E5%80%BC%E6%98%AF%E5%90%A6%E6%98%AF%60null%60%E6%88%96%60undefined%60"><code>isNil</code>值是否是<code>null</code>或<code>undefined</code></a></li><li><a href="###%60padStart%60%E9%81%AE%E4%BD%8F%E5%AD%97%E7%AC%A6%E4%B8%B2"><code>padStart</code>遮住字符串</a></li><li><a href="###%60thousands%60%E6%95%B0%E5%AD%97%E6%AF%8F%E9%9A%94%E4%B8%89%E4%BD%8D%E6%95%B0%E5%8A%A0%E5%88%86%E5%8F%B7"><code>thousands</code>数字每隔三位数加分号</a></li></ul><h3 id="数字" tabindex="-1"><a class="header-anchor" href="#数字" aria-hidden="true">#</a> 数字</h3><ul><li><a href="###%60randomNumber%60%E6%8C%87%E5%AE%9A%E8%8C%83%E5%9B%B4%E7%9A%84%E9%9A%8F%E6%9C%BA%E6%95%B4%E6%95%B0"><code>randomNumber</code>指定范围的随机整数</a></li><li><a href="###%60average%60%E6%B1%82%E5%B9%B3%E5%9D%87%E5%80%BC"><code>average</code>求平均值</a></li><li><a href="###%60averageBy%60%E6%A3%80%E6%9F%A5%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1%E5%90%84%E9%A1%B9%E7%9B%B8%E7%AD%89"><code>averageBy</code>检查数组对象各项相等</a></li><li><a href="###%60aboutEqual%60%E4%B8%A4%E4%B8%AA%E5%80%BC%E6%98%AF%E5%90%A6%E7%BA%A6%E7%AD%89%E4%BA%8E"><code>aboutEqual</code>两个值是否约等于</a></li><li><a href="###%60getLineSize%60%E8%AE%A1%E7%AE%97%E4%B8%A4%E7%82%B9%E4%B9%8B%E9%97%B4%E7%9A%84%E8%B7%9D%E7%A6%BB"><code>getLineSize</code>计算两点之间的距离</a></li><li><a href="###%60accum%60%E6%95%B0%E7%BB%84%E4%B8%AD%E5%80%BC%E6%80%BB%E5%92%8C"><code>accum</code>数组中值总和</a></li></ul><h3 id="浏览器" tabindex="-1"><a class="header-anchor" href="#浏览器" aria-hidden="true">#</a> 浏览器</h3><ul><li><a href="###%60copyText%60H5%E5%A4%8D%E5%88%B6%E6%96%87%E6%9C%AC"><code>copyText</code>H5 复制文本</a></li><li><a href="###%60getCurrentURL%60%E8%8E%B7%E5%8F%96%E5%BD%93%E5%89%8D%E7%9A%84URL%E5%9C%B0%E5%9D%80"><code>getCurrentURL</code>获取当前的 URL 地址</a></li><li><a href="###%60scrollToTop%60%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8"><code>scrollToTop</code>返回顶部</a></li><li><a href="###%60smoothScroll%60%E5%B9%B3%E6%BB%91%E6%BB%9A%E5%8A%A8%E9%A1%B5%E9%9D%A2"><code>smoothScroll</code>平滑滚动页面</a></li><li><a href="###%60isCurrentPage%60%E6%98%AF%E5%90%A6%E6%98%AF%E5%BD%93%E5%89%8D%E9%A1%B5%E9%9D%A2"><code>isCurrentPage</code>是否是当前页面</a></li></ul><h3 id="环境" tabindex="-1"><a class="header-anchor" href="#环境" aria-hidden="true">#</a> 环境</h3><ul><li><a href="###%60isBrowser%60%E6%98%AF%E5%90%A6%E6%98%AF%E6%B5%8F%E8%A7%88%E5%99%A8"><code>isBrowser</code>是否是浏览器</a></li><li><a href="###%60isWechatBrowser%60%E5%88%A4%E6%96%AD%E5%BE%AE%E4%BF%A1%E6%B5%8F%E8%A7%88%E5%99%A8%E8%BF%98%E6%98%AF%E6%99%AE%E9%80%9Ah5"><code>isWechatBrowser</code>判断微信浏览器还是普通 h5</a></li><li><a href="###%60isMobile%60%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E6%98%AF%E7%A7%BB%E5%8A%A8%E7%AB%AF"><code>isMobile</code>判断是否是移动端</a></li></ul>`,20),s=[r];function o(n,l){return a(),E("div",null,s)}const B=e(c,[["render",o],["__file","前端工具库.html.vue"]]);export{B as default};
