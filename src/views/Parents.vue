<template>
    <v-container v-if="isParent">
    </v-container>
</template>
<script>
    import Vue from 'vue';
    import {auth, db} from "@/firebase";
    import router from "@/router";

    export default Vue.extend({
      name: "Parents",
      data: () => ({
        auth,
        db,
        isParent: false,
        user: null
      }),
      methods: {
        async checkIsParent() {
          await this.$bind('user', db.collection('users').doc(auth.currentUser.uid))
          this.isParent = (this.user.type === 'parent')
        }
      },

      async mounted() {
        await this.checkIsParent()
        if (!this.isParent) {
          if (this.user.type === 'student') {
            await router.push('/students')
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