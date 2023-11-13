import{_ as a,o as r,c as i,a as e}from"./app-8ca7f52c.js";const d={},l=e('<h1 id="es-的-shard-replica-机制" tabindex="-1"><a class="header-anchor" href="#es-的-shard-replica-机制" aria-hidden="true">#</a> ES 的 shard&amp;replica 机制</h1><h2 id="shard-replica-机制" tabindex="-1"><a class="header-anchor" href="#shard-replica-机制" aria-hidden="true">#</a> shard&amp;replica 机制</h2><ol><li>index 包含多个 shard。</li><li>每个 shard 都是一个最小工作单元，承载部分数据，lucene 实例，完整的建立索引和处理请求的能力。</li><li>增减节点时，shard 会自动在 nodes 中负载均衡。</li><li>primary shard 和 replica shard，每个 document 肯定只存在于某一个 primary shard 以及其对应的 replica shard 中，不可能存在于多个 primary shard。</li><li>replica shard 是 primary shard 的副本，负责容错，以及承担读请求负载。</li><li>primary shard 的数量在创建索引的时候就固定了，replica shard 的数量可以随时修改。</li><li>primary shard 的默认数量是 5，replica 默认是 1，默认有 10 个 shard，5 个 primary shard，5 个 replica shard。</li><li>primary shard 不能和自己的 replica shard 放在同一个节点上（否则节点宕机，primary shard 和副本都丢失，起不到容错的作用），但是可以和其他 primary shard 的 replica shard 放在同一个节点上。</li></ol><h2 id="单-data-node-环境下创建-index-是什么样子的" tabindex="-1"><a class="header-anchor" href="#单-data-node-环境下创建-index-是什么样子的" aria-hidden="true">#</a> 单 data node 环境下创建 index 是什么样子的</h2><ol><li>单 node 环境下，创建一个 index，有 3 个 primary shard，3 个 replica shard。</li><li>集群 status 是 yellow。</li><li>这个时候，只会将 3 个 primary shard 分配到仅有的一个 node 上去，另外 3 个 replica shard 是无法分配的。</li><li>集群可以正常工作，但是一旦出现节点宕机，数据全部丢失，而且集群不可用，无法承接任何请求。</li></ol><h2 id="_2-个-node-环境下-replica-shard-是如何分配的" tabindex="-1"><a class="header-anchor" href="#_2-个-node-环境下-replica-shard-是如何分配的" aria-hidden="true">#</a> 2 个 node 环境下 replica shard 是如何分配的</h2><ol><li>replica shard 分配：3 个 primary shard，3 个 replica shard，1 node。</li><li>primary —&gt; replica 同步。</li><li>读请求：primary/replica。</li></ol>',7),h=[l];function s(c,p){return r(),i("div",null,h)}const o=a(d,[["render",s],["__file","ES的shard_replica机制.html.vue"]]);export{o as default};
