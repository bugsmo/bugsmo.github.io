import{_ as t,r as o,o as l,c,b as s,d as n,e,a as p}from"./app-8ca7f52c.js";const i={},u=p('<h1 id="api-使用" tabindex="-1"><a class="header-anchor" href="#api-使用" aria-hidden="true">#</a> API 使用</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>本文示例以 ElasticSearch 7.10.2 版本搭建了 demo 集群来演示，更详细的 API 参数及用法请参考官方文档。测试命令我用的是 Kibana，在输入时会有命令和语法错误提示，可直接复制 CURL 格式、格式化、查看文档，点击导航栏上面的 help，也提供了一些快捷方式，方便学习。</p><p><img src="https://assets.moweilong.com/img/20231031150625.png" alt="dev tools"></p><p>API 测试参考：</p>',5),r={href:"https://www.elastic.co/guide/en/elasticsearch/reference/7.10/rest-apis.html",target:"_blank",rel:"noopener noreferrer"},d=p(`<h2 id="查看-cat-api" tabindex="-1"><a class="header-anchor" href="#查看-cat-api" aria-hidden="true">#</a> 查看（Cat） API</h2><p>ES cat 命令是监控 ES 的节点，内存，索引，分片，集群状态等一些基本信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_cat/<span class="token operator">&lt;</span>some<span class="token operator">&gt;</span>

路径参数：
  <span class="token operator">&lt;</span>some<span class="token operator">&gt;</span>
  	（必需，字符串）节点，内存，索引，分片，集群状态等一些基本信息
请求参数：
  v: 显示详细的查询结果。
  help: 帮助了解cat 相关指令支持哪些功能，返回参数第一列显示完整的名称，第二列显示缩写，第三列提供了关于这个参数的简介。
  h: 指定字段输出。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看节点信息" tabindex="-1"><a class="header-anchor" href="#查看节点信息" aria-hidden="true">#</a> 查看节点信息</h3><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_cat/nodes?v

ip             heap.percent ram.percent cpu load_1m load_5m load_15m node.role master name
<span class="token number">10.233</span>.<span class="token number">74.25</span>             <span class="token number">32</span>          <span class="token number">59</span>   <span class="token number">3</span>    <span class="token number">1.45</span>    <span class="token number">1.02</span>     <span class="token number">1.03</span> imr       -      es-master<span class="token number">-2</span>
<span class="token number">10.233</span>.<span class="token number">74.142</span>            <span class="token number">12</span>          <span class="token number">59</span>   <span class="token number">4</span>    <span class="token number">1.45</span>    <span class="token number">1.02</span>     <span class="token number">1.03</span> dir       -      es-data-simple<span class="token number">-3</span>
<span class="token number">10.233</span>.<span class="token number">75.183</span>             <span class="token number">3</span>          <span class="token number">79</span>   <span class="token number">4</span>    <span class="token number">1.76</span>    <span class="token number">1.97</span>     <span class="token number">2.21</span> dir       -      es-data-simple<span class="token number">-0</span>
<span class="token number">10.233</span>.<span class="token number">112.169</span>           <span class="token number">24</span>          <span class="token number">55</span>  <span class="token number">20</span>    <span class="token number">8.79</span>    <span class="token number">8.75</span>     <span class="token number">9.41</span> dir       -      es-data-simple<span class="token number">-2</span>
<span class="token number">10.233</span>.<span class="token number">77.87</span>             <span class="token number">39</span>          <span class="token number">59</span>   <span class="token number">1</span>    <span class="token number">0.55</span>    <span class="token number">0.50</span>     <span class="token number">0.55</span> imr       -      es-master<span class="token number">-1</span>
<span class="token number">10.233</span>.<span class="token number">77.88</span>             <span class="token number">18</span>          <span class="token number">92</span>   <span class="token number">1</span>    <span class="token number">0.55</span>    <span class="token number">0.50</span>     <span class="token number">0.55</span> dir       -      es-data-simple<span class="token number">-1</span>
<span class="token number">10.233</span>.<span class="token number">75.185</span>            <span class="token number">36</span>          <span class="token number">60</span>   <span class="token number">4</span>    <span class="token number">1.76</span>    <span class="token number">1.97</span>     <span class="token number">2.21</span> imr       *      es-master<span class="token number">-0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/nodes?v&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>IP：（默认）IP 地址 heap.percent：（默认）最大配置堆数 ram.percent：（默认）已用内存总百分比</p></div><p>返回结果：堆内存，内存，cpu 百分比， 最近 1,5,15 分钟 节点的负载，显示主节点（ * 标记主节点），节点名等信息。</p><h3 id="查看各节点机器存储信息" tabindex="-1"><a class="header-anchor" href="#查看各节点机器存储信息" aria-hidden="true">#</a> 查看各节点机器存储信息</h3><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_cat/allocation?v

shards disk.indices disk.used disk.avail disk.total disk.percent host           ip             node
    <span class="token number">32</span>        <span class="token number">1</span>.8gb    <span class="token number">44</span>.7tb     <span class="token number">11</span>.1tb     <span class="token number">55</span>.8tb           <span class="token number">80</span> <span class="token number">10.233</span>.<span class="token number">74.142</span>  <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
    <span class="token number">40</span>        <span class="token number">3</span>.4gb    <span class="token number">44</span>.7tb     <span class="token number">11</span>.1tb     <span class="token number">55</span>.8tb           <span class="token number">80</span> <span class="token number">10.233</span>.<span class="token number">77.88</span>   <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
     <span class="token number">1</span>       <span class="token number">42</span>.2kb    <span class="token number">44</span>.7tb     <span class="token number">11</span>.1tb     <span class="token number">55</span>.8tb           <span class="token number">80</span> <span class="token number">10.233</span>.<span class="token number">112.169</span> <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
    <span class="token number">36</span>        <span class="token number">1</span>.7gb    <span class="token number">44</span>.7tb     <span class="token number">11</span>.1tb     <span class="token number">55</span>.8tb           <span class="token number">80</span> <span class="token number">10.233</span>.<span class="token number">75.183</span>  <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
     <span class="token number">8</span>                                                                                         UNASSIGNED
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/allocation?v&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回结果：节点分片数，索引占用磁盘大小，磁盘已使用容量大小，磁盘可用容量大小，磁盘总容量大小，磁盘使用率等节点信息。</p><h3 id="查询索引信息" tabindex="-1"><a class="header-anchor" href="#查询索引信息" aria-hidden="true">#</a> 查询索引信息</h3><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_cat/indices?v

health status index                         uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   demo-index                    _Cr0_eLDSN-_8naHNSZ_MA   <span class="token number">5</span>   <span class="token number">2</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">4</span>.1kb          <span class="token number">1</span>.3kb
green  open   sw_log<span class="token number">-20231030</span>               YPd9l9Z7R2y-jJcKRBkxgQ   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
green  open   sw_zipkin_span<span class="token number">-20231030</span>       rD4W-MsiSH2T6hM5DzjTBA   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
green  open   sw_metrics-all<span class="token number">-20231026</span>       gGHhLA0sS_2FWRHPRCXGtQ   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">1769643</span>        <span class="token number">83012</span>      820mb          410mb
green  open   sw_metrics-all<span class="token number">-20231027</span>       0pg83gZeSSasOcunuHW1Sw   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">3013999</span>       <span class="token number">456750</span>      <span class="token number">1</span>.1gb        <span class="token number">574</span>.4mb
green  open   sw_metrics-all<span class="token number">-20231028</span>       ughbEWDsT6CAE9doFjdKuA   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">3000642</span>      <span class="token number">1328161</span>      <span class="token number">1</span>.2gb        <span class="token number">642</span>.2mb
green  open   sw_metrics-all<span class="token number">-20231029</span>       bQHa8hK4RquJhKfqDEsvIQ   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">3000327</span>      <span class="token number">1016008</span>      <span class="token number">1</span>.1gb        <span class="token number">607</span>.6mb
green  open   sw_ui_template                TcWeSgCWSDuKQheyRxMn4w   <span class="token number">1</span>   <span class="token number">1</span>         <span class="token number">46</span>            <span class="token number">0</span>    <span class="token number">579</span>.7kb        <span class="token number">289</span>.8kb
green  open   sw_browser_error_log<span class="token number">-20231029</span> MhGb1KEbQIO6Om9zJArFHQ   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
red    open   sw_browser_error_log<span class="token number">-20231028</span> R-zgyBnETcGl_AOWNHhT0Q   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>       849b           849b
green  open   sw_segment<span class="token number">-20231030</span>           o2B_RMrsSHinoEwTHEvVPg   <span class="token number">5</span>   <span class="token number">0</span>     <span class="token number">670910</span>            <span class="token number">0</span>      423mb          423mb
green  open   sw_records-all<span class="token number">-20231030</span>       3dTEON3XTTuW-wxc7C2Bng   <span class="token number">1</span>   <span class="token number">1</span>        <span class="token number">464</span>            <span class="token number">0</span>    <span class="token number">564</span>.6kb        <span class="token number">227</span>.1kb
red    open   sw_log<span class="token number">-20231028</span>               zmp5QuoeSjiTBt-JjbX9bA   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.1kb          <span class="token number">1</span>.1kb
green  open   sw_log<span class="token number">-20231029</span>               yh8XDu3sTryzX-DVrZ8HXg   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
green  open   sw_records-all<span class="token number">-20231028</span>       1PSAQA_bTLSrTRZaz356ag   <span class="token number">1</span>   <span class="token number">1</span>        <span class="token number">971</span>            <span class="token number">0</span>    <span class="token number">704</span>.8kb        <span class="token number">333</span>.8kb
green  open   sw_records-all<span class="token number">-20231029</span>       TUbO6DDUSsixnbweaYMvZQ   <span class="token number">1</span>   <span class="token number">1</span>        <span class="token number">825</span>            <span class="token number">0</span>      547kb        <span class="token number">273</span>.5kb
green  open   sw_browser_error_log<span class="token number">-20231030</span> YnEmFfjUQIi-2GZ4foIICQ   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
green  open   .kibana_1                     _6BpVrmVRMCUfTkpzbZbUg   <span class="token number">1</span>   <span class="token number">1</span>         <span class="token number">24</span>            <span class="token number">0</span>     <span class="token number">58</span>.6kb         <span class="token number">29</span>.3kb
green  open   sw_zipkin_span<span class="token number">-20231029</span>       xyYmXViwTX6UOHpnPjQp8A   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
red    open   sw_zipkin_span<span class="token number">-20231028</span>       G9jvfl6KSJuc5ofaRR9F6A   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.1kb          <span class="token number">1</span>.1kb
red    open   sw_segment<span class="token number">-20231028</span>           uLJSqV6nRHe9ruKNazpIEQ   <span class="token number">5</span>   <span class="token number">0</span>    <span class="token number">1337928</span>            <span class="token number">0</span>    <span class="token number">801</span>.5mb        <span class="token number">801</span>.5mb
green  open   sw_segment<span class="token number">-20231029</span>           sQ7GO2mOTN-2PlarKVbrXA   <span class="token number">5</span>   <span class="token number">0</span>    <span class="token number">1683395</span>            <span class="token number">0</span>        1gb            1gb
green  open   sw_metrics-all<span class="token number">-20231030</span>       73gCoQZ_RZWZSpOzCbIJew   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">1358265</span>       <span class="token number">841906</span>    <span class="token number">644</span>.6mb        <span class="token number">317</span>.9mb
red    open   demo-index3                   LvEXHv26R_KN2GZzoeycQA   <span class="token number">6</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
red    open   demo-index2                   sBhlncuUR8G3WhHdbU71TA   <span class="token number">6</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.1kb          <span class="token number">1</span>.1kb
green  open   demo-index1                   AKSwbUMjSgWhFnIsS7Y-mw   <span class="token number">5</span>   <span class="token number">1</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">2</span>.7kb          <span class="token number">1</span>.3kb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回结果：索引的健康状态，索引名，索引主分片，副本大小，文档数，被删除文档数，索引主分片，副本，总占用存储空间。</p><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/indices?v&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查询分片信息" tabindex="-1"><a class="header-anchor" href="#查询分片信息" aria-hidden="true">#</a> 查询分片信息</h3><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_cat/shards?v

index                         shard prirep state         docs   store ip             node
sw_segment<span class="token number">-20231031</span>           <span class="token number">3</span>     p      STARTED     <span class="token number">145202</span>  <span class="token number">69</span>.6mb <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_segment<span class="token number">-20231031</span>           <span class="token number">1</span>     p      STARTED     <span class="token number">145119</span>  <span class="token number">69</span>.6mb <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_segment<span class="token number">-20231031</span>           <span class="token number">2</span>     p      STARTED     <span class="token number">145341</span>  <span class="token number">69</span>.2mb <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_segment<span class="token number">-20231031</span>           <span class="token number">4</span>     p      STARTED     <span class="token number">145578</span>  <span class="token number">69</span>.6mb <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_segment<span class="token number">-20231031</span>           <span class="token number">0</span>     p      STARTED     <span class="token number">145409</span>  <span class="token number">69</span>.2mb <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_ui_template                <span class="token number">0</span>     r      STARTED         <span class="token number">46</span> <span class="token number">289</span>.8kb <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_ui_template                <span class="token number">0</span>     p      STARTED         <span class="token number">46</span> <span class="token number">289</span>.8kb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_segment<span class="token number">-20231030</span>           <span class="token number">3</span>     p      STARTED     <span class="token number">211043</span>  <span class="token number">89</span>.8mb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_segment<span class="token number">-20231030</span>           <span class="token number">1</span>     p      STARTED     <span class="token number">210257</span>    94mb <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_segment<span class="token number">-20231030</span>           <span class="token number">2</span>     p      STARTED     <span class="token number">210459</span>  <span class="token number">75</span>.3mb <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_segment<span class="token number">-20231030</span>           <span class="token number">4</span>     p      STARTED     <span class="token number">211316</span>    94mb <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_segment<span class="token number">-20231030</span>           <span class="token number">0</span>     p      STARTED     <span class="token number">209587</span>    75mb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_records-all<span class="token number">-20231029</span>       <span class="token number">0</span>     p      STARTED        <span class="token number">825</span> <span class="token number">273</span>.5kb <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_records-all<span class="token number">-20231029</span>       <span class="token number">0</span>     r      STARTED        <span class="token number">825</span> <span class="token number">273</span>.5kb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_metrics-all<span class="token number">-20231027</span>       <span class="token number">0</span>     p      STARTED    <span class="token number">3013999</span> <span class="token number">576</span>.1mb <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_metrics-all<span class="token number">-20231027</span>       <span class="token number">0</span>     r      STARTED    <span class="token number">3013999</span> <span class="token number">576</span>.1mb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_log<span class="token number">-20231030</span>               <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_log<span class="token number">-20231030</span>               <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_log<span class="token number">-20231030</span>               <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_log<span class="token number">-20231030</span>               <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_log<span class="token number">-20231030</span>               <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
demo-index1                   <span class="token number">3</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index1                   <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
demo-index1                   <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
demo-index1                   <span class="token number">1</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index1                   <span class="token number">2</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index1                   <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index1                   <span class="token number">4</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index1                   <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index1                   <span class="token number">0</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index1                   <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_metrics-all<span class="token number">-20231028</span>       <span class="token number">0</span>     r      STARTED    <span class="token number">3000642</span> <span class="token number">606</span>.2mb <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_metrics-all<span class="token number">-20231028</span>       <span class="token number">0</span>     p      STARTED    <span class="token number">3000642</span> <span class="token number">642</span>.2mb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_metrics-all<span class="token number">-20231030</span>       <span class="token number">0</span>     r      STARTED    <span class="token number">2070495</span> <span class="token number">375</span>.7mb <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_metrics-all<span class="token number">-20231030</span>       <span class="token number">0</span>     p      STARTED    <span class="token number">2070495</span> <span class="token number">410</span>.9mb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_browser_error_log<span class="token number">-20231029</span> <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_browser_error_log<span class="token number">-20231029</span> <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_browser_error_log<span class="token number">-20231029</span> <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_browser_error_log<span class="token number">-20231029</span> <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_browser_error_log<span class="token number">-20231029</span> <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_zipkin_span<span class="token number">-20231029</span>       <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_zipkin_span<span class="token number">-20231029</span>       <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_zipkin_span<span class="token number">-20231029</span>       <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_zipkin_span<span class="token number">-20231029</span>       <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_zipkin_span<span class="token number">-20231029</span>       <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
.kibana_1                     <span class="token number">0</span>     r      STARTED         <span class="token number">18</span>  <span class="token number">31</span>.7kb <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
.kibana_1                     <span class="token number">0</span>     p      STARTED         <span class="token number">18</span>  <span class="token number">31</span>.7kb <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_metrics-all<span class="token number">-20231031</span>       <span class="token number">0</span>     r      STARTED    <span class="token number">1193564</span> <span class="token number">378</span>.6mb <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_metrics-all<span class="token number">-20231031</span>       <span class="token number">0</span>     p      STARTED    <span class="token number">1193564</span> <span class="token number">378</span>.5mb <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_records-all<span class="token number">-20231030</span>       <span class="token number">0</span>     p      STARTED        <span class="token number">554</span> <span class="token number">231</span>.5kb <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_records-all<span class="token number">-20231030</span>       <span class="token number">0</span>     r      STARTED        <span class="token number">554</span> <span class="token number">231</span>.5kb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_records-all<span class="token number">-20231031</span>       <span class="token number">0</span>     r      STARTED        <span class="token number">523</span> <span class="token number">237</span>.3kb <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_records-all<span class="token number">-20231031</span>       <span class="token number">0</span>     p      STARTED        <span class="token number">523</span> <span class="token number">253</span>.1kb <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
demo-index                    <span class="token number">3</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index                    <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
demo-index                    <span class="token number">3</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index                    <span class="token number">1</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index                    <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
demo-index                    <span class="token number">1</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index                    <span class="token number">2</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index                    <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
demo-index                    <span class="token number">2</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index                    <span class="token number">4</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index                    <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
demo-index                    <span class="token number">4</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index                    <span class="token number">0</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index                    <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
demo-index                    <span class="token number">0</span>     r      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_segment<span class="token number">-20231029</span>           <span class="token number">3</span>     p      STARTED     <span class="token number">335997</span> <span class="token number">205</span>.9mb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_segment<span class="token number">-20231029</span>           <span class="token number">1</span>     p      STARTED     <span class="token number">336963</span> <span class="token number">206</span>.3mb <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_segment<span class="token number">-20231029</span>           <span class="token number">2</span>     p      STARTED     <span class="token number">336714</span> <span class="token number">206</span>.7mb <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_segment<span class="token number">-20231029</span>           <span class="token number">4</span>     p      STARTED     <span class="token number">337109</span>   207mb <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_segment<span class="token number">-20231029</span>           <span class="token number">0</span>     p      STARTED     <span class="token number">336612</span> <span class="token number">205</span>.9mb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_metrics-all<span class="token number">-20231026</span>       <span class="token number">0</span>     p      STARTED    <span class="token number">1769643</span> <span class="token number">446</span>.1mb <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_metrics-all<span class="token number">-20231026</span>       <span class="token number">0</span>     r      STARTED    <span class="token number">1769643</span> <span class="token number">446</span>.2mb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_browser_error_log<span class="token number">-20231030</span> <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_browser_error_log<span class="token number">-20231030</span> <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_browser_error_log<span class="token number">-20231030</span> <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_browser_error_log<span class="token number">-20231030</span> <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_browser_error_log<span class="token number">-20231030</span> <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_zipkin_span<span class="token number">-20231030</span>       <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_zipkin_span<span class="token number">-20231030</span>       <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_zipkin_span<span class="token number">-20231030</span>       <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_zipkin_span<span class="token number">-20231030</span>       <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_zipkin_span<span class="token number">-20231030</span>       <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
demo-index3                   <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
demo-index3                   <span class="token number">5</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index3                   <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index3                   <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index3                   <span class="token number">4</span>     p      UNASSIGNED
demo-index3                   <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_metrics-all<span class="token number">-20231029</span>       <span class="token number">0</span>     r      STARTED    <span class="token number">3000327</span> <span class="token number">565</span>.2mb <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_metrics-all<span class="token number">-20231029</span>       <span class="token number">0</span>     p      STARTED    <span class="token number">3000327</span> <span class="token number">607</span>.6mb <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index2                   <span class="token number">3</span>     p      UNASSIGNED
demo-index2                   <span class="token number">5</span>     p      UNASSIGNED
demo-index2                   <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index2                   <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
demo-index2                   <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
demo-index2                   <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_zipkin_span<span class="token number">-20231031</span>       <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_zipkin_span<span class="token number">-20231031</span>       <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_zipkin_span<span class="token number">-20231031</span>       <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_zipkin_span<span class="token number">-20231031</span>       <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_zipkin_span<span class="token number">-20231031</span>       <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_log<span class="token number">-20231029</span>               <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_log<span class="token number">-20231029</span>               <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_log<span class="token number">-20231029</span>               <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">74.142</span>  es-data-simple<span class="token number">-3</span>
sw_log<span class="token number">-20231029</span>               <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">77.88</span>   es-data-simple<span class="token number">-1</span>
sw_log<span class="token number">-20231029</span>               <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    283b <span class="token number">10.233</span>.<span class="token number">75.183</span>  es-data-simple<span class="token number">-0</span>
sw_log<span class="token number">-20231031</span>               <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_log<span class="token number">-20231031</span>               <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_log<span class="token number">-20231031</span>               <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_log<span class="token number">-20231031</span>               <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_log<span class="token number">-20231031</span>               <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_browser_error_log<span class="token number">-20231031</span> <span class="token number">3</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_browser_error_log<span class="token number">-20231031</span> <span class="token number">1</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_browser_error_log<span class="token number">-20231031</span> <span class="token number">2</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_browser_error_log<span class="token number">-20231031</span> <span class="token number">4</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
sw_browser_error_log<span class="token number">-20231031</span> <span class="token number">0</span>     p      STARTED          <span class="token number">0</span>    208b <span class="token number">10.233</span>.<span class="token number">112.169</span> es-data-simple<span class="token number">-2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/shards?v&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回结果：索引名称，分片序号，主副分片标志，该分片存储空间，分片存储的文档数，分片所属节点 ip，节点名。</p><h3 id="查询集群健康状态" tabindex="-1"><a class="header-anchor" href="#查询集群健康状态" aria-hidden="true">#</a> 查询集群健康状态</h3><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_cat/health?v

epoch      timestamp cluster    status node.total node.data shards pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
<span class="token number">1698716422</span> <span class="token number">01</span><span class="token operator">:</span><span class="token number">40</span><span class="token operator">:</span><span class="token number">22</span>  es-cluster red             <span class="token number">7</span>         <span class="token number">4</span>    <span class="token number">116</span>  <span class="token number">90</span>    <span class="token number">0</span>    <span class="token number">0</span>        <span class="token number">3</span>             <span class="token number">0</span>                  -                 <span class="token number">97.5</span>%
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/health?v&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回结果：集群名称，集群状态，节点数，数据节点数，分片数，主分片数，激活的分片百分比（active_shards_percent）。</p><h3 id="查询集群所有的别名索引" tabindex="-1"><a class="header-anchor" href="#查询集群所有的别名索引" aria-hidden="true">#</a> 查询集群所有的别名索引</h3><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_cat/aliases?v

alias                index                         filter routing.index routing.search is_write_index
sw_browser_error_log sw_browser_error_log<span class="token number">-20231031</span> -      -             -              -
sw_metrics-all       sw_metrics-all<span class="token number">-20231031</span>       -      -             -              -
sw_log               sw_log<span class="token number">-20231029</span>               -      -             -              -
sw_browser_error_log sw_browser_error_log<span class="token number">-20231029</span> -      -             -              -
sw_segment           sw_segment<span class="token number">-20231030</span>           -      -             -              -
sw_records-all       sw_records-all<span class="token number">-20231030</span>       -      -             -              -
sw_metrics-all       sw_metrics-all<span class="token number">-20231026</span>       -      -             -              -
sw_metrics-all       sw_metrics-all<span class="token number">-20231028</span>       -      -             -              -
.kibana              .kibana_1                     -      -             -              -
sw_zipkin_span       sw_zipkin_span<span class="token number">-20231030</span>       -      -             -              -
sw_segment           sw_segment<span class="token number">-20231029</span>           -      -             -              -
sw_records-all       sw_records-all<span class="token number">-20231029</span>       -      -             -              -
sw_log               sw_log<span class="token number">-20231030</span>               -      -             -              -
sw_zipkin_span       sw_zipkin_span<span class="token number">-20231029</span>       -      -             -              -
sw_log               sw_log<span class="token number">-20231031</span>               -      -             -              -
sw_metrics-all       sw_metrics-all<span class="token number">-20231027</span>       -      -             -              -
sw_zipkin_span       sw_zipkin_span<span class="token number">-20231031</span>       -      -             -              -
sw_metrics-all       sw_metrics-all<span class="token number">-20231029</span>       -      -             -              -
sw_metrics-all       sw_metrics-all<span class="token number">-20231030</span>       -      -             -              -
sw_records-all       sw_records-all<span class="token number">-20231031</span>       -      -             -              -
sw_browser_error_log sw_browser_error_log<span class="token number">-20231030</span> -      -             -              -
sw_segment           sw_segment<span class="token number">-20231031</span>           -      -             -              -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/aliases?v&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查询主节点信息" tabindex="-1"><a class="header-anchor" href="#查询主节点信息" aria-hidden="true">#</a> 查询主节点信息</h3><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_cat/master?v

id                     host          ip            node
suKruSkNR0OoQCcv4SgEOQ <span class="token number">10.233</span>.<span class="token number">75.185</span> <span class="token number">10.233</span>.<span class="token number">75.185</span> es-master<span class="token number">-0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/master?v&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查询文档数量" tabindex="-1"><a class="header-anchor" href="#查询文档数量" aria-hidden="true">#</a> 查询文档数量</h3><p>快速查询当前整个集群或者指定索引的 document 的数量（不包括删除的但是还没有清理掉的 document）。 dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_cat/count?v

#! Deprecation<span class="token operator">:</span> this request accesses system indices<span class="token operator">:</span> <span class="token punctuation">[</span>.kibana_1<span class="token punctuation">]</span><span class="token punctuation">,</span> but in a future major version<span class="token punctuation">,</span> direct access to system indices will be prevented by default
epoch      timestamp count
<span class="token number">1698717037</span> <span class="token number">01</span><span class="token operator">:</span><span class="token number">50</span><span class="token operator">:</span><span class="token number">37</span>  <span class="token number">17580496</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/count?v&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="集群-cluster-api" tabindex="-1"><a class="header-anchor" href="#集群-cluster-api" aria-hidden="true">#</a> 集群（Cluster） API</h2><h3 id="集群健康" tabindex="-1"><a class="header-anchor" href="#集群健康" aria-hidden="true">#</a> 集群健康</h3><p>获取集群的健康状态有两种方式：</p><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_cluster/health/<span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>

路径参数：
  <span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>
	（可选，字符串） 用于限制的数据流、索引和索引别名的逗号分隔列表 请求。支持通配符表达式 （）。*
	要定位集群中的所有数据流和索引，请省略此参数或使用 或 。_all*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_cluster/health

<span class="token punctuation">{</span>
  <span class="token property">&quot;cluster_name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;es-cluster&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 集群名，默认elasticsearch</span>
  <span class="token property">&quot;status&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;red&quot;</span><span class="token punctuation">,</span>               <span class="token comment">// 集群状态</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>  <span class="token comment">// 是否超时</span>
  <span class="token property">&quot;number_of_nodes&quot;</span> <span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token comment">// 节点数量</span>
  <span class="token property">&quot;number_of_data_nodes&quot;</span> <span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token comment">// 数据节点数量</span>
  <span class="token property">&quot;active_primary_shards&quot;</span> <span class="token operator">:</span> <span class="token number">90</span><span class="token punctuation">,</span> <span class="token comment">// 活动主分片的数量</span>
  <span class="token property">&quot;active_shards&quot;</span> <span class="token operator">:</span> <span class="token number">116</span><span class="token punctuation">,</span> <span class="token comment">// 活动主分片和副本分片的总数</span>
  <span class="token property">&quot;relocating_shards&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 正在重新定位的分片数</span>
  <span class="token property">&quot;initializing_shards&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 正在初始化的分片数</span>
  <span class="token property">&quot;unassigned_shards&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>  <span class="token comment">// 未分配的分片数</span>
  <span class="token property">&quot;delayed_unassigned_shards&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token comment">// 分配延迟的分片数量 超时设置</span>
  <span class="token property">&quot;number_of_pending_tasks&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 尚未更改的群集级别更改数 执行</span>
  <span class="token property">&quot;number_of_in_flight_fetch&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 未完成的读取数</span>
  <span class="token property">&quot;task_max_waiting_in_queue_millis&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 自最早启动任务以来以毫秒为单位表示的时间 正在等待执行</span>
  <span class="token property">&quot;active_shards_percent_as_number&quot;</span> <span class="token operator">:</span> <span class="token number">97.47899159663865</span> <span class="token comment">// 集群中活动分片的比率，以百分比表示</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cluster/health&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="集群状态" tabindex="-1"><a class="header-anchor" href="#集群状态" aria-hidden="true">#</a> 集群状态</h3><p>返回用于调试或诊断问题的集群内部状态的信息。</p><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_cluster/state/<span class="token operator">&lt;</span>metrics<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>

路径参数：
  <span class="token operator">&lt;</span>metrics<span class="token operator">&gt;</span>
	（可选，字符串）以下选项的逗号分隔列表：

	_all
		显示所有指标。
	blocks
		显示响应的一部分。blocks
	master_node
		显示响应的一部分。master_node
	metadata
		显示响应的一部分。如果提供逗号分隔 索引列表，返回的输出将仅包含这些索引的元数据 指标。metadata
	nodes
		显示响应的一部分。nodes
	routing_nodes
		显示响应的一部分。routing_nodes
	routing_table
		显示响应的一部分。如果您提供逗号 分离的索引列表，返回的输出将仅包含 这些索引的路由表。routing_table
	version
		显示群集状态版本。
  <span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>
	（可选，字符串）数据流、索引和别名的逗号分隔列表 用于限制请求。支持通配符 （）。以所有数据流为目标 和索引，省略此参数或使用或 .**_all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /_cluster/state
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;cluster_name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;es-cluster&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 集群名</span>
  <span class="token property">&quot;cluster_uuid&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;OeBtrse_SceonjeeG0jdvQ&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 集群ID</span>
  <span class="token property">&quot;version&quot;</span> <span class="token operator">:</span> <span class="token number">834</span><span class="token punctuation">,</span> <span class="token comment">// state命令版本</span>
  <span class="token property">&quot;state_uuid&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;9Zvo5zEcQ8iysDfoI9utDQ&quot;</span><span class="token punctuation">,</span> <span class="token comment">// state ID</span>
  <span class="token property">&quot;master_node&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;suKruSkNR0OoQCcv4SgEOQ&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 主节点ID</span>
  <span class="token property">&quot;blocks&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 系统限制信息，响应的blocks部分</span>
  <span class="token property">&quot;nodes&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 节点信息</span>
  <span class="token property">&quot;metadata&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 元数据信息，响应的metadata部分。如果提供了路径参数index，则只返回指定索引的metadata信息</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET /_cluster/state/nodes
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;cluster_name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;es-cluster&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 集群名</span>
  <span class="token property">&quot;cluster_uuid&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;OeBtrse_SceonjeeG0jdvQ&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 集群ID</span>
  <span class="token property">&quot;nodes&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 节点信息</span>
    <span class="token property">&quot;t0XLPQ3mRCyXcNR5dpf2SQ&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 节点ID</span>
      <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;es-data-simple-1&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 节点名</span>
      <span class="token property">&quot;ephemeral_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;7V5xIKxWS9mX9DVvW69uRQ&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 临时ID</span>
      <span class="token property">&quot;transport_address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;10.233.77.88:9300&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 节点之间的通讯地址</span>
      <span class="token property">&quot;attributes&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 属性</span>
        <span class="token property">&quot;group&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;simple&quot;</span> <span class="token comment">// 分组</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cluster/state&quot;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cluster/state/nodes&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="节点信息" tabindex="-1"><a class="header-anchor" href="#节点信息" aria-hidden="true">#</a> 节点信息</h3><p>返回集群节点信息。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_nodes
GET /_nodes/<span class="token operator">&lt;</span>node_id<span class="token operator">&gt;</span>
GET /_nodes/<span class="token operator">&lt;</span>metric<span class="token operator">&gt;</span>
GET /_nodes/<span class="token operator">&lt;</span>node_id<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>metric<span class="token operator">&gt;</span>

路径参数：
  <span class="token operator">&lt;</span>metric<span class="token operator">&gt;</span>
	（可选，字符串） 将返回的信息限制为特定指标。支持 逗号分隔的列表，例如 。http,ingest

的有效值<span class="token operator">&lt;</span>metric<span class="token operator">&gt;</span>
	aggregations
		有关可用聚合类型的信息。
	http
		有关此节点的 HTTP 接口的信息。
	indices
		与索引相关的节点级配置：
			total_indexing_buffer：此节点上索引缓冲区的最大大小。
	ingest
		有关引入管道和处理器的信息。
	jvm
		JVM 信息，包括其名称、版本和配置。
	os
		操作系统信息，包括其名称和版本。
	plugins
		有关每个节点安装的插件和模块的详细信息。以下 每个插件和模块都有可用的信息：
			name：插件名称
			version：插件构建的 Elasticsearch 版本
			description：插件用途的简短描述
			classname：插件入口点的完全限定类名
			has_native_controller：插件是否具有本机控制器 过程
	process
		进程信息，包括数字进程 ID。
	settings
		列出文件中定义的所有正在使用的节点设置。elasticsearch.yml
	thread_pool
		有关每个线程池的配置的信息。
	transport
		有关节点的传输接口的信息。
		如果您使用此 API 的完整形式，那么您 还可以请求指标以检索所有指标，或者您可以请求 用于抑制所有指标并仅检索 节点。GET /_nodes/<span class="token operator">&lt;</span>node_id<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>metric<span class="token operator">&gt;</span>_all_none

  <span class="token operator">&lt;</span>node_id<span class="token operator">&gt;</span>
	（可选，字符串）以逗号分隔的节点 ID 或名称列表，用于限制 返回的信息。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /_nodes
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;_nodes&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 节点数量信息</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token comment">// 节点数量</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token comment">// 正常节点数量</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span> <span class="token comment">// 错误节点数量</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;cluster_name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;es-cluster&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 集群名</span>
  <span class="token property">&quot;nodes&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 节点信息</span>
    <span class="token property">&quot;suKruSkNR0OoQCcv4SgEOQ&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;es-master-0&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;transport_address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;10.233.75.185:9300&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;host&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;10.233.75.185&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;ip&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;10.233.75.185&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;version&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;7.10.2&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;build_flavor&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;oss&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;build_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;docker&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;build_hash&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;747e1cc71def077253878a59143c1f785afa92b9&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;total_indexing_buffer&quot;</span> <span class="token operator">:</span> <span class="token number">50331648</span><span class="token punctuation">,</span>
      <span class="token property">&quot;roles&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>                       <span class="token comment">//      节点角色，没有设置默认所有角色</span>
        <span class="token string">&quot;ingest&quot;</span><span class="token punctuation">,</span>                       <span class="token comment">//      预处理节点</span>
        <span class="token string">&quot;master&quot;</span><span class="token punctuation">,</span>                       <span class="token comment">//      主节点</span>
        <span class="token string">&quot;remote_cluster_client&quot;</span>         <span class="token comment">//      跨集群客户端节点</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;settings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>					<span class="token comment">//  	节点设置</span>
      <span class="token property">&quot;os&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>						    <span class="token comment">//  	操作系统信息</span>
      <span class="token property">&quot;process&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>					<span class="token comment">//  	进程信息</span>
      <span class="token property">&quot;jvm&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>						<span class="token comment">//  	JVM 信息</span>
      <span class="token property">&quot;thread_pool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>				<span class="token comment">//  	线程池配置信息</span>
      <span class="token property">&quot;transport&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>				    <span class="token comment">//  	节点传输接口信息</span>
      <span class="token property">&quot;http&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>					    <span class="token comment">//  	节点 HTTP 接口信息</span>
      <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>					<span class="token comment">//  	节点安装的插件和模块的详细信息</span>
      <span class="token property">&quot;modules&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>					<span class="token comment">//      节点的模块信息</span>
      <span class="token property">&quot;ingest&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>					    <span class="token comment">//  	有关引入管道和处理器的信息</span>
      <span class="token property">&quot;aggregations&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>				<span class="token comment">//  	有关可用聚合类型的信息</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_nodes&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="索引-index-api" tabindex="-1"><a class="header-anchor" href="#索引-index-api" aria-hidden="true">#</a> 索引（Index） API</h2><h3 id="索引是否存在" tabindex="-1"><a class="header-anchor" href="#索引是否存在" aria-hidden="true">#</a> 索引是否存在</h3><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>HEAD <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
HEAD test

<span class="token comment">//存在返回：</span>
<span class="token number">200</span> - OK

<span class="token comment">//不存在返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;statusCode&quot;</span><span class="token operator">:</span> <span class="token number">404</span><span class="token punctuation">,</span>
  <span class="token property">&quot;error&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Not Found&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;404 - Not Found&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XHEAD</span> <span class="token string">&quot;http://es-http.infra:9200/test&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引" aria-hidden="true">#</a> 创建索引</h3><p>没有索引前，第一次创建文档的时候也会创建索引。</p><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>
<span class="token punctuation">{</span>
  <span class="token string">&quot;aliases&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,	<span class="token comment"># 别名</span>
  <span class="token string">&quot;mappings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,	<span class="token comment"># 映射</span>
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>,	<span class="token comment"># 配置</span>
<span class="token punctuation">}</span>

路径参数：
  <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>
	（必需，字符串）要创建的索引的名称。

请求体：
  <span class="token operator">&lt;</span>aliases<span class="token operator">&gt;</span>
	（可选，对象的对象）索引的别名。
  <span class="token operator">&lt;</span>mappings<span class="token operator">&gt;</span>
	（可选，映射对象）索引中字段的映射。如果 指定时，此映射可以包括：
		字段名称
		字段数据类型
		映射参数
  <span class="token operator">&lt;</span>settings<span class="token operator">&gt;</span>
    （可选，索引设置对象）配置 索引的选项。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,85),k={class:"hint-container tip"},m=s("p",{class:"hint-container-title"},"提示",-1),v={href:"https://www.elastic.co/guide/en/elasticsearch/reference/7.10/mapping.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.elastic.co/guide/en/elasticsearch/reference/7.10/index-modules.html#index-modules-settings",target:"_blank",rel:"noopener noreferrer"},q=p(`<p>索引名称必须满足以下条件：</p><ul><li>仅小写</li><li>不能包含 \\， /，*，?， &quot;，&lt;，&gt;，|， (空格)，,，#</li><li>7.0 之前的索引可能包含 : ，但该冒号已弃用，在 7.0+ 中不受支持</li><li>不能以 _ ，-，+ 开头</li><li>不能是 . 或 ..</li><li>不能超过 255 字节（请注意它是字节，因此多字节字符将更快地计入 255 限制）</li><li>以 . 开头的名称已被弃用，隐藏索引和插件管理的内部索引除外.</li></ul><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
PUT test
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;acknowledged&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;shards_acknowledged&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET test
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;test&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;aliases&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;settings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;creation_date&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1698719350111&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;number_of_shards&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;number_of_replicas&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;uuid&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;R1ZIwc64QVyIMekFiJILrw&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;version&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;created&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;7100299&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;provided_name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XPUT</span> <span class="token string">&quot;http://es-http.infra:9200/test&quot;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建索引时有三个重要的参数：aliases，mappings，settings。</p><p><strong>aliases</strong></p><p>ES 的 aliases（别名） 就类似数据库的视图，我们为索引 test 创建一个别名 test_alias，这样我们对 test_alias 的操作就像对 test 的操作一样。</p><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
POST _aliases
<span class="token punctuation">{</span>
  <span class="token property">&quot;actions&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;add&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;alias&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test_alias&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;acknowledged&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET _cat/aliases
<span class="token comment">//返回：</span>
test_alias           test                          - - - -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> <span class="token string">&quot;http://es-http.infra:9200/_aliases&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> -d<span class="token string">&#39;{  &quot;actions&quot;: [    {      &quot;add&quot;: {        &quot;index&quot;: &quot;test&quot;,        &quot;alias&quot;: &quot;test_alias&quot;      }    }  ]}&#39;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/aliases&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>别名不仅仅可以关联一个索引，它能聚合多个索引。也对于同一个 index，给不同人看到不同的数据，假设 test 有个字段是 team，team 字段记录了该数据是哪个人添加的，设置别名可以使不同人之间的 team 数据是不可见的。</p>`,14),g={href:"https://blog.csdn.net/qq330983778/article/details/102980861",target:"_blank",rel:"noopener noreferrer"},y=p(`<p><strong>mappings</strong></p><p>ES 的 mappings（映射） 相当于数据库中的表结构，对表的字段类型长度索引做设置，而在 ES 中 映射是定义一个文档和它所包含的字段如何被存储和索引的过程，分为 自动映射（Dynamic mapping） 和 显式映射（Explicit mapping）。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>动态映射：</p><ul><li>动态映射允许您试验 并在刚开始时探索数据。Elasticsearch 添加了新字段 自动，只需为文档编制索引即可。您可以将字段添加到顶级 映射，以及内部对象和嵌套字段。</li><li>使用动态模板定义自定义映射，这些映射是 应用于基于匹配条件动态添加的字段。</li></ul><p>显式映射：</p><ul><li><p>显式映射允许您精确选择如何 定义映射定义，例如：</p><ul><li>哪些字符串字段应被视为全文字段。</li><li>哪些字段包含数字、日期或地理位置。</li><li>日期值的格式。</li><li>用于控制动态添加字段映射的自定义规则。</li></ul></li><li><p>使用运行时字段进行架构更改，而无需 重新索引。可以将运行时字段与索引字段结合使用，以 平衡资源使用情况和性能。您的索引会更小，但 搜索性能较慢。</p></li></ul></div><p>在 ElasticSearch 中一旦创建了映射是不被允许进行修改的，因为对于数据存储、分析、检索,都是按照 mapping 中的配置进行的,如果前期 根据 mapping 存储好了之后，又对 mapping 进行更改，那么就会导致前面存储的数据和后面的检索策略后面的存储 数据不一致的情况，导致检索行为不准确。 只能在创建 index 的时候手动配置 mapping，或者新增 fieId mapping。</p><p>给索引 test 设置映射，id:long，name:keyword。</p><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
POST test/_doc/_mapping?include_type_name=<span class="token boolean">true</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;long&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span><span class="token string">&quot;keyword&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
#! Deprecation<span class="token operator">:</span> <span class="token punctuation">[</span>types removal<span class="token punctuation">]</span> Using include_type_name in put mapping requests is deprecated. The parameter will be removed in the next major version.
<span class="token punctuation">{</span>
  <span class="token property">&quot;acknowledged&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET test/_mapping
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;test&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;long&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> <span class="token string">&quot;http://es-http.infra:9200/test/_doc/_mapping?include_type_name=true&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> -d<span class="token string">&#39;{  &quot;properties&quot;:{    &quot;id&quot;:{      &quot;type&quot;:&quot;long&quot;    },    &quot;name&quot;:{      &quot;type&quot;:&quot;keyword&quot;    }  }}&#39;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_mapping&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>settings</strong></p><p>索引的配置项可以分为 静态配置 与 动态配置，所谓的静态配置即索引创建后不能修改。</p><ul><li>index.number_of_shards：索引分片的数量。在 ES 层面可以通过 es.index.max_number_of_shards 属性设置索引最大的分片数，默认为 1024，index.number_of_shards 的默认值为 Math.min(es.index.max_number_of_shards,5)，故通常默认值为 5。</li><li>index.shard.check_on_startup：分片在打开之前是否应该检查该分片是否损坏。当检测到损坏时，它将阻止分片被打开。可选值：false：不检测；checksum：只检查物理结构；true：检查物理和逻辑损坏，相对比较耗 CPU；fix：类同与 false，7.0 版本后将废弃。默认值：false。</li><li>index.codec：数据存储的压缩算法，默认值为 LZ4，可选择值 best_compression ，比 LZ4 可以获得更好的压缩比(即占据较小的磁盘空间，但存储性能比 LZ4 低)。</li><li>index.routing_partition_size：路由分区数，如果设置了该参数，其路由算法为：(hash(_routing) + hash(_id) % - index.routing_parttion_size ) % number_of_shards。如果该值不设置，则路由算法为 hash(_routing) % number_of_shardings，_routing 默认值为_id。</li></ul>`,12),_={href:"https://cloud.tencent.com/developer/article/1443568",target:"_blank",rel:"noopener noreferrer"},h=p(`<p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test/_settings
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;test&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;settings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;creation_date&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1698719350111&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;number_of_shards&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;number_of_replicas&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;uuid&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;R1ZIwc64QVyIMekFiJILrw&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;version&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;created&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;7100299&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;provided_name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_settings&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看索引" tabindex="-1"><a class="header-anchor" href="#查看索引" aria-hidden="true">#</a> 查看索引</h3><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /<span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>			<span class="token comment"># 查看指定索引信息</span>
GET _cat/indices		<span class="token comment"># 查看所有索引</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;test&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;aliases&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;test_alias&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;long&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;settings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;index&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;creation_date&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1698719350111&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;number_of_shards&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;number_of_replicas&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;uuid&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;R1ZIwc64QVyIMekFiJILrw&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;version&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;created&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;7100299&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;provided_name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET _cat/indices?v
<span class="token comment">//返回：</span>
health status index                         uuid                   pri rep docs.count docs.deleted store.size pri.store.size
green  open   demo-index                    _Cr0_eLDSN-_8naHNSZ_MA   <span class="token number">5</span>   <span class="token number">2</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">4</span>.1kb          <span class="token number">1</span>.3kb
green  open   sw_log<span class="token number">-20231030</span>               YPd9l9Z7R2y-jJcKRBkxgQ   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
green  open   sw_zipkin_span<span class="token number">-20231031</span>       SSwiZLJ1S0mGwL2N9s18Ug   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>        1kb            1kb
green  open   sw_zipkin_span<span class="token number">-20231030</span>       rD4W-MsiSH2T6hM5DzjTBA   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
green  open   sw_metrics-all<span class="token number">-20231026</span>       gGHhLA0sS_2FWRHPRCXGtQ   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">1769643</span>       <span class="token number">115198</span>    <span class="token number">899</span>.8mb        <span class="token number">449</span>.8mb
green  open   sw_metrics-all<span class="token number">-20231027</span>       0pg83gZeSSasOcunuHW1Sw   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">3013999</span>       <span class="token number">458792</span>      <span class="token number">1</span>.1gb        <span class="token number">576</span>.3mb
green  open   sw_metrics-all<span class="token number">-20231028</span>       ughbEWDsT6CAE9doFjdKuA   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">3000642</span>      <span class="token number">1328161</span>      <span class="token number">1</span>.2gb        <span class="token number">642</span>.2mb
green  open   sw_metrics-all<span class="token number">-20231029</span>       bQHa8hK4RquJhKfqDEsvIQ   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">3000327</span>      <span class="token number">1016008</span>      <span class="token number">1</span>.1gb        <span class="token number">607</span>.6mb
green  open   sw_ui_template                TcWeSgCWSDuKQheyRxMn4w   <span class="token number">1</span>   <span class="token number">1</span>         <span class="token number">46</span>            <span class="token number">0</span>    <span class="token number">579</span>.7kb        <span class="token number">289</span>.8kb
green  open   sw_browser_error_log<span class="token number">-20231029</span> MhGb1KEbQIO6Om9zJArFHQ   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
green  open   sw_segment<span class="token number">-20231030</span>           o2B_RMrsSHinoEwTHEvVPg   <span class="token number">5</span>   <span class="token number">0</span>    <span class="token number">1052662</span>            <span class="token number">0</span>    <span class="token number">428</span>.3mb        <span class="token number">428</span>.3mb
green  open   sw_segment<span class="token number">-20231031</span>           fBvb30DkR3OeETziG3pDHQ   <span class="token number">5</span>   <span class="token number">0</span>     <span class="token number">836278</span>            <span class="token number">0</span>    <span class="token number">390</span>.3mb        <span class="token number">390</span>.3mb
green  open   sw_records-all<span class="token number">-20231030</span>       3dTEON3XTTuW-wxc7C2Bng   <span class="token number">1</span>   <span class="token number">1</span>        <span class="token number">554</span>            <span class="token number">0</span>    <span class="token number">463</span>.1kb        <span class="token number">231</span>.5kb
green  open   sw_records-all<span class="token number">-20231031</span>       72ZLdeDaRZW4RRZ3TkLBEQ   <span class="token number">1</span>   <span class="token number">1</span>        <span class="token number">597</span>            <span class="token number">0</span>    <span class="token number">540</span>.1kb        <span class="token number">277</span>.4kb
green  open   sw_log<span class="token number">-20231029</span>               yh8XDu3sTryzX-DVrZ8HXg   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
green  open   test                          R1ZIwc64QVyIMekFiJILrw   <span class="token number">1</span>   <span class="token number">1</span>          <span class="token number">0</span>            <span class="token number">0</span>       416b           208b
green  open   sw_records-all<span class="token number">-20231029</span>       TUbO6DDUSsixnbweaYMvZQ   <span class="token number">1</span>   <span class="token number">1</span>        <span class="token number">825</span>            <span class="token number">0</span>      547kb        <span class="token number">273</span>.5kb
green  open   sw_browser_error_log<span class="token number">-20231030</span> YnEmFfjUQIi-2GZ4foIICQ   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
green  open   sw_browser_error_log<span class="token number">-20231031</span> e1rLWA6MSNif52tdBMZ1FQ   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>        1kb            1kb
green  open   .kibana_1                     _6BpVrmVRMCUfTkpzbZbUg   <span class="token number">1</span>   <span class="token number">1</span>         <span class="token number">38</span>            <span class="token number">2</span>     <span class="token number">97</span>.8kb         <span class="token number">47</span>.1kb
green  open   sw_zipkin_span<span class="token number">-20231029</span>       xyYmXViwTX6UOHpnPjQp8A   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
green  open   sw_segment<span class="token number">-20231029</span>           sQ7GO2mOTN-2PlarKVbrXA   <span class="token number">5</span>   <span class="token number">0</span>    <span class="token number">1683395</span>            <span class="token number">0</span>        1gb            1gb
green  open   sw_metrics-all<span class="token number">-20231030</span>       73gCoQZ_RZWZSpOzCbIJew   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">2070495</span>       <span class="token number">253967</span>    <span class="token number">786</span>.8mb        <span class="token number">410</span>.9mb
green  open   sw_metrics-all<span class="token number">-20231031</span>       pN3egAP0RISrpLElEBV2lA   <span class="token number">1</span>   <span class="token number">1</span>    <span class="token number">1415566</span>       <span class="token number">361787</span>    <span class="token number">845</span>.9mb        <span class="token number">422</span>.1mb
green  open   sw_log<span class="token number">-20231031</span>               MIzCYUWMQEiKQn6QU2lLmA   <span class="token number">5</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>        1kb            1kb
red    open   demo-index3                   LvEXHv26R_KN2GZzoeycQA   <span class="token number">6</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.3kb          <span class="token number">1</span>.3kb
red    open   demo-index2                   sBhlncuUR8G3WhHdbU71TA   <span class="token number">6</span>   <span class="token number">0</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">1</span>.1kb          <span class="token number">1</span>.1kb
green  open   demo-index1                   AKSwbUMjSgWhFnIsS7Y-mw   <span class="token number">5</span>   <span class="token number">1</span>          <span class="token number">0</span>            <span class="token number">0</span>      <span class="token number">2</span>.7kb          <span class="token number">1</span>.3kb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test&quot;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/indices?v&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除索引" tabindex="-1"><a class="header-anchor" href="#删除索引" aria-hidden="true">#</a> 删除索引</h3><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
DELETE test
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;acknowledged&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span> <span class="token string">&quot;http://es-http.infra:9200/test&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="文档-document-api" tabindex="-1"><a class="header-anchor" href="#文档-document-api" aria-hidden="true">#</a> 文档（Document） API</h2><h3 id="文档是否存在" tabindex="-1"><a class="header-anchor" href="#文档是否存在" aria-hidden="true">#</a> 文档是否存在</h3><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>HEAD <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>/_doc/<span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>
HEAD <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>/_source/<span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>

路径参数：
  <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>
	（必需，字符串）包含文档的索引的名称。
  <span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>
	（必需，字符串）文档的唯一标识符。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
HEAD test/_doc/<span class="token number">1</span>

<span class="token comment">//存在返回：</span>
<span class="token number">200</span> - OK

<span class="token comment">//不存在返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;statusCode&quot;</span><span class="token operator">:</span> <span class="token number">404</span><span class="token punctuation">,</span>
  <span class="token property">&quot;error&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Not Found&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;404 - Not Found&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XHEAD</span> <span class="token string">&quot;http://es-http.infra:9200/test/_doc/1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="索引文档" tabindex="-1"><a class="header-anchor" href="#索引文档" aria-hidden="true">#</a> 索引文档</h3><p>索引文档就是创建文档，这里的索引表示创建文档这个动作。</p><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /<span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>/_doc/<span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>
POST /<span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>/_doc/<span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>
PUT /<span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>/_create/<span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>
POST /<span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>/_create/<span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>

路径参数：
  <span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>
	（必需，字符串）目标数据流或索引的名称。

  <span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>
	（可选，字符串）文档的唯一标识符。省略此参数会自动生成文档 ID。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dev tools 方式执行，如果没有还没有创建索引 test，那么在第一次创建文档的时候会自动创建 test。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
POST test/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;avatar&quot;</span><span class="token operator">:</span><span class="token string">&quot;https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">20</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 文档所在索引</span>
  <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 文档ID，这是ES 的文档ID 和 源数据中的id关联需要业务维护</span>
  <span class="token property">&quot;_version&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 版本</span>
  <span class="token property">&quot;result&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;created&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 执行结果 - 成功</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 分片</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 分片总数 - 一主一副</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 正常运行的分片数量，因为是单机，主副分片在一起，只会使用主分片</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span> <span class="token comment">// 失败数量，副分片没用到并不是运行失败，主副分片本就是为了数据冗余而存在的，单机的话副分片就用不到了，宕机一起死</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_seq_no&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// _seq_no是严格递增的顺序号，每个文档一个，Shard级别严格递增，保证后写入的Doc的_seq_no大于先写入的Doc的_seq_no。任何类型的写操作，包括index、create、update和Delete，都会生成一个_seq_no。</span>
  <span class="token property">&quot;_primary_term&quot;</span> <span class="token operator">:</span> <span class="token number">1</span> <span class="token comment">// _primary_term主要是用来恢复数据时处理当多个文档的_seq_no一样时的冲突，比如当一个shard宕机了，raplica需要用到最新的数据，就会根据_primary_term和_seq_no这两个值来拿到最新的document</span>
<span class="token punctuation">}</span>

<span class="token comment">//测试：</span>
POST test/_doc
<span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;avatar&quot;</span><span class="token operator">:</span><span class="token string">&quot;https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">22</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;b2G7g4sBv86TIBhXY44l&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 自动生成的文档ID</span>
  <span class="token property">&quot;_version&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;result&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;created&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_seq_no&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_primary_term&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> <span class="token string">&quot;http://es-http.infra:9200/test/_doc/1&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> -d<span class="token string">&#39;{    &quot;id&quot;:&quot;1&quot;,    &quot;name&quot;:&quot;张三&quot;,    &quot;avatar&quot;:&quot;https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0&quot;,    &quot;age&quot;:20}&#39;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> <span class="token string">&quot;http://es-http.infra:9200/test/_doc&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> -d<span class="token string">&#39;{    &quot;id&quot;:&quot;2&quot;,    &quot;name&quot;:&quot;李四&quot;,    &quot;avatar&quot;:&quot;https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0&quot;,    &quot;age&quot;:22}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取文档" tabindex="-1"><a class="header-anchor" href="#获取文档" aria-hidden="true">#</a> 获取文档</h3><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 获取索引下所有文档</span>
GET /<span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>/_search

<span class="token comment"># 获取指定文档</span>
GET <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>/_doc/<span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>
GET <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>/_source/<span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>

路径参数：
  <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>
	（必需，字符串）包含文档的索引的名称。
  <span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>
	（必需，字符串）文档的唯一标识符。
  stored_fields
	（可选，布尔值）如果 ，则检索存储在 索引而不是文档。默认值为false 。
  _source
	（可选，字符串）真或假返回字段与否，或 要返回的字段列表。
  version
	（可选，整数）用于并发控制的显式版本号。 指定的版本必须与文档的当前版本匹配 请求成功。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,37),T={class:"hint-container tip"},f=s("p",{class:"hint-container-title"},"提示",-1),x={href:"https://www.elastic.co/guide/en/elasticsearch/reference/7.10/docs-get.html#docs-get-api-prereqs",target:"_blank",rel:"noopener noreferrer"},E=p(`<p><strong>元数据</strong></p><p>这里关于获取文档返回信息中的参数叫做 元数据：</p><ul><li>_index：文档所属索引的名称。</li><li>_id：文档的唯一标识符。</li><li>_version：文档版本。每次更新文档时递增。</li><li>_seq_no：分配给文档以编制索引的序列号 操作。序列号用于确保文档的较旧版本 不会覆盖较新的版本。请参阅 乐观并发控制。</li><li>_primary_term：为索引操作分配给文档的主要术语。 请参阅 乐观并发控制。</li><li>found：指示文档是否存在：true 或 false。</li><li>_source：如果 found 是 true，则包含以 JSON 格式设置的文档数据。如果 _source 参数设置为 false 或 stored_fields 参数设置为 true，则排除。</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>元数据和源数据不要搞混了，源数据是元数据 _source 下的内容，就是我们存到 ES 中的信息。</p></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET test/_doc/<span class="token number">1</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_version&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_seq_no&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_primary_term&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;found&quot;</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;avatar&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">20</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET test/_source/<span class="token number">1</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;avatar&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">20</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET /test/_search
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">8</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;avatar&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">20</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;b2G7g4sBv86TIBhXY44l&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;avatar&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">22</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_doc/1&quot;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_source/1&quot;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_search&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改文档" tabindex="-1"><a class="header-anchor" href="#修改文档" aria-hidden="true">#</a> 修改文档</h3><p>官方提供 Update API 实际上是局部更新，能够编写文档更新脚本。要完全替换现有文档，则使用 索引文档 API。</p><p><strong>局部更新</strong></p><p>更新 API 支持传递合并到现有文档中的部分文档。</p><p>更新 API 还能够编写文档更新脚本，脚本可以更新、删除或跳过修改文档。</p><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /<span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>/_update/<span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>

路径参数：
  <span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>
	（必需，字符串）包含文档的索引的名称。
  <span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>
	（必需，字符串）文档的唯一标识符。

请求体：
  doc：修改信息。
  script：脚本内容。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>修改源数据：
<span class="token comment">//请求：</span>
POST /test/_update/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;doc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;张三222&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">30</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_version&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;result&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;updated&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_seq_no&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_primary_term&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET test/_source/<span class="token number">1</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三222&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;avatar&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">30</span>
<span class="token punctuation">}</span>

<span class="token comment">//执行脚本测试（年龄加10）：</span>
<span class="token comment">//请求：</span>
POST test/_update/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;script&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;source&quot;</span><span class="token operator">:</span> <span class="token string">&quot;ctx._source.age+= params.add&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;lang&quot;</span><span class="token operator">:</span> <span class="token string">&quot;painless&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;params&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;add&quot;</span> <span class="token operator">:</span> <span class="token number">10</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_version&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">&quot;result&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;updated&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_seq_no&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_primary_term&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET test/_source/<span class="token number">1</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三222&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;avatar&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;https://profile-avatar.csdnimg.cn/21f4a00156854dcab8a86032bf5b9068_weixin_43844718.jpg!0&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">40</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> <span class="token string">&quot;http://es-http.infra:9200/test/_update/1&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> -d<span class="token string">&#39;{  &quot;doc&quot;: {    &quot;name&quot;:&quot;张三222&quot;,    &quot;age&quot;:30  }}&#39;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_source/1&quot;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> <span class="token string">&quot;http://es-http.infra:9200/test/_update/1&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> -d<span class="token string">&#39;{  &quot;script&quot; : {    &quot;source&quot;: &quot;ctx._source.age+= params.add&quot;,    &quot;lang&quot;: &quot;painless&quot;,    &quot;params&quot; : {      &quot;add&quot; : 10    }  }}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>全量更新</strong></p><p>和新增文档一样，如果请求体变化，会将原有的数据内容覆盖。</p><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
POST test/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;李四&quot;</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回:</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_version&quot;</span> <span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  <span class="token property">&quot;result&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;updated&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_seq_no&quot;</span> <span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_primary_term&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> <span class="token string">&quot;http://es-http.infra:9200/test/_doc/1&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> -d<span class="token string">&#39;{  &quot;name&quot;:&quot;李四&quot;}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="删除文档" tabindex="-1"><a class="header-anchor" href="#删除文档" aria-hidden="true">#</a> 删除文档</h3><p>语法：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE /<span class="token operator">&lt;</span>index<span class="token operator">&gt;</span>/_doc/<span class="token operator">&lt;</span>_id<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
DELETE test/_doc/<span class="token number">1</span>
<span class="token comment">//返回:</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_version&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token property">&quot;result&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;deleted&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_seq_no&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_primary_term&quot;</span> <span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET test/_doc/<span class="token number">1</span>
<span class="token comment">//返回:</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;found&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XDELETE</span> <span class="token string">&quot;http://es-http.infra:9200/test/_doc/1&quot;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_doc/1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="搜索-search-api" tabindex="-1"><a class="header-anchor" href="#搜索-search-api" aria-hidden="true">#</a> 搜索（Search） API</h2><p>Search API 执行搜索查询并返回与查询匹配的搜索命中。可以使用 查询字符串参数 或 请求体 提供搜索查询。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /<span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>/_search
GET /_search
POST /<span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>/_search
POST /_search

路径参数：
  <span class="token operator">&lt;</span>target<span class="token operator">&gt;</span>
	（可选，字符串）以逗号分隔的数据流、索引和别名列表 搜索。支持通配符 （）。省略则搜索所有数据流和索引。
  q:
    （可选，字符串）使用Lucene查询字符串语法进行查询。您可以使用q参数来运行查询参数搜索。查询参数搜索不支持完整的Elasticsearch查询DSL，但便于测试。
  from:
	（可选，整数）起始文档偏移量。需要为非负，默认值为0。默认情况下，使用from和size参数，页面浏览次数不能超过10000次。要浏览更多点击，请使用search_after参数。
  size:
	（可选，整数）定义要返回的命中数。默认值为 <span class="token number">10</span>。默认情况下，使用from和size参数，页面浏览次数不能超过10000次。要浏览更多点击，请使用search_after参数。
  sort:
	（可选，字符串）以逗号分隔的＜field＞：＜direction＞对列表。
  _source:
	（可选） （可选）指示为匹配的文档返回哪些源字段。这些字段在命中时返回_搜索响应的源属性。默认为true。请参见源过滤。
		true:（布尔值）返回整个文档源。
		false:（布尔值）不返回文档源。
		<span class="token operator">&lt;</span>string<span class="token operator">&gt;</span>:（string）要返回的源字段的逗号分隔列表。支持通配符（*）模式。
  timeout:
	（可选，时间单位）指定等待每个碎片响应的时间段。如果在超时到期之前没有收到响应，则请求失败并返回错误。默认为无超时。
  version:
	（可选，布尔值）如果为true，则返回文档版本作为命中的一部分。默认为false。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35),w={class:"hint-container tip"},S=s("p",{class:"hint-container-title"},"提示",-1),j={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/search-search.html",target:"_blank",rel:"noopener noreferrer"},D=p(`<p>准备数据：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST test/_doc
<span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">25</span>
<span class="token punctuation">}</span>

POST test/_doc
<span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;上海市浦东新区锦绣路1001号世纪公园&quot;</span>
<span class="token punctuation">}</span>

POST test/_doc
<span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江苏省南通市崇川区兴通路98-99号南通国际会展中心&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="query-参数查询-与-请求体查询" tabindex="-1"><a class="header-anchor" href="#query-参数查询-与-请求体查询" aria-hidden="true">#</a> Query 参数查询 与 请求体查询</h3><p><strong>Query 参数查询 测试：</strong></p><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET test/_search?q=name<span class="token operator">:</span>张三
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.9616582</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.9616582</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">25</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">//请求：</span>
GET test/_search?q=name<span class="token operator">:</span>张三&amp;from=<span class="token number">0</span>&amp;size=<span class="token number">2</span>&amp;_source=name
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.9616582</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.9616582</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span> <span class="token comment">// _source 限制返回字段</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_search?q=name:张三&quot;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_search?q=name:张三&amp;from=0&amp;size=2&amp;_source=name&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>请求体查询 测试：</strong></p><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 请求：</span>
GET test/_search

<span class="token comment">// match_all ：等同于上面的空查询，没有任何条件，最简单的查询，它匹配所有文档就相当于空搜索，给它们的_score 默认都是1.0，可以通过boost 设置，可以进行一些排序之类的。</span>
<span class="token comment">//请求：</span>
GET test/_search
<span class="token punctuation">{</span>
	<span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
		<span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_search&quot;</span>

<span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/test/_search&quot;</span> <span class="token parameter variable">-H</span> <span class="token string">&#39;Content-Type: application/json&#39;</span> -d<span class="token string">&#39;{	&quot;query&quot;:{		&quot;match_all&quot;:{}	}}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单条件筛选之匹配关键字" tabindex="-1"><a class="header-anchor" href="#单条件筛选之匹配关键字" aria-hidden="true">#</a> 单条件筛选之匹配关键字</h2><p>首先我们需要知道 ES 中默认使用分词器为 标准分词器(StandardAnalyzer)，标准分词器对于英文 单词分词 ，对于中文 单字分词。</p><p>在 ES 的 映射类型（Mapping Type） 中 keyword，date，integer，long，double ，boolean or ip 这些类型不分词，只有 text 类型分词。</p><p><strong>短语模糊匹配</strong></p><p>match ：先对搜索词进行分词，分词完毕后再逐个对分词结果进行匹配，因此相比于 term 的精确搜索，match 是分词匹配搜索，相当于模糊匹配，只包含其中一部分关键词就行 。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>这里的 match 和 下面的 match_pharse 查询都是属于 全文查询，全文查询会给当前的句子进行分词，通常来讲，索引的时候怎么分的词，查询的时候就是用的什么分词器，默认是不用设置的，但是如果有个别场景，也可以自己设置分词器。</p></div><p>dev tools 方式执行</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江南&quot;</span>  <span class="token comment">// 匹配江南，搜索到包含江苏和南通的两条数据</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.6375607</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;dJ0ChIsB-UyH_cqbc8ll&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.6375607</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省南通市崇川区兴通路98-99号南通国际会展中心&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.53428984</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">25</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>命令行方式执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-XGET</span> <span class="token string">&quot;http://es-http.infra:9200/_cat/shards?v&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>模糊查询：</strong></p><p>在实际的搜索中，我们有时候会打错字，从而导致搜索不到。在 ES 中，我们可以使用 fuzziness 属性 设置 编辑距离 来进行模糊查询，从而达到搜索有错别字的情形。</p><p>match 查询具有 fuziness 属性。它可以被设置为 0， 1， 2 或 auto。auto 是推荐的选项，它会根据查询词的长度定义距离。在实际的使用中，当我们使用 auto 时，如果字符串的长度大于 5，那么 funziness 的值自动设置为 2，如果字符串的长度小于 2，那么 fuziness 的值自动设置为 0。</p><p>编辑距离 是将一个术语转换为另一个术语所需的一个字符更改的次数。 这些更改可以包括：</p><ul><li>更改字符（box→fox）</li><li>删除字符（black→lack）</li><li>插入字符（sic→sick）</li><li>转置两个相邻字符（act→cat）</li></ul><p>准备数据：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /test3/doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;hobby&quot;</span><span class="token operator">:</span> <span class="token string">&quot;football, basketball&quot;</span>
<span class="token punctuation">}</span>

POST /test3/_update/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;doc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;hobby&quot;</span><span class="token operator">:</span> <span class="token string">&quot;football, basketball&quot;</span>  <span class="token comment">// 使用英文测试，中文是分析器处理后是单字，英文是多个字母，更适合测试</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test3/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;hobby&quot;</span><span class="token operator">:</span> <span class="token string">&quot;footbalf&quot;</span>  <span class="token comment">// 当只有一个字母不同，正常匹配搜索不到</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET /test3/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;hobby&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;footbalf&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fuzziness&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span>	<span class="token comment">// 编辑距离为 1，football 和 footbalf 只有一个字母不同，这时就可以搜索到。</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">26</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.25172183</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test3&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.25172183</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;hobby&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;football, basketball&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>fuziness 设置是针对每个词语而言的，而不是总的错误的数值，所以可以查询多个单词。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test3/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;hobby&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;footbalf basketbalf&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fuzziness&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">49</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.51063573</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test3&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.51063573</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;hobby&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;football, basketball&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES 的 fuzzy 查询，功能和上面一样，但是这个只针对一个 term 比较有用。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test3/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;fuzzy&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;hobby&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;footbalf&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fuzziness&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.25172183</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test3&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.25172183</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;hobby&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;football, basketball&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>短语精确匹配</strong></p><p>match_phrase ：短语匹配查询，要求必须全部精确匹配，且顺序必须与指定的短语相同。首先解析查询字符串来产生一个词条列表，然后会搜索所有的词条，但只保留包含了所有搜索词条的文档。match_phrase 还支持词条列表各词项间隔距离多少的设置。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET test/_search
<span class="token punctuation">{</span>
	<span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
		<span class="token property">&quot;match_phrase&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江南&quot;</span> 	<span class="token comment">// 未匹配到江南，三条数据地址有包含江苏或南通，但是没有江南</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关键词精确匹配</strong></p><p>term ：单词或单字精确匹配，只是查分词，不会对查询语句进行分词，所以会区分大小写。</p><p>terms ：多个 term 的并集。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>term 查询是基于词项的查询，当使用 term 查询时，ES 不会对这个词做任何处理，但是在文本进行分词时，通常都会将大写转为小写，这个时候就会出现查不出来的情况。</p></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET test/_search
<span class="token punctuation">{</span>
	<span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
		<span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		    <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江&quot;</span>  <span class="token comment">// 匹配包含江字的数据，两条</span>
		  <span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.53428984</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.53428984</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">25</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;dJ0ChIsB-UyH_cqbc8ll&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.41070414</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省南通市崇川区兴通路98-99号南通国际会展中心&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET test/_search
<span class="token punctuation">{</span>
	<span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
		<span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;江&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;南&quot;</span><span class="token punctuation">]</span> 	<span class="token comment">// terms 就相当于多个 term 的并集</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">25</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;dJ0ChIsB-UyH_cqbc8ll&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省南通市崇川区兴通路98-99号南通国际会展中心&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多字段查询</strong></p><p>multi_match 查询提供了一个简便的方法用来对多个字段执行相同的查询。</p><p>更改一下数据：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET test/_doc/R2UChIsBgsntjsp2aK2I

POST /test/_update/R2UChIsBgsntjsp2aK2I
<span class="token punctuation">{</span>
  <span class="token property">&quot;doc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;上海市浦东新区锦绣路1001号世纪公园张三家旁边&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;address&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.9616582</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.9616582</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">25</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;R2UChIsBgsntjsp2aK2I&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.8662264</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;上海市浦东新区锦绣路1001号世纪公园张三家旁边&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>前缀查询</strong></p><p>prefix：查询返回在提供的字段中包含特定前缀的文档。</p><p>前缀匹配只适用于 keyword ，是不做分词的且大小写敏感， 因为前缀匹配不涉及索引分词，所以只能匹配 关键字 keyword，因此效率很低，不推荐生产环境使用。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test/_search
<span class="token punctuation">{</span>
 <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;prefix&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address.keyword&quot;</span><span class="token operator">:</span> <span class="token string">&quot;上海&quot;</span> #
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">11</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;R2UChIsBgsntjsp2aK2I&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;上海市浦东新区锦绣路1001号世纪公园张三家旁边&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,54),A={href:"https://blog.csdn.net/sfh2018/article/details/118083634",target:"_blank",rel:"noopener noreferrer"},R=p(`<p><strong>通配符查询</strong></p><p>wildcard：ES 中可以实现通配符搜索，通配符匹配也是扫描完整索引，通配符可以在 索引中使用，也可以在 keyword 中使用。</p><p>ElsticSearch 支持的通配符有 2 个，分别是：</p><p>*：0 个或多个任意字符 ?：任意单个字符 注意： 为了防止极慢的通配符匹配，查询字符串不要以通配符开头，只在查询字符串中间或末尾使用通配符。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test/_search
<span class="token punctuation">{</span>
 <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;wildcard&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address.keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 如果是address 的话只能匹配 单字 才有数据</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;上海*&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">9</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;R2UChIsBgsntjsp2aK2I&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;上海市浦东新区锦绣路1001号世纪公园张三家旁边&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="范围查询" tabindex="-1"><a class="header-anchor" href="#范围查询" aria-hidden="true">#</a> 范围查询</h3><p><strong>数字范围</strong></p><p>range 查询可同时提供包含（inclusive）和不包含（exclusive）这两种范围表达式，可供组合的选项如下：</p><ul><li>gt: &gt; 大于（greater than）</li><li>lt: &lt; 小于（less than）</li><li>gte: &gt;= 大于或等于（greater than or equal to）</li><li>lte: &lt;= 小于或等于（less than or equal to）</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
	<span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
	  <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>		<span class="token comment">// 查询年龄在 10~20 之间的数据</span>
	    <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
	    <span class="token property">&quot;lte&quot;</span><span class="token operator">:</span> <span class="token number">22</span>
	  <span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;R2UChIsBgsntjsp2aK2I&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;上海市浦东新区锦绣路1001号世纪公园张三家旁边&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>日期范围</strong></p><p>添加下时间 time：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /test/_search

POST /test/_update/cWEChIsBv86TIBhXXI7_
<span class="token punctuation">{</span>
  <span class="token property">&quot;doc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;time&quot;</span><span class="token operator">:</span><span class="token string">&quot;2021/01/01&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
POST /test/_update/R2UChIsBgsntjsp2aK2I
<span class="token punctuation">{</span>
  <span class="token property">&quot;doc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;time&quot;</span><span class="token operator">:</span><span class="token string">&quot;2022/01/01&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
POST /test/_update/dJ0ChIsB-UyH_cqbc8ll
<span class="token punctuation">{</span>
  <span class="token property">&quot;doc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;time&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2023/01/01&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>range 查询同样可以应用在日期字段上：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
	<span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;time&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;gt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2022/03/01&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;lt&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2023/03/01&quot;</span>
      <span class="token punctuation">}</span>
  	<span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">854</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;dJ0ChIsB-UyH_cqbc8ll&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省南通市崇川区兴通路98-99号南通国际会展中心&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2023/01/01&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多 id 查询</strong></p><p>根据 ID 返回文档。此查询使用存储在 _id 字段中的文档 ID。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>请求参数：
	ids.values：<span class="token punctuation">(</span>必填, 字符串数组<span class="token punctuation">)</span> 文档的_id的数组
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;ids&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;values&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;R2UChIsBgsntjsp2aK2I&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;dJ0ChIsB-UyH_cqbc8ll&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;R2UChIsBgsntjsp2aK2I&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;上海市浦东新区锦绣路1001号世纪公园张三家旁边&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2022/01/01&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;dJ0ChIsB-UyH_cqbc8ll&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省南通市崇川区兴通路98-99号南通国际会展中心&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2023/01/01&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多条件筛选" tabindex="-1"><a class="header-anchor" href="#多条件筛选" aria-hidden="true">#</a> 多条件筛选</h3><p>现实的查询需求从来都没有那么简单；它们需要在多个字段上查询多种多样的文本，并且根据一系列的标准来过滤。为了构建类似的高级查询，你需要一种能够将多查询组合成单一查询的查询方法。</p><p><strong>布尔查询</strong></p><p>bool 查询：可以实现你的需求。这种查询将多查询组合在一起，成为用户自己想要的布尔查询。它接收以下参数：</p><ul><li>must：文档 必须 匹配这些条件才能被包含进来。</li><li>must_not：文档 必须不 匹配这些条件才能被包含进来。</li><li>should：如果满足这些语句中的任意语句，将增加 _score ，否则，无任何影响。它们主要用于修正每个文档的相关性得分。</li><li>filter：必须 匹配，但它以不评分、过滤模式来进行。这些语句对评分没有贡献，只是根据过滤标准来排除或包含文档。</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>Filter Context 和 Query Context 的区别:</p><p>进行 query context 查询时，ES 除了要判断某个文档是否与查询值匹配，还要计算相关度评分（relevance score），并放入到返回结果的_score 字段中！ 而当进行 filter context 查询时，仅仅判断某个文档是否与查询值匹配，不但无需进行相关度评分的计算，而且对于高频率的 filter 查询，ES 还会自动将查询结果缓存起来，以提高 filter 查询的性能。</p><p>must 和 should 属于 Query Context，会对 _score 结果产生影响； filter 和 must_not 属于 Filter Context，不会对 _score 结果产生影响；</p></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bool&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;must&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>   		<span class="token comment">// name 包含张三</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;must_not&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;上海&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>		<span class="token comment">// 地址不能包含 上海</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;should&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;hobby&quot;</span><span class="token operator">:</span> <span class="token string">&quot;football&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span> 		<span class="token comment">// 匹配到的数据中包含 football，_score 增加，未匹配到 _score 不变</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;filter&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token property">&quot;range&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;gte&quot;</span><span class="token operator">:</span> <span class="token string">&quot;20&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>  <span class="token comment">// 过滤，筛选 age 大于等于 20 的数据</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.9616582</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.9616582</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2021/01/01&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="指定字段" tabindex="-1"><a class="header-anchor" href="#指定字段" aria-hidden="true">#</a> 指定字段</h3><p>_source ：指定返回的源数据字段。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;R2UChIsBgsntjsp2aK2I&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;dJ0ChIsB-UyH_cqbc8ll&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;王五&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="高亮查询" tabindex="-1"><a class="header-anchor" href="#高亮查询" aria-hidden="true">#</a> 高亮查询</h3><p>如果返回的结果集中很多符合条件的结果，那怎么能一眼就能看到我们想要的那个结果呢？比如像百度所示的那样，将搜索词高亮显示：</p><p><strong>默认高亮显示</strong></p><p>highlight：ES 会从查询到的数据中，找到匹配的短语或关键字词，并以 <code>&lt;em&gt;&lt;/em&gt;</code> 标签包裹起来。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江南&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;highlight&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">88</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.6952236</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;dJ0ChIsB-UyH_cqbc8ll&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.6952236</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省南通市崇川区兴通路98-99号南通国际会展中心&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2023/01/01&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;highlight&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;&lt;em&gt;江&lt;/em&gt;苏省&lt;em&gt;南&lt;/em&gt;通市崇川区兴通路98-99号&lt;em&gt;南&lt;/em&gt;通国际会展中心&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.5504225</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2021/01/01&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;highlight&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;&lt;em&gt;江&lt;/em&gt;苏省苏州市苏州工业园区&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自定义高亮 html 标签</strong></p><p>ES 可以在 highlight 中使用 pre_tags 和 post_tags 来自定义匹配内容前后高亮的 html 标签 。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江南&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;highlight&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;pre_tags&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;b style=&#39;color:red&#39;&gt;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;post_tags&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&lt;/b&gt;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">89</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.6952236</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;dJ0ChIsB-UyH_cqbc8ll&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.6952236</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省南通市崇川区兴通路98-99号南通国际会展中心&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2023/01/01&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;highlight&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;&lt;b style=&#39;color:red&#39;&gt;江&lt;/b&gt;苏省&lt;b style=&#39;color:red&#39;&gt;南&lt;/b&gt;通市崇川区兴通路98-99号&lt;b style=&#39;color:red&#39;&gt;南&lt;/b&gt;通国际会展中心&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">0.5504225</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2021/01/01&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;highlight&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">&quot;&lt;b style=&#39;color:red&#39;&gt;江&lt;/b&gt;苏省苏州市苏州工业园区&quot;</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="排序" tabindex="-1"><a class="header-anchor" href="#排序" aria-hidden="true">#</a> 排序</h3><p>sort：指定字段排序方式。</p><p>数据模型的复杂程度决定了排序的复杂程度，排序的复杂程度随着模型的复杂程度成指数级增加。这里就简单的介绍普通用法。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token string">&quot;asc&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2021/01/01&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token number">1</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;上海市浦东新区锦绣路1001号世纪公园&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2022/01/01&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token number">2</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江苏省南通市崇川区兴通路98-99号南通国际会展中心&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2023/01/01&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token number">3</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分页" tabindex="-1"><a class="header-anchor" href="#分页" aria-hidden="true">#</a> 分页</h3><p>from：起始数据位置。 size：返回数据数量。</p><p>ES 分页查询限制总数能不超过 10000，原因是基本用不到 10000 条以后数据，如果前面 10000 条数据还没有找到你想要的数据，那么后面的匹配度更低，找到的概率更小，查询速度也会越来越慢，合理没必要查 10000 以后的。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET test/_search
<span class="token punctuation">{</span>
	<span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token comment">// 0 开始</span>
	<span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">2</span>  <span class="token comment">// 获取两条数据</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span> <span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span> <span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span> <span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2021/01/01&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;R2UChIsBgsntjsp2aK2I&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span> <span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;id&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;name&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;age&quot;</span> <span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
          <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;上海市浦东新区锦绣路1001号世纪公园张三家旁边&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;2022/01/01&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="批量操作-mget、bulk-api" tabindex="-1"><a class="header-anchor" href="#批量操作-mget、bulk-api" aria-hidden="true">#</a> 批量操作（Mget、Bulk） API</h2><p>批量操作的好处在于可以一次请求完成多次操作，不需要发送多次，可以解决很多网络的开销，可以显著的提高索引的速度。</p><h3 id="批量查询" tabindex="-1"><a class="header-anchor" href="#批量查询" aria-hidden="true">#</a> 批量查询</h3><p>_mget：可以同时执行不同的 get 操作，多个 API 操作之间的结果互不影响。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test/_mget
<span class="token punctuation">{</span>
  <span class="token property">&quot;docs&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">//都是根据id，查询的话，也可以使用下面 ids 这种写法，结果一样：</span>
GET /test/_mget
<span class="token punctuation">{</span>
  <span class="token property">&quot;ids&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不同索引</strong></p><p>创建索引 test2，添加一条数据：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST test2/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;赵六&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">30</span><span class="token punctuation">,</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;杭州市上城区万松岭路81号&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_mget
<span class="token punctuation">{</span>
  <span class="token property">&quot;docs&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cWEChIsBv86TIBhXXI7_&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;test2&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="批量修改" tabindex="-1"><a class="header-anchor" href="#批量修改" aria-hidden="true">#</a> 批量修改</h3><p>_bulk：可以同时执行不同的 CUD 操作，多个 API 操作之间的结果互不影响。</p><p>bulk request 会加载到内存中，如果太大的话，性能反而下降，因此需要反复尝试一个最大的 bulk size。一般从 1000~5000 条数据开始，尝试逐渐增加。另外，如果看大小的话，最好在 5M。</p><p>注意:bulk 操作不能进行代码换行。</p><p>语法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /_bulk
<span class="token punctuation">{</span>action1:<span class="token punctuation">{</span>metadata1<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span>requestbody1<span class="token punctuation">}</span>
<span class="token punctuation">{</span>action2:<span class="token punctuation">{</span>metadata2<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span>requestbody2<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>POST /_bulk
<span class="token punctuation">{</span><span class="token property">&quot;index&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;test3&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;doc&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;孙七&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">50</span><span class="token punctuation">,</span><span class="token property">&quot;address&quot;</span><span class="token operator">:</span><span class="token string">&quot;地球&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;create&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;member&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">999</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;doc&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;周八&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">80</span><span class="token punctuation">,</span><span class="token property">&quot;address&quot;</span><span class="token operator">:</span><span class="token string">&quot;地球2&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;delete&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;test2&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;update&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;_index&quot;</span><span class="token operator">:</span><span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span><span class="token property">&quot;_id&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token property">&quot;doc&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;张三222&quot;</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="离线文档下载" tabindex="-1"><a class="header-anchor" href="#离线文档下载" aria-hidden="true">#</a> 离线文档下载</h2><p>elastic 官网 访问缓慢已常态，还经常无法访问，为了方便看文档，我使用 DownGit 从 GitHub 下载了离线文档，但是下载的离线文档没有左侧 API 导航栏这个比较坑。</p><p>还有一点是关于翻译的问题，ES 的中文版版本太低，我们常用的还是英文版，谷歌的翻译功能又不可用，想要翻译成中文可以使用 Edge 浏览器。</p><p>下载离线文档参考：</p>`,65),I={href:"http://tool.mkblog.cn/downgit/#/home",target:"_blank",rel:"noopener noreferrer"},G={href:"https://github.com/elastic/built-docs/tree/master/html/en/elasticsearch/reference/7.10",target:"_blank",rel:"noopener noreferrer"},X={href:"https://github.com/elastic/built-docs/tree/master/html/static",target:"_blank",rel:"noopener noreferrer"},z={href:"https://cloud.tencent.com/developer/article/2059896",target:"_blank",rel:"noopener noreferrer"};function C(B,P){const a=o("ExternalLinkIcon");return l(),c("div",null,[u,s("ul",null,[s("li",null,[s("a",r,[n("Elasticsearch 7.10 REST APIs"),e(a)])])]),d,s("div",k,[m,s("p",null,[n("请参阅 "),s("a",v,[n("映射"),e(a)])]),s("p",null,[n("请参阅"),s("a",b,[n("索引设置"),e(a)])])]),q,s("p",null,[n("可参考: "),s("a",g,[n("Elasticsearch 基础 11——索引之别名使用"),e(a)])]),y,s("p",null,[n("更多配置这里不多说，可参考"),s("a",_,[n("Elasticsearch Index Setting 一览表"),e(a)])]),h,s("div",T,[f,s("p",null,[s("a",x,[n("部分查询参数，详细用法参考官网"),e(a)])])]),E,s("div",w,[S,s("p",null,[n("部分查询参数"),s("a",j,[n("更多参考"),e(a)])])]),D,s("p",null,[n("参考"),s("a",A,[n("ElasticSearch 中字符串.keyword 和.text 类型区别和模糊查询"),e(a)])]),R,s("ul",null,[s("li",null,[s("a",I,[n("DownGit"),e(a)])]),s("li",null,[s("a",G,[n("GitHub ES 7.10 文档地址（也可选择其他版本）"),e(a)])]),s("li",null,[s("a",X,[n("GitHub ES 7.10 文档样式渲染地址"),e(a)])]),s("li",null,[s("a",z,[n("Elasticsearch 进阶教程：生成离线官方文档"),e(a)])])])])}const H=t(i,[["render",C],["__file","API使用.html.vue"]]);export{H as default};
