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
        <h3 class="my-3">
          Book for:
        </h3>
        <v-select :items="students" label="Student" v-model="student" item-text="displayName" item-value="id" solo>
        </v-select>
        <h4 v-if="alreadyBooked">This student has already been booked for this lesson, or a student hasn't been selected.</h4>
        <v-row v-else>
          <v-col cols="12">
            <v-radio-group v-model="paymentMethod">
              <v-radio label="PAYG (Purchase Individual Lesson) £13.50 " value="PAYG">
              </v-radio>
              <v-radio label="Deduct from prepaid Lessons" value="PREPAID" :disabled="noPrepaid">
              </v-radio>
              <v-radio label="Use Free Trial Lesson (1 time use)" value="TRIAL" v-if="parent.hasFreeTrial"> </v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" v-if="paymentMethod==='PAYG'">
            <p>
              Please include your reference code:
              <strong>
                {{parent.code + ':' + student.slice(0,7) + ':' + lesson.id.slice(0,7)}}
              </strong> <br/>
              in the payment notes, so that we can identify it's yours. <br/>
              It may take up to a day for the payment to be processed. <br/> Your payment is secured by PayPal.
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="!alreadyBooked">
        <v-btn v-if="paymentMethod==='PAYG'"
        @click="makePayment">
          Pay via Paypal
        </v-btn>
        <v-btn v-else-if="paymentMethod==='PREPAID'"
               @click="fromPrepaid"
               >
          Pay using Prepaid Lessons
        </v-btn>
        <v-btn v-else-if="paymentMethod === 'TRIAL'"
        @click="fromTrial">
          Use Free Trial
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import {db, functions} from "@/firebase"

export default Vue.extend({
  name: "Pay",
  data: () => ({
    db,
    functions,
    displayed: false,
    id: 0,
    student: null,
    paymentMethod: 'PAYG',
    paymentItemMade: false
  }),
  props: {
    lesson: Object
  },
  computed: {
    students () {
      return this.$parent.$parent.students
    },
    alreadyBooked () {
      if (this.student === null) {
        return true
      }
      console.log(this.lesson.Students)
      return (this.lesson.Students.includes(this.student))
    },
    noPrepaid () {
      return (this.parent.lessons < 1)
    },
    parent() {
      return this.$parent.$parent.parent
    },
  },
  methods: {
    async makePayment () {
      if (!this.paymentItemMade) {
        /*
        await functions.httpsCallable('AddPayment')({
          amount: 13.50,
          parent: this.parent.displayName,
          student: this.student,
          lesson: this.lesson.id,
          type: 'Lesson',
          code: this.parent.code + ':' + this.student.slice(0, 7) + ':' + this.lesson.id.slice(0, 7),
          status: 'pending'
        })

         */
      }
      window.open('https://www.paypal.me/tutorguides/13.50')
    },
    async fromPrepaid () {
      if (this.parent.lessons >= 1) {
        await functions.httpsCallable('addToLesson')(
            {
              students: this.lesson.Students,
              student: this.student,
              lesson: this.lesson.id
            })
        await functions.httpsCallable('updateUserDoc')(
            {
              lessons: this.parent.lessons - 1
            })
        this.$parent.$parent.$parent.$emit('snackbarShow', 'Student successfully registered.')
      }
    },
    async fromTrial () {
      await functions.httpsCallable('addToLesson')(
          {
            students: this.lesson.Students,
            student: this.student,
            lesson: this.lesson.id
          })
      await functions.httpsCallable('updateUserDoc')(
          {
            hasFreeTrial: false
          })

    }
  }
})
</script>

<style scoped>

</style>