import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsiOpINWL5t9rdcJDNrfw6mmnKl5gGZXY",
  authDomain: "myfitbot-df6ea.firebaseapp.com",
  projectId: "myfitbot-df6ea",
  storageBucket: "myfitbot-df6ea.appspot.com",
  messagingSenderId: "436613698370",
  appId: "1:436613698370:web:ffd91757ae74c898302edb",
  measurementId: "G-5GF1NCF9CS",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
