<template>
  <v-app>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@477&display=swap" rel="stylesheet">
    <v-app-bar
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

        <h2
          class="shrink mt-1 hidden-sm-and-down"
          id="app_name"
        >
          TutorGuides
        </h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
              v-for="route in $router.options.routes"
              v-bind:key="route.name"
        :to="route.path"
        text
      >
        <span class="mr-2">{{route.name}}</span>
      </v-btn>

    </v-app-bar>
    <v-main>
        <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    colors: {
      primary:"#137CC3",
      secondary:"#DD4122",
      accents:"#22DD41"
    }
  }),
};
</script>

<style lang="scss">
  $primary: #02057F;
  $secondary: #DD4122;
  $accents: #22DD41;

  html, #app{
    font-family: Sora ,serif;
    background-image: url("assets/images/white.png");
  }
</style>