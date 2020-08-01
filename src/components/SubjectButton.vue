<template>
  <v-dialog
      :key="id"
      @click="$router.push(('/subjects/'+course.Name))"
      class="subheading mx-3"
      v-model="displayed"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          class="subheading mx-3 my-3"
          v-on="on">
        {{course.Name}}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">
        {{course.Name}}
      </v-card-title>
      <v-card-text>
        <p class="mt-3">
          {{course.Description[0]}}
        </p>
        <p>
          Topics:
        </p>
        <ul>
          <li v-for="(topic, id) in course.Topics" :key="id">
            {{topic}}
          </li>
        </ul>
        <br/>
        <p class="ma-1">
          Exam Boards:
        </p>
        <ul>
          <li v-for="(board, id) in course.ExamBoard" :key="id" class="ma-1">
            {{board}}
          </li>
        </ul>

      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "SubjectButton",
  props: {
    course: Object,
  },
  data: () => ({
    id: 0,
    displayed: false,
  })
})
</script>

<style scoped>

</style>