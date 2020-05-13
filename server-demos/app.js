const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello, world')
})

app.get('/test', (req, res) => {
  res.send({
    code: 0,
    data: []
  })
})

app.listen(3000, () => {
  console.log('服务器开启: http://localhost:3000')
});
