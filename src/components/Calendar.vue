<template>
    <full-calendar :events="events">
    </full-calendar>
</template>

<script>
    import Vue from 'vue';
    import db from "@/db.js";

    export default Vue.extend({
        name: "Calendar",
        data: () => ({
            lessons: {}
        }),
        props: {
            forUser: Boolean,
            userID: String
        },
        firestore: {
            lessons: db.collection('Lessons')
        },
        computed: {
            events: function () {
                let lessons;
                if (this.forUser === true) {
                    lessons = db.collection('Lessons')
                        .where('Students','array-contains', this.userID)
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
                return Event
            }
        }
    })
</script>

<style scoped>

</style>