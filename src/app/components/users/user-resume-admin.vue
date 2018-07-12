<template>
  <div class="container">  
    <div class="text-center">
      <img :src="'/uploads/users/'+User.photo" alt="Profile Picture" style="width:120px; height:120px; border-radius:150px;">
    </div>
    <div class="text-center">
      <h2>{{ User.firstname + ' ' + User.lastname}}</h2>
    </div>

    <div id="accordion">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h5 class="mb-0">
            <button class="btn btn-info btn-lg btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <i class="fas fa-user-circle"></i> View Profile
            </button>
          </h5>
        </div>

        <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div class="card-body">
            
            <div class="row">
              <div class="col-md-12"> 
                <div class="form-row mt-2">
                  <div class="form-group col-md-6">
                    <label for="username">Username</label>
                    <input v-model="User.username" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="password">Password</label>
                    <input v-model="User.password" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="iddoc">id Document</label>
                    <input v-model="User.iddoc" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="nacionality">Nacionality</label>
                    <input v-model="User.nacionality" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-2">
                      <label for="bithday">Bith Date</label>
                      <input :value="User.birthday | dateFilterShort" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-2">
                      <label for="bithday">Rol</label>
                      <input v-model="User.rol" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="firstname">First Name</label>
                    <input v-model="User.firstname" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="lastname">Last Name</label>
                    <input v-model="User.lastname" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="address">Address</label>
                    <input v-model="User.address" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-3">
                    <label for="zip">Zip Code</label>
                    <input v-model="User.zip" type="text" class="form-control" placeholder="❓" readonly>
                  </div>         
                  <div class="form-group col-md-3">
                    <label for="country">Country</label>
                    <input v-model="User.country" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-3">
                    <label for="state">State</label>
                    <input v-model="User.state" type="text" class="form-control" placeholder="❓" readonly>
                  </div>  
                  <div class="form-group col-md-3">
                    <label for="city">City</label>
                    <input v-model="User.city" type="text" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="fatherfirstname">Father First Name</label>
                    <input v-model="User.father.firstname" type="text" class="form-control" placeholder="❓" readonly>
                  </div>                     
                  <div class="form-group col-md-4">
                    <label for="fatherlastname">Father Last Name</label>
                    <input v-model="User.father.lastname" type="text" class="form-control" placeholder="❓" readonly>
                  </div>          
                  <div class="form-group col-md-4">
                    <label for="fatheremail">Father Email address</label>
                    <input v-model="User.father.email" type="email" class="form-control" placeholder="❓" readonly>
                  </div>
                  <div class="form-group col-md-4">
                    <label for="motherfirstname">Mother First Name</label>
                    <input v-model="User.mother.firstname" type="text" class="form-control" placeholder="❓" readonly>
                  </div>                     
                  <div class="form-group col-md-4">
                    <label for="motherlastname">Mother Last Name</label>
                    <input v-model="User.mother.lastname" type="text" class="form-control" placeholder="❓" readonly>
                  </div>          
                  <div class="form-group col-md-4">
                    <label for="motheremail">Mother Email address</label>
                    <input v-model="User.mother.email" type="email" class="form-control" placeholder="❓" readonly>
                  </div>  
                  <div class="form-group col-md-4">
                    <label for="authorized">Authorized Name</label>
                    <input v-model="User.authorized" type="text" class="form-control" placeholder="❓" readonly>
                  </div> 
                  <div class="form-group col-md-4">
                    <label for="grade">Grade</label>
                    <select class="form-control" id="grade" readonly>
                      <option value="" selected>{{ User.grade }}</option>  
                    </select>
                  </div>
                  <div class="form-group col-md-4">
                      <label for="active">Active</label>
                      <select class="form-control" id="active" readonly> 
                        <option value="">{{ User.active }}</option>
                      </select>
                  </div>
                  <div class="form-group col-md-12">
                    <label for="observation">Observation</label>
                    <textarea v-model="User.observation" class="form-control" rows="3" placeholder="❓" readonly></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header" id="headingTwo">
          <h5 class="mb-0">
            <button class="btn btn-success btn-lg btn-block collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <i class="fas fa-file-invoice-dollar"></i> View Payments Posted
            </button>
          </h5>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
        <div class="container">
          <div class="row">
            <div v-for="Payment in Payments " class="m-1 col-12">
              <div class="media">
                <!-- Button trigger modal -->
                <a href="" data-toggle="modal" :data-target="'#'+Payment.paymentid">
                  <img class="mt-2 mb-1 mr-2 ml-0" :src="'/uploads/Payments/'+Payment.photo" alt="Payment photo" style="width:140px; height:140px;border-radius: 25px">
                </a>

                <!-- Modal -->
                <div class="modal fade" :id="Payment.paymentid" tabindex="-1" role="dialog" aria-labelledby="picModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="picModalLabel">Posted : {{ Payment.posted | dateFilter }} </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <img :src="'/uploads/payments/'+Payment.photo" class="rounded mx-auto d-block preview" alt="img payment">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="media-body pt-2 pb-1">
                  <h5 class="mt-0">Posted : {{ Payment.posted | dateFilter }} </h5>
                  <p>Comment : {{ Payment.comment }}</p>
                  <a href="" @click.prevent="changeStatus(Payment.paymentid, Payment.viewed)" class="btn btn-secondary">Change Status</a>  - Verified : {{ Payment.viewed | statusFilter}}
                </div>
              </div>
              <hr>
            </div>
          </div>
        </div> 

        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h5 class="mb-0">
            <button class="btn btn-secondary btn-lg btn-block collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <i class="fas fa-file-invoice"></i> View History
            </button>
          </h5>
        </div>
        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
          <div class="card-body">
            History:
          </div>
        </div>
      </div>
    </div>
  </div>
   
    

</template>

<script>

  export default {
    created() {
      this.loadUser()
    },
    data() {
      return {
        User : {},
        Payments : this.$route.params.data.payments
      }
    },
    methods : {
      loadUser() {
        this.User = this.$route.params.data
        this.Payments = this.Payments.reverse()
      },
      changeStatus(paymentid, value) {
        axios.post('/api/payments/update-status/' + this.User._id + '/' + paymentid + '/' + !value)
        .then((response) => {
          console.log('Data updated')
          this.User = response.data.data
          this.Payments = response.data.data.payments.reverse()
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    filters: {
      dateFilter(date) {
        let convertDate = new Date(date)
        return convertDate.toLocaleString()
      },
      dateFilterShort(date) {
        let convertDate = new Date(date)
        return convertDate.toLocaleDateString()
      },
      statusFilter(value) {
        return value ? '✅'  : '❌'
      }
    }
  }
</script>
