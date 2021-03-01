import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVZnZcrsfxooMiKFcltQVN3x18gsnWyd0",
  authDomain: "flipkat-copy.firebaseapp.com",
  databaseURL: "https://flipkat-copy.firebaseio.com",
  projectId: "flipkat-copy",
  storageBucket: "flipkat-copy.appspot.com",
  messagingSenderId: "305353202860",
  appId: "1:305353202860:web:7c2893ac68b75df4d29309",
  measurementId: "G-WV4LEMLSC1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };