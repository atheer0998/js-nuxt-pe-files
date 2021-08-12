import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyAXBADw9xP9vEI0YgNZMY6KgDnIfYZnHUk",
  authDomain: "pe-files.firebaseapp.com",
  projectId: "pe-files",
  storageBucket: "pe-files.appspot.com",
  messagingSenderId: "491179524480",
  appId: "1:491179524480:web:48080201fa1071870e4165"
};

let app = null;

if (!firebase.apps.length) {

  app = firebase.initializeApp(firebaseConfig);
}

export default firebase;
