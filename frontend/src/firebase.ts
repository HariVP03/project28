// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSg-NLWzqpZHC-8qE92ieVuVO3Tfp5RqA",
    authDomain: "project28-paint.firebaseapp.com",
    projectId: "project28-paint",
    storageBucket: "project28-paint.appspot.com",
    messagingSenderId: "997423421572",
    appId: "1:997423421572:web:24166d2a70697b126c8ad1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage();
export const auth = getAuth();
