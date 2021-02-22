import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBrnly9YVv_I4uZpe7C3NQFD5uaQoTfMs4",
    authDomain: "userauth-898cb.firebaseapp.com",
    projectId: "userauth-898cb",
    storageBucket: "userauth-898cb.appspot.com",
    messagingSenderId: "753276468725",
    appId: "1:753276468725:web:d69c770e9f3716681034bc",
    measurementId: "G-5ZWYR52QDK",
    databaseURL:'https://userauth-898cb.firebaseapp.com'
  };


firebase.initializeApp(config);

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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;