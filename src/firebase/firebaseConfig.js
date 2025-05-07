import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCd1_ITaKe-XfAV9-y0Vy4AoG6rrwnmZOA",
  authDomain: "login-and-sing-up-page.firebaseapp.com",
  projectId: "login-and-sing-up-page",
  storageBucket: "login-and-sing-up-page.firebasestorage.app",
  messagingSenderId: "1091781921673",
  appId: "1:1091781921673:web:b12156f999fa5d3ec8ef58",
  measurementId: "G-KY32NJJCP2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
