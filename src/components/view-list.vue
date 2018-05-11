<template>
  <div class="body">
    <h1>{{ gig.title }}</h1>
    <h2>Location: {{gig.location}}</h2>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-date-picker v-model="gig.date" color="green lighten-1" landscape></v-date-picker>
      </v-flex>
    </v-layout>

    <v-layout row mt-4>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-list two-line subheader>
            <v-subheader>Set List</v-subheader>
            <v-divider color="#9E9E9E"></v-divider>
            <v-list v-for="item in list" :key="item.songName">
              <v-content>
                <h3> Song Name: {{item.songName }}</h3>
                Notes: {{ item.notes }}
                <youtube :video-id="getYoutubeId(item.youtube)" player-width="640" player-height="360"></youtube>

              </v-content>
            </v-list>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <v-btn v-on:click="goToHome" large color="teal">Home</v-btn>
    <v-btn v-on:click="logout" large>Logout</v-btn>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {

    name: 'view-list',
    props: ['id'],
    data() {
      return {
        list: [],
        gig: {
          title: '',
          location: '',
          description: '',
          date: '',
        },
      }
    },
    methods: {
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      },
      goToHome: function() {
        this.$router.push({path:'/home'});
      },
      getYoutubeId: function(link) {
        return this.$youtube.getIdFromURL(link)
      }
    },
    mounted() {
      let vm = this;
      console.log(this.id);
      firebase.database().ref('playlists/' + this.id).once("value", function(snapshot) {
        vm.gig = {
          title: snapshot.val().title,
          location: snapshot.val().location,
          description: snapshot.val().description,
          date: snapshot.val().date,
        };
        console.log(snapshot.val());
        vm.list = snapshot.val().list;
      });
      console.log('here is the gig');
      console.log(this.list);
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
