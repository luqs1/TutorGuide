<template>
  <v-card v-if="loading">
    <v-card-title>
      Loading...
    </v-card-title>
  </v-card>
    <full-calendar ref="calendar" :events="events" :config="config" v-else>
    </full-calendar>
</template>

<script>
    import Vue from 'vue';
    import firebase from "@/firebase.js";
    import 'fullcalendar/dist/fullcalendar.css';
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
             if (!this.forUser) {
               return this.lessons.map(this.LessonEvent)
             }
             if (this.loading || this.snapshot === undefined || this.snapshot.empty) {
               return []
             }
             return this.snapshot.map(this.LessonEvent)
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
            await this.$forceUpdate()
            await this.init()
            this.$refs.calendar.fireMethod('refetchEvents')
          }
      },
      async mounted() {
        await this.init()
      },
    })
</script>

<style scoped>

</style>