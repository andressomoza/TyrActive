// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCCKnOiNKwG8Ie03vsvpssxy7Zr8l57-PY",
  authDomain: "tyractive.firebaseapp.com",
  projectId: "tyractive",
  storageBucket: "tyractive.appspot.com",
  messagingSenderId: "16053241636",
  appId: "1:16053241636:web:ae6bfa9d26a384d59f95b1",
  measurementId: "G-M9DGF4YMRZ"
};

//initialize firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
//export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, { persistence: storage });
export const FIRESTORE = getFirestore(FIREBASE_APP);


export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});