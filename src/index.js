import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAxnCnkUuKTVCnGir7QCuBqiFQLWU2LPeg",
  authDomain: "chatster-45c51.firebaseapp.com",
  projectId: "chatster-45c51",
  storageBucket: "chatster-45c51.appspot.com",
  messagingSenderId: "741194242079",
  appId: "1:741194242079:web:7f3fb1778b3aec843d9d2a",
  databaseURL: "https://chatster-45c51-default-rtdb.europe-west1.firebasedatabase.app",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
