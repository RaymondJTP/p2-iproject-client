<template>
  <div class="row mt-5 ml-3">
      <div class="border p-2 pl-4 mx-0 col-2" style="max-height : 100vh; height : 100vh; overflow-y: auto">
          <h3>List of Users</h3>
          <div v-for="(data, index) in insertLocation" :key="index" class="card my-2" @click="moveToUser(data.location)" style="cursor:pointer">
            <div class="card-body cursor pointer">
                <h5 class="card-title m-0 p-0">{{data.email}}</h5>
                
                <p class="card-text m-0 p-0">{{data.weather.city_name}}</p>
            </div>
        </div>
      </div>
    <div class="mx-0 col-10 p-0">
      <l-map style="height: 100vh" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <l-marker
          v-for="(data, index) in insertLocation"
          :key="index"
          :lat-lng="data.location"
        >
          <l-icon
            :icon-size="[64, 64 * 1.15]"
            :icon-anchor="[32, 64 * 1.15]"
            :icon-url="`https://avatars.dicebear.com/api/adventurer/${data.email}.svg`"
          />
          <l-tooltip>
            {{ data.email }}
            <!-- <img :src="`https://avatars.dicebear.com/api/adventurer/${data.email}.svg`" alt=""> -->
          </l-tooltip>
          <l-popup>
            <div class="weather">
              <img
                :src="`https://www.weatherbit.io/static/img/icons/${data.weather.weather.icon}.png`"
                alt=""
              />
              <div class="weather-content">
                <p>{{ data.email }}</p>
                <img
                  style="width: 50px"
                  :src="`https://avatars.dicebear.com/api/adventurer/${data.email}.svg`"
                  alt=""
                />

                <p>{{ data.weather.weather.description }}</p>
                <p>
                  {{ data.weather.city_name }} {{ data.weather.country_code }}
                </p>
                <p></p>
                <p>{{ data.weather.timezone }}</p>
                <p>temperature : {{ data.weather.temp }}°C</p>
              </div>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
    <div class="text-center">
      <button class="btn btn-warning mt-4 center" @click="updateCoord">Update New Coordinate</button>
    </div>
  </div>
</template>

<script>
// import L from 'leaflet';
// import axios from '../config/axios'
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LPopup,
  LIcon,
} from "vue2-leaflet";
export default {
  name: "Room",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPopup,
    LIcon,
  },
  computed: {
    getUsers() {
      console.log(this.$store.state.usersInRoom, "dari state");
      return this.$store.state.usersInRoom;
      // return this.users.map(user => {
      //     return [user.User.latitude, user.User.longitude]
      // })
    },
    insertLocation() {
      return this.$store.state.usersInRoom.map((el) => {
        //   return [el.User.latitude, el.User.longitude];
        return {
          location: [el.User.latitude, el.User.longitude],
          weather: el.Weather,
          email: el.User.email,
        };
      });
    },
    getRoomId() {
      return this.$store.state.joinRoomId;
    }
  },
  data: function () {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 5,
      center: [-6.904773135464642, 107.62000199436874],
      markerLatLng: [0, 0],
      users: [],
      timer: ''
      // loading : false
    };
  },
  methods: {
    getCurrentLocation() {
      // this.$store.commit('LOADING', true)
      // this.loading = true
      if (!("geolocation" in navigator)) {
        // this.errorStr = 'Geolocation is not available.';
        // return;
      }

      navigator.geolocation.getCurrentPosition((pos) => {
        // console.log(pos);

        // this.gettingLocation = false;
        this.markerLatLng = [+pos.coords.latitude, +pos.coords.longitude];
        // console.log(this.getUsers, 'asuuuuuuuuuuuup');
        // this.getUsers.forEach((user) => {
        //   if (!user.User.latitude || !user.User.longitude) {
        //     user.User.latitude = +pos.coords.latitude;
        //     user.User.longitude = +pos.coords.longitude;
        //   }
        // });
        // this.users = this.getUsers.map((el) => {
        //   return [el.User.latitude, el.User.longitude];
        // });
        const coordinates = [+pos.coords.latitude, +pos.coords.longitude];
        this.$store.commit("GETLOCATION", coordinates);
        this.$store
          .dispatch("updateLocation")
          .then((response) => {
            console.log(response, "updateLocation");
            // this.$store.commit('LOADING', false)
            this.$store.dispatch("getUsersRoom");
          })
          .catch((err) => {
            console.log(err.response.data);
          });

          
            // this.loading = false
      });
    },
    moveToUser(location){
        this.center = location
        this.zoom = 10
    },
    // ,
    updateCoord(){
      this.getCurrentLocation()
    }
  },
  created() {
    // if (this.getRoomId.length == 0) {
    //   // let id = this.getRoomId
    //   this.$router.push({ name: "Home" });
    // }else {
    //   this.$router.push({name : 'Room'})
    // }
    this.getCurrentLocation();
    // this.userLocation()
    // this.updateCoord()
    // setInterval(this.updateCoord(), 5000);
  },
};
</script>

<style>

::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */

.weather-content p {
  margin: 0;
  padding: 0;
  font-size: 12px;
}
.weather-content h4 {
  margin: 0;
  padding: 0;
}
.weather {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
