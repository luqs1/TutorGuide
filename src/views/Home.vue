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
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to TutorGuides
        </h1>

        <p class="subheading font-weight-regular">
          Your one-stop tutor team to cope with GCSEs during the Covid-19 Outbreak.
        </p>

      </v-col>

      <v-col
              class="mb-5"
              cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          View Courses
        </h2>
        <v-card raised rounded width="95%" class="mx-auto mb-14">
          <Calendar/>
        </v-card>

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
