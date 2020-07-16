<template>
  <v-app>
    <v-app-bar
      app
      :color="colors.primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h2
          class="shrink mt-1 hidden-sm-and-down"
          id="app_name"
        >
          TutorGuide
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
    <v-content>
        <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    colors: {
      primary:"#4122DD",
      secondary:"#DD4122",
      accents:"#22DD41"
    }
  }),
};
</script>

<style lang="scss">
  $primary: #4122DD;
  $secondary: #DD4122;
  $accents: #22DD41;
  @font-face {
    font-family: Sora;
    src: url('/assets/fonts/Sora-weightable.ttf');
  }

  html, #app{
    font-family: Sora, Roboto ,sans-serif;
    background-image: url("assets/images/white.png");
  }
</style>