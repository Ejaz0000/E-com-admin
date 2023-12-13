// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOfOnU-XjodCIM8UngMQW4n49559-O9Kg",
  authDomain: "next-e-com-401020.firebaseapp.com",
  projectId: "next-e-com-401020",
  storageBucket: "next-e-com-401020.appspot.com",
  messagingSenderId: "770631760638",
  appId: "1:770631760638:web:4d9b5f6b7936f1c46d03af",
  measurementId: "G-SJZX6SYR2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);