import "./bootstrap";

import "../sass/app.scss";

import { onAuthStateChanged } from "firebase/auth";
import { auth, middleware } from "./auth";
import { uploadImage } from "./storage";

let i = 0;
onAuthStateChanged(auth, (user) => {
    if (i == 0) middleware(user);
    i += 1;
});
