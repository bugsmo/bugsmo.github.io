import{_ as u,r as o,o as p,c as r,b as n,d as s,e as c,w as a}from"./app-8ca7f52c.js";const k={},d=n("h1",{id:"cobra-包",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#cobra-包","aria-hidden":"true"},"#"),s(" cobra 包")],-1),m=n("h2",{id:"介绍",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#介绍","aria-hidden":"true"},"#"),s(" 介绍")],-1),b={href:"https://github.com/spf13/cobra",target:"_blank",rel:"noopener noreferrer"},v=n("p",null,[n("code",null,"cobra"),s(" 包提供了一个命令行的解析和执行的库，它可以通过 "),n("code",null,"cobra"),s(" 的 "),n("code",null,"AddCommand"),s(" 方法来添加子命令。")],-1),g=n("h2",{id:"用法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#用法","aria-hidden":"true"},"#"),s(" 用法")],-1),h=n("ul",null,[n("li",null,"main.go")],-1),f=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`

	`),n("span",{class:"token string"},'"github.com/spf13/cobra"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"var"),s(" rootCmd "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token operator"},"&"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},"{"),s(`
	Use`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"root"'),n("span",{class:"token punctuation"},","),s(`
	Run`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("cmd "),n("span",{class:"token operator"},"*"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},","),s(" args "),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"this is root"'),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"var"),s(" subCmd "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token operator"},"&"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},"{"),s(`
	Use`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"sub"'),n("span",{class:"token punctuation"},","),s(`
	Run`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("cmd "),n("span",{class:"token operator"},"*"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},","),s(" args "),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"this is sub"'),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"AddCommand"),n("span",{class:"token punctuation"},"("),s("subCmd"),n("span",{class:"token punctuation"},")"),s(`
	rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Execute"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),_=n("ul",null,[n("li",null,"执行")],-1),C=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,`$ go run main.go
this is root
$ go run main.go sub
this is sub
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),w=n("ul",null,[n("li",null,"main.go")],-1),y=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token string"},'"fmt"'),s(`

    `),n("span",{class:"token string"},'"github.com/spf13/cobra"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"var"),s(" rootCmd "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token operator"},"&"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},"{"),s(`
    Use`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"root"'),n("span",{class:"token punctuation"},","),s(`
    Run`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("cmd "),n("span",{class:"token operator"},"*"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},","),s(" args "),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"this is root"'),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"var"),s(" subCmd "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token operator"},"&"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},"{"),s(`
    Use`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"sub"'),n("span",{class:"token punctuation"},","),s(`
    Run`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("cmd "),n("span",{class:"token operator"},"*"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},","),s(" args "),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"this is sub"'),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"AddCommand"),n("span",{class:"token punctuation"},"("),s("subCmd"),n("span",{class:"token punctuation"},")"),s(`
    rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"PersistentFlags"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"StringP"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"n"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'""'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},")"),s(`
    rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Execute"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

	name `),n("span",{class:"token operator"},":="),s(" rootCmd"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Flag"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),s("Value"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"String"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token keyword"},"if"),s(" name "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token string"},'""'),s(),n("span",{class:"token punctuation"},"{"),s(`
        fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name:"'),n("span",{class:"token punctuation"},","),s(" name"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=n("ul",null,[n("li",null,"执行")],-1),P=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[s(`$ go run main.go
this is root
$ go run main.go sub
this is sub `),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),s(`
$ go run main.go sub `),n("span",{class:"token parameter variable"},"-n"),s(` biao
this is sub
name: biao
$ go run main.go sub `),n("span",{class:"token parameter variable"},"--name"),s(` biao
this is sub
name: biao
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),$=n("ul",null,[n("li",null,"main.go")],-1),A=n("div",{class:"language-go line-numbers-mode","data-ext":"go"},[n("pre",{class:"language-go"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(` main

`),n("span",{class:"token keyword"},"import"),s(),n("span",{class:"token punctuation"},"("),s(`
	`),n("span",{class:"token string"},'"fmt"'),s(`

	`),n("span",{class:"token string"},'"github.com/spf13/cobra"'),s(`
`),n("span",{class:"token punctuation"},")"),s(`

`),n("span",{class:"token keyword"},"var"),s(" rootCmd "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token operator"},"&"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},"{"),s(`
	Use`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"root"'),n("span",{class:"token punctuation"},","),s(`
	Run`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("cmd "),n("span",{class:"token operator"},"*"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},","),s(" args "),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"this is root"'),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"var"),s(" subCmd "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token operator"},"&"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},"{"),s(`
	Use`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token string"},'"sub"'),n("span",{class:"token punctuation"},","),s(`
	Run`),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token keyword"},"func"),n("span",{class:"token punctuation"},"("),s("cmd "),n("span",{class:"token operator"},"*"),s("cobra"),n("span",{class:"token punctuation"},"."),s("Command"),n("span",{class:"token punctuation"},","),s(" args "),n("span",{class:"token punctuation"},"["),n("span",{class:"token punctuation"},"]"),n("span",{class:"token builtin"},"string"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"this is sub"'),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"func"),s(),n("span",{class:"token function"},"main"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
	rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"AddCommand"),n("span",{class:"token punctuation"},"("),s("subCmd"),n("span",{class:"token punctuation"},")"),s(`
	rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"PersistentFlags"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"StringP"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"n"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'""'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},")"),s(`
	subCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Flags"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"StringP"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"age"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"a"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'""'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"age"'),n("span",{class:"token punctuation"},")"),s(`
	rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Flags"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"StringP"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"path"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"p"'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'""'),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},'"path"'),n("span",{class:"token punctuation"},")"),s(`
	rootCmd`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Execute"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

	name `),n("span",{class:"token operator"},":="),s(" rootCmd"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Flag"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),s("Value"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"String"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token keyword"},"if"),s(" name "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token string"},'""'),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"name:"'),n("span",{class:"token punctuation"},","),s(" name"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`

	path `),n("span",{class:"token operator"},":="),s(" rootCmd"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Flag"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"path"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),s("Value"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"String"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token keyword"},"if"),s(" path "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token string"},'""'),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"path:"'),n("span",{class:"token punctuation"},","),s(" path"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`

	age `),n("span",{class:"token operator"},":="),s(" subCmd"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Flag"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"age"'),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"."),s("Value"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"String"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token keyword"},"if"),s(" age "),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token string"},'""'),s(),n("span",{class:"token punctuation"},"{"),s(`
		fmt`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Println"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string"},'"age:"'),n("span",{class:"token punctuation"},","),s(" age"),n("span",{class:"token punctuation"},")"),s(`
	`),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),F=n("ul",null,[n("li",null,"执行")],-1),S=n("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[n("pre",{class:"language-bash"},[n("code",null,[s(`$ go run main.go
this is root
$ go run main.go sub
this is sub
$ go run main.go sub `),n("span",{class:"token parameter variable"},"-n"),s(` biao
this is sub
name: biao
$ go run main.go sub `),n("span",{class:"token parameter variable"},"--name"),s(` biao
this is sub
name: biao
$ go run main.go sub `),n("span",{class:"token parameter variable"},"-n"),s(" biao "),n("span",{class:"token parameter variable"},"-a"),s(),n("span",{class:"token number"},"18"),s(`
this is sub
name: biao
age: `),n("span",{class:"token number"},"18"),s(`
$ go run main.go sub `),n("span",{class:"token parameter variable"},"-n"),s(" biao "),n("span",{class:"token parameter variable"},"--age"),s(),n("span",{class:"token number"},"18"),s(`
this is sub
name: biao
age: `),n("span",{class:"token number"},"18"),s(`
$ go run main.go `),n("span",{class:"token parameter variable"},"-n"),s(" biao "),n("span",{class:"token parameter variable"},"-p"),s(` /home
this is root
name: biao
path: /home
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1);function V(E,R){const l=o("ExternalLinkIcon"),i=o("Tabs");return p(),r("div",null,[d,m,n("p",null,[n("a",b,[s("cobra"),c(l)])]),v,g,c(i,{id:"15",data:[{id:"添加子命令"},{id:"添加参数"},{id:"添加子命令参数"}],"tab-id":"fruit"},{title0:a(({value:t,isActive:e})=>[s("添加子命令")]),title1:a(({value:t,isActive:e})=>[s("添加参数")]),title2:a(({value:t,isActive:e})=>[s("添加子命令参数")]),tab0:a(({value:t,isActive:e})=>[h,f,_,C]),tab1:a(({value:t,isActive:e})=>[w,y,x,P]),tab2:a(({value:t,isActive:e})=>[$,A,F,S]),_:1})])}const B=u(k,[["render",V],["__file","cobra.html.vue"]]);export{B as default};
