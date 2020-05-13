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
- [多环境变量配置](#多环境配置)   
- [vant按需引入](#配置vant)
- [移动端rem适配](#移动端rem适配)
- [vue.config.js配置](#vue.config.js配置)
- 跨域代理设置
- [axios拦截封装](#axios请求封装)
- [util工具类函数封装](#工具类函数封装)
- [vue-router配置](#vue-router配置)
- 登录权限校验
- [toast组件封装](#命令式组件封装)
- [confirm组件封装](#命令式组件封装)
- [使用vconsole用于移动端调试](#使用vconsole用于移动端调试)
- [webpack打包可视化分析](#webpack可视化分析)
- [CDN资源优化](#CDN资源优化)
- [gzip打包优化](#gzip打包优化) 
- [首页添加骨架屏](#首页添加骨架屏)

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

## vue.config.js配置
-------
从vue-cli3开始，新建的脚手架都需要我们在 vue.config.js配置我们项目的东西。主要包括：   
- 打包后文件输出位置
- 关闭生产环境souecemap
- 配置rem 转化 px
- 配置alias别名
- 去除生产环境 console
- 跨域代理设置

此外，还是很多属于优化打包的配置

```javascript
const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin') // 引入gzip压缩插件
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './', // 公共路径
  outputDir: 'dist/static', // 将构建好的文件输出到哪里
  assetsDir: 'static', // 放置生成的静态资源(js、css、img、fonts)的目录。
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: false,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  // 生产环境关闭 source map
  productionSourceMap: false,
  // lintOnSave: true,
  // 配置css
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 100
          })
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },

  // 是一个函数，允许内部的webpack 配置进行更细粒度的修改
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))

    config.optimization.minimizer('terser').tap((args) => {
      // 去除生产环境console
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,

  devServer: {
    host: '0.0.0.0',
    port: 8088, // 端口号
    https: false,
    open: false, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌

    // 配置多个代理
    proxy: {
      '/api': {
        target: 'https://www.mock.com',
        ws: true, // 代理的webSockets
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

```

## axios请求封装
------
1、设置请求拦截和响应拦截   
```javascript
const PRODUCT_URL = 'https://xxxx.com'
const MOCK_URL = 'http://xxxx.com'
let http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? PRODUCT_URL : MOCK_URL
})
// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 设置token, Content-Type
    let token = sessionStorage.getItem('token')
    config.headers['token'] = token
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // 请求显示loading效果
    if (config.loading === true) {
      vm.$loading.show()
    }
    return config
  },
  (error) => {
    vm.$loading.hide()
    return Promise.reject(error)
  }
)
// 响应拦截器
http.interceptors.response.use(
  (res) => {
    vm.$loading.hide()
    // token失效，重新登录
    if (res.data.code === 401) {
      // 重新登录
    }
    return res
  },
  (error) => {
    vm.$loading.hide()
    return Promise.reject(error)
  }
)
```   

2、封装get和post请求方法    
```javascript
function get(url, data, loading) {
  return new Promise((resolve, reject) => {
    http.get(url)
       .then(response => {
         resolve(response)
       },err => {
         reject(err)
       }).catch(err => {
         reject(err)
       })
  })
}

function post(url, data, loading) {
  return new Promise((resolve, reject) => {
    http.post(url, data, { loading: loading })
       .then(response => {
         resolve(response)
       },err => {
         reject(err)
       }).catch(err => {
         reject(err)
       })
  })
}

export { get, post }
```  

3、把get,post方法挂载到vue实例上    
```javascript
// main.js
import { get, post } from './utils/http'
Vue.prototype.$http = { get, post }
```  

## 工具类函数封装
------
1、添加方法到vue实例的原型链上     
```javascript
export default {
  install (Vue, options) {
    Vue.prototype.util = {
      method1(val) {
        ...
      },
      method2(val) {
        ...
      }
    }
  }
}
```   

2、在main.js通过vue.use()注册   
```javascript
import utils from './utils/util'
Vue.use(utils)
```

## 命令式组件封装
-----
1、首先在components文件夹下新建一个toast文件夹并新建一个toast.vue文件  

```html
<template>
  <div>
    <transition name="fade">
      <div class="little-tip" v-show="showLittleTip">
        <span>{{msg}}</span>
      </div>
    </transition>
  </div>

</template>

<script>
export default {
  name: 'little-tip',
  data () {
    return {
      showLittleTip: true,
      msg: '',
      type: '',
      duration: 1500
    }
  },
  mounted () {
    setTimeout(() => {
      this.showLittleTip = false
    }, this.duration)
  }
}
</script>
<style>
  /*...*/
</style>
```


2、 在components 文件夹下新建一个index.js文件
```javascript
import Vue from 'vue'
import Toast from './toast.vue'

const ToastConstructor = Vue.extend(Toast)

let instance 
const toast = function(options) {
  options = options || {}
  instance = new ToastConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}
export default toast

```

3、在main.js中引入并挂载到vue原型上      
```javascript
import toast from './components/toast'
Vue.prototype.$toast = toast
```

4、在页面中使用   
```javascript
export default {
  mounted() {
    this.$toast({
      msg: '提示消息'
    })
  }
}
```

## 使用vconsole用于移动端调试 
-----  
1、npm安装
> npm install vconsole   
2、初始化 & 配置   
在入口文件main.js中加入以下代码    

```javascript
import Vconsole from 'vconsole';
const vConsole = new Vconsole();
```

3、 打印日志  
与pc端打印log一致，可直接使用console.log()等方法直接打印日志  
> console.log('hello world')    

![效果](https://img-blog.csdnimg.cn/20191212142659432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIyNzEzMjAx,size_16,color_FFFFFF,t_70)

4、 注意
VConsole 只是 vConsole 的原型，而非一个已实例化的对象。所以在手动 new 实例化之前，vConsole 不会被插入到网页中;

未加载 vConsole 模块时，console.log() 会直接打印到原生控制台中；加载 vConsole 后，日志会打印到页面前端+原生控制台。

5、配置在不同环境中判断是否显示    
vue-cli3.0项目中让vconsole在开发环境(npm serve时)显示，生产环境(npm run build)不显示  
> npm install vconsole-webpack-plugin --save-dev

在vue.config.js配置如下代码   

```javascript
const vConsolePlugin = require('vconsole-webpack-plugin')
  module.exports = {
  	configureWebpack: config => {
   		 //生产环境去掉vconsole调试器
    	let envType = process.env.NODE_ENV != 'production'
    	let pluginsDev = [
     		 new vConsolePlugin({
       			 filter: [],
      		 	 enable: envType
     		 })
    	]
 
    	config.plugins = [...config.plugins, ...pluginsDev]
   	}
  }
```

在入口文件main.js去除如下代码   
```javascript
// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();
```

如此就实现了开发环境显示，生产环境不显示   

## vue-router配置 
-------
平时很多人对 vue-router 的配置可配置了 path 和 component，实现了路由跳转即可。其实 vue-router 可做的事情还有很多，比如      
- 路由懒加载配置
- 改变单页面应用的 title
- 登录权限检验
- 页面缓存配置  

### 路由懒加载配置

vue项目中实现路由懒加载（按需加载）的3种方式：   
```javascript
// 1、vue异步组件技术
{
  path: '/home',
  name: '/Home',
  component: resolve => require(['../views/Home.vue'], resolve)
}
// 2、es6提案的import()
{
  path: '/home',
  name: '/Home',
  component: import('../views/Home.vue')
}
// 3、webpack提供的require.ensure()
{
  path: '/home',
  name: '/Home',
  component: r => require.ensure([], () => r(require('../views/Home.vue')), 'home')
}
```     

本项目使用的是第二种方式，为了后续webpack打包优化   

### 单页面应用的页面标题  
由于单页面应用只有一个html,所有页面的title标题默认都是不会变化，但是我们可以通过路由配置添加相关属性并在路由守卫中手动修改页面的title。   
```javascript
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
})
```   

### 登录权限校验
在应用中，通常会有以下的场景，比如商城，有些页面是不需要客户登录即可访问，例如首页，商品详情页等，但是也有部分页面需要客户登录后才能访问，例如个人中心，购物车等，这时就需要对页面进行权限控制了。         
此外，有一些记录用户信息和登录状态的项目，也是需要做登陆权限校验的，以防别有用心的人通过直接访问页面的url打开页面。   
此时，路由守卫可以帮助我们做登录校验。     
1、配置路由的meta对象的auth属性    

```javascript
const routes = [{
  path: '/home',
  name: '/Home',
  component: import('../views/Home.vue'),
  meta: {title: '首页', keepAlive: false, auth: false}
},{
  path: '/mine',
  name: '/Mine',
  component: import('../views/Mine.vue'),
  meta: {title: '我的', keepAlive: false, auth: true}
}]
```      

2、在路由首页进行判断。当`to.meta.auth`为`true`(需要登录),且不存在登录信息缓存时，需要重定向去登录页面      

```javascript
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  const userInfo = sessionStorage.getItem('userInfo') || null
  if (!userInfo && to.meta.auth) {
    next('/login')
  } else {
    next()
  }
})
```     

### 页面缓存配置  
项目中，总有一些页面我们是希望加载一次就缓存下来的，此时就用到keep-alive了。keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存，来节约性能，由于是一个抽象组件，所以在vue页面渲染完毕后不会被渲染成一个DOM元素。    
1、通过配置路由的meta对象的 keepAlive属性值来区分页面是否需要缓存   

```javascript
const routes = [{
  path: '/home',
  name: '/Home',
  component: import('../views/Home.vue'),
  meta: {title: '首页', keepAlive: false, auth: false}
},{
  path: '/mine',
  name: '/Mine',
  component: import('../views/Mine.vue'),
  meta: {title: '我的', keepAlive: false, auth: true}
}]
```    
2、在app.vue做缓存判断    

```html
<div id="app">
  <router-view v-if="!$route.meta.keepAlibe"/>
  <keep-alibe>
    <router-view v-if="!$route.meta.keepAlibe"/>
  </keep-alibe>
</div>
```   

## webpack可视化分析   
从这里开始，我们开始进行webpack优化打包。首先我们来分析一下webpack打包性能瓶颈，
找出问题所在，然后才能对症下药。此时就用到webpack-bundle-analyzer.      
1、安装依赖    
> npm i webpack-bundle-analyzer -D || yarn add  webpack-bundle-analyzer -D   

2、在vue.config.js配置    
```javascript
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
configureWebpack: (config) => {
  // webpack可视化分析 打包后会看到依赖图
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new BundleAnalyzerPlugin())
  }
},
```    
包后会看到依赖图如下：   
![图片](https://user-gold-cdn.xitu.io/2020/5/10/171fc78ad5a37759?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)    

从以上的界面中，我们可以得到以下信息：

- 打包出的文件中都包含了什么，以及模块之间的依赖关系
- 每个文件的大小在总体中的占比，找出较大的文件，思考是否有替换方案，是否使用了它包含了不必要的依赖？
- 是否有重复的依赖项，对此可以如何优化？
- 每个文件的压缩后的大小。

## CDN资源优化  
------
CDN的全称是`Content Delivery Network`,即内容分发网络。CDN是构建在网络上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN的关键技术主要有内容存储和分发技术。     

随着项目越做越大，依赖的第三方npm包越来越多，构建之后的文件也会越来越大。再加上又是单页应用，这就会导致在网速较慢或者服务器带宽有限的情况出现长时间的白屏。此时我们可以使用CDN的方法，优化网络加载速度。     

1、将`vue, vue-router,vuex,axios`这些vue全家桶的资源，全部改为通过CDN链接获取，在`index.html`里插入相关链接。   
```html
<body>
  <div id="app"></div>
  <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>
  <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script>
  <script src="https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js"></script>
  <script src="https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js"></script>
  <script src="https://cdn.bootcss.com/element-ui/2.6.1/index.js"></script>
</body>
```    

2、在`vue.config.js`配置externals属性

```javascript
module.exports = {
  // ...
  externals: {
    'vue': 'Vue',
    'vuex': 'Vuex',
    'vue-router': 'VueRouter',
    'axios': 'axios'
  }
}
```     
3、卸载相关依赖的npm包   
> npm uninstall vue vue-router vuex axios | yarn remove vue vue-router vuex axios     

此时启动项目运行就可以了。我们在控制台就能发现项目加载了以上四个 CDN 资源。
不过现在有不少声音说，vue 全家桶加载 CDN 资源其实作用并不大，而且公共的 CDN 资源也没有 npm 包那么稳定，这个就见仁见智了。所以我在源码时新建的分支做这个优化。当项目较小的就不考虑 CDN 优化了。
当然，当引入其他较大第三方资源，比如 echarts，AMAP(高德地图)，采用 CDN 资源还是很有必要的。


## gzip打包优化
所有现在浏览器都支持gzip压缩，启用gzip压缩可大幅度缩减传输资源大小，从而缩短资源下载时间，减少首次白屏时间，提升用户体验。  
gzip对基于文本格式文件的压缩效果最好(如js,css和html)，在压缩较大文件时往往可实现70-90%的压缩率，对已经压缩过的资源(如：图片)进行gzip压缩处理，效果很不好。    
```javascript

```
