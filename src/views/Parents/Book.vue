<template>
  <v-container>
    <v-row v-if="loadedLessons">
      <v-col cols="8">
      </v-col>
      <v-col cols="4">
        <v-card>
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
      <v-col cols="10" v-if="!this.filtered">
        <v-card class="my-3" v-for="lesson in lessons" :key="lesson.start">
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
              <v-btn class="mx-2" right color="primary">
                Book
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="10" v-else-if="showFiltered">
        <v-card class="my-3" v-for="lesson in filteredLessons" :key="lesson.start">
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
            <v-btn class="mx-2" right color="primary">
              Book
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import {db} from "@/firebase"
export default Vue.extend({
  name: "Book",
  data: () => ({
    subject: '',
    lessons: {},
    filteredLessons: {},
    filtered: false
  }),
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
    }
  },
  computed: {
    loadedLessons () {
      return (this.lessons !== {})
    },
    showFiltered () {
      return !(this.filteredLessons === {})
    }
  }
})
</script>

<style scoped>

</style>