// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDDOxlkjeNiz5RWQ-zwKPkZf5PTFO_jFEM",

  authDomain: "project28-3db35.firebaseapp.com",

  projectId: "project28-3db35",

  storageBucket: "project28-3db35.appspot.com",

  messagingSenderId: "1006191829726",

  appId: "1:1006191829726:web:fed6fab764530b9dfe184f"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();
