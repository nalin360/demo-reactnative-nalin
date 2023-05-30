// Import the functions you need from the SDKs you need
import firebase from "@react-native-firebase/app";
// import { getAnalytics } from "@react-native-firebase/analytics";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// if (!firestore.apps.length) {
//     firestore.app;
//   }
  
// const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();