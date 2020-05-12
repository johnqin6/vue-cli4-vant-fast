# vue-cli4-vant-fast

## 简介
----
这是基于`vue-cli4`实现的移动端 h5 开发模板，其中包含项目常用的配置及组件封装，可供快速开发使用。   
技术栈：vue-cli4 + webpack4 + vant + axios + less + postcss-px2rem   

> // 安装依赖   
  npm install | yarn   
> // 本地启动  
  npm run dev | yarn run dev  
  // 生产打包
  npm run build | yarn run build   

主要包括技术点如下： 
- vue-cli4脚手架
- 多环境变量配置   
- vant按需引入
- 移动端rem适配
- axios拦截封装
- util工具类函数封装
- vue-router配置
- 登录权限校验
- vue.config.js配置
- toast组件封装
- confirm组件封装
- 跨域代理设置
- webpack打包可视化分析
- CDN资源优化
- gzip打包优化
- 首页添加骨架屏

## 多环境配置
----
首先我们要了解一下环境变量，一般情况下我们的项目中会有三个环境，开发环境(development), 测试环境(test), 生产(正式)环境(production),我们根据此在项目根目录下将三个配置环境变量的文件
`.env.development`,`.env.test`,`.env.production`   

环境变量文件中只包含环境变量的“键=值”对:   

> NODE_ENV = 'production'   
  VUE_APP_ENV = 'production' // 只有VUE_APP_ENV开头的环境变量可以在项目代码中直接使用   

除了自定义的VUE_APP*变量之外，还有两个可用的变量:   
- NODE_ENV: 'development','production'或'test'中的一个。具体的值取决于应用运行的模式。  
- BASE_URL: vue.config.js中的publicPath 选项相符，即你的应用会部署到的基础路径。  

下面开始配置我们的环境变量    
1、 在项目根目录中新建.env.*   
- .env.development 本地开发环境配置   
```javascript
NODE_ENV = 'development'   
VUE_APP_ENV = 'development'
```   

- .env.staging 测试环境配置   
```javascript
NODE_ENV = 'production'   
VUE_APP_ENV = 'staging'
```

- .env.production 正式环境配置   
```javascript
NODE_ENV = 'production'   
VUE_APP_ENV = 'production'
```   

为了在不同环境配置更多的变量，我们在src文件下新建一个 `config/inde`   

```javascript
// 根据环境引入不同配置 process.env.NODE_ENV
const config = require('./env.' + process.env.VUE_APP_ENV)
module.exports = config
```  
在同级目录下新建`env.development.js`,`env.test.js`,`env.production.js`, 在里面配置需要的变量。   
以 env.development.js为例   
```javascript
module.exports = {
  baseUrl: 'http://localhost:8081', // 项目地址
  baseApi: 'https://www.mock.com/api' // 本地api请求地址
}
```   

2、配置打包命令   
- 通过 `npm run dev`启动本地
- 通过 `npm run test`打包测试
- 通过 `npm run build`打包正式  
```json
"scripts": {
  "dev": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "test": "vue-cli-service build --mode test",
}
```   

## 配置vant
------
vant 是一套轻量、可靠的移动端 Vue 组件库，非常适合基于 vue 技术栈的移动端开发。   
对于第三方 UI组件，如果是全部引入的话，会造成打包体积过大，加载首页白屏时间过长的问题，所以按需加载非常必要。vant也提供了按需加载的方法。`babel-plugin-import`是一款babel插件，它会在编译过程中将import的写法自动转换为按需引入的方式。       

1、安装依赖    
> npm i babel-plugin-import -D | yarn add babel-plugin-import --dev    

2、配置 .babelrc 或者 babel.config.js 文件

```javascript
// 在.babelrc中添加配置
{
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}

// 对于使用 babel7的用户，可以在 babel.config.js中配置
module.exports = {
  plugins: [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }, 'vant']
  ]
}
```

3、 按需引入     
在代码中直接引入 Vant组件，组件会自动通过步骤2按需引入   

```javascript
import Vue from 'vue'
import { Button } from 'vant'

Vue.use(Button)
```   

## 移动端rem适配  
------
移动端适配是移动开发过程中不得不面对的事情。我们可以使用 postcss中 px2rem-loader, 他会将我们项目中的px按一定比例转化为rem, 这样我们就可以用设计图设计的px来愉快的开发，无需自己进行px-rem的转化计算。    
我们将html字跟字体设置为100px（也可以选择设置为375px）,这样0.16rem = 16px, 0.2rem= 20px（相比较设置为275px更加清晰，一目了然）。

具体步骤如下：   
1、安装依赖    
> npm i px2rem-loader --save-dev | yarn add px2rem-loader --dev   

2、在vue.config.js进行如下配置    
```javascript
css: {
  // css预设器配置项
  loaderOptions: {
    postcss: {
      plugins: [
        require('postcss-px2rem')({
          remUnit: 100
        })
      ]
    }
  }
},
```  
3、在main.js设置html跟字体大小   
```javascript
function initRem() {
  let cale = window.screen.availWidth > 750 ? 2 : window.screen.availWidth / 375    
  window.document.documentElement.style.fontSize = `${100 * cale}px`
}

window.addEventListener('resize', function() {
  initRem()
})
```

