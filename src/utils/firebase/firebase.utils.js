import { initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA12KNxjbwSJzsyC8ixKma7jp7vr2Ks91I",
    authDomain: "crwn-clothing-2021e.firebaseapp.com",
    projectId: "crwn-clothing-2021e",
    storageBucket: "crwn-clothing-2021e.appspot.com",
    messagingSenderId: "733724449628",
    appId: "1:733724449628:web:ac734b6f122161a972bf99"
  };
  

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists())
    {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName, email, createdAt
            });
        }
        catch(error)
        {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}