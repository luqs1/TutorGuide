<template>
  <v-container v-if="!!$route.params.subject">
    <v-card>
      <v-card-title>
        {{subject.Name}}
      </v-card-title>
      <v-card-text>
        <div v-for="(text, id) in subject.Description" :key="id">
          {{text}}
        </div>
        <h3 class="my-3">Topics</h3>
        <ul v-for="(text, id) in subject.Topics" :key="id">
          <li>
            {{text}}
          </li>
        </ul>
        <h3 class="my-3">Exam boards</h3>
        <p v-for="(text,id) in subject.ExamBoard" :key="id">
          {{text}}
        </p>
      </v-card-text>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col cols="6" v-for="subject in subjects" :key="subject.Name">
        <v-card
        @click="router.push('/parents/subjects/' + subject.id)">
          <v-card-title>
            {{subject.Name}}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from "@/router";
import Vue from 'vue'
import {db} from "@/firebase";
export default Vue.extend({
  name: "Subjects",
  data: () => ({
    router,
    subjects: {},
    subject: {},
  }),
  firestore: {
    subjects: db.collection('Subjects'),
  },
  computed: {
    subjectID: function () {
      if (this.$route.params.subject) {
        return this.$route.params.subjects
      }
      return null
    },
  },
  methods: {
    bindSubject: function () {
      if (this.subjectID) {
        this.$bind('subject', db.collection('Subjects').doc(this.subjectID))
      }
    }
  },
  mounted() {
    this.bindSubject()
  },
  async beforeRouteUpdate(to, from, next) {
    if (to.params.subject) {
      await this.$bind('subject', db.collection('Subjects').doc(to.params.subject))
    }
    console.log('Route Changed')
    next()
  }

})
</script>

<style scoped>

</style>