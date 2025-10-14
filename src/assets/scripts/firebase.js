// firebase_config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // <-- Add this

const firebaseConfig = {
  apiKey: "AIzaSyAF96p13wi5B3ofmom9c_p21ht4l7SNgl0",
  authDomain: "qs-system-demo.firebaseapp.com",
  databaseURL:
    "https://qs-system-demo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qs-system-demo",
  storageBucket: "qs-system-demo.firebasestorage.app",
  messagingSenderId: "641710365797",
  appId: "1:641710365797:web:ccfe8ca657f09de0c13a8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export databases
export const realtime_db = getDatabase(app);
export const firestore_db = getFirestore(app);

// Export auth
export const auth = getAuth(app); // <-- Initialize Auth
