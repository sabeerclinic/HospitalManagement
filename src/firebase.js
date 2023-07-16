// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth"; // if you want to use Firebase Authentication
// import other Firebase modules as needed

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBXQilIG1F7FpgYsWefSSWgELJr9aWCsg",
  authDomain: "hospitalmanagement-25829.firebaseapp.com",
  projectId: "hospitalmanagement-25829",
  storageBucket: "hospitalmanagement-25829.appspot.com",
  messagingSenderId: "951306781968",
  appId: "1:951306781968:web:092e82bc51ae53ed5dd195"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export function login(email, password) {
  console.log("sss")
  return signInWithEmailAndPassword(auth, email, password);
}

export const db = getFirestore();



export function logout() {
  console.log("hii hello")
  return signOut(auth);
}

  export const auth = getAuth(app);  

export default app;