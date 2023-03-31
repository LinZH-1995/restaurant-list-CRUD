const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const expSession = require('express-session')
const connectFlash = require('connect-flash')

const usePassport = require('./config/passport.js')
const routes = require('./routes')
require('./config/mongoose.js')

const app = express()
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs', helpers: require('./hbs-helper.js') }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(expSession({
  secret: '123',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)

app.use(connectFlash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Now Server is working on localhost:${port} !`)
})