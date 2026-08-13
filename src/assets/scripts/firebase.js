import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Main Firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyBgL7NSc2osefREaSVQwcUQHvmhokE49Ts",
  authDomain: "benby-merch-app.firebaseapp.com",
  databaseURL:
    "https://benby-merch-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "benby-merch-app",
  storageBucket: "benby-merch-app.appspot.com",
  messagingSenderId: "99890373813",
  appId: "1:99890373813:web:1d6d7451a7658e2d3f4afc",
};

// ✅ Main app
const app = initializeApp(firebaseConfig);

// Export main databases and auth
export const realtime_db = getDatabase(app);
export const firestore_db = getFirestore(app);
