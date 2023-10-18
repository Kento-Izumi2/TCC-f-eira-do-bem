import { login } from "./auth";
import { loginWithGoogle } from "./google-auth-provider";

const form = document.getElementById("login-form");
const googleButton = document.getElementById("google-button");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!email.value || !password.value) {
        alert("Preencha todos os campos");
        return;
    }
    if (await login(email.value, password.value)) window.location.href = "/";
    else {
        password.value = "";
    }
});

googleButton.addEventListener("click", async () => {
    await loginWithGoogle();
});
