import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/XWTYinterfaceDocs/',
  srcDir:"docs",
  title: "玄武通云",
  description: "玄武通云开放平台接口文档",
  themeConfig: {
    // 页面logo
    logo:"/玄武Logo.png",
    // https://vitepress.dev/reference/default-theme-config
    // 顶部nav
    nav: [
      { text: '首页', link: '/' },
      { text: '玄武通云', items:[
        {text:"玄武通云接口文档",link: '/xwty'}
      ] }
    ],
    // 左侧栏
    sidebar: [
      {
        text: '文档目录',
        items: [
          { text: '玄武通云', link: '/xwty' },
        ]
      }
    ],
    // 右上角跳转
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    // 底部
    footer:{
      copyright:"Copyright@  2018 玄武通云信息科技有限公司"
    },
    // 搜索框
    search:{
      provider:"local",
      options:{
        translations:{
          button:{
            buttonText:'搜索文档',
            buttonAriaLabel:"搜索文档"
          },
          modal:{
            noResultsText:"无法找到相关结果",
            resetButtonTitle:"清除查询条件",
            footer:{
              selectText:"选择",
              navigateText:"切换"
            }
          }
        }
      }
    }
  }
})
