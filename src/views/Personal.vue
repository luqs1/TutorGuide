<template>
    <v-container>
        <v-row>
          <v-col cols="4">
            <v-img width="200px" height="200px" v-if="false">
              LOL IM AN IMAGE
            </v-img>
            <v-row class="text-center">
              <v-col cols="8">
                <v-card>
                  <v-card-title class="text-center">
                    {{tutor.Name.FirstName + ' ' + tutor.Name.Surname}}
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>

          </v-col>
          <v-col cols="8">
            <v-card>
              <v-card-title>
                Introduction
              </v-card-title>
              <v-card-text>
                {{tutor.Details.Summary[0]}}
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card>
              <v-card-title>
                Subjects Taught
              </v-card-title>
              <v-card-text>
                <ul>
                  <li v-for="(subject, id) in tutor.Details.Subjects" :key="id" class="text-left">
                    {{subject}}
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-row>
              <v-col>
                <v-card v-if="false">
                  <v-card-title>
                    Education and Qualifications
                  </v-card-title>
                  <v-card-text>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-card-title> Further Details</v-card-title>
                  <v-card-text>{{tutor.Details.Summary[1]}}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card>
                  <v-card-title>Tutoring Experience</v-card-title>
                  <v-card-text>{{tutor.Details.Summary[2]}}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import {db} from '@/firebase.js';

    export default Vue.extend({
        name: 'Personal',
        data: () => ({
            db,
            tutors: {},
        }),
        firestore: {
            tutors: db.collection('Tutors')
        },
        computed: {
            tutor () {
                return this.tutors.filter(x => x.id === this.$route.params.id)[0]
            }
        }
    })
</script>