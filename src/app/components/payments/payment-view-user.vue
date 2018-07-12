<template>
  <div>
    <div class="title-page">
      <div class="container">
       <h1 class="mb-.3-em">Make a Payment</h1>
       <router-link :to="{name:'payment-send-user'}" class="btn btn-primary"><i class="fas fa-money-bill-wave"></i> Send a Payment</router-link>
       <router-link :to="{name:'payment-balance-user'}" class="btn btn-warning" style="color:white"><i class="fas fa-list-alt"></i> View Resume</router-link>
      </div>
    </div>
    <div class="container">
      <router-view class="mt-4"></router-view>
    </div>
  </div>
</template>


<script>
  export default {
    
  }
</script>
