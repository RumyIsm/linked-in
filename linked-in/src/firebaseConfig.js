import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDxgQXxjBqlhcR2zhjhCTdgrI80JwmF_M",
  authDomain: "linked-in-4a076.firebaseapp.com",
  projectId: "linked-in-4a076",
  storageBucket: "linked-in-4a076.firebasestorage.app",
  messagingSenderId: "261082829325",
  appId: "1:261082829325:web:1b1b59fdec5a4cbe10fb44",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, auth, firestore, storage };
