import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firestore";

export const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    const userRef = doc(db, "users", result.user.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
        console.log("SHOULD REDIRECT")
        window.location.href = "/register?from=google";
        return;
    }
    window.location.href = "/";
}
