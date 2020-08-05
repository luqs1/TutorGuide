<template>
  <v-container v-if="isStudent">
    <v-card>
      <v-card-title>
        W.I.P. Links will be emailed to you directly, temporarily.
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
    isStudent: false,
    user: null
  }),
  methods: {
    async checkIsStudent() {
      await this.$bind('user', db.collection('users').doc(auth.currentUser.uid))
      this.isStudent = (this.user.type === 'student')
    }
  },

  async mounted() {
    await this.checkIsStudent()
    if (!this.isStudent) {
      if (this.user.type === 'parent') {
        await router.push('/parents')
      }
      else {
        await router.push('/')
      }
    }
  },
})
</script>

<style scoped>

</style>