<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
                :src="require('../assets/images/icon.png')"
                class="my-3"
                contain
                height="200"
        />
      </v-col>
      <v-col class="mb-4" cols="12">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to TutorGuides
        </h1>

        <p class="subheading font-weight-regular">
          Your one-stop tutor team to cope with GCSEs during the Covid-19 Outbreak.
        </p>

        <v-btn class="mx-3" icon @click="window.open('https://www.instagram.com/tutor_guides/')">
          <v-icon>
            mdi-instagram
          </v-icon>
        </v-btn>

        <v-btn class="mx-3" icon @click="window.open('https://www.facebook.com/tutor.guides.5')">
          <v-icon>
            mdi-facebook
          </v-icon>
        </v-btn>

      </v-col>
      <v-col></v-col>

      <v-col cols="8">
        <v-card>
          <v-card-title>
            First time here?
          </v-card-title>
          <v-card-text class="text-left">
            TutorGuides provides tutoring for a diverse range of subjects up to GCSE using Zoom and
            Google Classroom for sharing material. Additionally, we provide parents with in-depth reports of their children's
            progress and attainment. All tutoring is currently set to finish by the end of the summer holidays and is structured to
            prepare students for the coming year.
            <br/><br/>
            Scroll down for more information on some of the subjects we offer and our schedule. Please note that lessons
            can be added to the schedule by contacting us directly at contacts.tutorguides@gmail.com.
            <br/> <br/>
            Or get started by registering a parent and student account. <br/>
            <strong>Lessons can be booked once registered.</strong>
          </v-card-text>
          <v-card-actions>
            <v-btn
            :to="'/fees'">
              Fee structure
            </v-btn>
            <v-spacer/>
            <v-btn
            :to="'/sign_in'">
              Register now!
            </v-btn>
            <v-spacer/>
            <v-btn
            :to="'/about_us'">
              About us
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col></v-col>

      <v-col
              class="mb-5"
              cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          View Courses
        </h2>
        <h3 class="mx-auto my-5 mb-4">
          Pre-Yr 11 Summer Courses for GCSE
        </h3>
        <v-row justify="center">
          <SubjectButton v-for="(subject, id) in NonMaths.slice(0,4)" :course="subject" :key="id"></SubjectButton>
        </v-row>
      </v-col>
      <v-col>


        <h3 class="mx-auto my-5 mb-4">Pre-Yr 11 Summer Courses for Mathematics</h3>
        <v-row justify="center">
          <SubjectButton v-for="(subject, id) in Maths" :course="subject" :key="id"></SubjectButton>
        </v-row>
      </v-col>
    </v-row>
    <v-card raised rounded width="95%" class="mx-auto mb-14">
      <v-card-title>
        Lesson Calendar
      </v-card-title>
      <Calendar/>
    </v-card>
  </v-container>
</template>

<script>
  import Vue from 'vue';
  import firebase from '@/firebase.js';
  import Calendar from "@/components/Calendar.vue";
  import SubjectButton from "@/components/SubjectButton";
  const db = firebase.firestore()

  export default Vue.extend({
    name: 'Home',
    components:{
      Calendar,
      SubjectButton
    },
    data: () => ({
      window,
      dialog:[
      ],
      Subjects: [],
    }),
    firestore: {
      Subjects: db.collection('Subjects')
    },
    computed: {
      Maths : function () {
        return this.Subjects.filter(x => x.Name.includes('Maths'))
      },
      NonMaths : function () {
        return this.Subjects.filter(x => !x.Name.includes('Maths'))

      }
    },
    methods:{
    },
    created() {
      this.dialog = [[], []]
      for (let i=0; i<this.Maths.length;i++) {
        this.dialog[0].push(false)
      }
      for (let i=0; i<this.NonMaths.length;i++) {
        this.dialog[1].push(false)
      }
    }
  })
</script>
