import{_ as i,r as l,o as t,c,b as n,d as a,e as r,a as s}from"./app-8ca7f52c.js";const p={},o=s(`<h1 id="在-kubernetes-上安装-percona-xtradb-集群" tabindex="-1"><a class="header-anchor" href="#在-kubernetes-上安装-percona-xtradb-集群" aria-hidden="true">#</a> 在 Kubernetes 上安装 Percona XtraDB 集群</h1><h2 id="克隆-repository" tabindex="-1"><a class="header-anchor" href="#克隆-repository" aria-hidden="true">#</a> 克隆 repository</h2><ol><li>首先，克隆 percona-xtradb-cluster-operator 存储库：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone <span class="token parameter variable">-b</span> v1.13.0 https://ghproxy.moweilong.com/https://github.com/percona/percona-xtradb-cluster-operator
<span class="token builtin class-name">cd</span> percona-xtradb-cluster-operator
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">注意</p><p>在此步骤中克隆代码时，使用选项指定 -b 正确的分支至关重要。请小心。</p></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><ol><li>现在，应该从 <code>deploy/crd.yaml</code> 该文件创建 Percona XtraDB Cluster 的自定义资源定义。自定义资源定义扩展了 Kubernetes 通过新项目（在我们的例子中是运算符的核心）“知道”的标准资源集。</li></ol><p>此步骤应仅执行一次;它不需要在下一次操作员部署等中重复。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> deploy/crd.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>接下来要做的是将 pxc 命名空间添加到 Kubernetes，不要忘记为后续步骤设置相应的上下文：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create namespace pxc
kubectl config set-context <span class="token variable"><span class="token variable">$(</span>kubectl config current-context<span class="token variable">)</span></span> <span class="token parameter variable">--namespace</span><span class="token operator">=</span>pxc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,11),u={start:"3"},d={href:"https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings",target:"_blank",rel:"noopener noreferrer"},v=s(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> deploy/rbac.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">注意</p><p>设置 RBAC 要求用户具有群集管理员角色权限。例如，使用 Google Kubernetes Engine 的用户可以通过以下命令授予用户所需的权限：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create clusterrolebinding cluster-admin-binding <span class="token parameter variable">--clusterrole</span><span class="token operator">=</span>cluster-admin <span class="token parameter variable">--user</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>gcloud config get-value core/account<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><ol start="4"><li>最后是时候在 Kubernetes 中启动运算符了：</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> deploy/operator.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">注意</p><p>您可以通过应用单个 deploy/bundle.yaml 文件而不是运行步骤 1、3 和 4 中的命令来简化操作员安装：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> deploy/bundle.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将自动创建自定义资源定义，设置基于角色的访问控制，并将操作员安装为单个操作。</p></div><ol start="5"><li>现在是时候将 Percona XtraDB 集群用户密钥与登录名和密码添加到 Kubernetes 了。默认情况下，操作员自动生成用户密钥，此步骤无需执行任何操作。</li></ol><p>不过，您可以自己生成和应用您的 Secrets。在这种情况下，请将用户帐户的登录名和纯文本密码放在 <code>deploy/secrets.yaml</code> 文件的数据部分中；编辑完成后，使用以下命令创建用户密钥：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> deploy/secrets.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="6"><li><p>现在应该生成证书。默认情况下，操作员自动生成证书，此步骤无需执行任何操作。不过，您可以根据 TLS 说明生成自己的证书并将其应用为机密。</p></li><li><p>启动算子并添加用户密钥后，可以随时使用以下命令创建 Percona XtraDB 集群：</p></li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> deploy/cr.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>创建过程需要一些时间。当操作员和副本集 Pod 都达到其运行状态时，该过程结束：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>NAME                                               READY   STATUS    RESTARTS      AGE
cluster1-haproxy-0                                 <span class="token number">2</span>/2     Running   <span class="token number">0</span>             4m13s
cluster1-haproxy-1                                 <span class="token number">2</span>/2     Running   <span class="token number">0</span>             2m52s
cluster1-haproxy-2                                 <span class="token number">2</span>/2     Running   <span class="token number">0</span>             2m27s
cluster1-pxc-0                                     <span class="token number">3</span>/3     Running   <span class="token number">0</span>             4m10s
cluster1-pxc-1                                     <span class="token number">3</span>/3     Running   <span class="token number">0</span>             3m5s
cluster1-pxc-2                                     <span class="token number">3</span>/3     Running   <span class="token number">0</span>             119s
percona-xtradb-cluster-operator-57dbcb9899-2zzhk   <span class="token number">1</span>/1     Running   <span class="token number">0</span>             40m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="8"><li>检查与新创建的群集的连接</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl run <span class="token parameter variable">-i</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">--tty</span> percona-client <span class="token parameter variable">--image</span><span class="token operator">=</span>percona:8.0 <span class="token parameter variable">--restart</span><span class="token operator">=</span>Never -- <span class="token function">bash</span> <span class="token parameter variable">-il</span>

percona-client:/$ mysql <span class="token parameter variable">-h</span> cluster1-haproxy <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-proot_password</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此命令会将您连接到 MySQL 监视器。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Welcome to the MySQL monitor.  Commands end with <span class="token punctuation">;</span> or <span class="token punctuation">\\</span>g.
Your MySQL connection <span class="token function">id</span> is <span class="token number">1215</span>
Server version: <span class="token number">8.0</span>.32-24.2 Percona XtraDB Cluster <span class="token punctuation">(</span>GPL<span class="token punctuation">)</span>, Release rel24, Revision 2119e75, WSREP version <span class="token number">26.1</span>.4.3

Copyright <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token number">2009</span>-2021 Percona LLC and/or its affiliates
Copyright <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token number">2000</span>, <span class="token number">2021</span>, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type <span class="token string">&#39;help;&#39;</span> or <span class="token string">&#39;\\h&#39;</span> <span class="token keyword">for</span> help. Type <span class="token string">&#39;\\c&#39;</span> to <span class="token function">clear</span> the current input statement.

mysql<span class="token operator">&gt;</span> show databases<span class="token punctuation">;</span>
+--------------------+
<span class="token operator">|</span> Database           <span class="token operator">|</span>
+--------------------+
<span class="token operator">|</span> information_schema <span class="token operator">|</span>
<span class="token operator">|</span> mysql              <span class="token operator">|</span>
<span class="token operator">|</span> performance_schema <span class="token operator">|</span>
<span class="token operator">|</span> sys                <span class="token operator">|</span>
+--------------------+
<span class="token number">4</span> rows <span class="token keyword">in</span> <span class="token builtin class-name">set</span> <span class="token punctuation">(</span><span class="token number">0.01</span> sec<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义配置" tabindex="-1"><a class="header-anchor" href="#自定义配置" aria-hidden="true">#</a> 自定义配置</h2><ul><li><code>proxy service</code> 是否需要自动创建为无头服务类型，默认是 <code>clusterIP</code>。</li><li>是否关闭 <code>遥测</code> 功能。</li><li>日志收集</li><li>数据备份</li></ul><h3 id="日志收集到-es" tabindex="-1"><a class="header-anchor" href="#日志收集到-es" aria-hidden="true">#</a> 日志收集到 ES</h3><p><code>logcollector.configuration</code> 配置参考如下：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> pxc.percona.com/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PerconaXtraDBCluster
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster1
<span class="token punctuation">...</span><span class="token punctuation">...</span>
  <span class="token key atrule">logcollector</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">configuration</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
      [SERVICE]
           Flush        1
           Log_Level    error
           Daemon       off
           parsers_file parsers_multiline.conf</span>

      <span class="token punctuation">[</span>INPUT<span class="token punctuation">]</span>
           Name             tail
           Path             $<span class="token punctuation">{</span>LOG_DATA_DIR<span class="token punctuation">}</span>/mysqld<span class="token punctuation">-</span>error.log
           Tag              $<span class="token punctuation">{</span>POD_NAMESPASE<span class="token punctuation">}</span>.$<span class="token punctuation">{</span>POD_NAME<span class="token punctuation">}</span>.mysqld<span class="token punctuation">-</span>error.log
           Mem_Buf_Limit    5MB
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline<span class="token punctuation">-</span>regex<span class="token punctuation">-</span>test
           read_from_head   true
           Path_Key         file

      <span class="token punctuation">[</span>INPUT<span class="token punctuation">]</span>
           Name             tail
           Path             $<span class="token punctuation">{</span>LOG_DATA_DIR<span class="token punctuation">}</span>/wsrep_recovery_verbose.log
           Tag              $<span class="token punctuation">{</span>POD_NAMESPASE<span class="token punctuation">}</span>.$<span class="token punctuation">{</span>POD_NAME<span class="token punctuation">}</span>.wsrep_recovery_verbose.log
           Mem_Buf_Limit    5MB
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline<span class="token punctuation">-</span>regex<span class="token punctuation">-</span>test
           read_from_head   true
           Path_Key         file

      <span class="token punctuation">[</span>INPUT<span class="token punctuation">]</span>
           Name             tail
           Path             $<span class="token punctuation">{</span>LOG_DATA_DIR<span class="token punctuation">}</span>/innobackup.prepare.log
           Tag              $<span class="token punctuation">{</span>POD_NAMESPASE<span class="token punctuation">}</span>.$<span class="token punctuation">{</span>POD_NAME<span class="token punctuation">}</span>.innobackup.prepare.log
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline<span class="token punctuation">-</span>regex<span class="token punctuation">-</span>test
           read_from_head   true
           Path_Key         file

      <span class="token punctuation">[</span>INPUT<span class="token punctuation">]</span>
           Name             tail
           Path             $<span class="token punctuation">{</span>LOG_DATA_DIR<span class="token punctuation">}</span>/innobackup.move.log
           Tag              $<span class="token punctuation">{</span>POD_NAMESPASE<span class="token punctuation">}</span>.$<span class="token punctuation">{</span>POD_NAME<span class="token punctuation">}</span>.innobackup.move.log
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline<span class="token punctuation">-</span>regex<span class="token punctuation">-</span>test
           read_from_head   true
           Path_Key         file

      <span class="token punctuation">[</span>INPUT<span class="token punctuation">]</span>
           Name             tail
           Path             $<span class="token punctuation">{</span>LOG_DATA_DIR<span class="token punctuation">}</span>/innobackup.backup.log
           Tag              $<span class="token punctuation">{</span>POD_NAMESPASE<span class="token punctuation">}</span>.$<span class="token punctuation">{</span>POD_NAME<span class="token punctuation">}</span>.innobackup.backup.log
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline<span class="token punctuation">-</span>regex<span class="token punctuation">-</span>test
           read_from_head   true
           Path_Key         file

      <span class="token punctuation">[</span>INPUT<span class="token punctuation">]</span>
           Name             tail
           Path             $<span class="token punctuation">{</span>LOG_DATA_DIR<span class="token punctuation">}</span>/mysqld.post.processing.log
           Tag              $<span class="token punctuation">{</span>POD_NAMESPASE<span class="token punctuation">}</span>.$<span class="token punctuation">{</span>POD_NAME<span class="token punctuation">}</span>.mysqld.post.processing.log
           Refresh_Interval 5
           DB               /tmp/flb_kube.db
           multiline.parser multiline<span class="token punctuation">-</span>regex<span class="token punctuation">-</span>test
           read_from_head   true
           Path_Key         file

      <span class="token punctuation">[</span>OUTPUT<span class="token punctuation">]</span>
           Name  es
           Match *
           Host  es<span class="token punctuation">-</span>http
           Port  9200
           Index percona<span class="token punctuation">-</span>xtradb<span class="token punctuation">-</span>cluster
           Type  doc
    <span class="token key atrule">resources</span><span class="token punctuation">:</span>
      <span class="token key atrule">requests</span><span class="token punctuation">:</span>
        <span class="token key atrule">memory</span><span class="token punctuation">:</span> 100M
        <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 200m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21);function b(m,k){const e=l("ExternalLinkIcon");return t(),c("div",null,[o,n("ol",u,[n("li",null,[a("现在，应该从 deploy/rbac.yaml 该文件中设置 Percona XtraDB 集群的 RBAC（基于角色的访问控制）。简而言之，基于角色的访问基于专门定义的角色和与之对应的操作，允许在特定 Kubernetes 资源上完成（有关用户和角色的详细信息可以在 "),n("a",d,[a("Kubernetes 文档"),r(e)]),a("中找到）。")])]),v])}const g=i(p,[["render",b],["__file","在 Kubernetes 上安装 Percona XtraDB 集群.html.vue"]]);export{g as default};
