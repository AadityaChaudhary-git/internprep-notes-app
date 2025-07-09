// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACmTD9g_o4kbWvq2WR6STzewU6D897owQ",
  authDomain: "internprep-notes.firebaseapp.com",
  projectId: "internprep-notes",
  storageBucket: "internprep-notes.appspot.com",
  messagingSenderId: "999083047968",
  appId: "1:999083047968:web:f3b57066e6636919585045"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
