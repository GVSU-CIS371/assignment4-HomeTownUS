import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAo4sgrg6p5Nkp2IGScGJjEwNdVYR4k4_g",
  authDomain: "cis371assignment4brew.firebaseapp.com",
  projectId: "cis371assignment4brew",
  storageBucket: "cis371assignment4brew.firebasestorage.app",
  messagingSenderId: "170802757519",
  appId: "1:170802757519:web:c6c6e7cace7f43653555fa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
