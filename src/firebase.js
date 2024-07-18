
// src/firebase.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeRnLexFK7GWTMwQaZLRYsB6fkwtLZWd0",
  authDomain: "social-photo-manager-9d6f7.firebaseapp.com",
  projectId: "social-photo-manager-9d6f7",
  storageBucket: "social-photo-manager-9d6f7.appspot.com",
  messagingSenderId: "22453449727",
  appId: "1:22453449727:web:5955752b3ca2ebeadaedca",
  measurementId: "G-S0KDQ8ZCYS"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
