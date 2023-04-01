const express = require('express')
const router = express.Router()
const homePage = require('./modules/homePage.js')
const restaurants = require('./modules/restaurants.js')
const users = require('./modules/users.js')
const auth = require('./modules/auth.js')
const { authenticator } = require('../middleware/auth.js')

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, homePage)

module.exports = router