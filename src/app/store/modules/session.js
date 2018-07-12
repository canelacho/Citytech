'use strict'

const state = { 
  auth : false,
  user : {
    id   : '',
    name : '',
    photo : '',
    rol : '',
    data : ''
  }
}

const getters = {
  sessionStatus : (state) => state.auth,
  activeSession : (state) => state.user
}
const mutations = {
  sessionApproved : (state, { id, name, photo, rol, data}) => {
    state.auth = !state.auth
    state.user.id = id
    state.user.name = name
    state.user.photo = photo
    state.user.rol = rol
    state.user.data = data
  },
  logOut : (state) => {
    state.auth = !state.auth
    state.user.id = ''
    state.user.name = ''
    state.user.rol = ''
  } 
    
}

export default {
  state,
  getters,
  mutations
}