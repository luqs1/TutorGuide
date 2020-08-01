<template>
  <v-card v-if="loading">
    <v-card-title>
      Loading...
    </v-card-title>
  </v-card>
    <full-calendar :events="events" :config="config" v-else>
    </full-calendar>
</template>

<script>
    import Vue from 'vue';
    import firebase from "@/firebase.js";
    const db = firebase.firestore()
    export default Vue.extend({
        name: "Calendar",
        data: () => ({
          loading: true,
          lessons: {},
          config: {
            editable: false,
            slotDuration: '01:00:00',
            scrollTime: '12:00:00',
          },
          snapshot: []
        }),
        props: {
            forUser: Boolean,
            userID: String,
        },
        firestore: {
            lessons: db.collection('Lessons')
        },
        computed: {
            events: function () {
                let lessons;
                if (this.forUser === true) {
                  if (this.loading) {
                    lessons = []
                  }
                  else {
                    lessons = this.snapshot

                    if (lessons.empty) {
                      lessons = []
                    }
                    else {
                      lessons = lessons.docs
                    }
                  }
                }
                else {
                    lessons = this.lessons
                }
                return lessons.map(this.LessonEvent)
            }
        },
        methods: {
            LessonEvent: function (Lesson) {
                let Event = {}
                Event.title = Lesson.Subject + ' by ' + Lesson.Tutor
                Event.start = Lesson.start.toDate()
                Event.end = Lesson.end.toDate()
                Event.textColor = 'white';
                return Event
            },
          async getSnapshot() {
            const snapshot = await db.collection('Lessons').where('Students', 'array-contains', this.userID)
            await this.$bind('snapshot', snapshot)
          },
          async init () {
              if (this.forUser) {
                await this.getSnapshot()
                this.loading = false
              }
              this.loading = false
          }
      },
      watch: {
          forUser: async function () {
            console.log('For User changed')
            this.loading = true
            await this.init()
          }
      },
      async mounted() {
        await this.init()
      },
    })
</script>

<style scoped>

</style>