import * as firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCituccSv0JAPH5EArzT4QzUD5ketMFNp0",
    authDomain: "instachat-2.firebaseapp.com",
    projectId: "instachat-2",
    storageBucket: "instachat-2.appspot.com",
    messagingSenderId: "411603517322",
    appId: "1:411603517322:web:4a1fc0367800e1bdae1273"
  };

  let app;

  if (firebase.apps.length === 0) {
      app = firebase.initializeApp(firebaseConfig)
  } else {
      app = firebase.app()
  }

  const db = app.firestore()
  const auth = firebase.auth()

  export { db, auth }