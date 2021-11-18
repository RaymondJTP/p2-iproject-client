<template>
  <div>
    <div class="my-3 mx-5 shadow p-3 mb-5 bg-body rounded" >
        <table  class="table">
          <thead  class="table-list text-light">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Room Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="(room,index) in rooms" :key="index">
            <tr>
              <th scope="row">{{index+1}}</th>
              <td>{{room.name}}</td>
              <td>
                  <button class="btn btn-primary mx-3" @click="joinRoom(room.id)">Join Room</button>
                  <button v-if="room.UserId == userId" class="btn btn-danger" @click="deleteRoom(room.id)">Delete Room</button>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
   
  </div>
  
</template>

<script>
import Swal from 'sweetalert2'
export default {
    name : 'ListRoom',
    computed : {
      rooms(){
        return this.$store.state.listRoom
      },
      userId(){
        return this.$store.state.userId
      }
    },
    methods : {
      joinRoom(value){
        
        Swal.fire({
          title: 'Password Room',
          html: `<input type="password" id="password" class="swal2-input" placeholder="Password">`,
          confirmButtonText: 'Input Password',
          focusConfirm: false,
          preConfirm: () => {
            const password = Swal.getPopup().querySelector('#password').value
            const roomData = {value,password}
            this.$store.commit('JOINROOM', roomData)
            this.$store.dispatch('joinRoom')
              .then(response => {
                console.log('masuk fetch')
                console.log(response, 'asuuuuup join room');
                Swal.fire('Valid Password!')
                let id = value
                // this.$router.push({name: 'Room'})
                localStorage.setItem('roomId', value)
                this.$router.push({ name: 'Room', params: { id} })
              })
              .catch(err => {
                console.log(err.response, 'asup eror joinroom');
                console.log(err.response.data.message);
                Swal.fire(err.response.data.message)
              })
            return {password: password }
          }
        })
      },
      deleteRoom(roomId){
        this.$store.dispatch('deleteRoom', roomId)
      }
    },
    created(){
      this.$store.dispatch('fetchRoom')
    }
}
</script>

<style>
.table-list{
  background-color: #055052;
}
th,td{
  text-align: center;
}

</style>