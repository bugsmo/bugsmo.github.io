import{_ as i,r as l,o as r,c as t,b as a,d as s,e as c,a as n}from"./app-8ca7f52c.js";const d={},o=n(`<h1 id="centos8-内核配置" tabindex="-1"><a class="header-anchor" href="#centos8-内核配置" aria-hidden="true">#</a> CentOS8 内核配置</h1><h2 id="内核参数查看" tabindex="-1"><a class="header-anchor" href="#内核参数查看" aria-hidden="true">#</a> 内核参数查看</h2><p>首先我们查看自己当前内核版本的参数，基本上可以分为 y、n、m 三个选项</p><ul><li>y：yes，Build directly into the kernel. 表示该功能被编译进内核中，默认启用</li><li>n：no，Leave entirely out of the kernel. 表示该功能未被编译进内核中，不启用</li><li>m：module，Build as a module, to be loaded if needed. 表示该功能被编译为模块，按需启用</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看当前使用的内核版本的编译参数</span>
<span class="token function">cat</span> /boot/config-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-r</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="内核参数启用" tabindex="-1"><a class="header-anchor" href="#内核参数启用" aria-hidden="true">#</a> 内核参数启用</h2>`,6),p={href:"http://localhost:3000/sre/cilium/Cilium%20%E4%BE%9D%E8%B5%96.html#%E5%86%85%E6%A0%B8%E5%8F%82%E6%95%B0",target:"_blank",rel:"noopener noreferrer"},u=n(`<p>Cilium 利用并构建于内核 eBPF 功能以及与 eBPF 集成的各种子系统。因此，主机系统需要运行最新的 Linux 内核才能运行 Cilium 代理。更新的内核可能会提供额外的 eBPF 功能，Cilium 将在代理启动时自动检测并使用这些功能。对于此版本的 Cilium，建议使用内核 4.19.57 或更高版本（或同等版本，例如 RHEL8 上的 4.18）。有关需要较新内核的功能列表，请参阅高级功能所需的内核版本。</p><p>为了正确启用 eBPF 功能，必须启用以下内核配置选项。发行版内核通常就是这种情况。当选项可以构建为模块或静态链接时，任一选择都是有效的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CONFIG_BPF=y
CONFIG_BPF_SYSCALL=y
CONFIG_NET_CLS_BPF=y
CONFIG_BPF_JIT=y
CONFIG_NET_CLS_ACT=y
CONFIG_NET_SCH_INGRESS=y
CONFIG_CRYPTO_SHA1=y
CONFIG_CRYPTO_USER_API_HASH=y
CONFIG_CGROUPS=y
CONFIG_CGROUP_BPF=y
CONFIG_PERF_EVENTS=y
CONFIG_SCHEDSTATS=y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对比我们使用的 6.5.7-1.el8.elrepo.x86_64 内核可以发现有两个模块是为 m</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">egrep</span> <span class="token string">&quot;^CONFIG_BPF=|^CONFIG_BPF_SYSCALL=|^CONFIG_NET_CLS_BPF=|^CONFIG_BPF_JIT=|^CONFIG_NET_CLS_ACT=|^CONFIG_NET_SCH_INGRESS=|^CONFIG_CRYPTO_SHA1=|^CONFIG_CRYPTO_USER_API_HASH=|^CONFIG_CGROUPS=|^CONFIG_CGROUP_BPF=&quot;</span> /boot/config-6.5.7-1.el8.elrepo.x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">CONFIG_BPF</span><span class="token operator">=</span>y
<span class="token assign-left variable">CONFIG_BPF_SYSCALL</span><span class="token operator">=</span>y
<span class="token assign-left variable">CONFIG_BPF_JIT</span><span class="token operator">=</span>y
<span class="token assign-left variable">CONFIG_CGROUPS</span><span class="token operator">=</span>y
<span class="token assign-left variable">CONFIG_CGROUP_BPF</span><span class="token operator">=</span>y
<span class="token assign-left variable">CONFIG_NET_SCH_INGRESS</span><span class="token operator">=</span>m
<span class="token assign-left variable">CONFIG_NET_CLS_BPF</span><span class="token operator">=</span>m
<span class="token assign-left variable">CONFIG_NET_CLS_ACT</span><span class="token operator">=</span>y
<span class="token assign-left variable">CONFIG_CRYPTO_SHA1</span><span class="token operator">=</span>y
<span class="token assign-left variable">CONFIG_CRYPTO_USER_API_HASH</span><span class="token operator">=</span>y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>缺少的这两个模块我们可以在 /usr/lib/modules/$(uname -r) 目录下面找到它们：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">ls</span> /usr/lib/modules/<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-r</span><span class="token variable">)</span></span>/kernel/net/sched/sch_ingress.ko.xz

<span class="token function">ls</span> /usr/lib/modules/<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-r</span><span class="token variable">)</span></span>/kernel/net/sched/cls_bpf.ko.xz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>确认相关内核模块存在我们直接加载内核即可：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>modprobe cls_bpf
modprobe sch_ingress
lsmod <span class="token operator">|</span> <span class="token function">egrep</span> <span class="token string">&quot;cls_bpf|sch_ingress&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置开机自动加载 cilium 所需相关模块</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/modules-load.d/cilium-base-requirements.conf</span>
cls_bpf
sch_ingress
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其他 cilium 高级功能所需要的内核功能也类似，这里不做赘述。</p>`,14);function v(_,b){const e=l("ExternalLinkIcon");return r(),t("div",null,[o,a("p",null,[s("cilium 官方对各项功能所需要开启的"),a("a",p,[s("内核参数"),c(e)]),s("列举如下：")]),u])}const C=i(d,[["render",v],["__file","CentOS8 内核配置.html.vue"]]);export{C as default};
