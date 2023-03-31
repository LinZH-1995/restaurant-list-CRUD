const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user.js')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    const error = 'Password 與 Confirm Password 必須一致！'
    return res.render('register', { name, email, password, confirmPassword, error })
  }

  return User.findOne({ email })
    .then(user => {
      if (user) {
        const error = 'Email 已經註冊過了。'
        return res.render('register', { name, email, password, confirmPassword, error })
      }

      return User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err) }

    req.flash('success_msg', '已成功登出！')
    res.redirect('/users/login')
  })
})

module.exports = router