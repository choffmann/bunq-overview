import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

initializeApp({
    apiKey: "AIzaSyBEdUQhpnnmGokxniyIKdfpAjz1sZzeg0U",
    authDomain: "bunq-overview.firebaseapp.com",
    projectId: "bunq-overview",
    storageBucket: "bunq-overview.appspot.com",
    messagingSenderId: "192891423368",
    appId: "1:192891423368:web:9c18a31108935cebf3ad3d"
});

export const auth = getAuth()