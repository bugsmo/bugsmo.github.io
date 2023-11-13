import{_ as e,o as a,c as r,a as n}from"./app-8ca7f52c.js";const s={},t=n(`<h1 id="jasperreport-生成-pdf-报错" tabindex="-1"><a class="header-anchor" href="#jasperreport-生成-pdf-报错" aria-hidden="true">#</a> jasperreport 生成 pdf 报错</h1><h2 id="error-loading-font" tabindex="-1"><a class="header-anchor" href="#error-loading-font" aria-hidden="true">#</a> Error loading font</h2><p>背景：java 服务容器化部署，服务运行中报错：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>net.sf.jasperreports.engine.fonts.InvalidFontException: Error loading font <span class="token string">&quot;net/sf/jasperreports/fonts/dejavu/DejaVuSans.ttf&quot;</span><span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>排查过程：查看 git 提交记录，前几天为了使用 jdk 的一些工具，更换了 Dockerfile 的基础镜像：</p><ul><li>旧镜像：harbor.example.cn/library/jre:8u271</li><li>新镜像：harbor.example.cn/library/openjdk:8-jdk-alpine-tini</li></ul><p>原因：新基础镜像缺失了很多字体。</p><p>解决：改回原有镜像重新打包发布，测试功能正常使用。</p>`,8),o=[t];function i(d,p){return a(),r("div",null,o)}const c=e(s,[["render",i],["__file","jasperreport生成pdf报错.html.vue"]]);export{c as default};
