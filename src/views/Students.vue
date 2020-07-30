<template>
  <v-container v-if="isStudent">
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
    if (!this.isParent) {
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