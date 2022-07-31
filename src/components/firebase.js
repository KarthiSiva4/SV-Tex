// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-kmwhsUBTRVT3dmlE780-XlxrEVDS1gc",
  authDomain: "sv-tex.firebaseapp.com",
  projectId: "sv-tex",
  storageBucket: "sv-tex.appspot.com",
  messagingSenderId: "267252173865",
  appId: "1:267252173865:web:053a33c1975f3ee584e038",
  measurementId: "G-T23Y4FKCMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)
export {db}