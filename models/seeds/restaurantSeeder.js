if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose.js')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const data = require('./restaurant.json')
const e = require('connect-flash')
const { use } = require('passport')

const restaurantSeeds = data.results

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantSeeds: restaurantSeeds.slice(0, 3)  // [{restaurant1}, {restaurant2}, {restaurant3}]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantSeeds: restaurantSeeds.slice(3, 6)
  }
]

db.once('open', () => {

  // SEED_USERS.forEach(user => {
  //   const { name, email, password, restaurantSeeds } = user  // restaurantSeeds = [{restaurant1}, {restaurant2}, {restaurant3}]
  //   bcrypt.genSalt(10)
  //     .then(salt => bcrypt.hash(password, salt))
  //     .then(hash => User.create({ name, email, password: hash }))
  //     .then(newUser => {
  //       const userId = newUser._id
  //       return restaurantSeeds.map(restaurant => Object.assign(restaurant, { userId }))
  //     })
  //     .then(restaurantSeeds => Restaurant.insertMany(restaurantSeeds))
  //     .then(() =>{
  //       console.log('Seeds already import !')
  //       process.exit()
  //     })
  //     .catch(err => console.log(err))
  // })

  Promise.all(Array.from({ length: 2 }, (element, index) => {
    return bcrypt.genSalt(10).then(salt => bcrypt.hash(SEED_USERS[index].password, salt))
  }))
    .then(hashs => User.insertMany(SEED_USERS.map((user, index) => { return { name: user.name, email: user.email, password: hashs[index] } })))
    .then(users => Promise.all(Array.from({ length: 2 }, (element, index) => {
        const email = users[index].email
        const restaurantSeeds = SEED_USERS.find(user => user.email === email).restaurantSeeds
        const userId = users[index]._id
        return Restaurant.insertMany(restaurantSeeds.map(restaurant => Object.assign(restaurant, { userId })))
      })))
    .then(() => console.log('Seeds already import !'))
    .then(() => process.exit())
    .catch(err => console.log(err))

})

