<template>
  <v-container>
    <v-row class="text-center">
      <v-col></v-col>
      <v-col cols="10" align="center">
        <v-card>
        <v-card-title>
          Mission Statement
        </v-card-title>
          <v-divider/>
        <v-card-text>
          TutorGuide was established with the sole intention of providing support for students who are approaching their
          GCSEs in the confusion arising from the Covid-19 lockdown. We were startled by the disparity in how
          different schools have approached the problem and seek to redress the situation. TutorGuide is an online platform
          you can sign up for to get tutoring for a multitude of different subjects in small online classes. We are initially
          offering Maths, AdMaths/ Further Maths, Physics, Chemistry, Biology and Computer Science but are looking to offer
          even more subjects in the near future. Join now and secure your learning.
        </v-card-text>
        </v-card>
      </v-col>
      <v-col></v-col>
      <v-col cols="12">
        <h2>Meet the Team</h2>
      </v-col>
      <!--
      <v-col cols="12" v-for="tutor in data.Tutors" v-bind:key="tutor.id">
        TODO: Use Tutor Name, Summary and Image
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
  /*
  import {db} from '@/db.js';
   */
  import Vue from 'vue'
  export default Vue.extend({
    data: () => ({
      Tutors:[]
    }),
    /*
    firestore: {
      Tutors: db.collection('Tutors')
    } */
  })
</script>