<template>
  <v-container v-if="isStudent">
    <v-card>
      <v-card-title>
        The Student Portal is currently Work In Progress
      </v-card-title>
      <v-card-text>
        When you sign up for lessons, you will be sent Zoom and Google Classroom codes by email.
      </v-card-text>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      <v-card-title>
        Loading...
      </v-card-title>
    </v-card>
  </v-container>
</template>
<script>
import Vue from 'vue';
import {auth, db} from "@/firebase";
import router from "@/router";

export default Vue.extend({
  name: "Students",
  data: () => ({
    auth,
    db,
    user: null
  }),
  firestore:{
    user: db.collection('users').doc(auth.currentUser.uid)
  },
  computed: {
    userLoaded () {
      return this.user !== null
    },
    isStudent () {
      if (!this.userLoaded) {
        return false
      }
      return this.user.type === 'student'
    }
  },
  async mounted() {
    if (!this.isStudent) {
      if (this.userLoaded) {
        if (this.user.type === 'parent') {
          await router.push('/parents')
        } else {
          await router.push('/')
        }
      }
    }
  },
})
</script>

<style scoped>

</style>