
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: "mern-blog-d6ea0.firebaseapp.com",
  projectId: "mern-blog-d6ea0",
  storageBucket: "mern-blog-d6ea0.appspot.com",
  messagingSenderId: "961459111002",
  appId: "1:961459111002:web:badb21b10e8ac31ca5c463"
};

export const app = initializeApp(firebaseConfig);