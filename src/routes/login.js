'use strict'

const express = require('express')
const router = express.Router()
const Login = require('../models/Users')


router.post('/', async (req, res) => {
  await Login.find({username : req.body.usr})
  .then((userFinded) => {
    let Usr = userFinded[0]
    if(Usr.username == req.body.usr && Usr.password == req.body.pwd) {
      console.log(`Usuario encontrado ${Usr}`)
      req.session.cityfriend = Usr._id
      console.log('Usuario en session', req.session.cityfriend)
      res.json({
        err : false,
        msg : 'User founded',
        data : Usr
      })
    }
    if(!Usr.username || ( !Usr.username !== req.body.usr && Usr.password !== req.body.pwd)) {
      res.json({
        err : false,
        msg : 'Your info do NOT match 🤨'
      }) 
    }
  })
  .catch((err) => {
    res.json({
      err : true,
      msg : 'User wasn\'t found 🌿👀🌿'
    })
  })
})


module.exports = router