// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration  project-550115764558
const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_KEY || "AIzaSyD2NH-8dcSrfxg_tW4w1W3-ofiqoi_iW78",
    authDomain: "mern-ecommerce-2024-72aba.firebaseapp.com",
    projectId: "mern-ecommerce-2024-72aba",
    storageBucket: "mern-ecommerce-2024-72aba.appspot.com",
    messagingSenderId: "550115764558",
    appId: "1:550115764558:web:f130555978fd6b28a4561f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
