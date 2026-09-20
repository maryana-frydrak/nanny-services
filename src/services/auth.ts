import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

export const loginUser = async (email: string, pass: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
};

export const registerUser = async (email: string, pass: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    pass,
  );
  return userCredential.user;
};
