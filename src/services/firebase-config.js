
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyADvedYqj-682WnpLTqpaf6GKkSJKPpPKs",
  authDomain: "hub-df2a5.firebaseapp.com",
  projectId: "hub-df2a5",
  storageBucket: "hub-df2a5.firebasestorage.app",
  messagingSenderId: "824567080035",
  appId: "1:824567080035:web:dab3051f04d0e4c0b4c456"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);