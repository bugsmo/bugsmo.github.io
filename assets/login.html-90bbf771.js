import{_ as t,r as i,o as s,c as n,b as e,d as c,e as a,a as l}from"./app-8ca7f52c.js";const d={},r=l('<h1 id="面试官-说说微信小程序的登录流程" tabindex="-1"><a class="header-anchor" href="#面试官-说说微信小程序的登录流程" aria-hidden="true">#</a> 面试官：说说微信小程序的登录流程？</h1><p><img src="https://static.vue-js.com/aa3ccbd0-3428-11ec-8e64-91fdec0f05a1.png" alt=""></p><h2 id="一、背景" tabindex="-1"><a class="header-anchor" href="#一、背景" aria-hidden="true">#</a> 一、背景</h2><p>传统的<code>web</code>开发实现登陆功能，一般的做法是输入账号密码、或者输入手机号及短信验证码进行登录</p><p>服务端校验用户信息通过之后，下发一个代表登录态的 <code>token</code> 给客户端，以便进行后续的交互,每当<code>token</code>过期，用户都需要重新登录</p><p>而在微信小程序中，可以通过微信官方提供的登录能力方便地获取微信提供的用户身份标识，快速建立小程序内的用户体系，从而实现登陆功能</p><p>实现小程序用户体系主要涉及到<code>openid</code>和<code>code</code>的概念：</p><ul><li>调用<code>wx.login()</code>方法会生成<code>code</code>，将<code>code</code>作为参数传递给微信服务器指定接口，就可以获取用户的<code>openid</code></li></ul><p>对于每个小程序，微信都会将用户的微信<code>ID</code>映射出一个小程序 <code>openid</code>，作为这个用户在这个小程序的唯一标识</p><h2 id="二、流程" tabindex="-1"><a class="header-anchor" href="#二、流程" aria-hidden="true">#</a> 二、流程</h2><p>微信小程序登陆具体实现的逻辑如下图所示：</p><p><img src="https://static.vue-js.com/b60638c0-3428-11ec-a752-75723a64e8f5.png" alt=""></p><ul><li>通过 wx.login() 获取到用户的code判断用户是否授权读取用户信息，调用wx.getUserInfo 读取用户数据</li><li>由于小程序后台授权域名无法授权微信的域名，所以需要自身后端调用微信服务器获取用户信息</li><li>通过 wx.request() 方法请求业务方服务器，后端把 appid , appsecret 和 code 一起发送到微信服务器。 appid 和 appsecret 都是微信提供的，可以在管理员后台找到</li><li>微信服务器返回了 openid 及本次登录的会话密钥 session_key</li><li>后端从数据库中查找 openid ，如果没有查到记录，说明该用户没有注册，如果有记录，则继续往下走</li><li>session_key 是对用户数据进行加密签名的密钥。为了自身应用安全，session_key 不应该在网络上传输</li><li>然后生成 session并返回给小程序</li><li>小程序把 session 存到 storage 里面</li><li>下次请求时，先从 storage 里面读取，然后带给服务端</li><li>服务端对比 session 对应的记录，然后校验有效期</li></ul><p>更加详细的功能图如下所示：</p><p><img src="https://static.vue-js.com/c3cfbb70-3428-11ec-8e64-91fdec0f05a1.png" alt=""></p><h2 id="三、扩展" tabindex="-1"><a class="header-anchor" href="#三、扩展" aria-hidden="true">#</a> 三、扩展</h2><p>实际业务中，我们还需要登录态是否过期，通常的做法是在登录态（临时令牌）中保存有效期数据，该有效期数据应该在服务端校验登录态时和约定的时间（如服务端本地的系统时间或时间服务器上的标准时间）做对比</p><p>这种方法需要将本地存储的登录态发送到小程序的服务端，服务端判断为无效登录态时再返回需重新执行登录过程的消息给小程</p><p>另一种方式可以通过调用<code>wx.checkSession</code>检查微信登陆态是否过期：</p><ul><li>如果过期，则发起完整的登录流程</li><li>如果不过期，则继续使用本地保存的自定义登录态</li></ul><p>这种方式的好处是不需要小程序服务端来参与校验，而是在小程序端调用AP，流程如下所示：</p><p><img src="https://static.vue-js.com/8b446d30-349d-11ec-a752-75723a64e8f5.png" alt=""></p><h2 id="参考文献" tabindex="-1"><a class="header-anchor" href="#参考文献" aria-hidden="true">#</a> 参考文献</h2>',23),p={href:"https://segmentfault.com/a/1190000016750340",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/6955754095860776973",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.cnblogs.com/zwh0910/p/13977278.html",target:"_blank",rel:"noopener noreferrer"};function f(_,m){const o=i("ExternalLinkIcon");return s(),n("div",null,[r,e("ul",null,[e("li",null,[e("a",p,[c("https://segmentfault.com/a/1190000016750340"),a(o)])]),e("li",null,[e("a",h,[c("https://juejin.cn/post/6955754095860776973"),a(o)])]),e("li",null,[e("a",u,[c("https://www.cnblogs.com/zwh0910/p/13977278.html"),a(o)])])])])}const b=t(d,[["render",f],["__file","login.html.vue"]]);export{b as default};
