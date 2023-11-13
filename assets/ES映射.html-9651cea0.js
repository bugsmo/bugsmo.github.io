import{_ as o,r as p,o as i,c,b as n,d as s,e,a as t}from"./app-8ca7f52c.js";const l={},r=t('<h1 id="es-映射" tabindex="-1"><a class="header-anchor" href="#es-映射" aria-hidden="true">#</a> ES 映射</h1><h2 id="映射-mapping-简介" tabindex="-1"><a class="header-anchor" href="#映射-mapping-简介" aria-hidden="true">#</a> 映射（Mapping）简介</h2><p><code>映射（Mapping）</code> 是定义文档及其包含的字段如何存储和索引的过程。</p><p>每个文档都是字段的集合，每个字段都有自己的数据类型。映射数据时，创建映射定义，其中包含与文档相关的字段列表，决定字段使用什么分词器解析，是否有子字段等。映射定义还包括元数据字段，如<code>_source</code> 字段，用于自定义如何处理文档的关联元数据。</p><table><thead><tr><th>Elasticsearch 8.x</th><th>MySQL</th></tr></thead><tbody><tr><td>Index（索引）</td><td>Table（数据表）</td></tr><tr><td>Dcoument（文档）</td><td>Row（行）</td></tr><tr><td>Fields（字段）</td><td>Column（列）</td></tr></tbody></table>',5),u={href:"https://www.elastic.co/guide/en/elasticsearch/reference/7.17/removal-of-types.html#_what_are_mapping_types",target:"_blank",rel:"noopener noreferrer"},d=n("p",null,[s("ES 使用 "),n("code",null,"动态映射"),s(" 和 "),n("code",null,"显式映射"),s(" 来定义数据。")],-1),v=n("p",null,"动态映射（Dynamic mapping）：可以根据写入文档的内容，来推断字段和数据类型，创建索引结构。 显式映射（Explicit mapping）：不希望使用默认值的字段，或获得对创建字段的更大控制，可以允许 ES 动态添加修改其他字段。",-1),k={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/indices-get-mapping.html",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>语法：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /&lt;index&gt;/_mapping
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;infra_percona-xtradb-cluster&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;@timestamp&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;date&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;file&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;ignore_above&quot;</span><span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;log&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;ignore_above&quot;</span><span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动态映射-dynamic-mapping" tabindex="-1"><a class="header-anchor" href="#动态映射-dynamic-mapping" aria-hidden="true">#</a> 动态映射（Dynamic mapping）</h2><p>自动检测和添加新字段称为 <code>动态映射</code>。可以自定义动态映射规则以适合您的情况 目的：</p><ul><li>动态字段映射：管理动态字段检测的规则。</li><li>动态模板：用于配置动态添加字段映射的自定义规则。</li></ul><h3 id="动态字段映射" tabindex="-1"><a class="header-anchor" href="#动态字段映射" aria-hidden="true">#</a> 动态字段映射</h3><p>当 ES 检测到文档中的新字段时，默认情况下会将该字段动态添加到类型映射中。dynamic 参数控制此行为，通过将参数 dynamic 设置为 true 或 runtime，您可以明确指示 ES 根据传入的文档动态创建字段。</p><table><thead><tr><th>dynamic 参数</th><th>意义</th></tr></thead><tbody><tr><td>true</td><td>新字段被添加到映射中（默认）。</td></tr><tr><td>runtime</td><td>新字段作为运行时字段添加到映射中。这些字段未编入索引，而是查询时加载在 <code>_source</code> 中。</td></tr><tr><td>false</td><td>新字段被忽略。这些字段将不会被索引或搜索，但仍会出现在 <code>_source</code> 返回的匹配字段中。这些字段不会添加到映射中，必须显式添加新字段。</td></tr><tr><td>strict</td><td>如果检测到新字段，则会引发异常并拒绝文档。必须将新字段显式添加到映射中。</td></tr></tbody></table><p>启用动态字段映射后，ES 使用下表中的规则来确定如何映射每个字段的数据类型，下表中的字段数据类型是 ES 动态检测的唯一字段数据类型，所有其他数据类型必须显式映射。</p><table><thead><tr><th>JSON data type</th><th>&quot;dynamic&quot;:&quot;true&quot;</th><th>&quot;dynamic&quot;:&quot;runtime&quot;</th></tr></thead><tbody><tr><td>null</td><td>不添加字段映射</td><td>不添加字段映射</td></tr><tr><td>true or false</td><td>boolean</td><td>boolean</td></tr><tr><td>double</td><td>float</td><td>double</td></tr><tr><td>long</td><td>long</td><td>long</td></tr><tr><td>object</td><td>object</td><td>No field added</td></tr><tr><td>array</td><td>取决于数组中的第一个非值 null</td><td>取决于数组中的第一个非值 null</td></tr><tr><td>通过日期检测的字符串</td><td>date</td><td>date</td></tr><tr><td>通过数值检测的字符串</td><td>float or long</td><td>double or long</td></tr><tr><td>未通过日期检测或数值检测的字符串</td><td>text with a .keyword sub-field</td><td>keyword</td></tr></tbody></table><h4 id="日期检测" tabindex="-1"><a class="header-anchor" href="#日期检测" aria-hidden="true">#</a> 日期检测</h4><p>如果启用日期检测 <code>date_detection</code>（默认），则选中新字符串字段以查看其内容是否与 <code>dynamic_date_formats</code> 中指定的任何日期模式匹配。如果找到匹配项，则新的日期字段为 添加了相应的格式。</p><p>dynamic_date_formats 默认值为：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">[</span> “strict_date_optional_time”<span class="token punctuation">,</span><span class="token string">&quot;yyyy/MM/dd HH:mm:ss Z||yyyy/MM/dd Z&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>strict_date_optional_time 是 date_optional_time 的严格级别，这个严格指的是年份、月份、天必须分别以 4 位、2 位、2 位表示，不足两位的话第一位需用 0 补齐。</p><h5 id="禁用日期检测" tabindex="-1"><a class="header-anchor" href="#禁用日期检测" aria-hidden="true">#</a> 禁用日期检测</h5><p>可以通过设置为：<code>date_detection:false</code>。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT &lt;index&gt;
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;date_detection&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开始测试：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>DELETE test2			# 删除之前的测试索引
PUT test2				# 禁用日期检测
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;date_detection&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
PUT /test2/_doc/<span class="token number">1</span> 		# 索引文档

<span class="token punctuation">{</span>
  <span class="token property">&quot;time&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2020/10/01&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET /test2/_mapping 	# 查看映射<span class="token punctuation">,</span>time 类型变为 text 了
<span class="token punctuation">{</span>
  <span class="token property">&quot;test2&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;date_detection&quot;</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;fields&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;keyword&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;ignore_above&quot;</span> <span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="自定义检测到的日期格式" tabindex="-1"><a class="header-anchor" href="#自定义检测到的日期格式" aria-hidden="true">#</a> 自定义检测到的日期格式</h5><p>或者，你可以设置 <code>dynamic_date_formats</code> 定制想要的 自己的日期格式：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT &lt;index&gt;
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dynamic_date_formats&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;MM/dd/yyyy&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 准备：</span>
DELETE test2
PUT test2
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;dynamic_date_formats&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;yyyy-MM-dd&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
PUT /test2/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;time&quot;</span><span class="token operator">:</span> <span class="token string">&quot;2020-10-01&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 查看映射：</span>
GET /test2/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;test2&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;mappings&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;dynamic_date_formats&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;yyyy-MM-dd&quot;</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;properties&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;time&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;date&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;format&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;yyyy-MM-dd&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="数值检测" tabindex="-1"><a class="header-anchor" href="#数值检测" aria-hidden="true">#</a> 数值检测</h4><p>虽然 JSON 支持本机浮点和整数数据类型，但一些 应用程序或语言有时可能会将数字呈现为字符串。通常 正确的解决方案是显式映射这些字段，但 <code>数字检测默认情况下禁用</code>，想要启用使用以下操作：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT &lt;index&gt;
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;numeric_detection&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 准备</span>
DELETE test2
PUT test2
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;numeric_detection&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
PUT /test2/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;test_int&quot;</span><span class="token operator">:</span> <span class="token string">&quot;100&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;test_float&quot;</span><span class="token operator">:</span> <span class="token string">&quot;100.01&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 查看映射类型</span>
GET /test2/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;test2&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;numeric_detection&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;test_float&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;float&quot;</span>			# test_float 自动映射为 float 类型
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;test_int&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;long&quot;</span>			# test_int 自动映射为 long 类型
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="动态模板" tabindex="-1"><a class="header-anchor" href="#动态模板" aria-hidden="true">#</a> 动态模板</h3><p><code>动态模板（Dynamic templates）</code> 允许您更好地控制 ES 如何将数据映射到默认的动态字段映射规则之外，通过将参数 dynamic 设置为 true 或 runtime，可以启用动态映射。然后，您可以使用动态模板定义自定义映射，这些映射可以根据匹配条件应用于动态添加的字段。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>只有当字段包含具体值时，才会添加动态字段映射。当字段包含 null 或空数组时，ES 不会添加动态字段映射。如果在 dynamic_template 中使用了 null_value 选项，则只有在为字段指定了具体值的第一个文档编制索引后，才会应用该选项。</p></div>`,34),b={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/dynamic-templates.html#template-examples",target:"_blank",rel:"noopener noreferrer"},q=t(`<h2 id="显示映射-explicit-mapping" tabindex="-1"><a class="header-anchor" href="#显示映射-explicit-mapping" aria-hidden="true">#</a> 显示映射（Explicit mapping）</h2><p>您对自己的数据了解比 ES 所能猜到的还要多，因此，虽然 <code>动态映射（Dynamic mapping）</code> 对入门很有用，但在某些时候，您可能需要指定自己的 <code>显式映射（Explicit mapping）</code>。</p><p>创建索引并将字段添加到现有索引时，可以创建字段映射。</p><h3 id="使用显式映射创建索引" tabindex="-1"><a class="header-anchor" href="#使用显式映射创建索引" aria-hidden="true">#</a> 使用显式映射创建索引</h3><p>您可以使用创建索引 API 创建具有显式映射的新索引。</p><p>当我们创建一份数据查看它的动态映射：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 1、创建测试文档</span>
POST /test2/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span><span class="token string">&quot;王五&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;age&quot;</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;11111@qq.com&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 2、查看动态映射</span>
GET /test2/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;test2&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;long&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;ignore_above&quot;</span><span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
              <span class="token property">&quot;ignore_above&quot;</span><span class="token operator">:</span> <span class="token number">256</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>动态映射结果：</p><ul><li>age ：默认<code>long</code> 类型；但是我们并不需要这么大的长度，目前人类最大年龄是 134 岁，所以设置 short 就够了；</li><li>name ：默认 <code>text + keyword</code>；这里的名称只要求 keyword 类型，不分词；</li><li>email ：默认 <code>text + keyword</code>；邮箱强制只要求 text 类型，只分词；</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>text ：会分词，先把对象进行分词处理，然后再再存入到 es 中。 keyword：不分词，没有把对象进行分词处理，而是存入了整个对象，这时候等值查询才能查到。</p></div><p>当我们新建一个索引时，我们可以先索引一个文档，去查看映射，复制下来再修改成我们想要的效果。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//设置新索引映射：</span>
<span class="token comment">//请求：</span>
DELETE test2
PUT /test2
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;long&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;acknowledged&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;shards_acknowledged&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test2&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">//查看映射</span>
<span class="token comment">//请求：</span>
GET /test2/_mapping
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;test2&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;long&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加新字段到现有映射" tabindex="-1"><a class="header-anchor" href="#添加新字段到现有映射" aria-hidden="true">#</a> 添加新字段到现有映射</h3>`,13),h={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/indices-put-mapping.html",target:"_blank",rel:"noopener noreferrer"},g=t(`<p>测试：为新字段 <code>address</code> 添加映射。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
PUT /test2/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;acknowledged&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment">//请求：</span>
GET /test2/_mapping
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;test2&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;age&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;long&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新字段的映射" tabindex="-1"><a class="header-anchor" href="#更新字段的映射" aria-hidden="true">#</a> 更新字段的映射</h3>`,3),_={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-params.html",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/docs-reindex.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/field-alias.html",target:"_blank",rel:"noopener noreferrer"},x=n("h3",{id:"查看特定字段的映射",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#查看特定字段的映射","aria-hidden":"true"},"#"),s(" 查看特定字段的映射")],-1),j={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/indices-get-field-mapping.html",target:"_blank",rel:"noopener noreferrer"},w=t(`<p>语法：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /&lt;index&gt;/_mapping/field/&lt;field&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求：</span>
GET /test2/_mapping/field/email
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;test2&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;full_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;email&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;mapping&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运行时字段-runtime-fields" tabindex="-1"><a class="header-anchor" href="#运行时字段-runtime-fields" aria-hidden="true">#</a> 运行时字段（Runtime fields）</h2><p>我们知道， 从历史上看，ES 依靠 <code>写时模式（Schema on write）</code> 的模式来快速搜索数据。如果一个索引，在一开始是没有定义映射的，那么当我们写入第一个数据时，ES 会根据自己的猜测来给写入的文档的字段定义类型。现在，我们向 ES 添加了 <code>Schema on read 模式</code>，以便用户可以灵活地在读取后更改文档的 <code>schema</code>，还可以生成仅作为搜索查询一部分存在的字段。这个字段只存在于 read 的时候，也就是在查询的时候。<code>Schema on read</code> 和 <code>Schema on write</code> 一起为用户提供了选择，可以根据他们的需求来平衡性能和灵活性。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p><strong>写时模式（Schema on write）</strong>：在写入文档的同时，如果该字段从来没有被创建过，ES 会自动帮我们生产相应的字段 content。 <strong>读时模式（Schema on read）</strong>： 当对数据运行查询时，可以即时创建其他字段。 你不需要提前对数据有深入的了解，也不必预测数据最终可能被查询的所有可能方式。 你可以随时更改数据结构，即使在文档已被索引之后 —— 读时模式的巨大好处。</p></div><p><code>Runtime fields</code> 的使用，让 <code>Schema on read 模式</code>成为可能。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>如果我们想根据日志总结我们的服务投放了多少广告，我们需要先提取这些日志消息相关信息以便进行聚合。</p><p>最简单的方法是使用 运行时字段（runtime fields）。 此功能允许你在文档中定义其他字段，即使它们不存在于你发送到 Elasticsearch 的原始值中。</p></div><p><code>Runtime field</code> 也被称为运行时字段。运行时字段是在查询时评估的字段。 运行时字段使你能够：</p><ul><li>在不重新索引数据的情况下向现有文档添加字段；</li><li>在不了解数据结构的情况下开始处理数据；</li><li>在查询时覆盖从索引字段返回的值；</li><li>为特定用途定义字段而不修改底层 mapping；</li></ul><div class="hint-container tip"><p class="hint-container-title">提示</p><p>运行时字段的好处： 因为运行时字段没有索引，所以添加运行时字段不会增加索引大小。 你直接在索引映射中定义运行时字段，从而节省存储成本并提高摄取速度。 当你定义一个运行时字段时，你可以立即在搜索请求、聚合、过滤和排序中使用它，而无需额外重新索引你的数据。</p><p>运行时字段的缺点： 每次你对运行时字段运行搜索时，Elasticsearch 都必须再次评估该字段的值，因为它不是你文档中被索引的真实字段。 如果此字段是你打算在将来经常查询的字段，那么你应该考虑将其提取为摄取管道的一部分。</p></div><p>更多参考：</p>`,13),E={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/runtime.html",target:"_blank",rel:"noopener noreferrer"},T={href:"https://elasticstack.blog.csdn.net/article/details/125308805",target:"_blank",rel:"noopener noreferrer"},S={href:"https://blog.csdn.net/UbuntuTouch/article/details/125331373",target:"_blank",rel:"noopener noreferrer"},P=n("h2",{id:"元数据字段-metadata-fields",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#元数据字段-metadata-fields","aria-hidden":"true"},"#"),s(" 元数据字段（Metadata fields）")],-1),U=n("p",null,"更新详细内容可参考：",-1),M={href:"https://blog.csdn.net/UbuntuTouch/article/details/125410952",target:"_blank",rel:"noopener noreferrer"},I={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-fields.html",target:"_blank",rel:"noopener noreferrer"},D=n("li",null,[n("p",null,[n("code",null,"_id"),s("：文档的 ID。")])],-1),G=n("li",null,[n("p",null,[n("code",null,"_index"),s("：文档所属的索引。")])],-1),A=t(`<p>文档源元数据字段</p><ul><li><code>_source</code>：表示文档正文的原始 JSON。</li><li><code>_size：_source</code>： 字段的大小（以字节为单位），由 mapper-size 插件提供。</li><li><code>_doc_count</code>：当文档表示预聚合（pre-aggregation）数据时，用于存储文档计数的自定义字段。</li><li><code>_field_names</code>：档中包含非空值的所有字段。</li><li><code>_ignored</code>：由于 ignore_malformed 而在索引时被忽略的文档中的所有字段。</li><li><code>_routing</code>： 将文档路由到特定分片的自定义路由值。</li><li><code>_meta</code>：应用程序特定的元数据，参考 Elasticsearch：添加 metadata 到 mapping 中。</li><li><code>_tier</code>：文档所属索引的当前数据层首选项。</li></ul><table><thead><tr><th>分类</th><th>字段</th></tr></thead><tbody><tr><td>身份元数据字段</td><td><code>_id</code>、<code>_index</code></td></tr><tr><td>文档源元数据字段</td><td><code>_source</code>、<code>_size</code></td></tr><tr><td>文档计数元数据字段</td><td><code>_doc_count</code></td></tr><tr><td>索引元数据字段</td><td><code>_field_names</code>、<code>_ignored</code></td></tr><tr><td>路由元数据字段</td><td><code>_routing</code></td></tr><tr><td>其它元数据字段</td><td><code>_meta</code>、<code>_tier</code></td></tr></tbody></table><h3 id="id" tabindex="-1"><a class="header-anchor" href="#id" aria-hidden="true">#</a> <code>_id</code></h3><p>每个文档都有一个唯一标识它的 <code>_id</code>，该 <code>_id</code> 被索引，以便可以使用 <code>GET API</code> 或 <code>ids</code> 查询来查找文档。<code>_id</code> 可以在索引时分配，也可以由 ES 生成唯一的 <code>_id</code>。该字段在映射中不可配置。</p><p>在 <code>term</code>、<code>terms</code>、<code>match</code>、<code>query_string</code> 等查询中可以访问 <code>_id</code> 字段的值。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET &lt;index&gt;/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;ID1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ID2&quot;</span> <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可使用 ids 查询：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET /_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;ids&quot;</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;values&quot;</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;ID1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ID2&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;ID3&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;...&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><ul><li><code>_id</code> 字段限制在聚合、排序和脚本中使用。如果需要对 <code>_id</code> 字段进行排序或聚合，建议将 <code>_id</code> 字段的内容复制到另一个启用了 doc_values 的字段中。</li><li><code>_id</code> 的大小限制为 512 字节，较大的值将被拒绝。</li></ul></div><h2 id="index" tabindex="-1"><a class="header-anchor" href="#index" aria-hidden="true">#</a> <code>_index</code></h2><p><code>_index</code> 字段允许指定索引去匹配文档。它的值可以在某些查询和聚合中访问，以及在排序或编写脚本时:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET index_1<span class="token punctuation">,</span>index_2/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;index_1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;index_2&quot;</span><span class="token punctuation">]</span>  # 查询_index字段，指定索引
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;aggs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;indices&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_index&quot;</span><span class="token punctuation">,</span> 				# 在_index字段上聚合
        <span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;sort&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> 						# 对_index字段进行排序
        <span class="token property">&quot;order&quot;</span><span class="token operator">:</span> <span class="token string">&quot;asc&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">&quot;script_fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;index_name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;script&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;lang&quot;</span><span class="token operator">:</span> <span class="token string">&quot;painless&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;source&quot;</span><span class="token operator">:</span> <span class="token string">&quot;doc[&#39;_index&#39;]&quot;</span> 		# 访问脚本中的_index字段
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>_index</code> 字段是虚的——它不会作为一个真实的字段添加到 Lucene 索引中。这意味着您可以在一个或多个术语查询(或任何被重写为术语查询的查询，例如 match、query_string 或 simple_query_string 查询，以及<code>前缀和通配符查询</code> 中使用 <code>_index</code> 字段。但是，它不支持 <code>regexp</code> 和 <code>模糊查询</code>。</p><p>对 <code>_index</code> 字段的查询除了接受具体的索引名外，还接受索引别名。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>当指定远端索引名称时，如 <code>cluster_1:index_3</code>，查询时必须包含分隔符 <code>:</code>。例如，对 <code>cluster_*:index_3</code> 的通配符查询将匹配来自远程索引的文档。但是，对集群 <code>*index_1</code> 的查询只匹配本地索引，因为没有分隔符。此行为与远程索引名的通常解析规则一致。</p></div><h3 id="source-磁盘使用率相关" tabindex="-1"><a class="header-anchor" href="#source-磁盘使用率相关" aria-hidden="true">#</a> <code>_source</code>（磁盘使用率相关）</h3><p><code>_source</code> 字段包含在索引时传递的原始 JSON 文档体，就是我们存到 ES 中的内容。<code>_source</code> 字段本身没有索引（因此不可搜索），但它被存储，以便在执行获取请求（如 get 或 search）时可以返回。</p>`,18),z={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-source-field.html#synthetic-source",target:"_blank",rel:"noopener noreferrer"},N={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-source-field.html#disable-source-field",target:"_blank",rel:"noopener noreferrer"},L=t(`<h4 id="synthetic" tabindex="-1"><a class="header-anchor" href="#synthetic" aria-hidden="true">#</a> synthetic</h4><p>尽管源字段非常方便，但它占用了磁盘上大量的空间。ES 可以在检索源内容时动态重构源内容，而不是在发送源文档时将其存储在磁盘上。通过在 <code>_source</code> 中设置 <code>mode: synthetic</code> 来启用此功能:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT &lt;index&gt;
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;mode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;synthetic&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然这种动态重建通常比逐字保存源文档并在查询时加载它们慢，但它节省了大量存储空间。有几个限制需要注意：</p><ul><li>当您检索合成的 <code>_source</code> 内容时，与原始 JSON 相比，它会进行少量修改。</li><li>参数<code>_</code>源在脚本中不可用。而是使用文档 API 或字段。</li><li>合成源可以与仅包含以下字段类型的索引一起使用：aggregate_metric_double，boolean，byte，date，date_nanos，dense_vector，double，float， geo_point，half_float，histogram，integer，ip，keyword，long，scaled_float，short，text，version，wildcard。</li></ul><p>当 <code>_source</code> 启用 <code>synthetic</code> 时，与原始 JSON 相比，检索到的文档会进行一些修改。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT idx/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;foo&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;bar&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">&quot;bar&quot;</span><span class="token operator">:</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">//结果</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;foo&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bar&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="映射时命名的字段" tabindex="-1"><a class="header-anchor" href="#映射时命名的字段" aria-hidden="true">#</a> 映射时命名的字段</h5><p>在映射中命名的合成源名称字段。与动态映射一起使用时，默认情况下，名称中带有点 .的字段被解释为多个对象，而字段名称中的点保留在禁用子对象的对象中。例如：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT idx/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;foo.bar.baz&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
<span class="token punctuation">}</span>
<span class="token comment">//结果：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;foo&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;bar&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;baz&quot;</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="禁用-source" tabindex="-1"><a class="header-anchor" href="#禁用-source" aria-hidden="true">#</a> 禁用<code>_source</code></h4><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT &lt;index&gt;
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>用户通常会在不考虑后果的情况下禁用<code>_source</code>字段，然后后悔不已。如果<code>_source</code>字段不可用，那么许多特性都不受支持。</p><p>禁用源字段 <code>_source</code> 之前请先考虑：</p><ul><li>update、update_by_query 和 reindex API。</li><li>动态高亮显示。</li><li>能够从一个 Elasticsearch 索引重新索引到另一个索引，或者更改映射或分析，或者将索引升级到新的主要版本。</li><li>通过查看索引时使用的原始文档来调试查询或聚合的能力。</li><li>未来可能会自动修复索引损坏。</li></ul></div><h4 id="includes-excludes" tabindex="-1"><a class="header-anchor" href="#includes-excludes" aria-hidden="true">#</a> includes&amp;excludes</h4><p>一个仅限专家使用的功能是，在文档编制索引之后，但在存储 <code>_source</code> 字段之前，可以删除 <code>_source</code> 域的内容。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>从<code>_source</code>中删除字段与禁用<code>_source</code>有类似的缺点，尤其是不能将文档从一个 Elasticsearch 索引重新索引到另一个索引。请考虑改用源筛选。</p></div><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT logs
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;includes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>				<span class="token comment">// 保留 *.count 和 meta.*，其他字段将从存储的_source字段中删除。</span>
        <span class="token string">&quot;*.count&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;meta.*&quot;</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;excludes&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span> 			<span class="token comment">// 我们仍然可以搜索该字段，即使它不在存储的_source中。</span>
        <span class="token string">&quot;meta.description&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;meta.other.*&quot;</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT logs/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;requests&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;count&quot;</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token comment">// 保留</span>
    <span class="token property">&quot;foo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;bar&quot;</span> <span class="token comment">// 删除</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;meta&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Some metric&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 保留</span>
    <span class="token property">&quot;description&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Some metric description&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 删除</span>
    <span class="token property">&quot;other&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>		<span class="token comment">// 保留</span>
      <span class="token property">&quot;foo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;one&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 删除</span>
      <span class="token property">&quot;baz&quot;</span><span class="token operator">:</span> <span class="token string">&quot;two&quot;</span> 	<span class="token comment">// 删除</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

GET logs/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;meta.other.foo&quot;</span><span class="token operator">:</span> <span class="token string">&quot;one&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//search结果：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;logs&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token number">0.2876821</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;meta&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;other&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Some metric&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;requests&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;count&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="routing" tabindex="-1"><a class="header-anchor" href="#routing" aria-hidden="true">#</a> <code>_routing</code></h3><p>使用以下公式将文档路由到索引中的特定分片：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>routing_factor = num_routing_shards / num_primary_shards
shard_num = (hash(_routing) % num_routing_shards) / routing_factor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>num_routing_shards</code> 是 <code>index.number_of_routing_shards</code> 索引设置的值。</li><li><code>num_primary_shards</code> 是 <code>index.number_of_shards</code> 索引设置的值。</li></ul><p>默认的 <code>_routing</code> 值是文档的 <code>_id</code> 。可以通过为每个文档指定自定义路由值来实现自定义路由模式。例如:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT test/_doc/<span class="token number">1</span>?routing=user1&amp;refresh=<span class="token boolean">true</span>  # 此文档使用user1作为其路由值，而不是其ID。
<span class="token punctuation">{</span>
  <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;This is a document&quot;</span>
<span class="token punctuation">}</span>

GET test/_doc/<span class="token number">1</span>?routing=user1  # 获取、删除或更新文档时需要提供相同的路由值。


GET test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;_routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;user1&quot;</span> <span class="token punctuation">]</span>  <span class="token comment">// 也可以是用 _routing 字段来查询</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>除非在模板中启用了 <code>allow_custom_routing</code> 设置，否则数据流不支持自定义路由。</p></div><h4 id="使用自定义路由搜索" tabindex="-1"><a class="header-anchor" href="#使用自定义路由搜索" aria-hidden="true">#</a> 使用自定义路由搜索</h4><p>自定义路由可以减少搜索的影响。不必将搜索请求扇出到索引中的所有分片，只需将请求发送到与特定路由值匹配的分片即可：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>GET test/_search?routing=user1<span class="token punctuation">,</span>user2  # 此搜索请求将只在与user1和user2路由值关联的分片上执行。
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;title&quot;</span><span class="token operator">:</span> <span class="token string">&quot;document&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="强制使用路由" tabindex="-1"><a class="header-anchor" href="#强制使用路由" aria-hidden="true">#</a> 强制使用路由</h4><p>使用自定义路由时，无论何时索引、获取、删除或更新文档，都必须提供路由值。</p><p>忘记路由值可能会导致文档在多个分片上被索引。作为一种保护措施，<code>_routing</code> 字段可以配置为生成所有 CRUD 操作所需的自定义路由值：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT test2
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;_routing&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;required&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>  <span class="token comment">// 所有文件都需要路由。</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

PUT test2/_doc/<span class="token number">1</span> 		<span class="token comment">// 此索引请求引发 routing_missing_exception，必须使用路由。</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;text&quot;</span><span class="token operator">:</span> <span class="token string">&quot;No routing value provided&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="文档使用唯一-id-unique-ids" tabindex="-1"><a class="header-anchor" href="#文档使用唯一-id-unique-ids" aria-hidden="true">#</a> 文档使用唯一 ID（Unique IDs）</h4><p>当为指定自定义 <code>_routing</code> 的文档编制索引时，不能保证索引中所有分片的 <code>_id</code> 的唯一性。事实上，如果使用不同的 <code>_routing</code> 值进行索引，那么具有相同 <code>_id</code> 的文档可能会出现在不同的碎片上。</p><p>用户需要确保索引中的 ID 是唯一的。</p><h4 id="路由到索引分区" tabindex="-1"><a class="header-anchor" href="#路由到索引分区" aria-hidden="true">#</a> 路由到索引分区</h4><p>可以配置索引，以便自定义路由值将转到分片的子集，而不是单个分片。这有助于降低最终出现不平衡集群的风险，同时仍能减少搜索的影响。</p><p>这是通过在创建索引时提供索引级别设置 <code>index.routing_partition_size</code> 来实现的。随着分区大小的增加，数据将变得更加均匀，代价是每个请求必须搜索更多分片。</p><p>当此设置存在时，计算 shard 的公式为:</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>routing_value = hash(_routing) + hash(_id) % routing_partition_size
shard_num = (routing_value % num_routing_shards) / routing_factor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，<code>_routing</code> 字段用于计算索引中的一组分片，然后 <code>_id</code> 用于在该集合中选择一个分片。</p><p>要启用此功能，<code>index.routing_partition_size</code> 的值应大于 1 且小于 <code>index.number_of_shards</code>。</p><p>一旦启用，分区索引将有以下限制:</p><ul><li>不能在其中创建具有连接字段关系的映射。</li><li>索引中的所有映射都必须根据需要标记 <code>_routing</code> 字段。</li></ul><h3 id="meta" tabindex="-1"><a class="header-anchor" href="#meta" aria-hidden="true">#</a> <code>_meta</code></h3><p>映射类型可以具有与其关联的自定义元数据。ES 根本不使用这些元数据，但可以用于存储特定于应用程序的元数据，例如文档所属的类：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT test
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;_meta&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> 	<span class="token comment">// 这个_meta信息可以用GET映射API检索。</span>
      <span class="token property">&quot;class&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MyApp::User&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;min&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.0&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.3&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以使用更新映射 API 在现有类型上更新 <code>_meta</code> 字段：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT test/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;_meta&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;class&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MyApp2::User3&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;version&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;min&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.3&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;max&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1.5&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="field-names" tabindex="-1"><a class="header-anchor" href="#field-names" aria-hidden="true">#</a> <code>_field_names</code></h3><p><code>_field_names</code> 字段，用于索引文档中包含除 null 以外的任何值的每个字段的名称。exists 查询使用此字段查找特定字段具有或不具有任何非空值的文档。</p><p>现在，<code>_field_names</code> 字段只对禁用了 <code>doc_values</code> 和规范的字段的名称进行索引。对于启用了<code>doc_values</code> 或 <code>norm</code> 的字段，exists 查询仍然可用，但不会使用 <code>_field_name</code> 字段。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>禁用 <code>_field_names</code>：无法再禁用<code>_field_name</code>。它现在默认启用，因为它不再承载以前的索引开销。</p></div><h2 id="映射参数-mapping-parameters" tabindex="-1"><a class="header-anchor" href="#映射参数-mapping-parameters" aria-hidden="true">#</a> 映射参数（Mapping parameters）</h2>`,53),O={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-params.html",target:"_blank",rel:"noopener noreferrer"},J=t('<p>以下映射参数是某些或所有字段数据类型的通用参数：</p><ul><li><code>index</code>：控制是否对字段值建立索引。接受 true 或 false 值，默认 true 值；未索引的字段不能通过检索查询到数据。</li><li><code>store</code>：标记字段是否需要被 额外的 单独的 存储在和 index 不同的 fragment 中。接受 yes/no 和 true/false 值，默认为 no/false 值，即不单独存储。 <ul><li>默认情况下，文档添加到索引后是不需要再单独储存的，因为 _source 默认已经存储了整个原始文档，而默认情况下，提取出来的字段值也是从 <code>_source</code> 中解析出来的。</li><li>字段开启独立存储时，需要占用额外的磁盘空间，独立的字段越多，索引就越大，但在单独获取一个被独立 store 的字段值时，要比从 <code>_source</code> 中解析要快。</li><li>提取数据时，每一个被 store 独立存储的字段，都需要一次单独的 IO 从对应的存储块中获取；而未被 store 标记的其他的字段，则只需要一次 IO 即可从 <code>_source</code> 中全部获取。</li><li>文档被添加到索引后可被查询检索，文档被指定到存储后可被返回显示，因而，常规情况下，需要返回原始值的字段至少保证 store 或 <code>_source</code> 中有存储。</li></ul></li><li><code>analyzer</code>：用于指定 text 文本字段在创建文档索引或查询检索文档时使用的文本分析器；仅支持 text 字段使用，除非被 <code>search_analyzer</code> 参数覆盖，否则将同时应用于索引和搜索。</li><li><code>search_analyzer</code>：指定查询搜索文档时对查询条件使用的分析器。默认情况下，查询条件将使用被查询字段 analyzer 参数定义的索引分析器，但是可以通过此参数设置覆盖。</li><li><code>boost</code>：在索引期间指定字段在查询时的相关性得分（不推荐）；也可以直接在查询时指定。</li><li><code>format</code>：自定义日期的解析格式。在 JSON 文档中，日期表示为字符串，在 ES 中预配置了一组格式来识别这些字符串并将其解析为一个 long 类型的毫秒数。</li><li><code>fields</code>：为不同的目的以不同的方式对同一字段建立索引，这就是多字段的目的。多字段不会更改原始 <code>_source</code> 字段。</li><li><code>null_value</code>：一个空的值不能被索引或搜索，参数用于将显式的空（null）值替换为指定的值。</li><li><code>meta</code>：附加到字段的元数据。只对在相同索引上工作的多个应用程序有用，以共享关于字段(如单位)的元信息；可以通过提交映射更新进行更新。</li></ul><h2 id="映射限制设置-mapping-limit-settings" tabindex="-1"><a class="header-anchor" href="#映射限制设置-mapping-limit-settings" aria-hidden="true">#</a> 映射限制设置（Mapping limit settings）</h2><p>使用以下设置限制字段映射的数量（手动或动态创建），并防止文档导致映射爆炸：</p><ul><li><code>index.mapping.total_fields.limit</code>：索引中的最大字段数。字段和对象映射以及字段别名都属于此限制。映射的运行时字段也计算到此限制。默认值为 1000。</li></ul>',5),R={class:"hint-container tip"},V=n("p",{class:"hint-container-title"},"提示",-1),B=n("p",null,"该限制已到位，以防止映射和搜索变得太大。较高的值可能会导致性能下降和内存问题，特别是在负载高或资源少的集群中。",-1),C={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/search-settings.html",target:"_blank",rel:"noopener noreferrer"},H={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/flattened.html",target:"_blank",rel:"noopener noreferrer"},Z=n("li",null,[n("code",null,"index.mapping.depth.limit"),s("：字段的最大深度，以内部对象的数量度量。例如，如果所有字段都在根对象级别定义，则深度为 1。如果有一个对象映射，则深度为 2 等。默认值为 20。")],-1),F=n("li",null,[n("code",null,"index.mapping.nested_fields.limit"),s("：索引中不同嵌套映射的最大数量。嵌套类型只能在特殊情况下使用，当需要独立查询对象数组时。为了防止设计不良的映射，此设置限制了每个索引的唯一嵌套类型的数量。默认值为 50。")],-1),Q=n("li",null,[n("code",null,"index.mapping.nested_objects.limit"),s("：单个文档在所有嵌套类型中可以包含的最大嵌套 JSON 对象数。当文档包含太多嵌套对象时，此限制有助于防止内存不足错误。默认值为 10000。")],-1),X=n("li",null,[n("code",null,"index.mapping.field_name_length.limit"),s("：字段名称的最大长度设置。这个设置并不能解决映射爆炸的问题，但如果您想限制字段长度，它可能仍然有用。通常不需要设置此设置。默认值是可以的，除非用户开始添加大量具有真正长名称的字段。默认值为 Long.MAX_VALUE（无限制）。")],-1),K=n("code",null,"index.mapping.dimension_fields.limit",-1),W={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/index-modules.html#dynamic-index-settings",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/tsds.html#time-series-dimension",target:"_blank",rel:"noopener noreferrer"};function $(nn,sn){const a=p("ExternalLinkIcon");return i(),c("div",null,[r,n("p",null,[s("在 ES 7.0.0 之前，映射定义包含一个类型名。ES 7.0.0 及更高版本不再接受默认映射。请参见 "),n("a",u,[s("删除映射类型"),e(a)]),s("。")]),d,v,n("p",null,[s("查看索引的映射：可以使用 "),n("a",k,[s("获取映射"),e(a)]),s(" API 查看 现有索引。")]),m,n("p",null,[s("详细内容参考："),n("a",b,[s("动态模板示例"),e(a)]),s("。")]),q,n("p",null,[s("可以使用 "),n("a",h,[s("更新映射 API"),e(a)]),s(" 添加一个或多个新的字段到现有索引。")]),g,n("p",null,[s("除了支持的 "),n("a",_,[s("映射参数"),e(a)]),s(" 外，您不能更改现有字段的映射或字段类型。更改现有字段可能会使已编入索引的数据失效。")]),n("p",null,[s("如果需要更改其他索引中字段的映射，请使用正确的映射创建一个新索引，然后将数据 "),n("a",y,[s("reindex"),e(a)]),s(" 到该索引中。")]),n("p",null,[s("重命名字段将使已在旧字段名称下索引的数据无效。相反，添加 "),n("a",f,[s("alias"),e(a)]),s(" 字段以创建备用字段名。")]),x,n("p",null,[s("如果只想查看一个或多个特定字段的映射，则可以使用 "),n("a",j,[s("获取字段映射 API"),e(a)]),s("。如果您不需要索引的完整映射，或者索引包含大量字段，这将非常有用。")]),w,n("ul",null,[n("li",null,[n("a",E,[s("ES Doc - runtime"),e(a)])]),n("li",null,[n("a",T,[s("Elasticsearch：Runtime fields 及其应用（一）"),e(a)])]),n("li",null,[n("a",S,[s("Elasticsearch：Runtime fields 及其应用（二）"),e(a)])])]),P,U,n("ul",null,[n("li",null,[n("p",null,[n("a",M,[s("Elasticsearch：Metadata fields - 元数据字段介绍"),e(a)])])]),n("li",null,[n("p",null,[n("a",I,[s("Elastic Docs › Elasticsearch Guide [8.6] › Mapping › Metadata fields"),e(a)])])]),D,G]),A,n("p",null,[s("如果磁盘使用率对您来说很重要，那么查看一下 "),n("a",z,[s("synthetic _source"),e(a)]),s(" ，它以仅支持映射子集和较慢的回迁为代价来减少磁盘使用率，或者（不推荐）禁用 "),n("a",N,[s("_source"),e(a)]),s("字段，该字段也会减少磁盘使用量，但会禁用许多功能。")]),L,n("p",null,[s("详细内容请参考："),n("a",O,[s("Elastic Docs › Elasticsearch Guide [8.6] › Mapping › Mapping parameters"),e(a)])]),J,n("div",R,[V,B,n("p",null,[s("如果增加此设置，我们建议您也增加 "),n("a",C,[s("indices.query.bool.max_clause_count"),e(a)]),s(" 设置，该设置限制查询中子句的最大数量。")]),n("p",null,[s("如果字段映射包含一组大的任意键，请考虑使用 "),n("a",H,[s("扁平数据类型"),e(a)]),s("。")])]),n("ul",null,[Z,F,Q,X,n("li",null,[K,s("：[预览]此功能处于技术预览中，可能会在将来的版本中更改或删除。Elastic 将尽最大努力解决任何问题，但技术预览中的功能不受正式 GA 功能支持 SLA 的约束。（"),n("a",W,[s("dynamic"),e(a)]),s("，integer）索引的最大 时间序列维度数。默认值为 "),n("a",Y,[s("16"),e(a)]),s("。")])])])}const en=o(l,[["render",$],["__file","ES映射.html.vue"]]);export{en as default};
