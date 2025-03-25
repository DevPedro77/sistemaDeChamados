import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDAPnxHfI5QPPnXcvCpjO-tLixARE2QMhs",
  authDomain: "tickets-d8df4.firebaseapp.com",
  projectId: "tickets-d8df4",
  storageBucket: "tickets-d8df4.firebasestorage.app",
  messagingSenderId: "414564653665",
  appId: "1:414564653665:web:1f9b7dfe2793581822e820",
  measurementId: "G-8RG4ST9HS6"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const analytics = getAnalytics(firebaseApp);


export {auth, db, analytics}