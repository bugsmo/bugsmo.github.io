import{_ as t,r as p,o as i,c,b as n,d as s,e,a as l}from"./app-8ca7f52c.js";const o={},u=n("h1",{id:"helm-部署-skywalking",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#helm-部署-skywalking","aria-hidden":"true"},"#"),s(" Helm 部署 Skywalking")],-1),r=n("h2",{id:"前提条件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前提条件","aria-hidden":"true"},"#"),s(" 前提条件")],-1),k={href:"https://github.com/apache/skywalking-helm",target:"_blank",rel:"noopener noreferrer"},d=l(`<ul><li>安装 helm3</li><li>安装 k8s</li></ul><h2 id="容器时区配置" tabindex="-1"><a class="header-anchor" href="#容器时区配置" aria-hidden="true">#</a> 容器时区配置</h2><p>容器使用的时区不是东八区</p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> skywalking.docker.scarf.sh/apache/skywalking-oap-server:9.2.0</span>
<span class="token instruction"><span class="token keyword">ENV</span> TZ=Asia/Shanghai</span>
<span class="token instruction"><span class="token keyword">RUN</span> ln -snf /usr/share/zoneinfo/<span class="token variable">$TZ</span> /etc/localtime &amp;&amp; <span class="token operator">\\</span>
    echo <span class="token variable">$TZ</span> &gt; /etc/timezone</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> harbor.dev.cn/library/skywalking-oap-server:9.2.0 <span class="token builtin class-name">.</span>

<span class="token function">docker</span> push harbor.dev.cn/library/skywalking-oap-server:9.2.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基于已有-es-安装" tabindex="-1"><a class="header-anchor" href="#基于已有-es-安装" aria-hidden="true">#</a> 基于已有 es 安装</h2><h3 id="helm-下载-skywalking" tabindex="-1"><a class="header-anchor" href="#helm-下载-skywalking" aria-hidden="true">#</a> helm 下载 skywalking</h3><p>通过 helm 拉取 skywalking 包到本地。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">REPO</span><span class="token operator">=</span>skywalking
helm repo <span class="token function">add</span> <span class="token variable">\${REPO}</span> https://apache.jfrog.io/artifactory/skywalking-helm
helm search repo skywalking
helm pull <span class="token variable">\${REPO}</span>/skywalking
<span class="token function">tar</span> xf skywalking-4.3.0.tgz
<span class="token builtin class-name">cd</span> skywalking
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-values-my-es-yaml" tabindex="-1"><a class="header-anchor" href="#配置-values-my-es-yaml" aria-hidden="true">#</a> 配置 values-my-es.yaml</h2><ul><li>ui 版本需配合 oap 版本</li><li>es 版本是 oap 指定版本</li><li>镜像仓库是私人的，需替换为自己的私有镜像仓库</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">oap</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span>
    <span class="token key atrule">repository</span><span class="token punctuation">:</span> harbor.dev.cn/library/skywalking<span class="token punctuation">-</span>oap<span class="token punctuation">-</span>server
    <span class="token key atrule">tag</span><span class="token punctuation">:</span> 9.2.0
  <span class="token key atrule">storageType</span><span class="token punctuation">:</span> elasticsearch

<span class="token key atrule">ui</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span>
    <span class="token key atrule">repository</span><span class="token punctuation">:</span> harbor.dev.cn/library/skywalking<span class="token punctuation">-</span>ui
    <span class="token key atrule">tag</span><span class="token punctuation">:</span> 9.2.0
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
    <span class="token key atrule">externalPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">internalPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">31234</span>

<span class="token key atrule">elasticsearch</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">config</span><span class="token punctuation">:</span> <span class="token comment"># For users of an existing elasticsearch cluster,takes effect when \`elasticsearch.enabled\` is false</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> elasticsearch <span class="token comment"># service.namespace</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span>
      <span class="token key atrule">http</span><span class="token punctuation">:</span> <span class="token number">9200</span>
    <span class="token comment">#user: &quot;es用户&quot; # [optional]</span>
    <span class="token comment">#password: &quot;密码&quot; # [optional]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2><ul><li>skywalking-skywalking 影响到 deployment 和 service 的名字</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>helm <span class="token function">install</span> skywalking-skywalking <span class="token parameter variable">-f</span> values-my-es.yaml <span class="token parameter variable">-n</span> dev --create-namespace <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看创建的 deployment</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl <span class="token parameter variable">-n</span> dev get deployment <span class="token operator">|</span><span class="token function">grep</span> skywalking

skywalking-skywalking-oap                 <span class="token number">2</span>/2     <span class="token number">2</span>            <span class="token number">2</span>           22m
skywalking-skywalking-ui                  <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           22m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看创建的 service</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl <span class="token parameter variable">-n</span> dev get svc <span class="token operator">|</span><span class="token function">grep</span> skywalking

skywalking-skywalking-oap                 ClusterIP   <span class="token number">10.96</span>.226.167   <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">11800</span>/TCP,12800/TCP             23m
skywalking-skywalking-ui                  NodePort    <span class="token number">10.96</span>.59.215    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>        <span class="token number">80</span>:31231/TCP                    23m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="skywalking-索引" tabindex="-1"><a class="header-anchor" href="#skywalking-索引" aria-hidden="true">#</a> Skywalking 索引</h2><p>查看 Skywalking 在 elasticsearch 创建的索引。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> http://es:9200/_cat/indices?v
health status index                         uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  <span class="token function">open</span>   sw_segment-20231026           lMIkLU11QfmzpoFcy32DGg   <span class="token number">5</span>   <span class="token number">0</span>        <span class="token number">275</span>            <span class="token number">0</span>    <span class="token number">366</span>.7kb        <span class="token number">366</span>.7kb
green  <span class="token function">open</span>   sw_metrics-all-20231026       gGHhLA0sS_2FWRHPRCXGtQ   <span class="token number">1</span>   <span class="token number">1</span>        <span class="token number">334</span>          <span class="token number">207</span>    <span class="token number">326</span>.3kb        <span class="token number">163</span>.1kb
green  <span class="token function">open</span>   sw_records-all-20231026       qas52I9HTWyS_UYZekDu9A   <span class="token number">1</span>   <span class="token number">1</span>          <span class="token number">0</span>            <span class="token number">0</span>       460b           230b
green  <span class="token function">open</span>   sw_browser_error_log-20231026 <span class="token parameter variable">-TQeJhUDTtiran5zg3PMPA</span>   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.1kb          <span class="token number">1</span>.1kb
green  <span class="token function">open</span>   sw_zipkin_span-20231026       gNTwpVpsRhWN3JoE76XP2A   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.1kb          <span class="token number">1</span>.1kb
green  <span class="token function">open</span>   sw_log-20231026               n3WQXqGNQUqoNlBFL9nd6Q   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.1kb          <span class="token number">1</span>.1kb
green  <span class="token function">open</span>   sw_ui_template                TcWeSgCWSDuKQheyRxMn4w   <span class="token number">1</span>   <span class="token number">1</span>         <span class="token number">46</span>            <span class="token number">0</span>    <span class="token number">578</span>.3kb        <span class="token number">289</span>.1kb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="java-agent" tabindex="-1"><a class="header-anchor" href="#java-agent" aria-hidden="true">#</a> Java Agent</h2>`,24),v={href:"https://mirror.bjtu.edu.cn/apache/skywalking/java-agent/",target:"_blank",rel:"noopener noreferrer"},m=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> https://mirror.bjtu.edu.cn/apache/skywalking/java-agent/9.0.0/apache-skywalking-java-agent-9.0.0.tgz

<span class="token function">tar</span> xf apache-skywalking-java-agent-9.0.0.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="制作-java-agent-镜像" tabindex="-1"><a class="header-anchor" href="#制作-java-agent-镜像" aria-hidden="true">#</a> 制作 Java Agent 镜像</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-Dockerfile line-numbers-mode" data-ext="Dockerfile"><pre class="language-Dockerfile"><code>FROM busybox:latest

ENV LANG=C.UTF-8
WORKDIR /
ADD skywalking-agent/ /usr/skywalking/agent/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开始构建镜像</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> harbor.cn/library/apache-skywalking-java-agent:9.0.0 <span class="token builtin class-name">.</span>

<span class="token function">docker</span> push harbor.cn/library/apache-skywalking-java-agent:9.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sidecar-模式接入-skywalking-服务" tabindex="-1"><a class="header-anchor" href="#sidecar-模式接入-skywalking-服务" aria-hidden="true">#</a> SideCar 模式接入 SkyWalking 服务</h2><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> PROJECT_NAME
  <span class="token key atrule">name</span><span class="token punctuation">:</span> PROJECT_NAME
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> NAMESPACE
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">progressDeadlineSeconds</span><span class="token punctuation">:</span> <span class="token number">600</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> REPLICAS_NUM
  <span class="token key atrule">revisionHistoryLimit</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> PROJECT_NAME
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">rollingUpdate</span><span class="token punctuation">:</span>
      <span class="token key atrule">maxSurge</span><span class="token punctuation">:</span> 25%
      <span class="token key atrule">maxUnavailable</span><span class="token punctuation">:</span> 25%
    <span class="token key atrule">type</span><span class="token punctuation">:</span> RollingUpdate
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> PROJECT_NAME
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> harbor.cn/library/apache<span class="token punctuation">-</span>skywalking<span class="token punctuation">-</span>java<span class="token punctuation">-</span>agent<span class="token punctuation">:</span>9.0.0
          <span class="token key atrule">name</span><span class="token punctuation">:</span> sw<span class="token punctuation">-</span>agent<span class="token punctuation">-</span>sidecar
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;sh&quot;</span><span class="token punctuation">]</span>
          <span class="token key atrule">args</span><span class="token punctuation">:</span>
            <span class="token punctuation">[</span>
              <span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span>
              <span class="token string">&quot;mkdir -p /skywalking/agent &amp;&amp; cp -r /usr/skywalking/agent/* /skywalking/agent&quot;</span><span class="token punctuation">,</span>
            <span class="token punctuation">]</span>
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /skywalking/agent
              <span class="token key atrule">name</span><span class="token punctuation">:</span> sw<span class="token punctuation">-</span>agent
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> JAVA_OPTS
              <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
                <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
                  <span class="token key atrule">key</span><span class="token punctuation">:</span> JAVA_OPTS
                  <span class="token key atrule">name</span><span class="token punctuation">:</span> jvm<span class="token punctuation">-</span>config
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> JAVA_TOOL_OPTIONS
              <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>javaagent<span class="token punctuation">:</span>/usr/skywalking/agent/skywalking<span class="token punctuation">-</span>agent.jar
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> SW_AGENT_NAME
              <span class="token key atrule">value</span><span class="token punctuation">:</span> PROJECT_NAME
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> SW_AGENT_COLLECTOR_BACKEND_SERVICES
              <span class="token comment">## FQDN: servicename.namespacename.svc.cluster.local</span>
              <span class="token key atrule">value</span><span class="token punctuation">:</span> skywalking<span class="token punctuation">-</span>skywalking<span class="token punctuation">-</span>oap<span class="token punctuation">:</span><span class="token number">11800</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&quot;harbor.mdos.cn/BRANCH_NAME/PROJECT_NAME:TAG_VERSION&quot;</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
          <span class="token key atrule">name</span><span class="token punctuation">:</span> PROJECT_NAME
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> PORT
              <span class="token key atrule">name</span><span class="token punctuation">:</span> http
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">startupProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
              <span class="token key atrule">port</span><span class="token punctuation">:</span> PORT
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">20</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">30</span>
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
          <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /v1/healthy
              <span class="token key atrule">port</span><span class="token punctuation">:</span> PORT
              <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">2</span>
          <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">tcpSocket</span><span class="token punctuation">:</span>
              <span class="token key atrule">port</span><span class="token punctuation">:</span> PORT
            <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
            <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
            <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">2</span>
            <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">2</span>
          <span class="token key atrule">resources</span><span class="token punctuation">:</span>
            <span class="token key atrule">limits</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> <span class="token number">2</span>
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1024Mi
            <span class="token key atrule">requests</span><span class="token punctuation">:</span>
              <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 500m
              <span class="token key atrule">memory</span><span class="token punctuation">:</span> 1024Mi
          <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/skywalking/agent
              <span class="token key atrule">name</span><span class="token punctuation">:</span> sw<span class="token punctuation">-</span>agent
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> sw<span class="token punctuation">-</span>agent
          <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token key atrule">dnsPolicy</span><span class="token punctuation">:</span> ClusterFirst
      <span class="token key atrule">imagePullSecrets</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> harbor<span class="token punctuation">-</span>secret
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
      <span class="token key atrule">schedulerName</span><span class="token punctuation">:</span> default<span class="token punctuation">-</span>scheduler
      <span class="token key atrule">terminationGracePeriodSeconds</span><span class="token punctuation">:</span> <span class="token number">30</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function b(y,g){const a=p("ExternalLinkIcon");return i(),c("div",null,[u,r,n("p",null,[n("a",k,[s("Github 地址"),e(a)])]),d,n("ul",null,[n("li",null,[s("java agent "),n("a",v,[s("下载地址"),e(a)])])]),m])}const w=t(o,[["render",b],["__file","Helm部署.html.vue"]]);export{w as default};
