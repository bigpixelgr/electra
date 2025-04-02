// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfVrFfdUehONuvX-622mzzxuQzwdgpqyw",
  authDomain: "electra-booking-system.firebaseapp.com",
  projectId: "electra-booking-system",
  storageBucket: "electra-booking-system.firebasestorage.app",
  messagingSenderId: "818379921571",
  appId: "1:818379921571:web:28dd3550b3b1e08363c716",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
const db = getFirestore(app);

export { db };
