<template>
  <div class="container">
    <form @submit.prevent="processForm" enctype="multipart/form-data">
      <div class="row form-group">
        <input type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()" style="display:none" />
        <a class="btn btn-info btn-lg btn-block" onclick="document.getElementById('file').click()" style="color:white"><i class="fas fa-file-image"></i> Choose a File</a>
      </div>
      <div class="row form-group">
        <div v-if="loadingImg" class="text-center col-12 h3">
            Loading Img
        </div>
        <img class="rounded mx-auto d-block preview" v-bind:src="imagePreview" v-if="showPreview" alt="imagen to send as payment"/>
      </div>
      <div class="row form-group">
        <textarea v-if="showPreview" v-model="comment" class="form-control" rows="2" placeholder="If you want to add a comment, let us know!"></textarea>
      </div>
      <div class="row form-group">
        <button v-if="showPreview" class="btn btn-success btn-lg btn-block mb-2"><i class="fas fa-file-upload"></i> Post Payment</button>
      </div>
    </form>
  </div>
</template>

<script>


export default {
  data() {
    return {
      userId : this.$store.getters.activeSession.id,
      loadingImg : false,
      comment : '',
      file: '',
      showPreview: false,
      imagePreview: ''
    }
  },
  methods: {
    handleFileUpload(){
      //Set the local file variable to what the user has selected.
      this.file = this.$refs.file.files[0];
      //Initialize a File Reader object
      let reader  = new FileReader();
      /*
        Add an event listener to the reader that when the file
        has been loaded, we flag the show preview as true and set the
        image to be what was read from the reader.
      */
      reader.addEventListener("load", function () {
        this.loadingImg = true
        this.showPreview = true
        this.reloadImg()
        this.imagePreview = reader.result
      }.bind(this), false);
      //Check to see if the file is not empty.
      if( this.file ){
        //Ensure the file is an image file.
        if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
          /*
            Fire the readAsDataURL method which will read the file in and
            upon completion fire a 'load' event which we will listen to and
            display the image in the preview.
          */
          reader.readAsDataURL( this.file );
        }
      }
    },
    reloadImg() {
      setTimeout(()=>{
        this.loadingImg = false
        this.showPreview = true
      }, 500) 
    },
    processForm() {
      const formData = new FormData();
      formData.append('userId', this.userId)
      formData.append('comment', this.comment)
      formData.append('photo', this.file.name)
      formData.append('files[0]', this.file)
      const config = {
        headers: {
          'Content-type' : 'multipart/form-data'
        }
      }
      
      axios.post('/api/payments', formData, { headers: { 'Content-Type': 'multipart/form-data' } } )
      .then((response) => {
        console.log('Data was send to API successfull')
        this.showPreview  = false,
        this.comment   = '',
        this.$router.push({ name : 'msg-ok', params:{ 'redirect' : 'payment-balance-user', 'msg' : '👍🏼 Your Payment was send successfull!'}})
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
