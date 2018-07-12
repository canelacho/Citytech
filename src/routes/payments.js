'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const mongoose = require('mongoose')
const Formidable = require('formidable')

const Payments = require('../models/Payments')
const User = require('../models/Users')

router.get('/', async (req, res) => {
  const payments = await Payments.find() 
  res.json({
    status : 'Payments found',
    data : payments
  })
})

router.get('/:id', async (req, res) => {
  const payment = await Payments.findById(req.params.id)
  res.json({
    status : 'Payment Found',
    data : payment
  })
})

router.post('/', async (req, res) => {
  let photosaved = ''
  let newId = mongoose.Types.ObjectId();
  console.log(`STARTING upload file`) 

  try{
    const form = new Formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = './src/public/uploads/payments'
    form.keepExtensions = true
    form.type = true
    form.maxFieldsSize = 10 * 1024 * 1024
    form.maxFileSize = 200 * 1024 * 1024
    form.maxFields = 1000
    form.multiples = false
    form.bytesReceived
    form.bytesExpected

    form.on('file', function(field, file) {
      //rename the incoming file to the file's name
      console.log(`campos : ${JSON.stringify(field)}`)
      console.log(`archivo : ${JSON.stringify(file)}`)
      photosaved = 'payment-' + newId + '.jpg'
      fs.rename(file.path, form.uploadDir + '/'+ photosaved);
    })
    form.on('error', function(err) {
      console.log(`an error has occured with form upload`)
      console.log(err)
    })
    form.on('aborted', function(err) {
      console.log(`user aborted upload`)
    })

    await form.parse(req, function(err, fields, files) {
      console.log(`Watching what is incoming : ${fields}`)
      console.log(`is there some files? : ${files}`)
      if(err){
        res.json({
          status  : `Failed uploading, error : ${err}`,
          data    : {},
        })
      }
      if(files){
        const createdAt = new Date() // Insta new Date
        console.log('new date : ', createdAt)
        const miliseconds = createdAt.getTime() // get time from Insta
        console.log('actually time : ', miliseconds)
        createdAt.setTime( miliseconds - (5 * 3600000) ) // add local timezone -5 UTC
        console.log('new date with time : ', createdAt)
        console.log('readeable : ', createdAt.toLocaleString())
        console.log('value from fields comment: ', fields.comment)
        console.log('value from fields userId: ', fields.userId)


        const newPayments = new Payments({
          paymentid : newId,
          photo     : photosaved,
          comment   : fields.comment,
          posted    : createdAt
        })
        const query = { "_id" : fields.userId}
        const conditions =  { $push : { payments : newPayments } }
        const options = {}
        const callbackFound = (err, result)=> { 
          if(!err){ console.log('result : ' , result)}
          else { console.log('err : ', err) }
        }
        User.findOneAndUpdate(query, conditions, options, callbackFound)
        // newPayments.save()
        res.json({
          status  : 'Payment Saved and Upload image successfully',
          data    : newPayments,
          upload  : files.photo
        })
      } else {
        res.json({
          status          : 'No images to upload',
          data            : {},
          numberOfImages  : 0
        })
      }
    })
  }
  catch(err){ res.json( { status : "error : ", err } ) }
})

router.delete('/:userid/:paymentid/:img', async (req, res) => {
  console.log(`Usuario ${req.params.userid}, Payment ${req.params.paymentid}, img ${req.params.img}`)
  const query = { _id : req.params.userid }
  const conditions = { $pull : { payments : { paymentid : req.params.paymentid  } } }
  const options = {}
  const callbackFound = (err, result)=> { 
    if(!err){ console.log('result : ' , result)}
    else { console.log('err : ', err) }
  }
  
  const payment = await User.findOneAndUpdate(query, conditions, options, callbackFound)
  
  const filePath = './src/public/uploads/payments/' + req.params.img 
  fs.stat(filePath, function(err, stats) {
    if(!err) { fs.unlinkSync(filePath) }
    else { console.log(err) }
  })
  res.json({
    status  : 'Payment deleted',
    data    : payment
  })
})


router.post('/update-status/:userid/:paymentid/:value', async (req, res) => {
  const query = { _id : req.params.userid, 'payments.paymentid' : req.params.paymentid }
  let valueBoolean = req.params.value == 'true' ? true : false
  const conditions = { $set : { "payments.$.viewed" : valueBoolean  } }
  const options = {}
  const callbackFound = (err, result)=> { 
    if(!err){ console.log('result : ' , result)}
    else { console.log('err : ', err) }
  }
  
  const paymentStatus = await User.findOneAndUpdate(query, conditions, options, callbackFound)

  res.json({
    status  : 'Payment viewed updated',
    data    : paymentStatus
  })

})

module.exports = router