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
import {auth, db} from './firebase.js';

export default Vue.extend({
  name: 'App',
  data: () => ({
    auth,
    db,
    user: null,
    colors: {
      primary: "#137CC3",
      secondary: "#DD4122",
      accents: "#22DD41"
    },
    Links: router.options.routes.filter(route => ['Home', 'About Us'].includes(route.name))
  }),
  methods: {
    async signOut() {
      await auth.signOut();
      if (router.currentRoute.path !== '/') {
        await router.push('/');
      }
      this.$forceUpdate()
    },
  },
  watch: {
    user: function () {
      let names = [
              'Home',
              'About Us'
              ]
      if (auth.currentUser !== null) {
        if (this.user.type === 'student') {
            names.push('Student Portal')
        }
        if (this.user.type === 'parent') {
            names.push('Parent Portal')
        }

      }
      this.Links = router.options.routes.filter(route => names.includes(route.name))
    }
  },
  async beforeUpdate() {
    if (auth.currentUser !== null && this.user === null) {
      await this.$bind('user', db.collection('users').doc(auth.currentUser.uid))
    }
  }
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