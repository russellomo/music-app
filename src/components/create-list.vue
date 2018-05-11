<template>
<v-container>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <h2>Create a New PlayList</h2>
    </v-flex>
  </v-layout>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="e1 > 1">Set Up Gig Info</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="e1 > 2">Create Song List</v-stepper-step>

    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-layout row>
          <v-flex xs12>
            <form>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field name="location" label="Location" id="location" v-model="location" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field name="description" label="Description" id="description" multi-line v-model="description"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-date-picker v-model="date" color="green lighten-1" landscape></v-date-picker>
                </v-flex>
              </v-layout>
              <v-btn color="green lighten-1" @click.native="e1 = 2">Continue</v-btn>
            </form>

          </v-flex>
        </v-layout>
      </v-stepper-content>

      <v-stepper-content step="2">

        <v-layout row>
          <v-flex xs12>
            <form>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field name="song-title" label="Song Title" id="song-title" v-model="listItem.songName" required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 offset-sm3>
                  <v-text-field name="youtube" label="Youtube Link" id="youtube" v-model="listItem.youtube"></v-text-field>
                </v-flex>

              </v-layout>
              <v-layout row>
                <v-flex xs12 offset-sm3>
                  <v-text-field name="Notes" label="Notes" id="notes" multi-line v-model="listItem.notes"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-btn color="green" @click="addSong()" fab large dark>
                    <v-icon color="white">add</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-expansion-panel>
                    <v-expansion-panel-content v-for="(item,i) in this.list" :key="i">
                      <div slot="header">{{ item.songName }}</div>
                      <v-card>
                        {{item.youtube}}
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-flex>
              </v-layout>

            </form>
            <v-btn color="gray" @click.native="e1 = 1">
              <v-icon dark>arrow_back</v-icon>Back</v-btn>
              <v-btn color="green" :disabled="!formIsValid" @click="createList()">Create Playlist</v-btn>
          </v-flex>


        </v-layout>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      e1: 0,
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: '',
      listItem: {
        songName: '',
        youtube: '',
        notes: ''
      },
      list: [],

    }
  },
  computed: {
    formIsValid() {
      return this.title !== '' &&
        this.location !== ''
    },
  },
  methods: {
    createList() {
      let list = {
        title: this.title,
        location: this.location,
        description: this.description,
        date: this.date,
        creatorId: firebase.auth().currentUser.uid,
        list: this.list
      }
      firebase.database().ref('playlists').push(list)
        .then((data) => {

        })
        .catch((error) => {
          console.log(error)
        })
      // Reach out to firebase and store it
      this.$router.replace('home');
    },
    addSong() {
      this.list.push(this.listItem);
      this.listItem = {
        songName: '',
        youtube: '',
        notes: ''
      };
      console.log(this.list);
    }
  },
  watch: {
    date: function() {
      console.dir(this.date);
    }
  }
}
</script>
