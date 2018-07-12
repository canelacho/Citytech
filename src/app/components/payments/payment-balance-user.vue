<template>
  <div class="">
    
    <h1>My Payments</h1>

    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Comment</th>
          <th scope="col">Image</th>
          <th scope="col" class="text-center">Verified</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment, itemObjKey in payments">
          <td>{{itemObjKey + 1}}</td>
          <td>{{ payment.posted | dateFilter }}</td>
          <td>{{ payment.comment}}</td>
          <td> <a href="" class="btn btn-info" data-toggle="modal" :data-target="'#'+payment.paymentid">View</a> </td>
          <td class="text-center">{{ payment.viewed | statusFilter }}</td>
        
          <!-- Modal -->
          <div class="modal fade" :id="payment.paymentid" tabindex="-1" role="dialog" aria-labelledby="imgModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="imgModalLabel">Posted : {{ payment.posted | dateFilter }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <img :src="'/uploads/payments/'+payment.photo" class="rounded mx-auto d-block preview" alt="img payment">
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <!-- /Modal -->
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>

  export default {
    mounted() {
      this.getBalance()
    },
    data() {
      return {
        balance : [],
        payments : [],
        id : ''
      }
    },
    methods: {
      getBalance() {
        this.id = this.$store.getters.activeSession.id    
        axios.get('/api/users/' + this.id)
        .then((user) => {
          console.log('User found : ', user)
          this.payments = user.data.data.payments.reverse()
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    filters : {
      dateFilter(date) {
        let convertDate = new Date(date)
        return convertDate.toLocaleString()
      },
      statusFilter(value) {
        return value ? '✅'  : '❌'
      }
    }
  }
</script>
