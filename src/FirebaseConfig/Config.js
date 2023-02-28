// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPniKpEWD7dFEOx7ATwiywJXYtwCuum9w",
    authDomain: "blackdollor-fba45.firebaseapp.com",
    databaseURL: "https://blackdollor-fba45-default-rtdb.firebaseio.com",
    projectId: "blackdollor-fba45",
    storageBucket: "blackdollor-fba45.appspot.com",
    messagingSenderId: "442827762905",
    appId: "1:442827762905:web:80868f204c223ffd1962c8",
    measurementId: "G-FXRQBKR8ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app