<template>
      <div>
    <section id="form-login" class="wrapper vh-100">
      <div
        class="container d-flex justify-content-center align-items-center h-100 "
      >
        <div class="card mb-3 shadow p-3 mb-5 bg-body rounded" style="width: 540px">
         <form action="" method="post" @submit.prevent = "registerUser"> 
            
              <div class="px-3 card-body">
                <h5 class="card-title">Register User</h5>
                <div class="form-group">
                  <label for="">Input Your Username:</label> <br>
                  <input v-model = "username" class="form-control" type="text" name="username" id="register-user" placeholder="username.." required> <br>
                </div>
                <div class="form-group">
                  <label for="">Input Your Email:</label><br>
                  <input v-model = "email" class="form-control" type="email" name="email" id="register-email" placeholder="email.." required> <br>
                </div>
                <div class="form-group">
                  <label for="">Input Password:</label> <br>
                  <input v-model = "password" class="form-control" type="password" name="password" id="register-password" placeholder="password.." required> <br>
                </div>
                <div class="form-group">
                  <label for="">Input Your Phone Number</label><br>
                  <input v-model = "phoneNumber" class="form-control" type="text" name="phoneNumber" id="register-phoneNumber" placeholder="0819---" required> <br>
                </div>
                <div class="form-group">
                  <label for="">Input Your Adress</label> <br>
                  <input v-model = "address" class="form-control" type="text" name="address" id="register-address" placeholder="Bandung St.." required> 
                </div>
              </div>
              <div class="px-3 mb-3">
                <button class="btn btn-primary ml-2 mx-2"  type="submit" value="Register">Register   </button>
                <input @click.prevent = "cancel" class="btn btn-secondary ml-2"  type="submit" value="Cancel"> 
              </div>
            </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name : 'Register',
    data : function(){
        return {
            username : '',
            email : '',
            password : '',
            address : '',
            phoneNumber : ''
        }
    },
    methods : {
        cancel(){
            this.$router.push({name: 'Login'})
        },
        registerUser(){
            const registUser = {
                username : this.username,
                email : this.email,
                password : this.password,
                address : this.address,
                phoneNumber : this.phoneNumber
            }

            this.$store.commit('REGISTER', registUser)
            this.$store.dispatch('register')
                .then(response => {
                    console.log(response);
                    Swal.fire('Success Register')
                    this.$router.push({name : "Login"})
                })
                .catch(err => {
                    console.log(err.response.data.message);
                    Swal.fire(err.response.data.message)

                })
        }
    }
}
</script>

<style>

</style>