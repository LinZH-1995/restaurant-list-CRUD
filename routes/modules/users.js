const express = require('express')
const router = express.Router()
const User = require('../../models/user.js')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  return User.findOne({ email })
    .then(user => {
      if (!user) return res.redirect('/users/login')
      if (user.password !== password ) return res.render('login', { email })

      return res.redirect('/')
    })
    .catch(err => console.log(err))
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  return User.findOne({ email })
    .then(user => {
      if (user) return res.render('register', { name, email, password, confirmPassword })

      return User.create({ name, email, password })
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router