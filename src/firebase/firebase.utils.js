import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBrtFLZGU3wWihpjCoMRjaqrKqzrLUvVXA",
  authDomain: "ecomv2-45138.firebaseapp.com",
  databaseURL: "https://ecomv2-45138.firebaseio.com",
  projectId: "ecomv2-45138",
  storageBucket: "ecomv2-45138.appspot.com",
  messagingSenderId: "715610689845",
  appId: "1:715610689845:web:49a5488a1f36e381603c7c"
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

export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// google signin
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
