<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new PlayList</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-date-picker v-model="date" color="green lighten-1" ></v-date-picker>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                :disabled="!formIsValid"
                @click="createList()">Create Playlist</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import firebase from 'firebase'
  export default {
    data () {
      return {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: '',

      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.location !== ''
      },
    },
    methods: {
      createList () {
        let list = {
          title: this.title,
          location: this.location,
          description: this.description,
          date: this.date,
          creatorId: firebase.auth().currentUser.uid,
        }
        firebase.database().ref('playlists').push(meetup)
          .then((data) => {

          })
          .catch((error) => {
            console.log(error)
          })
        // Reach out to firebase and store it
      }
    },
    watch : {
      date: function() {
        console.dir(this.date);
      }
    }
  }
</script>
