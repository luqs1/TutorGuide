<template>
  <v-container>
    <v-row class="text-center">
      <v-col></v-col>
      <v-col cols="10" class="mx-auto">
        <v-card>
        <v-card-title>
          Mission Statement
        </v-card-title>
          <v-divider class="mx-auto" width="90%"/>
        <v-card-text>
          TutorGuides was established with the sole intention of providing support for students who are approaching their
          GCSEs in the confusion arising from the Covid-19 lockdown. We were startled by the disparity in how
          different schools have approached the problem and seek to redress the situation. TutorGuide is an online platform
          you can sign up for to get tutoring for a multitude of different subjects in small online classes. We are initially
          offering Maths, AdMaths/ Further Maths, Physics, Chemistry, Biology and Computer Science but are looking to offer
          even more subjects in the near future.
        </v-card-text>
          <v-card-actions>
            <v-btn @click="$router.push('/sign_in')">
              Join now and secure your learning
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col></v-col>
      <v-col cols="12">
        <h2>Meet the Team</h2>
      </v-col>
      <v-col cols="8" class="mx-auto" v-for="tutor in Tutors" v-bind:key="tutor.id">
        <v-card :to="'/about_us/'+tutor.id">
          <v-card-title>
            {{tutor.Name.FirstName + ' ' + tutor.Name.Surname}}
          </v-card-title>
          <v-divider width="90%" class="mx-auto">
          </v-divider>
          <v-card-text align="start">
            {{tutor.Details.Summary}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import firebase from '@/firebase.js';
  import Vue from 'vue';

  const db = firebase.firestore()

  export default Vue.extend({
    data: () => ({
      Tutors:{}
    }),
    firestore: {
      Tutors: db.collection('Tutors')
    }
  })
</script>