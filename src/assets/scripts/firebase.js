// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF96p13wi5B3ofmom9c_p21ht4l7SNgl0",
  authDomain: "qs-system-demo.firebaseapp.com",
  projectId: "qs-system-demo",
  storageBucket: "qs-system-demo.firebasestorage.app",
  messagingSenderId: "641710365797",
  appId: "1:641710365797:web:ccfe8ca657f09de0c13a8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
