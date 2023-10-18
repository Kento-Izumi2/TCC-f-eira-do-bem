import { onAuthStateChanged } from "firebase/auth";
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
import { auth } from "./auth";
import { db } from "./firestore";

const queryParams = new URLSearchParams(window.location.search);
const postsContainer = document.getElementById("posts-container");
const postsCount = document.getElementById("posts-count");


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const posts = await getDocs(
            query(collection(db, "posts"), orderBy("date", "desc"))
        );
        let count = 0;
        posts.docs.forEach(async (post) => {
            if (
                post
                    .data()
                    .message.toLowerCase()
                    .includes(queryParams.get("q").toLowerCase())
            ) {
                count++;
                const postAuthor = await getDoc(
                    doc(db, "users", post.data().authorId)
                );
                const postElement = document.createElement("div");
                postElement.classList.add("post", "overflow-hidden");
                postElement.innerHTML = `<div class="p-3">
                <span class="fw-bold" id="post-author"></span>
                </div>
                <img src="${
                    post.data().image
                }" id="post-image" alt="Imagem da publicação">
                <div class="p-3">
                    <div class="mb-2">
                        <button id="like-button">
                            <img class="icon-24" id="like-button-icon" src='../images/heart.svg'/>
                        </button>
                        <button onclick="location.href='/post/${
                            post.id
                        }?focus=true'">
                            <img class="icon-24" src='../images/chat-bubble.svg' }}>
                        </button>
                    </div>
                    <p class="mb-0" id="post-message"></p>
                    </div>`;
                postElement.querySelector("#post-author").innerText =
                    postAuthor.data().displayName;
                postElement.querySelector("#post-message").innerText =
                    post.data().message;
                postsContainer.appendChild(postElement);
                
                const {userLikes} = post.data();
                if (userLikes.includes(user.uid)) {
                    postElement.querySelector("#like-button-icon").src = "/images/heart-fill.svg";
                } else {
                    postElement.querySelector("#like-button-icon").src = "/images/heart.svg";
                }
                const likeButton = postElement.querySelector('#like-button')
                likeButton.addEventListener("click", async () => {
                    if (userLikes.includes(user.uid)) {
                        userLikes.splice(userLikes.indexOf(user.uid), 1);
                        postElement.querySelector("#like-button-icon").src = "/images/heart.svg";
                    } else {
                        userLikes.push(user.uid);
                        postElement.querySelector("#like-button-icon").src = "/images/heart-fill.svg";
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
        });
        postsCount.innerText = `Foram encontrado(s) ${count} resultado(s) para "${queryParams.get(
            "q"
        )}"`;
    }
});
