const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const data = require('./restaurant.json')
const restaurantSeeds = data.results

mongoose.connect('mongodb://127.0.0.1:27017/restaurants')
const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB connect fail !')
})

db.once('open', () => {
  console.log('MongoDB already connected !')
})

restaurantSeeds.forEach(seed => {
  Restaurant.create(seed)
})