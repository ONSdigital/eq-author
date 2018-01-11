import firebase from "firebase/app";
import "firebase/auth";

const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;

firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: MESSAGING_SENDER_ID
});

export const auth = firebase.auth();
export const providers = [firebase.auth.GoogleAuthProvider.PROVIDER_ID];
