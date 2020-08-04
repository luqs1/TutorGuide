<template>
  <v-card>
    <v-card-title>
      Calendars
    </v-card-title>
    <v-card-actions>
      <v-row>
        <v-col>
          <v-radio-group v-model="forUser" row>
            <v-radio
                label="Full Calendar"
                :value="false">
            </v-radio>
            <v-radio
                label="Student's Calendar"
                :value="true">
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-card-actions>
    <Calendar :for-user="forUser" :user-i-d="student"/>
  </v-card>
</template>

<script>
import Vue from 'vue';
import {auth, db} from "@/firebase";
import Calendar from "@/components/Calendar";
export default Vue.extend({
  name: "Calendars.vue",
  data: () => ({
    forUser: false,
    student: null,
    students: [],
  }),
  components: {
    Calendar
  },
  methods: {
    async checkForStudents() {
      const query = db.collection('users').where('parent','==', auth.currentUser.uid)
      const snapshot = await query.get()
      this.students = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      this.student = this.students[0].id
    },
  },
  async mounted() {
    await this.checkForStudents()
  }
})
</script>

<style scoped>

</style>