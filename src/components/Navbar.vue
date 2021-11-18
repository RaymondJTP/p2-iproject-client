<template>
  <nav v-if="currentRoute !== 'Login' && currentRoute !== 'Register'" class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">FindMe App</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse d-flex justify-content-between"
        id="collapsibleNavbar"
      >
        <ul class="navbar-nav">
          <li class="nav-item mx-2">
            <a
              :class="[
                currentRoute == 'Home' ? 'rounded bg-light text-dark' : '',
              ]"
              class="nav-link"
              @click="changePage('Home')"
              >Home</a
            >
          </li>
          <li class="nav-item mx-2">
            <a
              :class="[
                currentRoute == 'ListRoom' ? 'rounded bg-light text-dark' : '',
              ]"
              class="nav-link"
              @click="changePage('ListRoom')"
              >List Room</a
            >
          </li>
          <li class="nav-item mx-2">
            <a
              :class="[
                currentRoute == 'FormCreate'
                  ? 'rounded bg-light text-dark'
                  : '',
              ]"
              class="nav-link"
              @click="changePage('FormCreate')"
              >Form Create Room</a
            >
          </li>
        </ul>
        <ul class="navbar-nav">
          <li v-if="currentRoute == 'Room'" class="nav-item mx-3">
            <button class="nav-link btn btn-info text-dark" @click="leave">
              Leave Room
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link btn btn-danger text-dark" @click="logout">
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: "Navbar",
  methods: {
    changePage(value) {
      this.$router.push({ name: value });
    },
    logout() {
      localStorage.clear();
      this.$store.dispatch("logoutUser");
      Swal.fire('Thankyou for using Find Me App')

      this.$router.push({ name: "Login" });
    },
    leave() {
      this.$store.commit("LEAVEROOM", this.getRoomId);
      this.$store
        .dispatch("leaveRoom")
        .then((response) => {
          console.log(response);
          localStorage.roomId  = null
          Swal.fire('Thankyou for visiting this room')

          this.$router.push({ name: "ListRoom" });
        })
        .catch((err) => {
          console.log(err.response);
          Swal.fire(err.response.data.message)

        });
    },
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
    getRoomId() {
      return this.$store.state.joinRoomId;
    },
  },
};
</script>

<style>
a{
  cursor: pointer;
}
</style>
