import {initializeApp} from "firebase/app";
import {getAuth, connectAuthEmulator} from "firebase/auth";
import {connectFunctionsEmulator, getFunctions} from "firebase/functions";

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBEdUQhpnnmGokxniyIKdfpAjz1sZzeg0U",
    authDomain: "bunq-overview.firebaseapp.com",
    projectId: "bunq-overview",
    storageBucket: "bunq-overview.appspot.com",
    messagingSenderId: "192891423368",
    appId: "1:192891423368:web:e87ef8503e333c24f3ad3d"
});

export const auth = getAuth()
export const functions = getFunctions(firebaseApp)

if (import.meta.env.DEV) {
    connectAuthEmulator(auth, "http://192.168.178.54:9099")
    connectFunctionsEmulator(functions, "192.168.178.54", 5001)
}
