<template>
  <div>
    <div class="title-page">
      <div class="container">
       <h1 class="mb-.3-em">Users</h1>
       <router-link :to="{name:'users-list-admin'}" class="btn btn-primary"><i class="fas fa-list"></i> Users List</router-link>
       <router-link :to="{name:'user-new-admin'}" class="btn btn-warning" style="color:white"><i class="fas fa-user-plus"></i> New User</router-link>
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