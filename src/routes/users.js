'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const mongoose = require('mongoose')
const Formidable = require('formidable')

const Users = require('../models/Users')

router.get('/', async (req, res) => {
  try{
    const user = await Users.find()
    res.json({
      status  : 'Users found',
      data    : user
    })
  }
  catch(err){ req.json({ status : `error : ${err}` } ) }
})

router.get('/:id', async (req, res) => {
  try{
    const user = await Users.findById(req.params.id)
    res.json({
      status  : 'Users Found',
      data    : user
    })
  }
  catch(err){ res.json( { status : `error : ${err} ` } ) }
})

router.post('/', async (req, res) => {
  let photosaved = ''
  let newId = mongoose.Types.ObjectId();
  console.log('this is the new fucking unique ID : ' , newId)
  try{
    const form = new Formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = "./src/public/uploads/users"
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
      console.log('campos : ' + JSON.stringify(field) )
      console.log('archivo : ' + JSON.stringify(file) )
      photosaved = 'user-' + newId + '.jpg'
      fs.rename(file.path, form.uploadDir + "/"+ photosaved);
    });
    form.on('error', function(err) {
      console.log("an error has occured with form upload");
      console.log(err);
    });
    form.on('aborted', function(err) {
      console.log("user aborted upload");
    });

    await form.parse(req, function(err, fields, files) {
      console.log('Viendo que llega aqui : ', JSON.stringify(fields, null, 3))     
      console.log('algun archivo? : ', JSON.stringify(files))
      if(err){
        res.json({
          status  : `Failed uploading, error : ${err}`,
          data    : {},
        })
      }
      if(files){
        const newUser = new Users({
          _id         : newId,
          photo       : photosaved,
          username    : fields.username,
          password    : fields.password,
          iddoc       : fields.iddoc,
          nacionality : fields.nacionality,
          birthday    : fields.birthday,
          rol         : fields.rol,
          firstname   : fields.firstname,
          lastname    : fields.lastname,
          address     : fields.address,
          zip         : fields.zip,
          country     : fields.country,
          state       : fields.state,
          city        : fields.city,
          observation : fields.observation,
          grade       : fields.grade,
          active      : fields.active,
          father      : {
            firstname : fields.fatherfirstname,
            lastname  : fields.fatherlastname,
            phone     : fields.fatherphone,
            email     : fields.fatheremail
          },
          mother      : {
            firstname : fields.motherfirstname,
            lastname  : fields.motherlastname,
            phone     : fields.motherphone,
            email     : fields.motheremail
          },
          authorized  : fields.authorized
        })
        console.log('newUser : ', newUser)
        console.log('newUser : ', JSON.stringify(newUser))
        newUser.save()
        res.json({
          status  : `User Saved and Upload image successfully`,
          data    : newUser,
          upload  : files.photo
        })
      } else {
        res.json({
          status          : `No images to upload`,
          data            : {},
          numberOfImages  : 0
        })
      }
    })
  }
  catch(err){ res.json( { status : `error : ${err}` } ) }
})

router.put('/:id', async (req, res) => {
  const user = await Users.findByIdAndUpdate(req.params.id, req.body)
  res.json({
    status  : 'User updated',
    data    : user
  })
})

router.delete('/:id', async (req, res) => {
  const user = await Users.findByIdAndRemove(req.params.id)
  const filePath = './src/uploads/users/user-' + req.params.id + '.jpg' 
  fs.stat(filePath, function(err, stats) {
    if(!err) { fs.unlinkSync(filePath) }
    else { console.log(err) }
  })
  res.json({
    status  : 'User deleted',
    data    : user
  })
})

module.exports = router