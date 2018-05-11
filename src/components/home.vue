<template>
<div class="hello">
  <h1>Welcome</h1>
  <v-btn v-on:click="goToCreate" large color="green">Create A New Playlist</v-btn>
  <v-btn v-on:click="logout" large>Logout</v-btn>

  <v-layout row mt-4>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line subheader>
          <v-subheader>Upcoming Gigs</v-subheader>
          <v-divider color="#9E9E9E"></v-divider>
          <v-list-tile v-for="gig in gigs" :key="gig.title" @click="viewList(gig.key)">
            <v-list-tile-content>
              <v-list-tile-title>{{ gig.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ gig.date }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'home',
  data() {
    return {
      user: '',
      gigs: [],
      gig: {
        title: '',
        date: '',
        key: ''
      },
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    goToCreate: function() {
      this.$router.replace('create-list');
    },
    viewList: function(key) {
      console.log('we in here');
      this.$router.push({ name: 'ViewList', params: { id: key }});
    }

  },
  mounted() {
    this.user = firebase.auth().currentUser.uid;

    let vm = this;
    firebase.database().ref('playlists').orderByChild('creatorId').equalTo(this.user).on("child_added", function(snapshot) {
      vm.gig = {
        title: snapshot.val().title,
        date: snapshot.val().date,
        key: snapshot.key
      }
      vm.gigs.push(vm.gig);
    })

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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
