import{_ as u,r as l,o as p,c as r,b as n,d as s,e as c,w as a,a as k}from"./app-8ca7f52c.js";const d={},m=n("h1",{id:"viper-包",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#viper-包","aria-hidden":"true"},"#"),s(" viper 包")],-1),v=n("h2",{id:"介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#介绍","aria-hidden":"true"},"#"),s(" 介绍")],-1),b={href:"https://github.com/spf13/viper",target:"_blank",rel:"noopener noreferrer"},g=k('<p><code>viper</code> 包提供了一个配置文件的读取和解析的库，它可以读取多种格式的配置文件，比如 <code>json</code>、<code>yaml</code>、<code>toml</code> 等，并且可以通过 <code>viper</code> 的 <code>Set</code> 方法来设置配置项。</p><h2 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h2>',2),f=n("ul",null,[n("li",null,"config.yml")],-1),h=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"123"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),y=n("ul",null,[n("li",null,"main.go")],-1),_=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`

	`),n("span",{class:"token string"},'"github.com/spf13/viper"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"SetConfigName"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"config"'),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// 设置配置文件名"),s(`
	viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"AddConfigPath"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"."'),n("span",{class:"token punctuation"},")"),s("      "),n("span",{class:"token comment"},"// 设置配置文件路径"),s(`
	viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"SetConfigType"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"yaml"'),n("span",{class:"token punctuation"},")"),s("   "),n("span",{class:"token comment"},"// 设置文件类型"),s(`
	err `),n("span",{class:"token operator"},":="),s(" viper"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"ReadInConfig"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s("   "),n("span",{class:"token comment"},"// 读取配置文件"),s(`
	`),n("span",{class:"token keyword"},"if"),s(" err "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
		`),n("span",{class:"token function"},"panic"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
	fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("viper"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// 读取配置项"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),w=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token string"},'"fmt"'),s(`

    `),n("span",{class:"token string"},'"github.com/spf13/viper"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Set"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"123"'),n("span",{class:"token punctuation"},")"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("viper"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),C=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token string"},'"fmt"'),s(`

    `),n("span",{class:"token string"},'"github.com/spf13/viper"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"SetEnvPrefix"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"test"'),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// 设置环境变量前缀"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"AutomaticEnv"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s("       "),n("span",{class:"token comment"},"// 自动读取环境变量"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("viper"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=n("ul",null,[n("li",null,"main.go")],-1),P=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token string"},'"fmt"'),s(`

    `),n("span",{class:"token string"},'"github.com/spf13/viper"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"BindPFlag"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},","),s(" rootCmd"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Flags"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Lookup"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
    rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Execute"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("viper"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Get"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"var"),s(" rootCmd "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token operator"},"&"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},"{"),s(`
    Use`),n("span",{class:"token punctuation"},":"),s("   "),n("span",{class:"token string"},'"test"'),n("span",{class:"token punctuation"},","),s(`
    Short`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"test"'),n("span",{class:"token punctuation"},","),s(`
    Run`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("cmd "),n("span",{class:"token operator"},"*"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},","),s(" args "),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"test"'),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"init"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Flags"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"StringP"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"n"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'""'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),S=n("ul",null,[n("li",null,"调用示例")],-1),A=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[s("go run main.go "),n("span",{class:"token builtin class-name"},"test"),s(),n("span",{class:"token parameter variable"},"--name"),s(` biao
`),n("span",{class:"token comment"},"# 或者"),s(`
go run main.go `),n("span",{class:"token builtin class-name"},"test"),s(),n("span",{class:"token parameter variable"},"--n"),s(` biao
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),R=n("h2",{id:"项目中使用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#项目中使用","aria-hidden":"true"},"#"),s(" 项目中使用")],-1),E=n("ul",null,[n("li",null,"config.yaml")],-1),N=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"server"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"port"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"8080"),s(`
  `),n("span",{class:"token key atrule"},"host"),n("span",{class:"token punctuation"},":"),s(` localhost

`),n("span",{class:"token key atrule"},"database"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"host"),n("span",{class:"token punctuation"},":"),s(` localhost
  `),n("span",{class:"token key atrule"},"port"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"3306"),s(`
  `),n("span",{class:"token key atrule"},"user"),n("span",{class:"token punctuation"},":"),s(` root
  `),n("span",{class:"token key atrule"},"password"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"123456"),s(`

`),n("span",{class:"token key atrule"},"redis"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"host"),n("span",{class:"token punctuation"},":"),s(` localhost
  `),n("span",{class:"token key atrule"},"port"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token number"},"6379"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),D=n("ul",null,[n("li",null,"main.go")],-1),H=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token string"},'"fmt"'),s(`

    `),n("span",{class:"token string"},'"github.com/spf13/viper"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"type"),s(" Config "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
    Server   ServerConfig
    Database DatabaseConfig
    Redis    RedisConfig
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"type"),s(" ServerConfig "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
    Port `),n("span",{class:"token builtin"},"string"),s(`
    Host `),n("span",{class:"token builtin"},"string"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"type"),s(" DatabaseConfig "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
    Host     `),n("span",{class:"token builtin"},"string"),s(`
    Port     `),n("span",{class:"token builtin"},"string"),s(`
    User     `),n("span",{class:"token builtin"},"string"),s(`
    Password `),n("span",{class:"token builtin"},"string"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"type"),s(" RedisConfig "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
    Host `),n("span",{class:"token builtin"},"string"),s(`
    Port `),n("span",{class:"token builtin"},"string"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"SetConfigName"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"config"'),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// 设置配置文件名"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"AddConfigPath"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"."'),n("span",{class:"token punctuation"},")"),s("      "),n("span",{class:"token comment"},"// 设置配置文件路径"),s(`
	`),n("span",{class:"token comment"},"// 设置文件类型，不设置默认为json，支持json、yaml、toml"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"SetConfigType"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"yaml"'),n("span",{class:"token punctuation"},")"),s(`
    err `),n("span",{class:"token operator"},":="),s(" viper"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"ReadInConfig"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s("   "),n("span",{class:"token comment"},"// 读取配置文件"),s(`
    `),n("span",{class:"token keyword"},"if"),s(" err "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"panic"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"var"),s(` config Config
    err `),n("span",{class:"token operator"},"="),s(" viper"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Unmarshal"),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"&"),s("config"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"if"),s(" err "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"panic"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("config"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),T=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token string"},'"fmt"'),s(`
    `),n("span",{class:"token string"},'"time"'),s(`

    `),n("span",{class:"token string"},'"github.com/fsnotify/fsnotify"'),s(`
    `),n("span",{class:"token string"},'"github.com/spf13/viper"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"type"),s(" Config "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
    Server   ServerConfig
    Database DatabaseConfig
    Redis    RedisConfig
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"type"),s(" ServerConfig "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
    Port `),n("span",{class:"token builtin"},"string"),s(`
    Host `),n("span",{class:"token builtin"},"string"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"type"),s(" DatabaseConfig "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
    Host     `),n("span",{class:"token builtin"},"string"),s(`
    Port     `),n("span",{class:"token builtin"},"string"),s(`
    User     `),n("span",{class:"token builtin"},"string"),s(`
    Password `),n("span",{class:"token builtin"},"string"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"type"),s(" RedisConfig "),n("span",{class:"token keyword"},"struct"),s(),n("span",{class:"token punctuation"},"{"),s(`
    Host `),n("span",{class:"token builtin"},"string"),s(`
    Port `),n("span",{class:"token builtin"},"string"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"SetConfigName"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"config"'),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token comment"},"// 设置配置文件名"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"AddConfigPath"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"."'),n("span",{class:"token punctuation"},")"),s("      "),n("span",{class:"token comment"},"// 设置配置文件路径"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"SetConfigType"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"yaml"'),n("span",{class:"token punctuation"},")"),s("   "),n("span",{class:"token comment"},"// 设置文件类型"),s(`
    err `),n("span",{class:"token operator"},":="),s(" viper"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"ReadInConfig"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s("   "),n("span",{class:"token comment"},"// 读取配置文件"),s(`
    `),n("span",{class:"token keyword"},"if"),s(" err "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"panic"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"var"),s(` config Config
    err `),n("span",{class:"token operator"},"="),s(" viper"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Unmarshal"),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"&"),s("config"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"if"),s(" err "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"panic"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("config"),n("span",{class:"token punctuation"},")"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"WatchConfig"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
    viper`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"OnConfigChange"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("e fsnotify"),n("span",{class:"token punctuation"},"."),s("Event"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"配置文件修改了"'),n("span",{class:"token punctuation"},")"),s(`
        err `),n("span",{class:"token operator"},"="),s(" viper"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Unmarshal"),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"&"),s("config"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token keyword"},"if"),s(" err "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token boolean"},"nil"),s(),n("span",{class:"token punctuation"},"{"),s(`
            `),n("span",{class:"token function"},"panic"),n("span",{class:"token punctuation"},"("),s("err"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
        fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),s("config"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"for"),s(),n("span",{class:"token punctuation"},"{"),s(`
        time`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Sleep"),n("span",{class:"token punctuation"},"("),s("time"),n("span",{class:"token punctuation"},"."),s("Second"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),U=n("h2",{id:"参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考","aria-hidden":"true"},"#"),s(" 参考")],-1),I={href:"https://github.com/spf13/viper",target:"_blank",rel:"noopener noreferrer"},B={href:"https://github.com/spf13/cobra",target:"_blank",rel:"noopener noreferrer"},G=n("li",null,[n("a",{href:"github.com/fsnotify/fsnotify"},"fsnotify 包")],-1);function V(j,F){const o=l("ExternalLinkIcon"),i=l("Tabs");return p(),r("div",null,[m,v,n("p",null,[n("a",b,[s("源码地址"),c(o)])]),g,c(i,{id:"15",data:[{id:"读取配置文件"},{id:"设置配置项"},{id:"读取环境变量"},{id:"读取命令行参数"}],"tab-id":"fruit"},{title0:a(({value:t,isActive:e})=>[s("读取配置文件")]),title1:a(({value:t,isActive:e})=>[s("设置配置项")]),title2:a(({value:t,isActive:e})=>[s("读取环境变量")]),title3:a(({value:t,isActive:e})=>[s("读取命令行参数")]),tab0:a(({value:t,isActive:e})=>[f,h,y,_]),tab1:a(({value:t,isActive:e})=>[w]),tab2:a(({value:t,isActive:e})=>[C]),tab3:a(({value:t,isActive:e})=>[x,P,S,A]),_:1}),R,c(i,{id:"62",data:[{id:"读取项目配置文件"},{id:"热加载配置文件"}],"tab-id":"fruit"},{title0:a(({value:t,isActive:e})=>[s("读取项目配置文件")]),title1:a(({value:t,isActive:e})=>[s("热加载配置文件")]),tab0:a(({value:t,isActive:e})=>[E,N,D,H]),tab1:a(({value:t,isActive:e})=>[T]),_:1}),U,n("ul",null,[n("li",null,[n("a",I,[s("viper 包"),c(o)])]),n("li",null,[n("a",B,[s("cobra"),c(o)])]),G])])}const O=u(d,[["render",V],["__file","viper.html.vue"]]);export{O as default};
