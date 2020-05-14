const express = require('express')
const router = express.Router()

router.get('/invalid', (req, res) => {
  res.status(401).send({
    code: 0,
    message: '无效token'
  })
})

router.get('/expire', (req, res) => {
  res.status(403).send({
    code: 0,
    message: 'token过期'
  })
})

router.post('/postTest', (req, res) => {
  console.log(req.headers)
  res.send({
    code: 0,
    data: req.body
  })
})

module.exports = router