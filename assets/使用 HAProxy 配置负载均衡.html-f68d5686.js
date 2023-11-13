import{_ as d,r as o,o as p,c as u,b as e,d as n,e as a,w as l,a as i}from"./app-8ca7f52c.js";const v={},m=e("h1",{id:"使用-haproxy-配置负载均衡",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#使用-haproxy-配置负载均衡","aria-hidden":"true"},"#"),n(" 使用 HAProxy 配置负载均衡")],-1),b={href:"https://www.haproxy.org/",target:"_blank",rel:"noopener noreferrer"},h={href:"https://proxysql.com/",target:"_blank",rel:"noopener noreferrer"},g=e("code",null,"deploy/cr.yaml",-1),y=e("code",null,"haproxy.enabled",-1),k=e("code",null,"proxysql.enabled",-1),x=i(`<p>使用以下命令启用 HAProxy：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl patch pxc cluster1 <span class="token parameter variable">--type</span><span class="token operator">=</span>merge <span class="token parameter variable">--patch</span> <span class="token string">&#39;{
&quot;spec&quot;: {
&quot;haproxy&quot;: {
&quot;enabled&quot;: true,
&quot;size&quot;: 3,
&quot;image&quot;: &quot;percona/percona-xtradb-cluster-operator:1.13.0-haproxy&quot; },
&quot;proxysql&quot;: { &quot;enabled&quot;: false }
}}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>从 ProxySQL 切换到 HAProxy 将导致 Percona XtraDB 集群 Pod 重新启动。无法从 HAProxy 切换到 ProxySQL，如果您需要 ProxySQL，则应在创建集群时进行配置。</p></div><p>生成的 HAPproxy 设置将包含两个 <code>services</code>：</p>`,4),_=e("code",null,"cluster1-haproxy",-1),f={href:"https://www.haproxy.com/blog/haproxy/proxy-protocol/",target:"_blank",rel:"noopener noreferrer"},A=e("code",null,"cluster1-pxc-0",-1),I=e("code",null,"cluster1-pxc-2",-1),C=e("code",null,"cluster1-pxc-1",-1),B=e("li",null,[e("code",null,"cluster1-haproxy-replicas"),n(" 侦听端口 3306 （MySQL）。此服务选择 Percona XtraDB 集群成员，以按照循环负载平衡算法提供查询。")],-1),G={class:"hint-container tip"},Y=e("p",{class:"hint-container-title"},"注意",-1),w=e("code",null,"cluster1-haproxy",-1),P=e("code",null,"cluster1-haproxy-replicas",-1),Z=e("code",null,"deploy/cr.yaml",-1),V={href:"https://docs.percona.com/percona-operator-for-mysql/pxc/annotations.html",target:"_blank",rel:"noopener noreferrer"},H=i(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> pxc.percona.com/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PerconaXtraDBCluster
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster1
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">percona.com/issue-vault-token</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">xx</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此注释仅在服务创建时有效，以后无法添加。</p>`,2),X=i(`<p>升级具有 HAProxy 的集群时，将执行以下步骤。首先，读取器成员逐个升级：操作员等待升级后的 Percona XtraDB 集群成员同步，然后继续升级下一个成员。完成所有读取器的升级后，写入器 Percona XtraDB 集群成员最终升级。</p><h2 id="将自定义配置选项传递给-haproxy" tabindex="-1"><a class="header-anchor" href="#将自定义配置选项传递给-haproxy" aria-hidden="true">#</a> 将自定义配置选项传递给 HAProxy</h2><p>您可以通过以下方式之一将自定义配置传递给 HAProxy：</p><ul><li>编辑 <code>deploy/cr.yaml</code> 文件，</li><li>使用 ConfigMap，</li><li>使用 Secret 对象。</li></ul><div class="hint-container tip"><p class="hint-container-title">注意</p><p>如果以这种方式指定自定义 HAProxy 配置，则 Operator 不会提供自己的 HAProxy 配置文件。这就是为什么您应该指定一整套配置选项或什么都不指定。</p></div><h3 id="编辑-deploy-cr-yaml-文件" tabindex="-1"><a class="header-anchor" href="#编辑-deploy-cr-yaml-文件" aria-hidden="true">#</a> 编辑 <code>deploy/cr.yaml</code> 文件</h3><p>您可以通过编辑 <code>deploy/cr.yaml</code> 文件中的 <code>haproxy.configuration</code> 键来添加 <code>haproxy.cfg</code> 配置文件中的选项。下面是一个示例：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">haproxy</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">size</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> percona/percona<span class="token punctuation">-</span>xtradb<span class="token punctuation">-</span>cluster<span class="token punctuation">-</span>operator<span class="token punctuation">:</span>1.13.0<span class="token punctuation">-</span>haproxy
  <span class="token key atrule">configuration</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    global
      maxconn 2048
      external-check
      stats socket /var/run/haproxy.sock mode 600 expose-fd listeners level user
    defaults
      log global
      mode tcp
      retries 10
      timeout client 10000
      timeout connect 100500
      timeout server 10000
    frontend galera-in
      bind *:3309 accept-proxy
      bind *:3306
      mode tcp
      option clitcpka
      default_backend galera-nodes
    frontend galera-replica-in
      bind *:3309 accept-proxy
      bind *:3307
      mode tcp
      option clitcpka
      default_backend galera-replica-nodes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-configmap" tabindex="-1"><a class="header-anchor" href="#使用-configmap" aria-hidden="true">#</a> 使用 ConfigMap</h3><p>您可以使用 configmap 和集群重启来重置配置选项。configmap 允许 Kubernetes 在容器化应用程序内传递或更新配置数据。</p>`,10),W=e("code",null,"kubectl",-1),q={href:"https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#create-a-configmap",target:"_blank",rel:"noopener noreferrer"},M=i(`<p>例如，您可以使用以下设置定义配置文件 <code>haproxy.cfg</code> ：</p><div class="language-cfg line-numbers-mode" data-ext="cfg"><pre class="language-cfg"><code>global
  maxconn 2048
  external-check
  stats socket /var/run/haproxy.sock mode 600 expose-fd listeners level user
defaults
  log global
  mode tcp
  retries 10
  timeout client 10000
  timeout connect 100500
  timeout server 10000
frontend galera-in
  bind *:3309 accept-proxy
  bind *:3306
  mode tcp
  option clitcpka
  default_backend galera-nodes
frontend galera-replica-in
  bind *:3309 accept-proxy
  bind *:3307
  mode tcp
  option clitcpka
  default_backend galera-replica-nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以使用以下 <code>kubectl create configmap</code> 命令从 <code>haproxy.cfg</code> 文件创建 configmap。</p><p>您应该使用集群名称与 <code>-haproxy</code> 后缀的组合作为 configmap 的命名约定。若要查找群集名称，可以使用以下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pxc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令的 <code>kubectl create configmap</code> 语法为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create configmap <span class="token operator">&lt;</span>cluster-name<span class="token operator">&gt;</span>-haproxy <span class="token operator">&lt;</span>resource-type<span class="token operator">=</span>resource-name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以下示例定义为 configmap 名称，将 <code>haproxy.cfg</code> 文件定义为 <code>cluster1-haproxy</code> 数据源：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create configmap cluster1-haproxy --from-file<span class="token operator">=</span>haproxy.cfg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要查看创建的 configmap，请使用以下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl describe configmaps cluster1-haproxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用-secret-对象" tabindex="-1"><a class="header-anchor" href="#使用-secret-对象" aria-hidden="true">#</a> 使用 Secret 对象</h3><p>Operator 还可以将配置选项存储在 Kubernetes Secret 中。如果需要对某些敏感数据进行额外保护，这可能很有用。</p><p>您应该创建一个具有特定名称的 Secret 对象，该对象由集群名称和 <code>haproxy</code> 后缀组成。</p><p>配置选项应放在 data 该部分的特定键内。此 key 的名称 haproxy.cfg 用于 ProxySQL Pod。</p><p>实际选项应使用 Base64 进行编码。</p><p>例如，让我们定义一个 <code>haproxy.cfg</code> 配置文件，并把我们在上一个示例中使用的选项放在那里：</p><div class="language-cfg line-numbers-mode" data-ext="cfg"><pre class="language-cfg"><code>global
  maxconn 2048
  external-check
  stats socket /var/run/haproxy.sock mode 600 expose-fd listeners level user
defaults
  log global
  mode tcp
  retries 10
  timeout client 10000
  timeout connect 100500
  timeout server 10000
frontend galera-in
  bind *:3309 accept-proxy
  bind *:3306
  mode tcp
  option clitcpka
  default_backend galera-nodes
frontend galera-replica-in
  bind *:3309 accept-proxy
  bind *:3307
  mode tcp
  option clitcpka
  default_backend galera-replica-nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以通过命令行从选项中获取 Base64 编码的字符串，如下所示：</p>`,19),D=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"cat"),n(" haproxy.cfg "),e("span",{class:"token operator"},"|"),n(" base64 "),e("span",{class:"token parameter variable"},"--wrap"),e("span",{class:"token operator"},"="),e("span",{class:"token number"},"0"),n(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),S=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"cat"),n(" haproxy.cfg "),e("span",{class:"token operator"},"|"),n(` base64
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),j=i(`<div class="hint-container tip"><p class="hint-container-title">注意</p><p>同样，您可以从 Base64 编码的字符串中读取选项列表：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;IGdsb2JhbAogICBtYXhjb25uIDIwNDgKICAgZXh0ZXJuYWwtY2hlY2sKICAgc3RhdHMgc29ja2V0\\
IC92YXIvcnVuL2hhcHJveHkuc29jayBtb2RlIDYwMCBleHBvc2UtZmQgbGlzdGVuZXJzIGxldmVs\\
IHVzZXIKIGRlZmF1bHRzCiAgIGxvZyBnbG9iYWwKICAgbW9kZSB0Y3AKICAgcmV0cmllcyAxMAog\\
ICB0aW1lb3V0IGNsaWVudCAxMDAwMAogICB0aW1lb3V0IGNvbm5lY3QgMTAwNTAwCiAgIHRpbWVv\\
dXQgc2VydmVyIDEwMDAwCiBmcm9udGVuZCBnYWxlcmEtaW4KICAgYmluZCAqOjMzMDkgYWNjZXB0\\
LXByb3h5CiAgIGJpbmQgKjozMzA2CiAgIG1vZGUgdGNwCiAgIG9wdGlvbiBjbGl0Y3BrYQogICBk\\
ZWZhdWx0X2JhY2tlbmQgZ2FsZXJhLW5vZGVzCiBmcm9udGVuZCBnYWxlcmEtcmVwbGljYS1pbgog\\
ICBiaW5kICo6MzMwOSBhY2NlcHQtcHJveHkKICAgYmluZCAqOjMzMDcKICAgbW9kZSB0Y3AKICAg\\
b3B0aW9uIGNsaXRjcGthCiAgIGRlZmF1bHRfYmFja2VuZCBnYWxlcmEtcmVwbGljYS1ub2Rlcwo=&quot;</span> <span class="token operator">|</span> base64 <span class="token parameter variable">--decode</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>最后，使用 yaml 文件创建 Secret 对象。例如，您可以创建包含以下内容的文件 <code>deploy/my-haproxy-secret.yaml</code>：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster1<span class="token punctuation">-</span>haproxy
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">my.cnf</span><span class="token punctuation">:</span>
    &quot;IGdsb2JhbAogICBtYXhjb25uIDIwNDgKICAgZXh0ZXJuYWwtY2hlY2sKICAgc3RhdHMgc29ja2V0\\
    IC92YXIvcnVuL2hhcHJveHkuc29jayBtb2RlIDYwMCBleHBvc2UtZmQgbGlzdGVuZXJzIGxldmVs\\
    IHVzZXIKIGRlZmF1bHRzCiAgIGxvZyBnbG9iYWwKICAgbW9kZSB0Y3AKICAgcmV0cmllcyAxMAog\\
    ICB0aW1lb3V0IGNsaWVudCAxMDAwMAogICB0aW1lb3V0IGNvbm5lY3QgMTAwNTAwCiAgIHRpbWVv\\
    dXQgc2VydmVyIDEwMDAwCiBmcm9udGVuZCBnYWxlcmEtaW4KICAgYmluZCAqOjMzMDkgYWNjZXB0\\
    LXByb3h5CiAgIGJpbmQgKjozMzA2CiAgIG1vZGUgdGNwCiAgIG9wdGlvbiBjbGl0Y3BrYQogICBk\\
    ZWZhdWx0X2JhY2tlbmQgZ2FsZXJhLW5vZGVzCiBmcm9udGVuZCBnYWxlcmEtcmVwbGljYS1pbgog\\
    ICBiaW5kICo6MzMwOSBhY2NlcHQtcHJveHkKICAgYmluZCAqOjMzMDcKICAgbW9kZSB0Y3AKICAg\\
    b3B0aW9uIGNsaXRjcGthCiAgIGRlZmF1bHRfYmFja2VuZCBnYWxlcmEtcmVwbGljYS1ub2Rlcwo=&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>准备就绪后，使用以下命令应用它：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> deploy/my-haproxy-secret.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">注意</p><p>不要忘记重新启动 Percona XtraDB 集群，以确保集群已更新配置。</p></div><h2 id="启用-proxy-协议-记录真实客户的-ip" tabindex="-1"><a class="header-anchor" href="#启用-proxy-协议-记录真实客户的-ip" aria-hidden="true">#</a> 启用 Proxy 协议（记录真实客户的 IP）</h2><p>Proxy 协议允许 HAProxy 向 Percona XtraDB 集群提供真实的客户端地址。</p><div class="hint-container tip"><p class="hint-container-title">注意</p><p>要使用此功能，您应该具有 Percona XtraDB Cluster 映像版本 8.0.21 或更高版本。</p></div><p>通常，Proxy 协议被禁用，Percona XtraDB Cluster 看到的是代理服务器 （HAProxy） 的 IP 地址，而不是真实的客户端地址。但在某些情况下，使 Percona XtraDB 集群的真实客户端 IP 地址可见是很重要的：例如，它允许基于客户端/应用程序地址授予权限，并显着增强审计。</p>`,10),z=e("code",null,"deploy/cr.yaml",-1),K={href:"https://docs.percona.com/percona-operator-for-mysql/pxc/operator.html#pxc-configuration",target:"_blank",rel:"noopener noreferrer"},Q=e("code",null,"proxy_protocol_networks",-1),N={class:"hint-container tip"},L=e("p",{class:"hint-container-title"},"注意",-1),R={href:"https://docs.percona.com/percona-operator-for-mysql/pxc/operator.html#haproxy-externaltrafficpolicy",target:"_blank",rel:"noopener noreferrer"},J={href:"https://www.haproxy.com/blog/using-haproxy-with-the-proxy-protocol-to-better-secure-your-database",target:"_blank",rel:"noopener noreferrer"};function E(O,F){const s=o("ExternalLinkIcon"),t=o("Tabs");return p(),u("div",null,[m,e("p",null,[n("基于 Percona XtraDB 的 Percona Operator for MySQL 集群提供了两种集群组件的选择，以提供负载均衡和代理服务：您可以使用 "),e("a",b,[n("HAProxy"),a(s)]),n(" 或 "),e("a",h,[n("ProxySQL"),a(s)]),n("。您可以通过 "),g,n(" 配置文件中的 "),y,n(" 和 "),k,n(" 选项启用或禁用来控制使用哪一个（如果有）。")]),x,e("ul",null,[e("li",null,[_,n(" 在端口 3306 （MySQL） 和 3309（"),e("a",f,[n("代理协议"),a(s)]),n("）上侦听的服务。默认情况下，此服务指向数字为零的 Percona XtraDB 集群成员 （ "),A,n("） 当此成员可用时。如果零成员不可用，则按其编号的降序选择成员（例如 "),I,n(" ，"),C,n(" 等）。此服务可用于读取和写入加载，或者它也可以仅用于具有拆分写入和读取负载的设置中的写入负载（单写入器模式）。")]),B]),e("div",G,[Y,e("p",null,[n("如果需要配置 "),w,n(" 和 "),P,n(" 作为无头服务（例如在租户网络上使用），请在 "),Z,n(" 自定义资源元数据部分添加以下"),e("a",V,[n("注释"),a(s)]),n(" ：")]),H]),X,e("p",null,[n("使用命令 "),W,n(" 从外部资源创建 configmap，有关更多信息，请参阅"),e("a",q,[n("配置 Pod 以使用 ConfigMap"),a(s)]),n("。")]),M,a(t,{id:"131",data:[{id:"在 Linux 中"},{id:"在 macOS 中"}]},{title0:l(({value:c,isActive:r})=>[n("在 Linux 中")]),title1:l(({value:c,isActive:r})=>[n("在 macOS 中")]),tab0:l(({value:c,isActive:r})=>[D]),tab1:l(({value:c,isActive:r})=>[S]),_:1}),j,e("p",null,[n("您可以通过在 "),z,n(" 配置文件中的 "),e("a",K,[n("pxc.configuration"),a(s)]),n(" 键中添加 "),Q,n(" 选项，在 Percona XtraDB 集群上启用代理协议。")]),e("div",N,[L,e("p",null,[n("根据云提供商的负载平衡器，您可能还需要在 deploy/cr.yaml 中设置 "),e("a",R,[n("haproxy.externaltrafficpolicy"),a(s)]),n(" 选项。")])]),e("p",null,[n("有关代理协议的更多信息，请参阅官方 "),e("a",J,[n("HAProxy 文档"),a(s)]),n("。")])])}const U=d(v,[["render",E],["__file","使用 HAProxy 配置负载均衡.html.vue"]]);export{U as default};
