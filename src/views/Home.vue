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
        <h3 class="mx-auto mb-4">
          Pre-Yr 11 Summer Courses for GCSE
        </h3>
        <v-row justify="center">
          <v-btn
                  v-for="(course, i) in NonMaths.slice(0,4)"
                  :key="i"
                  @click="$router.push('/subjects/'+course.Name)"
                  class="subheading mx-3"
          >
            {{ course.Name }}
          </v-btn>
        </v-row>
      </v-col>
      <v-col>
        <h3 class="mx-auto mb-4">Pre-Yr 11 Summer Courses for Mathematics</h3>
        <v-row justify="center">
          <v-btn
                  v-for="(course, i) in Maths"
                  :key="i"
                  @click="$router.push(('/subjects/'+course.Name))"
                  class="subheading mx-3"
          >
            {{course.Name}}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Vue from 'vue';
  import db from '@/db.js';

  export default Vue.extend({
    name: 'Home',

    data: () => ({
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
    }
  })
</script>
