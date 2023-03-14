const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant.js')
const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/restaurants')
const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB connect fail !')
})

db.once('open', () => {
  console.log('MongoDB already connected !')
})

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id/detail', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({id: id})
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Now Server is working on localhost:${port} !`)
})