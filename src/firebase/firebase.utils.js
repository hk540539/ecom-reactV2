import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyC6KxXcKHTS1qwl71RPbSDcERLD_bCyCx0",
  authDomain: "ecom-db-c4644.firebaseapp.com",
  databaseURL: "https://ecom-db-c4644.firebaseio.com",
  projectId: "ecom-db-c4644",
  storageBucket: "ecom-db-c4644.appspot.com",
  messagingSenderId: "557268770569",
  appId: "1:557268770569:web:a11778dea8ebed34e8fdd8",
  measurementId: "G-QFJK1XY58T"
};

firebase.initializeApp(config);

// create new user profile in database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google signin
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
