<template>
  <div class="container">
    <div class="card" style="width: 100%">
      <div class="card_header">
        <h3 style="display:inline-block; color:#004085">My Resumen</h3>
      </div>
      <div class="card-body">

        <div class="media">
          <img class="mr-3 avatar" :src="profilePicture" alt="Profile Picture">
          <div class="media-body">
            <h5 class="mt-0"></h5>
            Hi, I'm {{ data.firstname }} {{ data.lastname}}, my birthday is on {{ data.birthday | redeableDate }} and actually attend to the {{ data.grade }} level.
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        sky : '../img/sky.png',
        profilePicture : '../uploads/users/' + this.$store.getters.activeSession.photo,
        data : this.$store.getters.activeSession.data
      }
    },
    methods : {
      
    },
    filters: {
      redeableDate:(date)=>{
        let convertDate = new Date(date)
        return convertDate.toLocaleDateString()
      }
    }
  }
</script>
