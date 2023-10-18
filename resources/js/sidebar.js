import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firestore";

const userName = document.getElementById("user_name");
const profileOption = document.getElementById("profile-option");
const loginOption = document.getElementById("login-option");
const registerOption = document.getElementById("register-option");
const logoutOption = document.getElementById("logout-option");

logoutOption.addEventListener("click", async () => {
    await auth.signOut();
    window.location.href = "/";
});

onAuthStateChanged(auth, async (credentialUser) => {
    if(credentialUser){
        const user = await getDoc(doc(db, "users", credentialUser.uid));
        if (user.exists()) {
            profileOption.classList.remove("d-none");
            logoutOption.classList.remove("d-none");
            loginOption.classList.add("d-none");
            registerOption.classList.add("d-none");
            userName.innerText = user.data().displayName;
            if (user.data().photoURL) {
                document.getElementById("sidebar-photo-user").src =
                    user.data().photoURL;
            }
        } else {
            userName.innerText = "Visitante";
        }
    }
});
