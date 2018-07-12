<template>
  <div class="container">
    <h1>Users List</h1>
    <form>
      <div class="input-group-prepend">
        <div class="input-group-text"><i class="fas fa-filter display-4"></i></div>

      <div class="row">
        <div class="col-md-3 ml-3">
          <label class="mr-sm-2" for="inlineFormCustomSelect">Grade</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-model="filterSelect">
            <option value="">Choose...</option>
            <option value="Bees">Bees</option>
            <option value="Puppies">Puppies</option>
            <option value="Kitties">Kitties</option>
            <option value="Monkeys">Monkeys</option>
          </select>
        </div>
        <div class="col-md-3 ml-3">
          <label class="mr-sm-2" for="inlineFormCustomSelect2">Grade</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect2" v-model="filterActiveValue">
            <option value="">All</option>
            <option value="true">Actives</option>
            <option value="false">Inactives</option>
          </select>
        </div>
        <div class="col-md-5 mt-4 ml-3">
          <label class="sr-only" for="inlineFormInputGroup">Search</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text"><i class="fas fa-search"></i></div>
            </div>
            <input type="search" class="form-control" id="inlineFormInputGroup" placeholder="Any word" v-model="filterSearch">
          </div>
        </div>
      </div>

      </div>

    </form>

    <div class="mb-4 mt-4"> 🏦 = New Payment posted | ✅ = User Active  | ❌ = User Inactive </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th class="text-center" scope="col">Photo</th>
          <th class="text-center" scope="col">User</th>
          <th class="text-center" scope="col">Rol</th>
          <th class="text-center" scope="col">Active</th>
          <th class="text-center" scope="col">Grade</th>
          <th class="text-center" scope="col">Balance</th>
          <th class="text-center" scope="col">Msg</th>
          <th class="text-center" scope="col">Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="User, userObjKey in Users" v-show="showByFilter">
          <td><img :src="'/uploads/users/'+User.photo" alt="Profile Picture" style="width:55px; height:55px; border-radius:150px;"></td>
          <td>{{ User.username }}</td>
          <td class="text-center">{{ User.rol }}</td>
          <td class="text-center">{{ User.active | activeFilter }}</td>
          <td class="text-center">{{ User.grade }}</td>
          <td class="text-right">$ {{ User.charges | calculateBalance }} <h3></h3></td>
          <td class="text-center">{{ User.payments | banknote }}</td>
          <td class="text-right">
            <router-link class="btn btn-success" :to="{name:'user-resume-admin', params : { data : User }}"><i class="far fa-eye"></i> View</router-link>
            <router-link class="btn btn-info" :to="{name:'user-edit-admin', params : { data : User }}"><i class="fas fa-edit"></i> Edit</router-link>
            <button class="btn btn-danger" @click.prevent="askDeleteUser(User._id, User.username)"><i class="fas fa-trash-alt"></i> Delete</button>
          </td>
        </tr>
      </tbody>
    </table>


    <!-- Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete User ?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            Are you sure that you want to delete this user ?
            <h2 style="color:red">" {{ userNameSelectedDetele }} "</h2>          
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-success" @click.prevent="deleteUser(userIdSelectedDetele)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    mounted() {
      this.getUsers()
    },
    data() {
      return {
        Users : [],
        userIdSelectedDetele : '',
        userNameSelectedDetele : '',
        userIndexArray : '',
        showByFilter : true,
        filterActiveValue : '',
        filterSelect : '',
        filterSearch : ''
      }
    },
    methods: {
      getUsers() {
        axios.get('/api/users/')
        .then((users) => {
          this.Users = users.data.data
        })
        .catch((err) => {
          console.log(err)
        })
      },
      askDeleteUser(id, username) {
        this.userIdSelectedDetele = id
        this.userNameSelectedDetele = username
        $('#deleteModal').modal('show')
      },
      deleteUser(id) {
        $('#deleteModal').modal('toggle')
        console.log('deleting user ', id)
        axios.delete('/api/users/' + id)
        .then((resp) => {
          console.log('server resp : ', resp)
          this.getUsers()           
          this.userIdSelectedDetele = '',
          this.userNameSelectedDetele = ''
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    computed:{
      
    },
    watch: {
      filterActiveValue : function(value) {
        if(value==='true') { 
          this.filterActiveValue = true
          this.showByFilter = true
        }
        if(value==='false') {
          this.filterActiveValue = false
          this.showByFilter = false
        } 
        if(value==='All') {
          this.filterActiveValue = ''
          this.showByFilter = ''
        }
      }
    },
    filters : {
      activeFilter(active) {
        return active ? '✅'  : '❌'
      },
      calculateBalance(charges) {
        let GrandTotal = 0
        charges.forEach(element => {
            let amount = element.amount
            let arrayReceipts = element.receipts
            let TotalReceipts = arrayReceipts.map( element => element.amount).reduce((accumulator, currentValue) => accumulator + currentValue)
            let totalThisElement = amount - TotalReceipts
            GrandTotal += totalThisElement
          })
        return GrandTotal
      },
      banknote(payments) {
        let evaluatePayments = payments.map(element => element.viewed).some(element => !element)
        return evaluatePayments ? '🏦' : ''
      }
    }
  }
</script>