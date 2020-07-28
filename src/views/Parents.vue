<template>
    <v-container v-if="isParent">
      IT WORKS
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import {auth} from "@/firebase";

    export default Vue.extend({
      name: "Parents",
      data: () => ({
        auth,
        isParent: auth.currentUser.getIdToken().then((r) => {return r.claims.parent})
      })
    })
</script>

<style scoped>

</style>