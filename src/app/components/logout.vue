<template>
  
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    mounted() {
      this.logOut()
    },
    methods : {
      logOut() {
        this.$store.commit('logOut')
        this.$router.push({name : 'login'})
      }
    }
  }
</script>
