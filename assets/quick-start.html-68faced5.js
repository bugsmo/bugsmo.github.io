import{_ as o,r as l,o as p,c as d,e as r,w as e,d as n,a as i,b as s}from"./app-8ca7f52c.js";const u={},v=i(`<h1 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h1><h2 id="安装和启动" tabindex="-1"><a class="header-anchor" href="#安装和启动" aria-hidden="true">#</a> 安装和启动</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载项目</span>
<span class="token function">git</span> clone <span class="token parameter variable">--depth</span> <span class="token number">1</span> https://github.com/qqlcx5/vuepress-theme-neo.git

<span class="token comment"># 选择项目</span>
<span class="token builtin class-name">cd</span> vuepress-theme-neo

<span class="token comment"># 安装项目依赖</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token comment"># or yarn install</span>

<span class="token comment"># 运行</span>
<span class="token function">npm</span> run dev <span class="token comment"># or yarn dev</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>直接在这项目基础上进行更改岂不是更快。</p><div class="hint-container tip"><p class="hint-container-title">注意</p><p>Node.js 推荐版本 v16+ 你可以使用 corepack 来启用 pnpm。</p></div><h2 id="引用主题" tabindex="-1"><a class="header-anchor" href="#引用主题" aria-hidden="true">#</a> 引用主题</h2>`,6),m=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token function"},"npm"),n(),s("span",{class:"token function"},"install"),n(),s("span",{class:"token parameter variable"},"-D"),n(` vuepress-theme-neo
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"})])],-1),b=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token function"},"yarn"),n(),s("span",{class:"token function"},"add"),n(),s("span",{class:"token parameter variable"},"-D"),n(` vuepress-theme-neo
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"})])],-1),k=i(`<p>请确保你使用的是最新版本的 VuePress（2.0.0-beta.60）和主题。</p><p>参考 VuePress 文档搭建目录结构。建议在 <code>package.json</code> 的 <code>dev</code> 和 <code>build script</code> 里添加 <code>--clean-cache</code>，即：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs --clean-cache&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs --clean-cache&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在 <code>.vuepress/config.js</code> 或 <code>.vuepress/config.ts</code>（如果你在使用 TypeScript 的话）中指定主题：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// .vuepress/config.js</span>
<span class="token keyword">import</span> neoTheme <span class="token keyword">from</span> <span class="token string">&#39;vuepress-theme-neo&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token comment">// 站点选项</span>
  <span class="token comment">// ...</span>

  <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token function">neoTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token comment">// 主题选项</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function h(g,f){const c=l("Tabs");return p(),d("div",null,[v,r(c,{id:"18",data:[{id:"npm"},{id:"yarn"}]},{title0:e(({value:a,isActive:t})=>[n("npm")]),title1:e(({value:a,isActive:t})=>[n("yarn")]),tab0:e(({value:a,isActive:t})=>[m]),tab1:e(({value:a,isActive:t})=>[b]),_:1}),k])}const y=o(u,[["render",h],["__file","quick-start.html.vue"]]);export{y as default};
