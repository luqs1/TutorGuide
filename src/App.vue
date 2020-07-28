<template>
  <v-app>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@477&display=swap" rel="stylesheet">
    <v-app-bar id="app-bar"
      app
      :color="colors.primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="TutorGuides Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/images/icon.png')"
          transition="scale-transition"
          width="40"
        />
        <router-link to="/" tag="div">
          <h2
                  class="shrink mt-1 hidden-sm-and-down"
                  id="app_name"
          >
            TutorGuides
          </h2>
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <!--
      <v-btn
              v-for="route in Links"
              v-bind:key="route.name"
        :to="route.path"
        text
              class="hidden-sm-and-down"
      >
        <span class="mr-2">{{route.name}}</span>
      </v-btn>
      -->
      <v-menu offset-x offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-2"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="route in Links"
                       v-bind:key="route.name"
                       :to="route.path"
                       text>
            <v-list-item-title>
              {{route.name}}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn v-if="(auth.currentUser==null)" :to="'/sign_in'">Sign In
      </v-btn>

      <v-btn v-if="(auth.currentUser!=null)" @click='signOut()'>Logout</v-btn>
    </v-app-bar>
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue';
import router from "@/router";
import {auth} from './firebase.js';

export default Vue.extend({
  name: 'App',
  data: () => ({
    auth,
    claims: [],
    colors: {
      primary: "#137CC3",
      secondary: "#DD4122",
      accents: "#22DD41"
    }
  }),
  methods: {
    async signOut() {
      await auth.signOut();
      this.$forceUpdate()
    },
    async getClaims () {
      if (auth.currentUser != null) {
        auth.currentUser.getIdTokenResult()
                .then((idTokenResult) => {
                  this.claims = []
                  // Confirm the user is an Admin.
                  if (idTokenResult.claims.student) {
                    this.claims.push('student')
                  }
                  if (idTokenResult.claims.parent) {
                    this.claims.push('parent')
                  }
                })
      }
    }
  },
  computed: {
    Links: function () {
      let names = [
              'Home',
              'About Us'
              ]
      if (this.claims.includes('student')) {
        names.push('Student Portal')
      }
      if (this.claims.includes('parent')) {
        names.push('Parent Portal')
      }
      return router.options.routes.filter(route => names.includes(route.name))
    }
  },
})
</script>

<style lang="scss">
  $primary: #02057F;
  $secondary: #DD4122;
  $accents: #22DD41;

  html, #app{
    font-family: Sora ,serif;
    background-image: url("assets/images/white.png");
  }
  #app_name{
    cursor: pointer;
  }
</style>