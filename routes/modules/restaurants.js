const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const newData = req.body
  return Restaurant.create({
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

router.get('/:id/detail', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))

})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const newData = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      // restaurant.name = newData.name
      // restaurant.category = newData.category
      // restaurant.image = newData.image
      // restaurant.location = newData.location
      // restaurant.phone = newData.phone
      // restaurant.google_map = newData.google_map
      // restaurant.rating = newData.rating
      // restaurant.description = newData.description
      restaurant = Object.assign(restaurant, newData)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/detail`))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.deleteOne({ _id: id })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/sort/:condition', (req, res) => {
  const condition = req.params.condition
  switch (condition) {
    case 'A-Z':
      return Restaurant.find()
        .lean()
        .sort({ name: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

    case 'Z-A':
      return Restaurant.find()
        .lean()
        .sort({ name: 'desc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

    case 'category':
      return Restaurant.find()
        .lean()
        .sort({ category: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

    case 'rating':
      return Restaurant.find()
        .lean()
        .sort({ rating: 'desc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
  }
})

module.exports = router