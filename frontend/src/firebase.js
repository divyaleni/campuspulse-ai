import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGsbm-wqgYqMkRz6xVQb49Br1Ms36f2PM",
  authDomain: "campuspulse-ai-e9fa8.firebaseapp.com",
  projectId: "campuspulse-ai-e9fa8",
  storageBucket: "campuspulse-ai-e9fa8.firebasestorage.app",
  messagingSenderId: "140061471699",
  appId: "1:140061471699:web:190f7d7b17e7bb61823526",
  measurementId: "G-PBLGJ2YBBM"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);