const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

router.use(express.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  // restaurantList.results.name
  // restaurantList.results.name_en
  // restaurantList.results.category
  return Restaurant.find()
    .lean()
    .then(restaurants => {
      return restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
      )
    })
    .then(searchResult => res.render('index', { restaurants: searchResult, keyword: keyword }))
    .catch(error => console.error(error))
})

module.exports = router