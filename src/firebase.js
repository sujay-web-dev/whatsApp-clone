import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyChwByjrGiR4ehqhMMasQXfkBQvijztdwE",
    authDomain: "whats-app-sujay.firebaseapp.com",
    databaseURL: "https://whats-app-sujay.firebaseio.com",
    projectId: "whats-app-sujay",
    storageBucket: "whats-app-sujay.appspot.com",
    messagingSenderId: "957661729355",
    appId: "1:957661729355:web:816fa111870577f1a0f3ce",
    measurementId: "G-EN8F3P93ZJ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;