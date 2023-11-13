import{_ as e,o as a,c as s,a as n}from"./app-8ca7f52c.js";const t={},r=n(`<h1 id="控制面域名-ssl-证书更换" tabindex="-1"><a class="header-anchor" href="#控制面域名-ssl-证书更换" aria-hidden="true">#</a> 控制面域名 SSL 证书更换</h1><h2 id="版本-2-5-2" tabindex="-1"><a class="header-anchor" href="#版本-2-5-2" aria-hidden="true">#</a> 版本 2.5.2</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /home/rancher

<span class="token punctuation">\\</span>mv private.pem tls.key

<span class="token punctuation">\\</span>mv fullchain.crt tls.crt

kubectl delete secrets tls-rancher-ingress <span class="token parameter variable">-n</span> cattle-system

kubectl <span class="token parameter variable">-n</span> cattle-system create secret tls tls-rancher-ingress <span class="token parameter variable">--cert</span><span class="token operator">=</span>./tls.crt <span class="token parameter variable">--key</span><span class="token operator">=</span>./tls.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),l=[r];function c(i,d){return a(),s("div",null,l)}const p=e(t,[["render",c],["__file","控制面域名SSL证书更换.html.vue"]]);export{p as default};
