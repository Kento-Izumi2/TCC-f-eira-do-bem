import { onAuthStateChanged } from "firebase/auth";
import { auth, register } from "./auth";
import { doc, setDoc } from "firebase/firestore";
import { uploadImage } from "./storage";
import { db } from "./firestore";

const fileInput = document.getElementById("input-image");
const imagePlaceholder = document.getElementById("user-image");
const form = document.getElementById("register-form");
const fileUploadButton = document.getElementById("file-upload-button");
const cleanInputs = document.getElementById("clean-inputs");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const cnpjInput = document.getElementById("cnpj");
const cityInput = document.getElementById("city");
const stateInput = document.getElementById("state");

const from = new URLSearchParams(window.location.search).get("from");

function handleFileUpload() {
    document.getElementById("input-image").click();
}

function handleImagePreview(event) {
    const file = fileInput.files[0];
    if(file.size > 250000){
        alert("A imagem deve ter no máximo 250kb");
        fileInput.files = new DataTransfer().files
    }
    else{
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePlaceholder.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

fileUploadButton.addEventListener("click", handleFileUpload);
fileInput.addEventListener("change", handleImagePreview);

if (from === "google") {
    onAuthStateChanged(auth, (user) => {
        nameInput.value = user.displayName;
        emailInput.value = user.email;
        passwordInput.classList.add("d-none");
        document.querySelector("label[for='password']").classList.add("d-none");
        imagePlaceholder.src = user.photoURL || "/images/user-circle.svg";
        nameInput.setAttribute("disabled", true);
        emailInput.setAttribute("disabled", true);

        cleanInputs.addEventListener("click", () => {
            passwordInput.value = "";
            phoneInput.value = "";
            addressInput.value = "";
            cnpjInput.value = "";
            cityInput.value = "";
            stateInput.value = "";
        })
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const name = nameInput.value;
            const email = emailInput.value;
            const phone = phoneInput.value;
            const address = addressInput.value;
            const cnpj = cnpjInput.value;
            const city = cityInput.value;
            const state = stateInput.value;
            if (
                !name ||
                !email ||
                !phone ||
                !address ||
                !cnpj ||
                !city ||
                !state
            ) {
                alert("Preencha todos os campos");
                return;
            }
            await setDoc(doc(db, "users", user.uid), {
                displayName: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                address: addressInput.value,
                cnpj: cnpjInput.value,
                city: cityInput.value,
                state: stateInput.value,
                photoURL: fileInput.files[0]
                    ? await uploadImage(fileInput.files[0], "users/" + user.uid)
                    : user.photoURL,
            });
            window.location.href = "/";
        });
    });
} else {

        cleanInputs.addEventListener("click", () => {
        nameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        phoneInput.value = "";
        addressInput.value = "";
        cnpjInput.value = "";
        cityInput.value = "";
        stateInput.value = "";
        imagePlaceholder.src = "/images/user-circle.svg";
    })
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const phone = phoneInput.value;
        const address = addressInput.value;
        const cnpj = cnpjInput.value;
        const city = cityInput.value;
        const state = stateInput.value;

        // Validate fields
        if (
            !name ||
            !email ||
            !password ||
            !phone ||
            !address ||
            !cnpj ||
            !city ||
            !state
        ) {
            alert("Preencha todos os campos");
            return;
        }
        try {
            if (
                await register(
                    email,
                    password,
                    phone,
                    name,
                    address,
                    cnpj,
                    city,
                    state,
                    fileInput.files[0] ? fileInput.files[0] : null
                )
            ) {
                window.location.href = "/";
            }
        } catch (error) {
            alert("Erro ao criar conta");
        }
    });
}
