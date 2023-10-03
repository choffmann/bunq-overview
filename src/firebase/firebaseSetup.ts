import {initializeApp} from "firebase/app";
import {getAuth, connectAuthEmulator} from "firebase/auth";
import {connectFunctionsEmulator, getFunctions} from "firebase/functions";
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";

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
export const db = getFirestore(firebaseApp)

if (import.meta.env.DEV) {
    const hostAddress = import.meta.env.VITE_DEV_HOST_ADDRESS || "localhost"
    connectAuthEmulator(auth, `http://${hostAddress}:9099`)
    connectFunctionsEmulator(functions, hostAddress, 5001)
    connectFirestoreEmulator(db, hostAddress, 8080)
}
