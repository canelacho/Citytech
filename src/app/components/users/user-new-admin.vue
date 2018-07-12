<template>
  <div>  
    <div class="title-page">
      <div class="container pt-3">
        <h1>Add a New User</h1>
      </div>
    </div>

    <div class="text-center mt-1 mb-1">
      <div v-if="loadingImg">
          Loading Img
      </div>
      <img :src="imagePreview" v-if="showPreview" alt="Profile Picture" style="width:160px; height:160px; border-radius:150px;">
    </div>

    <div class="container" style="background-color:#d1d1d1; border-radius:8px;">
      <div class="row">
        <div class="col-md-12"> 
          <form @submit.prevent="processForm" enctype="multipart/form-data">      
            
            <div class="form-row mt-2">
              <div class="form-group col-md-6">
                <label for="username">Username</label>
                <input type="text" class="form-control" v-model="user.username" placeholder="Enter Username">
              </div>
              <div class="form-group col-md-6">
                <label for="password">Password</label>
                <input type="text" class="form-control" v-model="user.password" placeholder="Enter Password">
              </div>
              <div class="form-group col-md-12">
                <input type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()" style="display:none" />
                <a class="btn btn-info btn-lg btn-block" onclick="document.getElementById('file').click()" style="color:white"><i class="fas fa-camera-retro"></i> Choose a beautiful picture</a>
              </div>
              <div class="form-group col-md-3">
                <label for="iddoc">id Document</label>
                <input type="text" class="form-control" v-model="user.iddoc" placeholder="Enter id Document">
              </div>
              <div class="form-group col-md-4">
                <label for="nacionality">Nacionality</label>
                <input type="text" class="form-control" v-model="user.nacionality" placeholder="Enter Nacionality">
              </div>
              <div class="form-group col-md-3">
                  <label for="bithday">Bith Date</label>
                  <input type="date" class="form-control" v-model="user.birthday">
              </div>
              <div class="form-group col-md-2">
                <label for="grade">Rol</label>
                <select class="form-control" v-model="user.rol">  
                  <option value="Student" selected >Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Coordinator">Coordinator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="firstname">First Name</label>
                <input type="text" class="form-control" v-model="user.firstname" placeholder="Enter First Name">
              </div>
              <div class="form-group col-md-6">
                <label for="lastname">Last Name</label>
                <input type="text" class="form-control" v-model="user.lastname" placeholder="Enter Last Name">
              </div>
              <div class="form-group col-md-12">
                <label for="address">Address</label>
                <input type="text" class="form-control" v-model="user.address" placeholder="Enter Address">
              </div>
              <div class="form-group col-md-3">
                <label for="zip">Zip Code</label>
                <input type="text" class="form-control" v-model="user.zip" placeholder="Enter Zip">
              </div>         
              <div class="form-group col-md-3">
                <label for="country">Country</label>
                <input type="text" class="form-control" v-model="user.country" placeholder="Enter Country">
              </div>
              <div class="form-group col-md-3">
                <label for="state">State</label>
                <input type="text" class="form-control" v-model="user.state" placeholder="Enter State">
              </div>  
              <div class="form-group col-md-3">
                <label for="city">City</label>
                <input type="text" class="form-control" v-model="user.city" placeholder="Enter City">
              </div>
              <div class="form-group col-md-3">
                <label for="fatherfirstname">Father First Name</label>
                <input type="text" class="form-control" v-model="user.fatherfirstname" placeholder="Enter Father First Name">
              </div>                     
              <div class="form-group col-md-3">
                <label for="fatherlastname">Father Last Name</label>
                <input type="text" class="form-control" v-model="user.fatherlastname" placeholder="Enter Father Last Name">
              </div>  
              <div class="form-group col-md-3">
                <label for="fatherphone">Father Phone</label>
                <input type="tel" class="form-control" v-model="user.fatherphone" placeholder="5520.1292">
              </div>        
              <div class="form-group col-md-3">
                <label for="fatheremail">Father Email address</label>
                <input type="email" class="form-control" v-model="user.fatheremail" placeholder="name@example.com">
              </div>
              <div class="form-group col-md-3">
                <label for="motherfirstname">Mother First Name</label>
                <input type="text" class="form-control" v-model="user.motherfirstname" placeholder="Enter mother First Name">
              </div>                     
              <div class="form-group col-md-3">
                <label for="motherlastname">Mother Last Name</label>
                <input type="text" class="form-control" v-model="user.motherlastname" placeholder="Enter mother Last Name">
              </div>          
              <div class="form-group col-md-3">
                <label for="motherphone">Mother Phone </label>
                <input type="tel" class="form-control" v-model="user.motherphone" placeholder="5520.1292">
              </div>  
              <div class="form-group col-md-3">
                <label for="motheremail">Mother Email address</label>
                <input type="email" class="form-control" v-model="user.motheremail" placeholder="name@example.com">
              </div>  
              <div class="form-group col-md-4">
                <label for="authorized">Authorized Name</label>
                <input type="text" class="form-control" v-model="user.authorized" placeholder="Enter Authorized Name">
              </div> 
              <div class="form-group col-md-4">
                <label for="grade">Grade</label>
                <select class="form-control" v-model="user.grade">
                  <option value="" selected>Choose...</option>  
                  <option value="Bees">Bees</option>
                  <option value="Kitties">Kitties</option>
                  <option value="Monkies">Monkies</option>
                  <option value="Puppies">Puppies</option>
                </select>
              </div>
              <div class="form-group col-md-4">
                  <label for="active">Active</label>
                  <select class="form-control" v-model="user.active"> 
                    <option value="true">Yes</option>
                    <option value="false" selected>No</option>
                  </select>
                </div>
              <div class="form-group col-md-12">
                <label for="observation">Observation</label>
                <textarea class="form-control" rows="3" placeholder="Add any Observation" v-model="user.observation"></textarea>
              </div>
            </div>
            <button class="btn btn-lg btn-primary mb-4"><i class="fas fa-save"></i> Save User</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loadingImg : false,
        file: '',
        showPreview: false,
        imagePreview: '',
        user : {}
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
      if(this.user.birthday == null) {
        console.log('Select a Birthday date')
        return false
      }
      const formData = new FormData();

      formData.append('username', this.user.username)
      formData.append('password', this.user.password)
      formData.append('iddoc', this.user.iddoc)
      formData.append('nacionality', this.user.nacionality)
      formData.append('birthday', this.user.birthday)
      formData.append('rol', this.user.rol)
      formData.append('firstname', this.user.firstname)
      formData.append('lastname', this.user.lastname)
      formData.append('address', this.user.address)
      formData.append('zip', this.user.zip)
      formData.append('country', this.user.country)
      formData.append('state', this.user.state)
      formData.append('city', this.user.city)
      formData.append('fatherfirstname', this.user.fatherfirstname)
      formData.append('fatherlastname', this.user.fatherlastname)
      formData.append('fatherphone', this.user.fatherphone)
      formData.append('fatheremail', this.user.fatheremail)
      formData.append('motherfirstname', this.user.motherfirstname)
      formData.append('motherlastname', this.user.motherlastname)
      formData.append('motherphone', this.user.motherphone)
      formData.append('motheremail', this.user.motheremail)
      formData.append('authorized', this.user.authorized)
      formData.append('grade', this.user.grade)
      formData.append('active', this.user.active)
      formData.append('observation', this.user.observation)
      formData.append('photo', this.file.name)
      formData.append('files[0]', this.file)
      const config = {
        headers: {
          'Content-type' : 'multipart/form-data'
        }
      }
      
      axios.post('/api/users', formData, { headers: { 'Content-Type': 'multipart/form-data' } } )
      .then((response) => {
        console.log('Data was send to API successfull')
        this.showPreview  = false,
        this.user = {},
        this.$router.push({ name : 'msg-ok', params : { 'redirect':'users-list-admin','msg' : 'New User Saved'}})
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
