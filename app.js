const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant.js')
const routes = require('./routes')
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

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs', helpers: require('./hbs-helper.js') }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(routes)

app.listen(port, () => {
  console.log(`Now Server is working on localhost:${port} !`)
})