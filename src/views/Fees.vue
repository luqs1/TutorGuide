<template>
  <v-container>
    <v-card>
      <v-card-title>
        Payment Plans
      </v-card-title>
    <v-simple-table>
      <thead>
      <tr>
        <th class="text-left">
          Payment Scheme
        </th>
        <th class="text-left">
          Cost
        </th>
        <th class="text-left">
          Cost per Lesson
        </th>
        <th class="text-left">
          Saving compared to PAYG
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, id) in rows" :key="id">
        <th v-for="(cell, id2) in row" :key="id2">
          {{cell}}
        </th>
      </tr>
      </tbody>
    </v-simple-table>
    </v-card>
    <v-card class="my-4">
      <v-card-title>
        All payment schemes include the Free Trial
      </v-card-title>
      <v-card-subtitle>
        Meet our team through your free trial lesson!
      </v-card-subtitle>
      <v-card-text>
        Choose a subject you want to work on and contact us for a free 1 hr trial lesson or a 30 minutes 1-1 with the tutor of your subject.
        <br/> If you have any additional queries please contact us at <a href="mailto:contact.tutorguides@gmail.com">contact.tutorguides@gmail.com</a>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  name: "Fees.vue",
  data: () => ({
    rows: [
        ['Pay As You Go (PAYG)', '£13.50', '£13.50', '-'],
        ['5 Lesson Pack', '£60', '£12', '£7.50'],
        ['10 Lesson Pack', '£110', '£11', '£25']
    ]
  })
})
</script>

<style scoped>

</style>