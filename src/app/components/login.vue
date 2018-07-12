<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-4 col">
        <div class="row mt-3">
          <img class="rounded mx-auto d-block login-img" src="img/logo_citykids.png" alt="Citykids Logo">
        </div>
        <form class="mt-2" @submit.prevent="processLogin">
          <div class="form-group mt-4">
            <!-- <label for="username">User Name</label> -->
            <input v-model="userName" type="text" class="form-control" id="username" aria-describedby="emailHelp" placeholder=" 👤 your User Name">
            <small id="emailHelp" class="form-text text-muted">Your info is super secure with us!</small>
          </div>
          <div class="form-group">
            <!-- <label for="userpassword">Password</label> -->
            <input v-model="userPwd" type="password" class="form-control" id="userpassword" placeholder=" 🔑 your Password">
          </div>
          <!-- <div class="form-check">
            <input type="checkbox" class="form-check-input" id="savemylogin">
            <label class="form-check-label" for="savemylogin">Remind my login</label>
          </div> -->
          <button type="submit" class="btn btn-lg btn-block mt-4 login-btn-submit">Go! 🌟</button>
        </form>
        <transition name="trans-alert">
          <div v-if="alert" class="alert alert-danger mt-1" role="alert">
            {{ alertMsg }}.
          </div>
        </transition>
        <transition name="trans-warning">
          <div v-if="warn" class="alert alert-warning mt-1" role="alert">
            {{ warningtMsg }}.
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data(){
      return {
        userName : '',
        userPwd : '',
        fielsdOk : false,
        warn : false,
        warningtMsg : '',
        alert : false,
        alertMsg : ''
      }
    },
    methods : {
      processLogin() {
        if(this.userName == '') {
          this.warn = true
          this.warningtMsg = 'User Name in blank 😶'
          setTimeout(() => {
            this.warn = false
            this.warningtMsg = ''
          }, 3000);
          this.fielsdOk = false
        }
        if(this.userPwd == '') {
          this.warn = true
          this.warningtMsg = 'You forgot to fill the password 😧'
          setTimeout(() => {
            this.warn = false
            this.warningtMsg = ''
          }, 3000);
          this.fielsdOk = false
        }

        if(this.userName=='' && this.userPwd=='') {
          this.warn = true
          this.warningtMsg = 'We need your login info 😜'
          setTimeout(() => {
            this.warn = false
            this.warningtMsg = ''
          }, 3000);
          this.fielsdOk = false
        }

        if(this.userName && this.userPwd) {
          this.fielsdOk = true
        
          axios.post('/api/login', { usr : this.userName, pwd : this.userPwd})
          .then((resp) => {
            console.log('Access POST Ok')
            console.log(resp)
             
            if(!resp.data.err && !resp.data.data) {
              this.warn = true
              this.warningtMsg = resp.data.msg
              setTimeout(() => {
                this.warn = false
                this.warningtMsg = ''
              }, 3000);
            }
            if(resp.data.err) {
              this.alert = true
              this.alertMsg = resp.data.msg
              setTimeout(() => {
                this.alert = false
                this.alertMsg = ''
              }, 3000);
            }
            if(!resp.data.err && resp.data.data) {
              console.log(resp.data.data)
              this.userName = ''
              this.userPwd = ''
              let payload = {
                id : resp.data.data._id,
                name :resp.data.data.username,
                photo : resp.data.data.photo,
                rol : resp.data.data.rol,
                data : resp.data.data
              }
              this.$store.commit('sessionApproved', payload)
              this.$router.push({name:'resume-user'})
            }
          })
          .catch((err) => console.log(err))
        }
        
      }
    }
  }
</script>
