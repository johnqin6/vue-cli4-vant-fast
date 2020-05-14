const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  console.log(req.headers['authorization'])
  const token = req.headers['authorization'];
  if (token) {
    next();
  } else {
    res.status(401).send({
      code: 0,
      message: '无效token'
    })
  }
})
router.get('/test', (req, res) => {
  res.send({
    code: 0,
    data: '测试数据'
  })
})

module.exports = router;


