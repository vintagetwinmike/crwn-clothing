import { initializeApp } from 'firebase/app';
import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaykcoPFzNoO5nKBOoeZSGka1xaiPt3pE",
    authDomain: "crwn-clothing-db-df094.firebaseapp.com",
    projectId: "crwn-clothing-db-df094",
    storageBucket: "crwn-clothing-db-df094.appspot.com",
    messagingSenderId: "251729730213",
    appId: "1:251729730213:web:c3e94754d73476819e0b4c"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  export const db = getFirestore();

 export const createUserDocumentFromAuth = async (userAuth, additionaInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName, email, createdAt, ...additionaInformation
        })
      } catch(error) {
        console.log('error creating suer', error.message);
      }

      return userDocRef;
    }

  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
  }