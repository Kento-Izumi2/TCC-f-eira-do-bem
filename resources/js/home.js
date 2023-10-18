import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    orderBy,
    query,
} from "firebase/firestore";
import { auth } from "./auth";
import { uploadImage } from "./storage";
import { db } from "./firestore";
import { set } from "firebase/database";

const addMediaButton = document.getElementById("add-media-button");
const uploadImageInput = document.getElementById("upload-image");
const createForm = document.getElementById("create-form");
const postsContainer = document.getElementById("posts-container");

addMediaButton.addEventListener("click", () => {
    uploadImageInput.click();
});
uploadImageInput.addEventListener("change", (e) => {
    const imagePreview = document.getElementById("image-preview");
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        imagePreview.src = reader.result;
        imagePreview.classList.remove("d-none");
    };
    reader.readAsDataURL(file);
});

const posts = await getDocs(
    query(collection(db, "posts"), orderBy("date", "desc"))
);

onAuthStateChanged(auth, async (credentialUser) => {
    for (const post of posts.docs) {
        const postAuthor = await getDoc(doc(db, "users", post.data().authorId));
        const postElement = document.createElement("div");
        const userLikes = post.data().userLikes;
        postElement.classList.add("post", "overflow-hidden");
        postElement.innerHTML = `<div class="p-3">
        <a class="fw-bold" id="post-author"></a>
        </div>
        <img src="${
            post.data().image
        }" id="post-image" alt="Imagem da publicação" onclick="location.href='/post/${
            post.id
        }?focus=true'">
        <div class="p-3">
            <div class="mb-2">
                <button id="like-button">
                    <img class="icon-24" id="like-button-icon"/>
                </button>
                <button onclick="location.href='/post/${post.id}?focus=true'">
                    <img class="icon-24" src='images/chat-bubble.svg' }}>
                </button>
            </div>
            <p class="mb-0" id="post-message"></p>
            </div>`;
        const likeButton = postElement.querySelector("#like-button");
        postElement.querySelector("#post-author").innerText =
            postAuthor.data().displayName;
        postElement.querySelector(
            "#post-author"
        ).href = `/profile/${postAuthor.id}`;
        postElement.querySelector("#post-message").innerText =
            post.data().message;
        postsContainer.appendChild(postElement);
        if (!credentialUser) {
            postElement.querySelector("#like-button-icon").src =
                "images/heart.svg";
            likeButton.addEventListener("click", () => {
                window.location.href = "/login";
                return;
            });
        } else {
            if (userLikes.includes(credentialUser.uid)) {
                postElement.querySelector("#like-button-icon").src =
                    "images/heart-fill.svg";
            } else {
                postElement.querySelector("#like-button-icon").src =
                    "images/heart.svg";
            }
            likeButton.addEventListener("click", async () => {
                if (userLikes.includes(credentialUser.uid)) {
                    userLikes.splice(userLikes.indexOf(credentialUser.uid), 1);
                    postElement.querySelector("#like-button-icon").src =
                        "images/heart.svg";
                } else {
                    userLikes.push(credentialUser.uid);
                    postElement.querySelector("#like-button-icon").src =
                        "images/heart-fill.svg";
                }
                await setDoc(
                    doc(db, "posts", post.id),
                    {
                        userLikes,
                    },
                    { merge: true }
                );
            });
        }
    }
    if (credentialUser !== null) {
        document.getElementById("create-form").classList.remove("d-none");
        createForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const button = document.getElementById("post-send-button");
            button.setAttribute("disabled", true)
            const postText = document.getElementById("post-text").value;
            const file = document.getElementById("upload-image").files[0];
            // Validate inputs
            if (postText.length === 0) {
                alert("O texto da publicação não pode estar vazio.");
                return;
            }
            if (file === undefined) {
                alert("A publicação deve conter uma imagem.");
                return;
            }
            const postId = crypto.randomUUID().toString();
            const url = await uploadImage(file, `posts/${postId}.jpg`);
            await setDoc(doc(db, "posts", postId), {
                message: postText,
                image: url,
                authorId: credentialUser.uid,
                date: new Date().getTime(),
                userLikes: [],
            });
            window.location.reload(true);
        });
    } else {
        document.getElementById("create-form").classList.add("d-none");
    }
});
