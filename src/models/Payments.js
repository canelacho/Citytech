'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const Payment = new Schema({
  paymentid : { type : String },
  photo     : { type : String },
  comment   : { type : String },
  posted    : { type : Date },
  viewed    : { type : Boolean, default : false }
},{ 
  _id : false 
})

module.exports = mongoose.model('Payment', Payment)