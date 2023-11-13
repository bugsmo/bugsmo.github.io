import{_ as e,o as n,c as i,a as d}from"./app-8ca7f52c.js";const a={},s=d(`<h1 id="nginx-websocket-配置" tabindex="-1"><a class="header-anchor" href="#nginx-websocket-配置" aria-hidden="true">#</a> Nginx WebSocket 配置</h1><p>HTTP 是基于 TCP 的，通过 TCP 收发的消息用 HTTP 的应用层协议解析。WebSocket 是首先通过 HTTP 协议把 TCP 连接建立好，然后通过 Upgrade 字段进行协议转换，在收到服务器的 101 Switching Protocols 应答之后，后续的 TCP 消息就通过 WebSocket 协议解析。</p><h2 id="nginx-开启-websocket" tabindex="-1"><a class="header-anchor" href="#nginx-开启-websocket" aria-hidden="true">#</a> Nginx 开启 WebSocket</h2><p>编辑 nginx.conf，在 http 区域内一定要添加下面配置：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>map $http_upgrade $connection_upgrade {
    default upgrade;
    &#39;&#39; close;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释一下 map 指令的作用：该作用主要是根据客户端请求中的值，来构造改变 connection_upgrade 的值，即根据变量的值创建新的变量 connection_upgrade，创建的规则就是{}里面的东西。其中的规则没有做匹配，因此使用默认的，即 http_upgrade 为空字符串的话，那么值就是 close。</p><p>编辑 vhosts 下虚拟主机的配置文件，在 location 匹配配置中添加如下内容：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection &quot;$connection_upgrade&quot;;
# proxy_set_header Connection &quot;Upgrade&quot;; 写死为 Upgrade 也可以
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>默认情况下，如果代理服务器在 60 秒内没有传输任何数据，连接将被关闭。可以使用 proxy_read_timeout 指令增加此超时 。</p></div><h2 id="nginx-代理-websocket-保持长连接" tabindex="-1"><a class="header-anchor" href="#nginx-代理-websocket-保持长连接" aria-hidden="true">#</a> Nginx 代理 webSocket 保持长连接</h2><p>这个问题在于 nginx 的配置上，需要配置几个超时的设置。如下：</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>http {
    server {
        location / {
            root   html;
            index  index.html index.htm;
            proxy_pass http://sre_backend;
            proxy_http_version 1.1;
            proxy_connect_timeout 5s;
            proxy_read_timeout 60s;
            proxy_send_timeout 30s;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection &quot;$connection_upgrade&quot;;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>proxy_read_timeout</code> 参数默认值 60 秒,该指令设置与代理服务器的读超时时间。它决定了 nginx 会等待多长时间来获得请求的响应。这个时间不是获得整个 response 的时间，而是两次 reading 操作的时间。即是服务器对你等待最大的时间，也就是说当你使用 nginx 转发 webSocket 的时候，如果 60 秒内没有通讯，依然是会断开的，所以，你可以按照你的需求来设定。比如说，我设置了 5 分钟，那么如果我 5 分钟内有通讯，或者 5 分钟内有做心跳的话，是可以保持连接不中断的。所以这个时间是看你的业务需求来调整时间长短的。</p><p><code>proxy_send_timeout</code> 参数默认值 60s,设置了发送请求给 upstream 服务器的超时时间。超时设置不是为了整个发送期间，而是在两次 write 操作期间。如果超时后，upstream 没有收到新的数据，nginx 会关闭连接。</p>`,14),r=[s];function t(o,c){return n(),i("div",null,r)}const p=e(a,[["render",t],["__file","Nginx WebSocket 配置.html.vue"]]);export{p as default};
