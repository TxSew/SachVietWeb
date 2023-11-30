import firebase from 'firebase/compat/app';
// Import the functions you need from the SDKs you need
import 'firebase/compat/database';
import 'firebase/compat/storage';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBgx-OfSGwkYa0Gdhu1KkMYkiHdLbWI8v8',
    authDomain: 'bookscloud-3fd83.firebaseapp.com',
    projectId: 'bookscloud-3fd83',
    storageBucket: 'bookscloud-3fd83.appspot.com',
    messagingSenderId: '303342774344',
    appId: '1:303342774344:web:896531df1a8bc7fe46507d',
    measurementId: 'G-NC15MJKRMH',
};

// Initialize Firebase
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
export const storage = firebase.storage();
export default firebase;
