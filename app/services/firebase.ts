import firebase from "firebase";

const fb = firebase.initializeApp({
  apiKey: "AIzaSyBUoa5u8pUE5UayWD-QL7Ff8gNQUSaVU84",
  authDomain: "pickup-tricking.firebaseapp.com",
  databaseURL: "https://pickup-tricking.firebaseio.com",
  projectId: "pickup-tricking",
  storageBucket: "pickup-tricking.appspot.com",
  messagingSenderId: "981593307874"
});


export const auth = fb.auth();
export const db = fb.database();
