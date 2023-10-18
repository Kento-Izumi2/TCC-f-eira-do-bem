import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firestore";

const queryParams = new URLSearchParams(window.location.search);

const ongsContainer = document.getElementById("ongs-container");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const ongs = await getDocs(query(collection(db, "users")));
        ongs.forEach((ong) => {
            if (
                ong
                    .data()
                    .displayName.toLowerCase()
                    .includes(queryParams.get("q").toLowerCase()) ||
                (
                    ong.data().bio &&
                    ong
                    .data()
                    .bio.toLowerCase()
                    .includes(queryParams.get("q").toLowerCase())
                )
            ) {
            const ongResultElement = document.createElement("div");
            ongResultElement.classList.add("ong-result");
            ongResultElement.innerHTML = `<div class="ong-result">
                <img src="${ong.data().photoURL || "/images/user.png"}" alt="">
                <div class="ong-info">
                    <h3 id="ong-name"></h3>
                    <p id="ong-bio">Descrição da ONG</p>
                    <a href="#" id="ong-link">Ver mais</a>
                </div>`;
            ongResultElement.querySelector("#ong-name").innerText =
                ong.data().displayName;
            ongResultElement.querySelector("#ong-bio").innerText =
                ong.data().bio;
            ongResultElement.querySelector(
                "#ong-link"
            ).href = `/profile/${ong.id}`;
            ongsContainer.appendChild(ongResultElement);
            }
        });
    }
});
