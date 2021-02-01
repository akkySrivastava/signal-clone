import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCujDQHhIsH7CNTtbOvv-hwaQ2mRqkcReo",
  authDomain: "signal-clone-f1ebb.firebaseapp.com",
  projectId: "signal-clone-f1ebb",
  storageBucket: "signal-clone-f1ebb.appspot.com",
  messagingSenderId: "998041003949",
  appId: "1:998041003949:web:f8482b3c3e54557ff06324",
  measurementId: "G-QV45V5KZBQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
