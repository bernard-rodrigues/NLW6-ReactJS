import firebase from 'firebase/app'

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }

//COISAS QUE COPIEI LÁ DO FIREBASE, MAS O DIEGO NÃO COPIOU. VAI QUE...
// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyB7m4KRWviPwMXxezuxkZl4_VhmQM3TFw4",
//     authDomain: "letmeask-1d3e8.firebaseapp.com",
//     databaseURL: "https://letmeask-1d3e8-default-rtdb.firebaseio.com",
//     projectId: "letmeask-1d3e8",
//     storageBucket: "letmeask-1d3e8.appspot.com",
//     messagingSenderId: "676454514224",
//     appId: "1:676454514224:web:ec137bc583db038ee4b7f5"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// </script>