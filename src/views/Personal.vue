<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
               <h1>
                   {{tutor.Name.FirstName + ' ' + tutor.Name.Surname}}
               </h1>
                <v-card>
                    <v-card-text>
                        {{tutor.Details.Summary}}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import db from '../db.js';

    export default Vue.extend({
        name: 'Personal',
        data: () => ({
            tutor: {}
        }),
        props: {
            tutorID: String
        },
        firestore: {
            tutor: db.collection('Tutors').doc(this.tutorID)
        }
    })
    /*
    TODO: Finish Personal Page

     */
</script>