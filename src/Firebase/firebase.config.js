// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwLDHUJoJKPnya8MxIPatU1NDHTvEzjAk",
  authDomain: "project-final-auth.firebaseapp.com",
  projectId: "project-final-auth",
  storageBucket: "project-final-auth.appspot.com",
  messagingSenderId: "869030968779",
  appId: "1:869030968779:web:8b5e8626b81486d7854a4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;