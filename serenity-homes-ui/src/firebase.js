// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "serenity-homes.firebaseapp.com",
    projectId: "serenity-homes",
    storageBucket: "serenity-homes.appspot.com",
    messagingSenderId: "671209388767",
    appId: "1:671209388767:web:0aa3b8f9562be9a341c76a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);