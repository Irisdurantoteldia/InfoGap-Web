import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxvbwFIkeNyQ5k8SIAGYJ0UPraGCpS4bA",
  authDomain: "test-c1325.firebaseapp.com",
  projectId: "test-c1325",
  storageBucket: "test-c1325.appspot.com",
  messagingSenderId: "432531775221",
  appId: "1:432531775221:web:88b519f85cf34e64c16fbc",
  measurementId: "G-GP7QR71Q3S"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);