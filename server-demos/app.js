const express = require('express');
const app = express();

//配置 express 使post请求可以拿到请求体的数据
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// 静态资源
app.use(express.static('www'))

// 引入路由文件
const user = require('./routers/api/user')
const demo = require('./routers/api/demo')
const token = require('./routers/token')

app.use('/', token)
app.use('/api/user', user)
app.use('/api/demo', demo)

app.listen(3000, () => {
  console.log('服务器开启: http://localhost:3000')
});
