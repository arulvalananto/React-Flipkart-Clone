import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVZnZcrsfxooMiKFcltQVN3x18gsnWyd0",
  authDomain: "flipkat-copy.firebaseapp.com",
  databaseURL: "https://flipkat-copy.firebaseio.com",
  projectId: "flipkat-copy",
  storageBucket: "flipkat-copy.appspot.com",
  messagingSenderId: "305353202860",
  appId: "1:305353202860:web:f74bbe00e7e6b4d6d29309",
  measurementId: "G-NR8NQW1SMG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };