// firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD7JIq19Ldlp3zUKhP4XxI6gd2JniJFUjU",
    authDomain: "project-hyperion-5b590.firebaseapp.com",
    projectId: "project-hyperion-5b590",
    storageBucket: "project-hyperion-5b590.appspot.com",
    messagingSenderId: "404721852782",
    appId: "1:404721852782:web:09a88aa4734ae00ee3617f",
    measurementId: "G-1MNHN5WJXX"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export { auth, googleProvider, facebookProvider, microsoftProvider };
