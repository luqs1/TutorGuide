<template>
    <v-container v-if="isParent">
      <v-row v-if="hasStudent">
        <v-col cols="3">
          <PortalNavbar title="Parent Portal" :subheading="auth.currentUser.email" :nav-links="navLinks"/>
          <v-btn @click="router.push('/parents')" class="my-5">
            Back
          </v-btn>
        </v-col>
        <v-col cols ='9'>
          <router-view></router-view>
        </v-col>
      </v-row>
      <v-card v-else>
        <v-card-title>
          No student!
        </v-card-title>
        <v-card-text>
          A student hasn't registered designating you as their parent, please connect a student account and try again.
          Your code is {{user.code}}
        </v-card-text>
      </v-card>
    </v-container>
</template>
<script>
import Vue from 'vue';
import {auth, db} from "@/firebase";
import router from "@/router";
import PortalNavbar from "@/components/PortalNavbar";

export default Vue.extend({
  name: "Parents",
  data: () => ({
    router,
    auth,
    db,
    isParent: false,
    user: null,
    hasStudent: false,
    students: [],
  }),
  components:{
    PortalNavbar
  },
  methods: {
    async checkIsParent() {
      await this.$bind('user', db.collection('users').doc(auth.currentUser.uid))
      this.isParent = (this.user.type === 'parent')
    },
    async checkForStudents() {
      const query = db.collection('users').where('parent','==', auth.currentUser.uid)
      const snapshot = await query.get()
      if (snapshot.empty) {
        this.hasStudent = false
        this.students = []
      }
      else {
        this.hasStudent = true
        this.students = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      }
    }
  },
  computed:{
    navLinks () {
      const parentRoute = router.options.routes.filter((x) => {return x.name === 'Parent Portal'})[0]
      console.log(parentRoute)
      return parentRoute.children

    }
  },
  async mounted() {
    await this.checkIsParent()
    if (!this.isParent) {
      if (this.user.type === 'student') {
        await router.push('/students')
      } else {
        await router.push('/')
      }
    }
    await this.checkForStudents()
  },
})
</script>

<style scoped>

</style>