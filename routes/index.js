const express = require('express')
const { route } = require('./modules/homePage.js')
const router = express.Router()
const homePage = require('./modules/homePage.js')
const restaurants = require('./modules/restaurants.js')

router.use('/', homePage)
router.use('/restaurants', restaurants)

module.exports = router