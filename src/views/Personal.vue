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