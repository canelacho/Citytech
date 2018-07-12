<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link :to="{name:'resume-user'}" class="navbar-brand">
          <img :src="logoCitykids" width="40" height="40" alt="">
        </router-link>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
               <router-link :to="{name:'resume-user'}" class="nav-link">Dashboard</router-link>
            </li>
          </ul>
          <div class="form-inline my-2 my-lg-0">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  My Activities
                </a>
                <div v-if="typeUser==='Student'" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <router-link class="dropdown-item" :to="{name:'events-view-user'}"><i class="far fa-calendar-alt"></i> Events</router-link>
                  <router-link class="dropdown-item" :to="{name:'messages-view-user'}"><i class="fas fa-comments"></i> Messages</router-link>
                  <router-link class="dropdown-item" :to="{name:'payment-balance-user'}"><i class="fas fa-money-bill-wave"></i> Payments</router-link>
                  <router-link class="dropdown-item" :to="{name:'profile-view-user'}"><i class="fas fa-user-circle"></i> My Profile</router-link>
                  <router-link class="dropdown-item" :to="{name:'log-out'}"><i class="fas fa-sign-out-alt"></i> Sign Out</router-link>
                </div>
                <div v-if="typeUser==='Admin'" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLinkAdmin">
                  <router-link class="dropdown-item" :to="{name:'users-list-admin'}"><i class="fas fa-users"></i> Users</router-link>
                  <router-link class="dropdown-item" :to="{name:'events-view-user'}"><i class="far fa-calendar-alt"></i> Events</router-link>
                  <router-link class="dropdown-item" :to="{name:'messages-view-user'}"><i class="fas fa-comments"></i> Messages</router-link>
                  <router-link class="dropdown-item" :to="{name:'payment-balance-user'}"><i class="fas fa-money-bill-wave"></i> Payments</router-link>
                  <router-link class="dropdown-item" :to="{name:'profile-view-user'}"><i class="fas fa-user-circle"></i> My Profile</router-link>
                  <router-link class="dropdown-item" :to="{name:'log-out'}"><i class="fas fa-sign-out-alt"></i> Sign Out</router-link>
                </div>
                <div v-if="typeUser==='Teacher'" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLinkAdmin">
                  <router-link class="dropdown-item" :to="{name:'users-list-admin'}"><i class="fas fa-users"></i> Students</router-link>
                  <router-link class="dropdown-item" :to="{name:'events-view-user'}"><i class="far fa-calendar-alt"></i> Events</router-link>
                  <router-link class="dropdown-item" :to="{name:'messages-view-user'}"><i class="fas fa-comments"></i> Messages</router-link>
                  <router-link class="dropdown-item" :to="{name:'profile-view-user'}"><i class="fas fa-user-circle"></i> My Profile</router-link>
                  <router-link class="dropdown-item" :to="{name:'log-out'}"><i class="fas fa-sign-out-alt"></i> Sign Out</router-link>
                </div>
                <div v-if="typeUser==='Coordinator'" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLinkAdmin">
                  <router-link class="dropdown-item" :to="{name:'users-list-admin'}"><i class="fas fa-users"></i> Students</router-link>
                  <router-link class="dropdown-item" :to="{name:'events-view-user'}"><i class="far fa-calendar-alt"></i> Events</router-link>
                  <router-link class="dropdown-item" :to="{name:'messages-view-user'}"><i class="fas fa-comments"></i> Messages</router-link>
                  <router-link class="dropdown-item" :to="{name:'profile-view-user'}"><i class="fas fa-user-circle"></i> My Profile</router-link>
                  <router-link class="dropdown-item" :to="{name:'log-out'}"><i class="fas fa-sign-out-alt"></i> Sign Out</router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <section>
      <div class="container ">
        <div class="text-right pt-3 font-weight-bold">{{ typeUser }} : {{ userName }}</div>
      </div>
    </section>
    <hr>
    
    <router-view></router-view>
    
    <div v-if="typeUser==='Student'" class="container mt-2">
      <div class="collapse" id="collapseOptions">
        <div class="card card-body">
          <router-link class="btn btn-success mt-2 mb-1" :to="{ name:'payment-send-user'}"><i class="fas fa-money-bill-wave"></i> Send a Payment</router-link>
          <router-link class="btn btn-warning mt-1 mb-1" :to="{ name:'messages-view-user'}" style="color:white"><i class="fas fa-comments"></i> My Messages</router-link>
          <router-link class="btn btn-info mt-1 mb-2" :to="{ name:'profile-view-user'}"><i class="fas fa-user-circle"></i> My Profile</router-link>
        </div>
      </div>
      <p class="text-center mt-3">
        <button class="btn btn-lg btn-dark" type="button" data-toggle="collapse" data-target="#collapseOptions" aria-expanded="false" aria-controls="collapseOptions">
          Shortcuts
        </button>
      </p>
    </div>

    <div class="footer-dashboard"></div>
   
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  mounted() {
    this.getUsers()
    this.loginUser()  
  },
  data() {
    return {
      id : '',
      typeUser : '',
      userName : '',
      logoCitykids : '../img/logo_citykids.png'
    }
  },
  methods : {
    loginUser() {
      let data = this.$store.getters.activeSession
      this.id = data.id,
      this.userName = data.name
      this.typeUser = data.rol
    },
    getUsers() {
      axios.get('/api/users')
      .then((response) => {
        console.log(response.data.data)
        this.users = response.data.data
      })
      .catch((error) => {
        console.log(error)
      })
    } 
  } 
}
</script>
