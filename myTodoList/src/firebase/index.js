// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDljHwS_F2bdSVueNxfHkpelumzmJ0BH2Q",
  authDomain: "mytodolist-d7ce7.firebaseapp.com",
  projectId: "mytodolist-d7ce7",
  storageBucket: "mytodolist-d7ce7.appspot.com",
  messagingSenderId: "832314054122",
  appId: "1:832314054122:web:17f008b5d1fada692ece93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {
    db
}