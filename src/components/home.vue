<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-btn v-on:click="goToCreate" large>Create A New Playlist</v-btn>
    <v-btn v-on:click="logout">Logout</v-btn>
  </div>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: 'home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      },
      goToCreate: function () {
        this.$router.replace('create-list');
      }

    },
    mounted() {
      this.msg = firebase.auth().currentUser.uid;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
