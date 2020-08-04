<template>
  <v-dialog
      :key="id"
      class="subheading mx-3"
      v-model="displayed"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          dark
          v-bind="attrs"
          class="subheading mx-3"
          v-on="on">
        Book
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{lesson.Subject + ' by ' + lesson.Tutor}}
      </v-card-title>
      <v-card-text>
        Book for:
        <v-select :items="students" label="Student" v-model="student" item-text="displayName" item-value="id" solo>
        </v-select>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Pay",
  data: () => ({
    displayed: false,
    id: 0,
    student: null
  }),
  props: {
    lesson: Object
  },
  computed: {
    students () {
      return this.$parent.students
    },
    alreadyBooked () {
      if (this.student === null) {
        return true
      }
      return !(this.student in this.lesson.students)
    }
  }
})
</script>

<style scoped>

</style>