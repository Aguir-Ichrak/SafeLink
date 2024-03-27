// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAYkM7OkfDkrr6OeCvvnHKu2cZSkUyI8gg",
  authDomain: "safelink-fa263.firebaseapp.com",
  projectId: "safelink-fa263",
  storageBucket: "safelink-fa263.appspot.com",
  messagingSenderId: "1037248072175",
  appId: "1:1037248072175:web:280f25e2359ecb42afce1a",
  measurementId: "G-NJWTP4YEHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = firebase.firestore();
export const auth = getAuth(app);