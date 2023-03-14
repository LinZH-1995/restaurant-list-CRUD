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

app.get('/restaurants/new', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => {
      const targetID = restaurants.reduce((acc, cur) => {
        const id = Math.max(acc, Number(cur.id))
        return id
      }, 0)
      return targetID
    })
    .then(id => res.render('new', { ID: id + 1 }))
    .catch(error => console.error(error))
})

app.post('/restaurants', (req, res) => {
  const newData = req.body
  return Restaurant.create({
    id: newData.id,
    name: newData.name,
    category: newData.category,
    image: newData.image,
    location: newData.location,
    phone: newData.phone,
    google_map: newData.google_map,
    rating: Number(newData.rating),
    description: newData.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id/detail', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ id: id })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ id: id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))

})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const newData = new Restaurant(req.body)
  return Restaurant.findOne({ id: id })
    .then(restaurant => {
      restaurant.id = id
      restaurant.name = newData.name
      restaurant.category = newData.category
      restaurant.image = newData.image
      restaurant.location = newData.location
      restaurant.phone = newData.phone
      restaurant.google_map = newData.google_map
      restaurant.rating = newData.rating
      restaurant.description = newData.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/detail`))
    .catch(error => console.error(error))
})

app.post('/restaurant/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findOne({ id })
    .then(restaurant => {
      restaurant.deleteOne()
    })
    .then(() => {
      Restaurant.find()
      .then(restaurants => {
        restaurants.forEach(restaurant => {
          if (restaurant.id > id) {
            restaurant.id = (Number(restaurant.id) - 1).toString()
          }
        })
        restaurants.forEach(restaurant => {
          const newData = new Restaurant(restaurant)
          newData.save()
        })
      })
      
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Now Server is working on localhost:${port} !`)
})