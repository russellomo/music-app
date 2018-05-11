// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';
import Vuetify from 'vuetify';
import '../node_modules/vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import VueYouTubeEmbed from 'vue-youtube-embed'
Vue.use(VueYouTubeEmbed);
Vue.use(Vuetify);

Vue.config.productionTip = false;

let app;
// Development group's config for firebase, change if necessary for own back end.
var config = {
  apiKey: "AIzaSyAZMTKNzIKi3g5vxSOHy6OcKjbUntfcMAU",
  authDomain: "music-app-465.firebaseapp.com",
  databaseURL: "https://music-app-465.firebaseio.com",
  projectId: "music-app-465",
  storageBucket: "",
  messagingSenderId: "970280687612"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
});
