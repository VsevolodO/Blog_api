
const express = require('express')
const router = express.Router()
const controller = require('../controllers/blog')

router.post('/add', controller.add)
// router.get('/get',controller.get_posts)

module.exports = router