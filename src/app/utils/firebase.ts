import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbCc_FxEcg9jnqvASCREn1VAjlCrasdus",
  authDomain: "mindchat-ba82e.firebaseapp.com",
  projectId: "mindchat-ba82e",
  storageBucket: "mindchat-ba82e.appspot.com",
  messagingSenderId: "33301755306",
  appId: "1:33301755306:web:c98ca427062b3eb859a7d3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
