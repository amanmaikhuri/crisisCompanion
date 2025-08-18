import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5Qo-KumdtU2gCjQqSR51CVj01hV4Auu8",
  authDomain: "crisis-companion-956.firebaseapp.com",
  projectId: "crisis-companion-956",
  storageBucket: "crisis-companion-956.firebasestorage.app",
  messagingSenderId: "312549106656",
  appId: "1:312549106656:web:baa2adc91d2ea7b0028185",
  measurementId: "G-4MN285W1E2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app); // Uncomment if you need Firestore

export { app, auth, db}; 