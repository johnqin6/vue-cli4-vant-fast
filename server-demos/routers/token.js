const express = require('express')
const router = express.Router()

router.get('/token', (req, res) => {
  res.send({
    code: 0,
    data: 'token'
  })
})

module.exports = router
