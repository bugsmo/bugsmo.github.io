import{_ as p,r as o,o as i,c as l,b as n,d as s,e as t,a as e}from"./app-8ca7f52c.js";const c={},u=n("h1",{id:"字段映射类型测试",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#字段映射类型测试","aria-hidden":"true"},"#"),s(" 字段映射类型测试")],-1),r={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-params.html",target:"_blank",rel:"noopener noreferrer"},d=e('<table><thead><tr><th>参数</th><th>作用</th></tr></thead><tbody><tr><td>analyzer</td><td>定义文本字段的分词器，默认对索引和查询都是有效的。默认分词器使用的关键字分词，英文和汉字都会分成一个个，这是当我们使用 term 只能匹配单个关键字，我们需要根据需求去设置分词器。</td></tr><tr><td>coerce</td><td>强制尝试清除脏值以适合字段的数据类型，默认为 true，可以将字符串强制转换为数字和浮点将被截断为整数值。例：设置数字为 integer 类型，存入字符串 “1”，文档依然可以创建，如果设置成 false，则必须传入 integer 类型。</td></tr><tr><td>copy_to</td><td>可以将多个字段的值，复制到同一个字段中。</td></tr><tr><td>doc_values</td><td>支持排序、聚合 会占用额外存储空间，与 source 独立，同时开启 doc_values 和 _source 则会将该字段原始内容保存两份。doc_values 数据在磁盘上采用列式存储，关闭后无法使用排序和聚合。</td></tr><tr><td>dynamic</td><td>动态映射，默认 true。自动设置字段类型。</td></tr><tr><td>eager_global_ordinals</td><td>提升高基数聚合性能，默认 false。开启会影响写入性能，适用场景：高基数聚合 。高基数聚合场景中的高基数含义：一个字段包含很大比例的唯一值。</td></tr><tr><td>enabled</td><td>是否对该字段进行索引，默认 true。ES 默认会索引所有的字段，但是有的字段可能只需要存储，不需要索引。关闭后，只在 _source 中存储。</td></tr><tr><td>format</td><td>日期格式。format 可以规范日期格式，而且一次可以定义多个 format。</td></tr><tr><td>ignore_above</td><td>用于指定分词和索引的字符串最大长度，超过最大长度的话，该字段将不会被索引，这个字段只适用于 keyword 类型。</td></tr><tr><td>ignore_malformed</td><td>忽略格式不对的数据，默认 false。</td></tr><tr><td>index</td><td>字段是否被索引，默认 true。关闭后无法对其进行搜索，但字段仍会存储到 _source 和 doc_values，字段可以被排序和聚合。</td></tr><tr><td>index_options</td><td>控制索引时哪些信息被存储到倒排索引中（用在 text 字段中），可设置：docs（默认，只存储文档编号），freqs（在 docs 基础上，存储词项频率），positions（在 freqs 基础上，存储词项偏移位置），offsets（在 positions 基础上，存储词项开始和结束的字符位置）。</td></tr><tr><td>index_phrases</td><td>将两个词的组合词索引到一个单独的字段中。默认 false。</td></tr><tr><td>index_prefixes</td><td>为字段值的前缀编制索引，以加快前缀搜索速度。</td></tr><tr><td>meta</td><td>附加到字段的元数据。</td></tr><tr><td>fields</td><td>为不同的目的以不同的方式对同一字段建立索引。</td></tr><tr><td>normalizer</td><td>用于解析前（索引或者查询）的标准化配置，可以在索引和查询时，分别对文档进行预处理，比如索引和查询单词全部小写。</td></tr><tr><td>norms</td><td>用于计算查询的文档分数，默认 true。对于仅用于过滤或聚合的字段，不需要对字段进行打分排序时设置为 false。</td></tr><tr><td>null_value</td><td>使用指定的值替换为 null 值，以便可以进行索引和搜索。</td></tr><tr><td>position_increment_gap</td><td>当为具有多个值的文本字段建立索引时，将在值之间添加“假”间隙，以防止大多数短语查询在值之间进行匹配，默认值为 100。</td></tr><tr><td>properties</td><td>类型映射，object 字段和 nested 字段包含子字段叫 properties。</td></tr><tr><td>search_analyzer</td><td>查询时候的分词器。默认情况下，如果没有配置 search_analyzer，则查询时，首先查看有没有 search_analyzer，有的话，就用 search_analyzer 来进行分词，如果没有，则看有没有 analyzer，如果有，则用 analyzer 来进行分词，否则使用 es 默认的分词器。</td></tr><tr><td>similarity</td><td>字段打分的相似性算法，默认 BM25。</td></tr><tr><td>store</td><td>单独存储属性值。默认对字段值进行索引以使其可搜索，但不单独存储它们，但是已存储在_source 字段中。</td></tr><tr><td>subobjects</td><td>8.3 版本以后新增映射参数，默认为 true，用于保留字段名称中的 . ，这些字段将扩展到相应的对象结构。子对象设置为 false 的对象只能保存叶子子字段，而不能保存其他对象。</td></tr><tr><td>term_vector</td><td>存储分析过程的词矢量（Term vectors）信息。包括：词、位置、偏移量、有效载荷。</td></tr></tbody></table><h2 id="核心类型" tabindex="-1"><a class="header-anchor" href="#核心类型" aria-hidden="true">#</a> 核心类型</h2><h3 id="字符串类型" tabindex="-1"><a class="header-anchor" href="#字符串类型" aria-hidden="true">#</a> 字符串类型</h3><p>text：</p><ul><li>会分词，然后进行索引，用于全文搜索。</li><li>支持模糊、精确查询</li><li>不支持聚合</li></ul><p>keyword：</p><ul><li>不进行分词，直接索引，keyword 用于关键词搜索</li><li>支持模糊、精确查询</li><li>支持聚合</li></ul><p>有时候对同一字段同时使用 text 和 keyword 两种类型会很有用 ：一个用于全文搜索和其他用于聚合和排序。</p><h4 id="text" tabindex="-1"><a class="header-anchor" href="#text" aria-hidden="true">#</a> text</h4>',9),v={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/text.html",target:"_blank",rel:"noopener noreferrer"},k=e(`<p>文本字段最适合非结构化但可读的内容，比如 Email 内容、产品描述，应该使用 text 类型。当一个字段设置 text 类型以后，字段内容会被分析，字符串会被分析器分成一个一个词项，生成倒排索引。text 类型的字段不用于排序，很少用于聚合。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//请求</span>
PUT test
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span>  <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//返回：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;acknowledged&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;shards_acknowledged&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">&quot;index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ES 自动为 字符串类型添加 text 和 keyword 类型：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//添加数据：</span>
POST test/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">//查看映射：</span>
GET test/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;test&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>					<span class="token comment">// 定义属性关键字</span>
        <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>					<span class="token comment">// 声明字段</span>
          <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>				<span class="token comment">// 声明字段类型</span>
          <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>					<span class="token comment">// 多字段属性</span>
            <span class="token property">&quot;keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>				<span class="token comment">// 多字段属性名，可使用 address.keyword 进行操作</span>
              <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>		<span class="token comment">// 声明字段类型</span>
              <span class="token property">&quot;ignore_above&quot;</span><span class="token operator">:</span> <span class="token number">256</span>		<span class="token comment">// 索引最大程度，超过不被索引</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="synthetic-source-源数据合成重建" tabindex="-1"><a class="header-anchor" href="#synthetic-source-源数据合成重建" aria-hidden="true">#</a> synthetic source 源数据合成重建</h5><p>倒排索引可以提供全文检索能力，但是无法提供对排序和数据聚合的支持。<code>doc_values</code> 本质上是一个序列化的列式存储结构，适用于聚合（aggregations）、排序（Sorting）、脚本（scripts access to field）等操作。默认情况下，ES 几乎会为所有类型的字段存储 <code>doc_value</code>，但是 text 或 text_annotated 等可分词字段不支持 <code>doc values</code> 。如果不需要对某个字段进行排序或者聚合，则可以关闭该字段的 <code>doc_value</code> 存储。</p><p>ES 为了存储原始数据，设计了 <code>_source</code> 来存储， 为了解决设计排序与聚合统计，又设计了 <code>doc_values</code> 存储对应的列，这造成了数据重复存储，现在通过混合方式，重建构建 source，部分数据可以来自 列式 doc_values，这会显著节约索引存储占用。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">// 设置 synthetic 模式</span>
PUT test
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;mode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;synthetic&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;keyword&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//添加数据：</span>
PUT test/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;address 11&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address 11&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address 222&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">//查询文档,数据会被去重：</span>
GET test/_source/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;address 11&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address 222&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果文本字段将 store 设置为 true，则保留顺序和重复项：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT test
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;mode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;synthetic&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;store&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span> 		<span class="token comment">// 字段是否要被单独存储</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//添加数据：</span>
PUT test/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;address 11&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address 11&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address 222&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">//查询文档：</span>
GET test/_source/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;address 11&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address 11&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address 222&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="fielddata-映射参数" tabindex="-1"><a class="header-anchor" href="#fielddata-映射参数" aria-hidden="true">#</a> fielddata 映射参数</h5><p>默认情况下，文本字段是可搜索的，但默认情况下不可用于聚合、排序或脚本编写。</p><p><code>fielddata</code> 默认是关闭的，映射时在你的字段上设置 <code>&quot;fielddata&quot;: true</code>，以便通过取消倒排索引将 <code>fielddata</code> 加载到内存中。注意，这可能会占用大量内存。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>PUT &lt;index&gt;/_mapping
<span class="token punctuation">{</span>
  <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;my_field&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;type&quot;</span><span class="token operator">:</span>     <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;fielddata&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>text</code> 字段上启用 <code>fielddata</code> 通常没有意义。因为 <code>fielddata</code> 与 <code>fielddata 缓存</code> 一起存储在堆中，计算起来很昂贵。计算 <code>fielddata</code> 会导致延迟峰值，而堆使用率的增加会导致集群性能问题。</p><p>大多数希望对 <code>text</code> 字段进行更多操作的用户都使用 <code>fields</code> 多字段映射，既有用于全文搜索的文本字段，也有用于聚合的未分析关键字字段。</p><h3 id="keyword" tabindex="-1"><a class="header-anchor" href="#keyword" aria-hidden="true">#</a> keyword</h3>`,17),m={href:"https://www.elastic.co/guide/en/elasticsearch/reference/8.6/keyword.html",target:"_blank",rel:"noopener noreferrer"},b=e(`<p>keyword 用于结构化内容，如 ID、电子邮件地址、主机名、状态码、邮政编码或标记。通常用来排序(sorting)、聚合(aggregations)和 term-level 查询，例如 <code>term</code>。</p><h4 id="synthetic-source-源数据合成重建-1" tabindex="-1"><a class="header-anchor" href="#synthetic-source-源数据合成重建-1" aria-hidden="true">#</a> synthetic source 源数据合成重建</h4><p>keyword 的 synthetic 模式和 text 是一样的：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//设置映射：</span>
PUT test
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;mode&quot;</span><span class="token operator">:</span> <span class="token string">&quot;synthetic&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//添加数据：</span>
PUT test/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;address 11&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address 11&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address 222&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
<span class="token comment">//查询文档,数据会被去重：</span>
GET test/_source/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;address 11&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;address 222&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果文本字段将 store 设置为 true，则保留顺序和重复项。</p><h4 id="ignore-above-忽略" tabindex="-1"><a class="header-anchor" href="#ignore-above-忽略" aria-hidden="true">#</a> ignore_above 忽略</h4><p>长度超过 ignore_above 设置的字段文档会被存储，但不会被索引。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//设置映射：</span>
PUT test
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;ignore_above&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//添加数据：</span>
POST test/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;abcdefghijklmn&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">//搜索数据：</span>
GET /test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;a&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//索引不到结果：</span>
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
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//查询文档：</span>
GET test/_source/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;abcdefghijklmn&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="constant-keyword-常量关键字" tabindex="-1"><a class="header-anchor" href="#constant-keyword-常量关键字" aria-hidden="true">#</a> constant keyword 常量关键字</h4><p>constant_keyword 是索引中所有文档都具有相同值的情况下关键字字段的特例。</p><p>constant_keyword 支持与 keyword 字段相同的查询和聚合，但利用所有文档每个索引具有相同值的事实来更有效地执行查询。允许提交没有字段值或值等于映射中配置的值的文档。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//设置映射：</span>
PUT test
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;constant_keyword&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token string">&quot;debug&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//添加数据：</span>
POST test/_doc
<span class="token punctuation">{</span>
  <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Starting up Elasticsearch 1&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token string">&quot;debug&quot;</span>
<span class="token punctuation">}</span>
POST test/_doc
<span class="token punctuation">{</span>
  <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Starting up Elasticsearch 2&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">//搜索：</span>
GET /test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token string">&quot;debug&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//两个文档都会被索引到</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span><span class="token operator">:</span> <span class="token number">36</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;T62Lz4YBD3T716op1iuU&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Starting up Elasticsearch 1&quot;</span><span class="token punctuation">,</span>
          <span class="token property">&quot;level&quot;</span><span class="token operator">:</span> <span class="token string">&quot;debug&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;UK2Lz4YBD3T716op3CtV&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Starting up Elasticsearch 2&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当第一个文档里定义的 <code>level</code> 的值为 <code>debug</code>，那么之后所有的文档将视 <code>debug</code> 为索引 <code>test</code> 字段 <code>level</code> 的默认值。设置映射时如果没有设置 <code>value</code> 值，那么第一个文档中的 <code>value</code> 就是默认值。</p><h4 id="wildcard-通配符" tabindex="-1"><a class="header-anchor" href="#wildcard-通配符" aria-hidden="true">#</a> wildcard 通配符</h4><p><code>wildcard</code> 字段类型是一个专门的 <code>keyword</code> 字段，用于非结构化机器生成的内容，你计划使用 <code>grep-like</code> 的 wildcard 和 regexp 查询进行搜索。wildcard 类型针对具有大值或高基数的字段进行了优化。</p><p>在内部，wildcard 字段使用 <code>ngrams</code> 索引整个字段值，并存储完整字符串。索引用作粗过滤器，通过检索和检查完整值来减少随后检查的值的数量。此字段特别适合在日志行上运行类似 <code>grep</code> 的查询。<code>存储成本通常低于 keyword 字段的存储成本</code>，但在完整术语上精确匹配的搜索速度较慢。如果字段值共享许多前缀，例如同一网站的 URL，则 wildcard 字段的存储成本可能高于等效 keyword 字段。</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//映射：</span>
PUT test
<span class="token punctuation">{</span>
  <span class="token property">&quot;mappings&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;properties&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;wildcard&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//添加数据</span>
POST test/_doc/<span class="token number">1</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;address&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">//搜索文档</span>
GET /test/_search
<span class="token punctuation">{</span>
  <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;wildcard&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;*苏州*&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//匹配结果：</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;took&quot;</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>
  <span class="token property">&quot;timed_out&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">&quot;_shards&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;successful&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;skipped&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">&quot;failed&quot;</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;value&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">&quot;relation&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eq&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;max_score&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;hits&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;_index&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_score&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token string">&quot;江苏省苏州市苏州工业园区&quot;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>wildcard 字段与 keyword 字段一样是未排序的，因此不支持依赖于单词位置的查询，例如短语(phrase)查询。</p><p>运行 wildcard 查询时，将忽略任何重写参数。得分总是一个恒定的分数。</p>`,19);function q(y,g){const a=o("ExternalLinkIcon");return i(),l("div",null,[u,n("p",null,[s("映射字段类型时我们都需要去设置映射参数，更多用法查看"),n("a",r,[s("官方文档"),t(a)]),s("。下面对映射参数简单整理出一个表格，方便查看：")]),d,n("p",null,[n("a",v,[s("官方文档"),t(a)])]),k,n("p",null,[n("a",m,[s("官方文档"),t(a)])]),b])}const _=p(c,[["render",q],["__file","ES字段映射类型测试.html.vue"]]);export{_ as default};
