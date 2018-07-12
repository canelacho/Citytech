'use strict'
const checkSession = (req, res, next) => {
  console.log('la sesion req.cityfriend : ', req.session.cityfriend)
  console.log('req.user from middleware', req.session)
  if(!req.session.cityfriend) {
    res.redirect('/login')
  } 
  next()
}
module.exports = checkSession