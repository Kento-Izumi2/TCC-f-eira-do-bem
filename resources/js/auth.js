import { app } from "./firebase";
import { db } from "./firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { uploadImage } from "./storage";

export const auth = getAuth(app);

export async function login(email, password) {
    try {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return credential.user;
    } catch (error) {
        alert("Email ou senha incorretos");
        return false;
    }
}

export async function logout() {
    try {
        await auth.signOut();
    } catch (error) {
        alert("Erro ao sair");
    }
}

export async function verifyUser(callback) {
    onAuthStateChanged(auth, callback);
}

export async function register(
    email,
    password,
    phone,
    name,
    address,
    cnpj,
    city,
    state,
    photoFile
) {
    try {
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        let imageUrl = null;
        if (photoFile) {
            let imageUrl = await uploadImage(
                photoFile,
                `users/${credential.user.uid}.jpg`
            );
        }

        await setDoc(doc(db, "users", credential.user.uid), {
            email: email.trim().toLowerCase(),
            displayName: name,
            photoURL: imageUrl,
            phone: phone,
            address: address,
            cnpj: cnpj,
            city: city,
            state: state,
            bio: "",
        });
        return credential.user;
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert("Email já cadastrado");
        }
        if (error.code === "auth/invalid-email") {
            alert("Email inválido");
        }
        if (error.code === "auth/weak-password") {
            alert("Senha fraca");
        }
        return false;
    }
}

export async function middleware(user) {
    const authPages = ["/login", "/register"];
    // const protectedPages = [
    //     "/profile",
    //     "/chat",
    //     "/post",
    //     "/scheduling",
    //     "/search",
    //     "/post"
    // ];
    const path = window.location.pathname;

    if(!user && (!authPages.includes(path) && path !== "/")){
        window.location.href = "/login";
    }else if(user){
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()){
            if(authPages.includes(path)) {
                window.location.href = "/";
            }
        }
        else{
            if(!authPages.includes(path) && path !== "/"){
                window.location.href = "/login"
            }
        }
    }
}