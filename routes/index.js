const express = require('express')
const { route } = require('./modules/homePage.js')
const router = express.Router()
const homePage = require('./modules/homePage.js')
const restaurants = require('./modules/restaurants.js')
const users = require('./modules/users.js')

router.use('/restaurants', restaurants)
router.use('/users', users)
router.use('/', homePage)

module.exports = router