'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema({
  username    : String,
  password    : String,
  rol         : String,
  iddoc       : String,
  nacionality : String,
  firstname   : String,
  lastname    : String,
  birthday    : Date,
  photo       : String,
  address     : String,
  zip         : String,
  country     : String,
  state       : String,
  city        : String,
  observation : String,
  father      : { 
    firstname : String,
    lastname  : String,
    phone     : String, 
    email     : String 
  },
  mother      : { 
    firstname : String,
    lastname  : String,
    phone     : String,
    email     : String
  },
  authorized  : String,
  created     : Date,
  active      : Boolean,
  grade       : String,
  price       : Number,
  payments    : Array,
  history     : Array,
  messages    : Array,
  charges     : Array
})

module.exports = mongoose.model('User', User)