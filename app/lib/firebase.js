import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { loginJWT } from "./authjwt";
import Cookies from 'js-cookie';

const firebaseConfig = {
    apiKey: "AIzaSyBTpohAT7AoPn_eQdUaHstHPK-Zm-dnFjQ",
    authDomain: "asgcompressednote.firebaseapp.com",
    projectId: "asgcompressednote",
    storageBucket: "asgcompressednote.firebasestorage.app",
    messagingSenderId: "1062358187852",
    appId: "1:1062358187852:web:04dd60dc7eb99d610459e9",
    measurementId: "G-FDHL2424WL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);

// Firebase Authentication Functions
export const signInWithGoogle = async () => {

    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;

    const token = await loginJWT(user);

    return [token, user];
};

export const logOut = async () => {

    await signOut(auth);

    Cookies.remove('token', { path: '/' });

    return true;

}

export { auth, database };