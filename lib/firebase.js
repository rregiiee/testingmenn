import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, signOut } from 'firebase/auth'  // tambahkan signOut di sini


// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZcowCDe2ibAAbADT3HcOFgk0gsSmimoA",
  authDomain: "uasproject-44412.firebaseapp.com",
  projectId: "uasproject-44412",
  storageBucket: "uasproject-44412.firebasestorage.app",
  messagingSenderId: "400867902272",
  appId: "1:400867902272:web:ded6f859d7e836db68b0a5",
}

// Initialize Firebase app
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

// Initialize Firebase Auth
const auth = getAuth(app)

// Export yang diperlukan
export { db, auth, signOut }
