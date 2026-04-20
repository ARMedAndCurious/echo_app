// src/services/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzXjTKGKEfyKjHgCV5a7GfRokv4PtM-2g",
  authDomain: "echo-app-5dc8d.firebaseapp.com",
  projectId: "echo-app-5dc8d",
  storageBucket: "echo-app-5dc8d.firebasestorage.app",
  messagingSenderId: "778736317332",
  appId: "1:778736317332:web:f80c69e94256058d9d5581",
  measurementId: "G-P60SHKYDWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔑 THIS is what we actually need
export const auth = getAuth(app);