// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-1d4ec.firebaseapp.com",
  projectId: "mern-blog-1d4ec",
  storageBucket: "mern-blog-1d4ec.appspot.com",
  messagingSenderId: "496192612032",
  appId: "1:496192612032:web:068e18def59f7d140b6f25"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);