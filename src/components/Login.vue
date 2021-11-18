<template>
  <div>
    <section id="form-login" class="wrapper vh-100">
      <div
        class="container d-flex justify-content-center align-items-center h-100 "
      >
        <div class="card mb-3 shadow p-3 mb-5 bg-body rounded" style="max-width: 540px">
          <form action="" @submit.prevent="loginUser">
            <div class="row g-0">
              <div class="col-md-12">
                <div class="card-body">
                  <h5 class="card-title">Login Branded Hackthings</h5>
                  <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input
                      v-model="email"
                      type="email"
                      class="form-control"
                      id="email-form-login"
                      placeholder="email@mail.com"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      id="password-form-login"
                      rows="3"
                      placeholder="******"
                    />
                  </div>
                  <div class="d-flex w-100 justify-content-between my-3">
                    <!-- <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin> -->
                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                    <!-- <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin> -->
                    <input
                      class="btn btn-primary ml-2"
                      type="submit"
                      value="Login"
                    />
                  </div>
                  <router-link
                    :to="{ name: 'Register' }"
                    @click.prevent="changePage('register')"
                    class="link-primary cursor-pointer text-center"
                    id="register-here"
                    style="align-item:center;"
                  >
                    Haven't got account?Register Here!
                  </router-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import GoogleLogin from "vue-google-login";
export default {
  name: "Login",
  data: function () {
    return {
      email: "",
      password: "",
      params: {
        client_id:
        "908896643744-fous0kp3sgu7tm4k909h3qas1ujcfpdq.apps.googleusercontent.com",
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: false,
      },
    };
  },
  components :{
    GoogleLogin
  },
  methods: {
    loginUser() {
      const user = {
        email: this.email,
        password: this.password,
      };

      this.$store.commit("LOGIN", user);
      this.$store
        .dispatch("login")
        .then((response) => {
          console.log(response.data);
          const access_token = response.data.access_token;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem('userId', response.data.id)
          this.$store.commit("SETLOGIN", response.data.id);

          this.$router.push({ name: "Home" });
          Swal.fire('Welcome to Find Me App!')
        })
        .catch((err) => {
          console.log(err.response);
          // Swal.fire(err.response.data.message)

        });
    },
    onSuccess(googleUser) {
        // console.log(googleUser.token);
      var id_token = googleUser.getAuthResponse().id_token;
      // console.log(id_token);
      this.$store.commit("LOGINGOOGLE", id_token)
      this.$store.dispatch('loginGoogle')
        .then(response => {
          
          console.log(response.data);
          localStorage.access_token = response.data.access_token
          this.$router.push({name : 'Home'})
        })
        .catch(err => {
          console.log(err.response, 'responnn');
        })
    },
    onFailure(googleUser) {
      console.log(googleUser);
        //   console.log(googleUser.getBasicProfile());
      console.log('Google Error');
    },
  },
};
</script>

<style>

</style>
