import{_ as o,r as d,o as u,c as v,b as e,d as s,e as n,w as l,a}from"./app-8ca7f52c.js";const m={},p=e("h1",{id:"使用-proxysql-配置负载均衡",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#使用-proxysql-配置负载均衡","aria-hidden":"true"},"#"),s(" 使用 ProxySQL 配置负载均衡")],-1),b={href:"https://www.haproxy.org/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://proxysql.com/",target:"_blank",rel:"noopener noreferrer"},y=e("code",null,"deploy/cr.yaml",-1),h=e("code",null,"haproxy.enabled",-1),f=e("code",null,"proxysql.enabled",-1),x=e("div",{class:"hint-container warning"},[e("p",{class:"hint-container-title"},"注意"),e("p",null,"从 ProxySQL 切换到 HAProxy 将导致 Percona XtraDB 集群 Pod 重新启动。无法从 HAProxy 切换到 ProxySQL，如果您需要 ProxySQL，则应在创建集群时进行配置。")],-1),q=e("p",null,[s("生成的设置将使用数字零 Percona XtraDB 集群成员（ "),e("code",null,"cluster1-pxc-0"),s(" 默认）作为写入器。")],-1),g={class:"hint-container tip"},X=e("p",{class:"hint-container-title"},"注意",-1),k=e("code",null,"deploy/cr.yaml",-1),Z={href:"https://docs.percona.com/percona-operator-for-mysql/pxc/annotations.html",target:"_blank",rel:"noopener noreferrer"},V=a(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> pxc.percona.com/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PerconaXtraDBCluster
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster1
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">percona.com/issue-vault-token</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">xx</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此注释仅在服务创建时有效，以后无法添加。</p>`,2),z=a(`<p>升级具有 ProxySQL 的集群时，将执行以下步骤。首先，读取器成员逐个升级：Operator 等待升级后的成员以在线状态出现在 ProxySQL 中，然后继续升级下一个成员。完成所有读取器的升级后，写入器 Percona XtraDB 集群成员最终升级。</p><div class="hint-container tip"><p class="hint-container-title">注意</p><p>当 ProxySQL 和 Percona XtraDB 集群升级时，它们将并行升级。</p></div><h2 id="将自定义配置选项传递给-proxysql" tabindex="-1"><a class="header-anchor" href="#将自定义配置选项传递给-proxysql" aria-hidden="true">#</a> 将自定义配置选项传递给 ProxySQL</h2><p>您可以通过以下方式之一将自定义配置传递给 HAProxy：</p><ul><li>编辑 <code>deploy/cr.yaml</code> 文件，</li><li>使用 ConfigMap，</li><li>使用 Secret 对象。</li></ul><div class="hint-container tip"><p class="hint-container-title">注意</p><p>如果以这种方式指定自定义 ProxySQL 配置，则 ProxySQL 将尝试将传递的参数与之前设置的配置参数（如果有）合并。如果 ProxySQL 无法合并某个选项，您将在其日志中看到警告。</p></div><h3 id="编辑-deploy-cr-yaml-文件" tabindex="-1"><a class="header-anchor" href="#编辑-deploy-cr-yaml-文件" aria-hidden="true">#</a> 编辑 <code>deploy/cr.yaml</code> 文件</h3><p>您可以通过编辑文件<code>deploy/cr.yaml</code> 中的 <code>proxysql.configuration</code> 键来添加 <code>proxysql.cnf</code> 配置文件中的选项。下面是一个示例：</p><div class="language-cfg line-numbers-mode" data-ext="cfg"><pre class="language-cfg"><code>...
proxysql:
  enabled: false
  size: 3
  image: percona/percona-xtradb-cluster-operator:1.13.0-proxysql
  configuration: |
    datadir=&quot;/var/lib/proxysql&quot;

    admin_variables =
    {
      admin_credentials=&quot;proxyadmin:admin_password&quot;
      mysql_ifaces=&quot;0.0.0.0:6032&quot;
      refresh_interval=2000

      cluster_username=&quot;proxyadmin&quot;
      cluster_password=&quot;admin_password&quot;
      cluster_check_interval_ms=200
      cluster_check_status_frequency=100
      cluster_mysql_query_rules_save_to_disk=true
      cluster_mysql_servers_save_to_disk=true
      cluster_mysql_users_save_to_disk=true
      cluster_proxysql_servers_save_to_disk=true
      cluster_mysql_query_rules_diffs_before_sync=1
      cluster_mysql_servers_diffs_before_sync=1
      cluster_mysql_users_diffs_before_sync=1
      cluster_proxysql_servers_diffs_before_sync=1
    }

    mysql_variables=
    {
      monitor_password=&quot;monitor&quot;
      monitor_galera_healthcheck_interval=1000
      threads=2
      max_connections=2048
      default_query_delay=0
      default_query_timeout=10000
      poll_timeout=2000
      interfaces=&quot;0.0.0.0:3306&quot;
      default_schema=&quot;information_schema&quot;
      stacksize=1048576
      connect_timeout_server=10000
      monitor_history=60000
      monitor_connect_interval=20000
      monitor_ping_interval=10000
      ping_timeout_server=200
      commands_stats=true
      sessions_sort=true
      have_ssl=true
      ssl_p2s_ca=&quot;/etc/proxysql/ssl-internal/ca.crt&quot;
      ssl_p2s_cert=&quot;/etc/proxysql/ssl-internal/tls.crt&quot;
      ssl_p2s_key=&quot;/etc/proxysql/ssl-internal/tls.key&quot;
      ssl_p2s_cipher=&quot;ECDHE-RSA-AES128-GCM-SHA256&quot;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-configmap" tabindex="-1"><a class="header-anchor" href="#使用-configmap" aria-hidden="true">#</a> 使用 ConfigMap</h3><p>您可以使用 configmap 和集群重启来重置配置选项。configmap 允许 Kubernetes 在容器化应用程序内传递或更新配置数据。</p>`,11),N=e("code",null,"kubectl",-1),W={href:"https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#create-a-configmap",target:"_blank",rel:"noopener noreferrer"},w=a(`<p>例如，您可以使用以下设置定义配置文件 <code>proxysql.cnf</code> ：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>datadir=&quot;/var/lib/proxysql&quot;

admin_variables =
{
  admin_credentials=&quot;proxyadmin:admin_password&quot;
  mysql_ifaces=&quot;0.0.0.0:6032&quot;
  refresh_interval=2000

  cluster_username=&quot;proxyadmin&quot;
  cluster_password=&quot;admin_password&quot;
  cluster_check_interval_ms=200
  cluster_check_status_frequency=100
  cluster_mysql_query_rules_save_to_disk=true
  cluster_mysql_servers_save_to_disk=true
  cluster_mysql_users_save_to_disk=true
  cluster_proxysql_servers_save_to_disk=true
  cluster_mysql_query_rules_diffs_before_sync=1
  cluster_mysql_servers_diffs_before_sync=1
  cluster_mysql_users_diffs_before_sync=1
  cluster_proxysql_servers_diffs_before_sync=1
}

mysql_variables=
{
  monitor_password=&quot;monitor&quot;
  monitor_galera_healthcheck_interval=1000
  threads=2
  max_connections=2048
  default_query_delay=0
  default_query_timeout=10000
  poll_timeout=2000
  interfaces=&quot;0.0.0.0:3306&quot;
  default_schema=&quot;information_schema&quot;
  stacksize=1048576
  connect_timeout_server=10000
  monitor_history=60000
  monitor_connect_interval=20000
  monitor_ping_interval=10000
  ping_timeout_server=200
  commands_stats=true
  sessions_sort=true
  have_ssl=true
  ssl_p2s_ca=&quot;/etc/proxysql/ssl-internal/ca.crt&quot;
  ssl_p2s_cert=&quot;/etc/proxysql/ssl-internal/tls.crt&quot;
  ssl_p2s_key=&quot;/etc/proxysql/ssl-internal/tls.key&quot;
  ssl_p2s_cipher=&quot;ECDHE-RSA-AES128-GCM-SHA256&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以使用以下 <code>kubectl create configmap</code> 命令从 <code>proxysql.cnf</code> 文件创建 configmap。</p><p>您应该使用集群名称与 <code>-proxysql</code> 后缀的组合作为 configmap 的命名约定。若要查找群集名称，可以使用以下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pxc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>kubectl create configmap</code> 命令的语法为：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl create configmap <span class="token operator">&lt;</span>cluster-name<span class="token operator">&gt;</span>-proxysql <span class="token operator">&lt;</span>resource-type<span class="token operator">=</span>resource-name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以下示例定义为 configmap 名称，将 <code>proxysql.cnf</code> 文件定义为 <code>cluster1-proxysql</code> 数据源：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create configmap cluster1-proxysql --from-file<span class="token operator">=</span>proxysql.cnf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要查看创建的 configmap，请使用以下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl describe configmaps cluster1-haproxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用-secret-对象" tabindex="-1"><a class="header-anchor" href="#使用-secret-对象" aria-hidden="true">#</a> 使用 Secret 对象</h3><p>Operator 还可以将配置选项存储在 Kubernetes Secret 中。如果需要对某些敏感数据进行额外保护，这可能很有用。</p><p>您应该创建一个具有特定名称的 Secret 对象，该对象由集群名称和 <code>proxysql</code> 后缀组成。</p><p>配置选项应放在 data 该部分的特定键内。此 key 的名称 proxysql.conf 用于 ProxySQL Pod。</p><p>实际选项应使用 Base64 进行编码。</p><p>例如，让我们定义一个 <code>proxysql.conf</code> 配置文件，并把我们在上一个示例中使用的选项放在那里：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>datadir=&quot;/var/lib/proxysql&quot;

admin_variables =
{
  admin_credentials=&quot;proxyadmin:admin_password&quot;
  mysql_ifaces=&quot;0.0.0.0:6032&quot;
  refresh_interval=2000

  cluster_username=&quot;proxyadmin&quot;
  cluster_password=&quot;admin_password&quot;
  cluster_check_interval_ms=200
  cluster_check_status_frequency=100
  cluster_mysql_query_rules_save_to_disk=true
  cluster_mysql_servers_save_to_disk=true
  cluster_mysql_users_save_to_disk=true
  cluster_proxysql_servers_save_to_disk=true
  cluster_mysql_query_rules_diffs_before_sync=1
  cluster_mysql_servers_diffs_before_sync=1
  cluster_mysql_users_diffs_before_sync=1
  cluster_proxysql_servers_diffs_before_sync=1
}

mysql_variables=
{
  monitor_password=&quot;monitor&quot;
  monitor_galera_healthcheck_interval=1000
  threads=2
  max_connections=2048
  default_query_delay=0
  default_query_timeout=10000
  poll_timeout=2000
  interfaces=&quot;0.0.0.0:3306&quot;
  default_schema=&quot;information_schema&quot;
  stacksize=1048576
  connect_timeout_server=10000
  monitor_history=60000
  monitor_connect_interval=20000
  monitor_ping_interval=10000
  ping_timeout_server=200
  commands_stats=true
  sessions_sort=true
  have_ssl=true
  ssl_p2s_ca=&quot;/etc/proxysql/ssl-internal/ca.crt&quot;
  ssl_p2s_cert=&quot;/etc/proxysql/ssl-internal/tls.crt&quot;
  ssl_p2s_key=&quot;/etc/proxysql/ssl-internal/tls.key&quot;
  ssl_p2s_cipher=&quot;ECDHE-RSA-AES128-GCM-SHA256&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以通过命令行从选项中获取 Base64 编码的字符串，如下所示：</p>`,19),R=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"cat"),s(" proxysql.cnf "),e("span",{class:"token operator"},"|"),s(" base64 "),e("span",{class:"token parameter variable"},"--wrap"),e("span",{class:"token operator"},"="),e("span",{class:"token number"},"0"),s(`
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),G=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"cat"),s(" proxysql.cnf "),e("span",{class:"token operator"},"|"),s(` base64
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"})])],-1),M=a(`<div class="hint-container tip"><p class="hint-container-title">注意</p><p>同样，您可以从 Base64 编码的字符串中读取选项列表：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">&quot;ZGF0YWRpcj0iL3Zhci9saWIvcHJveHlzcWwiCgphZG1pbl92YXJpYWJsZXMgPQp7CiBhZG1pbl9j\\
cmVkZW50aWFscz0icHJveHlhZG1pbjphZG1pbl9wYXNzd29yZCIKIG15c3FsX2lmYWNlcz0iMC4w\\
LjAuMDo2MDMyIgogcmVmcmVzaF9pbnRlcnZhbD0yMDAwCgogY2x1c3Rlcl91c2VybmFtZT0icHJv\\
eHlhZG1pbiIKIGNsdXN0ZXJfcGFzc3dvcmQ9ImFkbWluX3Bhc3N3b3JkIgogY2x1c3Rlcl9jaGVj\\
a19pbnRlcnZhbF9tcz0yMDAKIGNsdXN0ZXJfY2hlY2tfc3RhdHVzX2ZyZXF1ZW5jeT0xMDAKIGNs\\
dXN0ZXJfbXlzcWxfcXVlcnlfcnVsZXNfc2F2ZV90b19kaXNrPXRydWUKIGNsdXN0ZXJfbXlzcWxf\\
c2VydmVyc19zYXZlX3RvX2Rpc2s9dHJ1ZQogY2x1c3Rlcl9teXNxbF91c2Vyc19zYXZlX3RvX2Rp\\
c2s9dHJ1ZQogY2x1c3Rlcl9wcm94eXNxbF9zZXJ2ZXJzX3NhdmVfdG9fZGlzaz10cnVlCiBjbHVz\\
dGVyX215c3FsX3F1ZXJ5X3J1bGVzX2RpZmZzX2JlZm9yZV9zeW5jPTEKIGNsdXN0ZXJfbXlzcWxf\\
c2VydmVyc19kaWZmc19iZWZvcmVfc3luYz0xCiBjbHVzdGVyX215c3FsX3VzZXJzX2RpZmZzX2Jl\\
Zm9yZV9zeW5jPTEKIGNsdXN0ZXJfcHJveHlzcWxfc2VydmVyc19kaWZmc19iZWZvcmVfc3luYz0x\\
Cn0KCm15c3FsX3ZhcmlhYmxlcz0KewogbW9uaXRvcl9wYXNzd29yZD0ibW9uaXRvciIKIG1vbml0\\
b3JfZ2FsZXJhX2hlYWx0aGNoZWNrX2ludGVydmFsPTEwMDAKIHRocmVhZHM9MgogbWF4X2Nvbm5l\\
Y3Rpb25zPTIwNDgKIGRlZmF1bHRfcXVlcnlfZGVsYXk9MAogZGVmYXVsdF9xdWVyeV90aW1lb3V0\\
PTEwMDAwCiBwb2xsX3RpbWVvdXQ9MjAwMAogaW50ZXJmYWNlcz0iMC4wLjAuMDozMzA2IgogZGVm\\
YXVsdF9zY2hlbWE9ImluZm9ybWF0aW9uX3NjaGVtYSIKIHN0YWNrc2l6ZT0xMDQ4NTc2CiBjb25u\\
ZWN0X3RpbWVvdXRfc2VydmVyPTEwMDAwCiBtb25pdG9yX2hpc3Rvcnk9NjAwMDAKIG1vbml0b3Jf\\
Y29ubmVjdF9pbnRlcnZhbD0yMDAwMAogbW9uaXRvcl9waW5nX2ludGVydmFsPTEwMDAwCiBwaW5n\\
X3RpbWVvdXRfc2VydmVyPTIwMAogY29tbWFuZHNfc3RhdHM9dHJ1ZQogc2Vzc2lvbnNfc29ydD10\\
cnVlCiBoYXZlX3NzbD10cnVlCiBzc2xfcDJzX2NhPSIvZXRjL3Byb3h5c3FsL3NzbC1pbnRlcm5h\\
bC9jYS5jcnQiCiBzc2xfcDJzX2NlcnQ9Ii9ldGMvcHJveHlzcWwvc3NsLWludGVybmFsL3Rscy5j\\
cnQiCiBzc2xfcDJzX2tleT0iL2V0Yy9wcm94eXNxbC9zc2wtaW50ZXJuYWwvdGxzLmtleSIKIHNz\\
bF9wMnNfY2lwaGVyPSJFQ0RIRS1SU0EtQUVTMTI4LUdDTS1TSEEyNTYiCn0K&quot;</span> <span class="token operator">|</span> base64 <span class="token parameter variable">--decode</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>最后，使用 yaml 文件创建 Secret 对象。例如，您可以创建包含以下内容的文件 <code>deploy/my-proxysql-secret.yaml</code>：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster1<span class="token punctuation">-</span>proxysql
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">my.cnf</span><span class="token punctuation">:</span>
    &quot;ZGF0YWRpcj0iL3Zhci9saWIvcHJveHlzcWwiCgphZG1pbl92YXJpYWJsZXMgPQp7CiBhZG1pbl9j\\
    cmVkZW50aWFscz0icHJveHlhZG1pbjphZG1pbl9wYXNzd29yZCIKIG15c3FsX2lmYWNlcz0iMC4w\\
    LjAuMDo2MDMyIgogcmVmcmVzaF9pbnRlcnZhbD0yMDAwCgogY2x1c3Rlcl91c2VybmFtZT0icHJv\\
    eHlhZG1pbiIKIGNsdXN0ZXJfcGFzc3dvcmQ9ImFkbWluX3Bhc3N3b3JkIgogY2x1c3Rlcl9jaGVj\\
    a19pbnRlcnZhbF9tcz0yMDAKIGNsdXN0ZXJfY2hlY2tfc3RhdHVzX2ZyZXF1ZW5jeT0xMDAKIGNs\\
    dXN0ZXJfbXlzcWxfcXVlcnlfcnVsZXNfc2F2ZV90b19kaXNrPXRydWUKIGNsdXN0ZXJfbXlzcWxf\\
    c2VydmVyc19zYXZlX3RvX2Rpc2s9dHJ1ZQogY2x1c3Rlcl9teXNxbF91c2Vyc19zYXZlX3RvX2Rp\\
    c2s9dHJ1ZQogY2x1c3Rlcl9wcm94eXNxbF9zZXJ2ZXJzX3NhdmVfdG9fZGlzaz10cnVlCiBjbHVz\\
    dGVyX215c3FsX3F1ZXJ5X3J1bGVzX2RpZmZzX2JlZm9yZV9zeW5jPTEKIGNsdXN0ZXJfbXlzcWxf\\
    c2VydmVyc19kaWZmc19iZWZvcmVfc3luYz0xCiBjbHVzdGVyX215c3FsX3VzZXJzX2RpZmZzX2Jl\\
    Zm9yZV9zeW5jPTEKIGNsdXN0ZXJfcHJveHlzcWxfc2VydmVyc19kaWZmc19iZWZvcmVfc3luYz0x\\
    Cn0KCm15c3FsX3ZhcmlhYmxlcz0KewogbW9uaXRvcl9wYXNzd29yZD0ibW9uaXRvciIKIG1vbml0\\
    b3JfZ2FsZXJhX2hlYWx0aGNoZWNrX2ludGVydmFsPTEwMDAKIHRocmVhZHM9MgogbWF4X2Nvbm5l\\
    Y3Rpb25zPTIwNDgKIGRlZmF1bHRfcXVlcnlfZGVsYXk9MAogZGVmYXVsdF9xdWVyeV90aW1lb3V0\\
    PTEwMDAwCiBwb2xsX3RpbWVvdXQ9MjAwMAogaW50ZXJmYWNlcz0iMC4wLjAuMDozMzA2IgogZGVm\\
    YXVsdF9zY2hlbWE9ImluZm9ybWF0aW9uX3NjaGVtYSIKIHN0YWNrc2l6ZT0xMDQ4NTc2CiBjb25u\\
    ZWN0X3RpbWVvdXRfc2VydmVyPTEwMDAwCiBtb25pdG9yX2hpc3Rvcnk9NjAwMDAKIG1vbml0b3Jf\\
    Y29ubmVjdF9pbnRlcnZhbD0yMDAwMAogbW9uaXRvcl9waW5nX2ludGVydmFsPTEwMDAwCiBwaW5n\\
    X3RpbWVvdXRfc2VydmVyPTIwMAogY29tbWFuZHNfc3RhdHM9dHJ1ZQogc2Vzc2lvbnNfc29ydD10\\
    cnVlCiBoYXZlX3NzbD10cnVlCiBzc2xfcDJzX2NhPSIvZXRjL3Byb3h5c3FsL3NzbC1pbnRlcm5h\\
    bC9jYS5jcnQiCiBzc2xfcDJzX2NlcnQ9Ii9ldGMvcHJveHlzcWwvc3NsLWludGVybmFsL3Rscy5j\\
    cnQiCiBzc2xfcDJzX2tleT0iL2V0Yy9wcm94eXNxbC9zc2wtaW50ZXJuYWwvdGxzLmtleSIKIHNz\\
    bF9wMnNfY2lwaGVyPSJFQ0RIRS1SU0EtQUVTMTI4LUdDTS1TSEEyNTYiCn0K&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>准备就绪后，使用以下命令应用它：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> deploy/my-proxysql-secret.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">注意</p><p>不要忘记重新启动 Percona XtraDB 集群，以确保集群已更新配置。</p></div><h2 id="访问-proxysql-管理界面" tabindex="-1"><a class="header-anchor" href="#访问-proxysql-管理界面" aria-hidden="true">#</a> 访问 ProxySQL 管理界面</h2>`,7),Y={href:"https://www.percona.com/blog/proxysql-admin-interface-not-typical-mysql-server/?_gl=1*1jxle8p*_gcl_au*OTg5NTM4MTc5LjE2OTMyMDY2NDQ.",target:"_blank",rel:"noopener noreferrer"},P=a(`<p>以这种方式配置 ProxySQL 意味着使用 MySQL 协议连接到它，需要做两件事：</p><ul><li>ProxySQL Pod 名称</li><li>ProxySQL 管理员密码</li></ul><p>您可以使用 kubectl get pods 命令找出 ProxySQL Pod 名称，该命令将具有以下输出：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get pods

NAME                                              READY   STATUS    RESTARTS   AGE
cluster1-pxc-node-0                               <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m
cluster1-pxc-node-1                               <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4m
cluster1-pxc-node-2                               <span class="token number">1</span>/1     Running   <span class="token number">0</span>          2m
cluster1-proxysql-0                               <span class="token number">1</span>/1     Running   <span class="token number">0</span>          5m
percona-xtradb-cluster-operator-dc67778fd-qtspz   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          6m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下一个命令将打印您所需的管理员密码：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get secrets <span class="token variable"><span class="token variable">$(</span>kubectl get pxc <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">&#39;{.items[].spec.seretsName}&#39;</span><span class="token variable">)</span></span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">template</span><span class="token operator">=</span><span class="token string">&#39;{{ .data.proxyadmin | base64decode }}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当 Pod 名称和管理员密码都已知时，按如下方式连接到 ProxySQL，将 <code>cluster1-proxysql-0</code> 替换为实际 Pod 名称，将 <code>admin_password</code> 替换为实际密码：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> cluster1-proxysql-0 -- mysql <span class="token parameter variable">-h127.0.0.1</span> <span class="token parameter variable">-P6032</span> <span class="token parameter variable">-uproxyadmin</span> <span class="token parameter variable">-padmin_password</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,8);function J(S,I){const i=d("ExternalLinkIcon"),t=d("Tabs");return u(),v("div",null,[p,e("p",null,[s("基于 Percona XtraDB 的 Percona Operator for MySQL 集群提供了两种集群组件的选择，以提供负载均衡和代理服务：您可以使用 "),e("a",b,[s("HAProxy"),n(i)]),s(" 或 "),e("a",_,[s("ProxySQL"),n(i)]),s("。您可以通过 "),y,s(" 配置文件中的 "),h,s(" 和 "),f,s(" 选项启用或禁用来控制使用哪一个（如果有）。")]),x,q,e("div",g,[X,e("p",null,[s("如果需要将 ProxySQL 服务配置为无头服务（例如在租户网络上使用），请在 "),k,s(" 自定义资源元数据部分添加以下"),e("a",Z,[s("注释"),n(i)]),s(" ：")]),V]),z,e("p",null,[s("使用命令 "),N,s(" 从外部资源创建 configmap，有关更多信息，请参阅"),e("a",W,[s("配置 Pod 以使用 ConfigMap"),n(i)]),s("。")]),w,n(t,{id:"120",data:[{id:"在 Linux 中"},{id:"在 macOS 中"}]},{title0:l(({value:c,isActive:r})=>[s("在 Linux 中")]),title1:l(({value:c,isActive:r})=>[s("在 macOS 中")]),tab0:l(({value:c,isActive:r})=>[R]),tab1:l(({value:c,isActive:r})=>[G]),_:1}),M,e("p",null,[s("您可以使用 "),e("a",Y,[s("ProxySQL 管理界面"),n(i)]),s("来配置其设置。")]),P])}const D=o(m,[["render",J],["__file","使用 ProxySQL 配置负载均衡.html.vue"]]);export{D as default};
