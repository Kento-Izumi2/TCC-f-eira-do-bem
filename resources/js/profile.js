import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import { db } from "./firestore";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    setDoc,
    where,
} from "firebase/firestore";

const userId = document.getElementById("user-id")
    ? document.getElementById("user-id").getAttribute("content")
    : null;

function toggleBio() {
    const editBio = document.getElementById("edit-bio");
    const editBioConfirm = document.getElementById("edit-bio-confirm");
    const editBioCancel = document.getElementById("edit-bio-cancel");
    const bio = document.getElementById("user-bio");
    const userBioInput = document.getElementById("user-input-bio");

    editBio.classList.toggle("d-none");
    editBioConfirm.classList.toggle("d-none");
    editBioCancel.classList.toggle("d-none");
    userBioInput.classList.toggle("d-none");
    bio.classList.toggle("d-none");
}

onAuthStateChanged(auth, async (credentialUser) => {
    if (credentialUser) {
        let user = null;
        if (userId) {
            user = await getDoc(doc(db, "users", userId));
            if (!user.exists()) {
                window.location.href = "/404";
            }
        } else {
            user = await getDoc(doc(db, "users", credentialUser.uid));
        }
        document.title = `${user.data().displayName} | Profile`;
        document.getElementById("user-name").innerText =
            user.data().displayName;
        document.getElementById("user-image").src =
            user.data().photoURL || "/images/user.png";
        document.getElementById("user-bio").innerText = user.data().bio || "";

        const postGrid = document.getElementById("profile-publication-grid");

        const userPostsQuery = query(
            collection(db, "posts"),
            where("authorId", "==", user.id),
            orderBy("date", "desc")
        );

        const posts = await getDocs(userPostsQuery);

        posts.forEach((post) => {
            const postElement = document.createElement("img");
            postElement.src = post.data().image;
            postElement.alt = post.data().message;
            postElement.onclick = () => {
                window.location.href = `/post/${post.id}`;
            };
            postGrid.appendChild(postElement);
        });

        if (user.id !== credentialUser.uid) {
            return;
        }
        if(window.location.pathname.split("/").length >= 3){
                window.location.href= "/profile";
        }
        const userInfo = document.getElementById("user-info");
        userInfo.innerHTML += `
                        <img id="edit-profile-button" src="images/dots.svg" class="icon-24" onclick="location.href = 'profile/edit'">
                    `
        const profileBio = document.getElementById("profile-bio");
        profileBio.innerHTML += `<div id="profile-bio-edit" class="d-flex flex-column gap-2">
        <button class="edit-bio" id="edit-bio">
            <img class="icon-24" src='images/pencil.svg' alt="Publicar" />
        </button>
        <button class="edit-bio d-none" id="edit-bio-cancel">
            <img class="icon-24" src='images/x.png' alt="Publicar" />
        </button>
        <button class="edit-bio d-none" id="edit-bio-confirm">
            <img class="icon-24" src='images/confirm.svg' alt="Publicar" />
        </button>
    </div>`;
        const editBio = document.getElementById("edit-bio");
        const editBioConfirm = document.getElementById("edit-bio-confirm");
        const editBioCancel = document.getElementById("edit-bio-cancel");
        const bio = document.getElementById("user-bio");
        const userBioInput = document.getElementById("user-input-bio");

        userBioInput.value = bio.innerText;
        editBio.addEventListener("click", toggleBio);
        editBioCancel.addEventListener("click", toggleBio);
        editBioConfirm.addEventListener("click", async () => {
            await setDoc(
                doc(db, "users", user.id),
                {
                    bio: userBioInput.value,
                },
                { merge: true }
            );
            window.location.reload();
        });
    }
});
