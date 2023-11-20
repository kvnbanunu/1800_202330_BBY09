//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyDDZUU5S3_MM8ZJKjWxbZ5P_LcyEe7YiBI",
  authDomain: "busroots-420df.firebaseapp.com",
  projectId: "busroots-420df",
  storageBucket: "busroots-420df.appspot.com",
  messagingSenderId: "664991281714",
  appId: "1:664991281714:web:39ed2983cae3caf3b7c22b"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
