// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your Firebase config object here
const firebaseConfig = {
  apiKey: "AIzaSyBROMo-fCVQ1RrlEwowaUjbDcpWK6m3E78",
  authDomain: "brandgpt-18a9d.firebaseapp.com",
  projectId: "brandgpt-18a9d",
  storageBucket: "brandgpt-18a9d.firebasestorage.app",
  messagingSenderId: "971768711968",
  appId: "1:971768711968:web:7ce8169c1db2b57339a545",
  measurementId: "G-64RQXZ0785"
};

const app = initializeApp(firebaseConfig);

// 🔐 Authentication
export const auth = getAuth(app);

// 💾 Firestore database
export const db = getFirestore(app);
