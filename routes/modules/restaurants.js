const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const newData = req.body
  return Restaurant.create(Object.assign({ userId }, newData))
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id/detail', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ userId, _id })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ userId, _id })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))

})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const newData = req.body
  return Restaurant.findOne({ userId, _id })
    .then(restaurant => {
      // restaurant.name = newData.name
      restaurant = Object.assign(restaurant, newData)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}/detail`))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.deleteOne({ userId, _id })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/sort/:condition', (req, res) => {
  const userId = req.user._id
  const condition = req.params.condition
  switch (condition) {
    case 'A-Z':
      return Restaurant.find({ userId })
        .lean()
        .sort({ name: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

    case 'Z-A':
      return Restaurant.find({ userId })
        .lean()
        .sort({ name: 'desc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

    case 'category':
      return Restaurant.find({ userId })
        .lean()
        .sort({ category: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))

    case 'rating':
      return Restaurant.find({ userId })
        .lean()
        .sort({ rating: 'desc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
  }
})

module.exports = router