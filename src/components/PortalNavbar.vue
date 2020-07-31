<template>
    <v-navigation-drawer color="#137CC3" permanent dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{subheading}}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in navLinks"
            :key="item.name"
            link
            @click="router.push(item)"
        > <!-- might have to make exact paths -->

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import router from "@/router";
import Vue from 'vue';
export default Vue.extend({
  name: "PortalNavbar",
  data: () => ({
    router,
    nav:true
  }),
  props: {
    title: String,
    subheading: String,
    navLinks: Array
  }
})
</script>

<style scoped>
</style>