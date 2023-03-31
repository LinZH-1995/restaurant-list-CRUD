const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const expSession = require('express-session')

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

app.use(routes)

app.listen(port, () => {
  console.log(`Now Server is working on localhost:${port} !`)
})