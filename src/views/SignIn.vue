<template>
    <v-container>
        <v-card v-if="!signedIn">
            <v-card-title>
                <h1 class="my-5">
                    Sign In/ Up
                </h1>
            </v-card-title>
            <v-card-actions>
                <v-radio-group v-model="userType" row>
                    <v-radio
                            label="As Student"
                            :value="'student'"
                    ></v-radio>
                    <v-radio
                            label="As Parent"
                            :value="'parent'"
                    ></v-radio>
                    <!--
                    <v-btn class="pa-4">
                        As Student
                    </v-btn>
                    <v-btn class="pa-4">
                        As Parent
                    </v-btn>
                    -->
                </v-radio-group>
            </v-card-actions>

            <v-card-text>
                <h2>First time here?</h2>
                <v-switch v-model="registering"
                label="New User">
                </v-switch>
                <v-card v-if="registering" class="ma-auto">
                    <v-card v-if="userType.includes('student')">
                        <v-card-title>
                            Student
                        </v-card-title>
                        <v-card-subtitle>
                            Make sure you have already made a parent account.
                        </v-card-subtitle>
                      <v-card-actions>
                        <v-text-field v-model="regCode" label="Parent Account Code" size="50%">
                        </v-text-field>
                      </v-card-actions>

                    </v-card>
                    <v-card v-if="userType.includes('parent')">
                        <v-card-title>
                            Parent
                        </v-card-title>
                        <v-card-text>
                            The sign up process is simple and easy!
                            Create an account as a parent and a code will be sent to your email.
                            The student should then use that code when signing up.

                            Besides your 1 hour free trial lesson, the default payment method is Pay as You Go, which means payments are made for each lesson individually before they are booked.
                            You can also choose to purchase a bundle of lessons at once at a discounted price.
                        </v-card-text>
                    </v-card>
                </v-card>
            </v-card-text>
            <div id="firebaseui-auth-container" v-show="showAuth">
            </div>
            <v-divider class="my-5"/>
        </v-card>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import 'firebaseui/dist/firebaseui.css';
    import {auth, functions, db} from "@/firebase.js";
    import getEmail from "@/custom/parentRegistrationEmail.js";
    const firebase = require('firebase/app');
    const firebaseui = require('firebaseui');

    export default Vue.extend({
        name: 'SignIn',
        data: () => ({
          signedIn: !(auth.currentUser==null),
          db,
          functions,
          registering: false,
          auth,
          regCode:'',
          userType: 'student',
          regCodeValid: false,
        }),
      methods: {
        load: function (type) {
          const that = this;
          auth.setPersistence('local')
          let ui = firebaseui.auth.AuthUI.getInstance();
          if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
          }
          ui.start('#firebaseui-auth-container', {
            signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
              // eslint-disable-next-line no-unused-vars
              async signInSuccessWithAuthResult(authResult, redirectUrl) {
                if (authResult.additionalUserInfo.isNewUser) {
                  const setClaims = functions.httpsCallable('setUserClaims')
                  await that.setUserDoc({
                    document: {
                      type: that.userType,
                      email: auth.currentUser.email,
                      displayName: auth.currentUser.displayName,
                    },
                    options: {merge: true}
                  })
                  await setClaims(that.userType)
                  if (that.userType === 'parent') {
                    that.parentRegister()
                  }
                  if (that.userType === 'student') {
                    that.studentRegister()
                  }
                }
                // await auth.currentUser.getIdToken(true)
                const idToken = await auth.currentUser.getIdTokenResult()
                if (idToken.claims.parent) {
                  that.userType = 'parent'
                }
                if (idToken.claims.student) {
                  that.userType = 'student'
                }
              }
            },
            signInFlow:'popup',
            popupMode:'true',
            signInSuccessUrl: '#/' + type + 's'
          });
          this.$forceUpdate()
          this.userType = type;
        },
        parentRegister: function ()   {
          const code = auth.currentUser.uid.slice(0,6)
          this.setUserDoc({
            options: {merge: true},
            document: {code}
          })
          const data = getEmail(auth.currentUser.email, code);
          const sendMail = functions.httpsCallable('sendMail');
          sendMail(data)
        },
        studentRegister: function (parentRef) {
          const parent = db.collection('users').doc(parentRef)
          this.setUserDoc({
            options: {merge:true},
            document: {parent}
          })
        },
        setUserDoc: functions.httpsCallable('setUserDoc')
      },
      mounted() {
          this.load('student')
      },
      computed: {
          showAuth: function () {
            return ((!this.registering) || (this.userType==='parent') || (this.userType==='student' && this.regCodeValid))
          }
      },
      watch: {
        userType: function () {
            this.load(this.userType)}
      }
  })
</script>
