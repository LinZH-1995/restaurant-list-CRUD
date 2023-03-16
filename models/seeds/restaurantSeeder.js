const db = require('../../config/mongoose.js')
const Restaurant = require('../restaurant.js')
const data = require('./restaurant.json')
const restaurantSeeds = data.results

db.once('open', () => {
  restaurantSeeds.forEach(seed => {
    Restaurant.create(seed)
  })
  console.log('Seeds already import !')
})

