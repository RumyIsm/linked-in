import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // GoogleAuthProvider,
  // signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

export const LoginAPI = async (email, password) => {
  try {
    let response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    console.error("Login error:", err.message || err);
    throw err;
  }
};

export const RegisterAPI = async (email, password) => {
  try {
    let response = await createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    console.error("Register error:", err.message || err);
    throw err;
  }
};

// export const GoogleSignInAPI = async () => {
//   try {
//     const googleProvider = new GoogleAuthProvider();
//     let response = await signInWithPopup(auth, googleProvider);
//     return response;
//   } catch (err) {
//     console.error("Google Sign-In error:", err.message || err);
//     throw err;
//   }
// };
