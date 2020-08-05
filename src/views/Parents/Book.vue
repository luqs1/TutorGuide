<template>
  <v-container>
    <v-row v-if="loadedLessons">
      <v-col cols="8">
        <p> Please feel free to email contact.tutorguides@gmail.com to see if lessons can be arranged.</p>
      </v-col>
      <v-col cols="4">
        <v-card class="my-3">
          <v-card-subtitle>
            <v-row>
              <v-col cols="12">
              </v-col>
              <v-col cols="10">
                <h3>
                  Prepaid Lessons:
                </h3>
              </v-col>
              <v-col cols="2">
                <h3>
                  {{parent.lessons}}
                </h3>
              </v-col>
            </v-row>
          </v-card-subtitle>

        </v-card>
        <v-card v-if="false">
          <v-card-text>
            <v-text-field v-model="subject" length="50%" label="Search by Subject">
            </v-text-field>
          </v-card-text>
          <v-card-actions class="my-n3">
            <v-spacer/>
            <v-btn @click="getFilter" right color="primary">
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-card class="my-3" v-for="lesson in whichLessons" :key="lesson.start.toMillis()">
          <v-card-title>
            {{lesson.Subject + ' by ' + lesson.Tutor}}
          </v-card-title>
          <v-card-subtitle>
            {{lesson.start.toDate().toLocaleString()}}
          </v-card-subtitle>
          <v-card-text>
          </v-card-text>
          <v-card-actions justify="end">
            <v-spacer/>
              <pay :lesson="lesson"/>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import Pay from "@/components/Pay";
import {db} from "@/firebase"
export default Vue.extend({
  name: "Book",
  data: () => ({
    subject: '',
    lessons: {},
    filteredLessons: {},
    filtered: false,
    dialog: false
  }),
  components: {
    Pay
  },
  firestore: {
    lessons: db.collection('Lessons'),
  },
  methods: {
    async getFilter () {
      if (this.subject !== '') {
        if (this.lessons === {}) {
          await this.$bind('lessons', db.collection('Lessons'))
        }
        this.filteredLessons = this.lessons.filter(lesson => {
          return lesson.Name.includes(this.subject)
        })
        this.filtered = true
      }
    },
  },
  computed: {
    loadedLessons () {
      return (this.lessons !== {})
    },
    showFiltered () {
      return !(this.filteredLessons === {})
    },
    students () {
      return this.$parent.students
    },
    whichLessons() {
      if (this.filtered) {
        return this.filteredLessons
      }
      return this.lessons
    },
    parent() {
      return this.$parent.user
    }

  }
})
</script>

<style scoped>

</style>