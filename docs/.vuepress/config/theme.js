import navbar from './navbar'
import sidebar from './sidebar'
import neoTheme from '../theme-neo/lib/node/index'
// import neoTheme from 'vuepress-theme-neo'

export default neoTheme({
    // 默认主题配置项
    navbar,
    sidebar,
    logo: 'https://feyoudao.oss-cn-hongkong.aliyuncs.com/site/favicon.ico',
    contributors: false,
    docsDir: 'docs',
    docsBranch: 'master',
    docsRepo: 'https://github.com/qqlcx5/vuepress-next',
    editLinkPattern: ':repo/edit/:branch/:path',
    sidebarDepth: 0,
    // 主题配置项
    bolgCreateAt: '2023-05-12',
    category: true,
    tag: true,
    column: true,
    archive: true,
    blog: {
        name: 'Star Field',
        intro: 'https://github.com/bugsmo',
        roundAvatar: true,
        avatar: 'https://feyoudao.oss-cn-hongkong.aliyuncs.com/site/star_field.png',
        description: 'いつか、私がヒトじゃなくなっても、この星は燃え尽きることはない。'
    },
    // 文章列表中作者信息
    author: {
        name: '老莫不吃鱼',
        url: 'https://wiki.moweilong.com'
    },
    // 文章页面中风格和背景图
    contentStyle: 'style1',
    contentBackground: '#fff',
    contentImages: [],

    // header information
    homeHeaderInfo: {
        name: '老莫不吃鱼',
        avatar: 'https://feyoudao.oss-cn-hongkong.aliyuncs.com/site/star_field.png',
        description: '🚀https://wiki.moweilong.com/✨'
    },
    homeHeaderImages: [
        {
            path: 'https://blog.zxh.io/img/home-bg/5.jpg',
            mask: 'rgba(65, 60, 55, .2)'
        }
    ]
    // header on home page
})
