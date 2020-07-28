import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

const firebaseConfig = {
    apiKey: "AIzaSyDxI8wnGLZs_Tg6kiNCL90RxNmpsYOuzDg",
    authDomain: "tutorguide-7059d.firebaseapp.com",
    databaseURL: "https://tutorguide-7059d.firebaseio.com",
    projectId: "tutorguide-7059d",
    storageBucket: "tutorguide-7059d.appspot.com",
    messagingSenderId: "931376043508",
    appId: "1:931376043508:web:59afeb91f77bf0544755a1",
    measurementId: "G-7TZKW95LQJ"
};
// Get a Firestore instance

const fire = firebase.initializeApp(firebaseConfig);
export default fire

export const db = fire.firestore()
export const auth = fire.auth()
export const functions = fire.functions()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }