<template>
  <div class="container">
    <transition name="trans-success">
      <div v-if="success" class="alert alert-success" role="alert">
        <h4>{{ msg }}</h4>  
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  mounted : function() {
    this.getMsg()
  },
  created : function() {
    this.countDown()
  },
  data() {
    return {
      msg : '',
      success : false,
      redirectto : ''
    }
  },
  methods : {
    getMsg() {
      this.msg = this.$route.params.msg
      this.redirect = this.$route.params.redirect
    },
    countDown() {
      setTimeout(()=>{
        this.success = true
      },200)
      setTimeout(()=>{
        this.success = false
      }, 2000)
      setTimeout(()=>{
        this.$router.push({name: this.redirect})
      }, 2200)
    }
  }
}
</script>
