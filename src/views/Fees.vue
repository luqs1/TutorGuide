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
        Free Trial
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  name: "Fees.vue",
  data: () => ({
    rows: [
        ['PAYG', '£13.50', '£13.50', '-'],
        ['5 Lesson Pack', '£60', '£12', '£7.50'],
        ['10 Lesson Pack', '£110', '£11', '£25']
    ]
  })
})
</script>

<style scoped>

</style>