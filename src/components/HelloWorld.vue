<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            Welcome to TutorGuide
          </h1>

          <p class="subheading font-weight-regular">
            Your one-stop tutor team to cope with GCSEs during the Covid-19 Outbreak.
          </p>

      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          View Courses
        </h2>
        <h3 style='padding-bottom: 1%'>
          Pre-Yr 11 Summer Courses for GCSE
        </h3>
        <v-row justify="center">
          <v-btn
            v-for="(next, i) in Courses"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      Courses: [ //TODO: Connect to Firebase Firestore
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
  }
</script>
