// Import the functions you need from the SDKs you need
import firebase, { initializeApp, getApp } from "firebase/app";
import "firebase/auth"

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
 } else {
    app = firebase.app(); // if already initialized, use that one
 }

// const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// console.log(app);
// export const auth = app.auth()

export const auth = app.auth()
export default app;