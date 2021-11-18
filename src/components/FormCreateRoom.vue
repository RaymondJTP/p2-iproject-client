<template>
  <div class="wrapper">
    <section class="py-4">
        <img class="imgHome" src="../assets/2.jpg" />
        <div class="kolom">
          <h1>Create Your Room</h1>
            <div class="" style="width: 36rem;">
            <form @submit.prevent="createRoom" class="w-100">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Room Name</label>
                <input v-model="name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">

              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Total Member</label>
                <input v-model="member" type="text" class="form-control" id="exampleInputPassword1">
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password Room</label>
                <input v-model="password" type="text" class="form-control" id="exampleInputPassword1">
              </div>
            
              <button type="submit" class="btn btn-primary">Create Now</button>
            </form>
    </div>
        </div>
    </section>
    
   
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name : 'CreateRoom',
    data : function(){
      return{
        name : '',
        member : '',
        password : ''
      }
    },
    methods : {
      createRoom(){
        const room = {
          name : this.name,
          member : this.member,
          passwordRoom : this.password
        }
        this.$store.commit('CREATEROOM', room)
        this.$store.dispatch('createRoom')
          .then(response => {
            console.log(response.data);
            Swal.fire('Success add new room')
            this.$router.push({name : 'ListRoom'})
          })
          .catch(err => {
            Swal.fire(err.response.data.message)
            
            console.log(err.response.data.message);
          })
      }
    }
}
</script>

<style>
.wrapper {
    width: 1100px;
    margin: auto;
    position: relative;
}
.imgHome {
  border: 1px solid #ddd;
  border-radius: 50%;
  padding: 5px;
  width: 50%;
}
section {
    margin: auto ;
    display: flex; 
    margin-bottom: 50px;
}
.kolom {
    margin-top: 100px;
    margin-bottom: 50px;
    margin-left: 50px;
}
h2 {
    font-family: 'comic sans ms';
    font-weight: 800;
    font-size: 45px;
    margin-bottom: 20px;
    color: #055052;
    width: 100%;
    line-height: 50px;
}

h3 {
    font-family: 'comic sans ms';
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 20px;
    color: #055052;
    width: 100%;
    line-height: 50px;
}

a.tbl-pink {
    background: #986D8E ;
    border-radius: 10px;
    margin-top: 20px;
    padding: 15px 20px 15px 20px ;
    color: black;
    cursor: pointer;
    font-weight: bold;
}

a.tbl-pink:hover {
    background: #055052 ;
}

p {
    padding: 15px 10px 15px 10px;
}

</style>