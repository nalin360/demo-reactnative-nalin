// Import the functions you need from the SDKs you need
import firebase from "@react-native-firebase/app";
// import { getAnalytics } from "@react-native-firebase/analytics";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYZyh1nqf7l-2mhQK9NVZ3Pg3EWXcWiHE",
  authDomain: "taskmanager-2c0fc.firebaseapp.com",
  projectId: "taskmanager-2c0fc",
  storageBucket: "taskmanager-2c0fc.appspot.com",
  messagingSenderId: "767691142526",
  appId: "1:767691142526:web:846978d3c083f4ee2d2f2f",
  measurementId: "G-R0HDTGDYCH"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// if (!firestore.apps.length) {
//     firestore.app;
//   }
  
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();