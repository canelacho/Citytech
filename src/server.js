const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const port = 3000
const session = require('express-session')
const checkSession = require('./middlewares/sessions')
const app = express()

const apiLogin = require('../src/routes/login')
const apiUsers = require('../src/routes/users') 
const apiPayments = require('../src/routes/payments')
const dashboard = require('../src/routes/dashboard')

mongoose.connect('mongodb://localhost/citykids')
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err))

//Setting

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(session({
  secret : 'citytech',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge : 6 * 30 * 24 * 60 * 60 * 1000
  }
}))

//Routes
app.use('/api/login', apiLogin)
app.use('/api/users', apiUsers)
app.use('/api/payments', apiPayments)
//app.use('/dashboard', checkSession, dashboard)


//Statics Files
app.use(express.static(__dirname + '/public'))


//Server Listening
app.listen(port, () => {
  console.log(`Server on port ${port}`)
})