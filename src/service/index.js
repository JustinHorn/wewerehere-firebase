import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCxsNL4nGuLque08zYdMYpG2i2099FAgWg",
  authDomain: "wewerehere-c257c.firebaseapp.com",
  databaseURL: "https://wewerehere-c257c.firebaseio.com",
  projectId: "wewerehere-c257c",
  storageBucket: "wewerehere-c257c.appspot.com",
  messagingSenderId: "931320982586",
  appId: "1:931320982586:web:90a88254da0e9f0c9a9903",
  measurementId: "G-X9BCGP79EN",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
