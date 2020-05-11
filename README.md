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





