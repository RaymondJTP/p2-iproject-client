import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : {},
    userId : localStorage.userId ? localStorage.userId : '',
    isLogin : localStorage.access_token? true : false,
    joinRoomId : localStorage.roomId? localStorage.roomId : '',
    userRegister : {},
    listRoom : [],
    // joinRoomId : '',
    passwordRoom : '',
    roomCreated : {},
    usersInRoom : [],
    roomId : '',
    coordinateUser : [],
    token : '',
    loading : false
  },
  mutations: {
    LOGIN(state,payload){
      state.user = payload
    },
    SETLOGIN(state,payload){
      state.isLogin = true
      state.userId = payload
    },
    REGISTER(state,payload){
      state.userRegister = payload
    },
    SET_LOGOUT(state){
      state.isLogin = false
    },
    FETCHROOM(state,payload){
      state.listRoom = payload
    },
    JOINROOM(state,payload){
      state.joinRoomId = payload.value
      state.passwordRoom = payload.password
    },
    CREATEROOM(state,payload){
      state.roomCreated = payload
    },
    USERINROOM(state,payload){
      state.usersInRoom = payload
    },
    LEAVEROOM(state,payload){
      state.roomId = +payload
    },
    GETLOCATION(state,payload){
      state.coordinateUser = payload
    },
    LOGINGOOGLE(state,payload){
      state.token = payload
    },
    LOADING(state,payload){
      state.loading = payload
    }
  },
  actions: {
    login(context){
      const user = context.state.user
      return axios({
        method : 'POST',
        url : '/login',
        data : user
      })
    },
    loginGoogle(context){
      const tokenGoogle = context.state.token
      return axios({
        method : 'POST',
        url : '/google-signin',
        data : {
          id_token : tokenGoogle
        }
      })
    },
    register(context){
      const userRegister = context.state.userRegister
      return axios({
        method : 'POST',
        url : '/register',
        data : userRegister
      })
    },
    logoutUser(context){
      context.commit("SET_LOGOUT")
    },
    fetchRoom(context){
      axios({
        method : 'GET',
        url : '/rooms',
        headers : {
          access_token : localStorage.access_token
        },
      })
      .then(response => {
        console.log(response);
        const listRoom = response.data
        context.commit('FETCHROOM', listRoom)

      })
      .catch(err => {
        console.log(err.response);
      })
    },
    joinRoom(context){
      console.log('masuk');
      const joinRoomId = +context.state.joinRoomId
      console.log(joinRoomId);
      return axios({
        method : 'POST',
        url : `/rooms/${joinRoomId}`,
        headers : {
          access_token : localStorage.access_token
        },
        data : {passwordRoom : context.state.passwordRoom}
      })
    },
    createRoom(context){
      const createdRoom = context.state.roomCreated
      return axios({
        method : 'POST',
        url : '/rooms',
        headers : {
          access_token : localStorage.access_token
        },
        data : createdRoom
      })
    },
    getUsersRoom(context){
      const joinRoomId = +context.state.joinRoomId
      axios({
        method : 'GET',
        url : `/rooms/room/${joinRoomId}`,
        headers : {
          access_token : localStorage.access_token
        }
      })
      .then(response => {
        console.log(response.data);
        const userInRoom = response.data
        context.commit('USERINROOM', userInRoom)
      })
    },
    leaveRoom(context){
      const roomId = +context.state.roomId
      return axios({
        method : 'DELETE',
        url : `/rooms/room/${roomId}`,
        headers : {
          access_token : localStorage.access_token
        }
      })
    },
    updateLocation(context){
      return axios({
        method : 'PUT',
        url : '/updatelocation',
        headers : {
          access_token : localStorage.access_token
        },
        data : {
          latitude : context.state.coordinateUser[0],
          longitude : context.state.coordinateUser[1]
        }
      })
    },
    deleteRoom(context, payload){
      axios({
        method : 'DELETE',
        url : `/rooms/${payload}`,
        headers : {
          access_token : localStorage.access_token
        }
      })
      .then(response => {
        console.log(response.data);
        context.dispatch('fetchRoom')
      })
      .catch(err =>{
        console.log(err.response);
      })
    }
  },
  modules: {
  }
})
