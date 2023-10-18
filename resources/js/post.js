import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { db } from "./firestore";

const postId = document
    .querySelector('meta[name="post-id"]')
    .getAttribute("content");

const focus = document.URL.includes("?focus=true");
const commentsElement = document.getElementById("comments");
const commentButton = document.getElementById("comment-button");
const likeButton = document.getElementById("like-button");

onAuthStateChanged(auth, async (credentialUser) => {
    if (credentialUser) {
        const post = await getDoc(doc(db, "posts", postId));
        const postAuthor = await getDoc(doc(db, "users", post.data().authorId));
        const postCommentsQuery = query(
            collection(db, "comments"),
            where("postId", "==", post.id),
            orderBy("date", "asc")
        );
        const postComments = await getDocs(postCommentsQuery);
        let userLikes = post.data().userLikes;
        const postLikesCount = post.data().userLikes.length;
        document.title = `${post.data().message} | Feira do bem`;
        document.getElementById("post-author-name").innerText =
            postAuthor.data().displayName;
        document.getElementById("post-author-image").src =
            postAuthor.data().photoURL || "/images/user.png";
        document
            .getElementById("post-author-image")
            .addEventListener("click", () => {
                window.location.href = "/profile/" + postAuthor.id;
            });
        document.getElementById("post-author-name").href =
            "/profile/" + postAuthor.id;
        document.getElementById("post-message").innerText = post.data().message;
        document.getElementById("post-image").src = post.data().image;
        document.getElementById("post-likes-count").innerText =
            postLikesCount + " curtidas";
        document.getElementById("post-comments-count").innerText =
            postComments.size + " comentários";
        const commentButton = document.getElementById("comment-button");
        const inputComment = document.getElementById("input-comment");
        focus && inputComment.focus();
        postComments.forEach(async (comment) => {
            const commentAuthor = await getDoc(
                doc(db, "users", comment.data().authorId)
            );
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `<img id="comment-author-image" class="rounded-circle" src="${
                commentAuthor.data().photoURL || "/images/user.png"
            }"
            alt="Foto de perfil de usuário">
            <div class="comment-message">
            <a class="fw-bold text-decoration-none" id="comment-author-name"></a>
            <span id="comment-author-message"></span>
            </div>`;

            const commentAuthorName = commentElement.querySelector(
                "#comment-author-name"
            );

            const commentAuthorImage = commentElement.querySelector(
                "#comment-author-image"
            );

            const commentAuthorMessage = commentElement.querySelector(
                "#comment-author-message"
            );

            commentAuthorImage.addEventListener("click", () => {
                window.location.href = "/profile/" + commentAuthor.id;
            });

            commentAuthorName.href = "/profile/" + commentAuthor.id;

            commentElement.querySelector("#comment-author-name").innerText =
                commentAuthor.data().displayName;
            commentElement.querySelector("#comment-author-message").innerText =
                comment.data().message;
            commentsElement.appendChild(commentElement);
        });

        commentButton.addEventListener("click", async () => {
            const comment = inputComment.value;
            const authorId = credentialUser.uid;
            const postId = post.id;
            await addDoc(collection(db, "comments"), {
                authorId,
                postId,
                message: comment,
                date: new Date().getTime(),
            });
            inputComment.value = "";
            window.location.reload();
        });
        commentButton.addEventListener("click", async () => {
            inputComment.focus();
        });

        const focusCommentButton = document.getElementById(
            "focus-comment-button"
        );
        focusCommentButton.addEventListener("click", async () => {
            inputComment.focus();
        });

        if (userLikes.includes(credentialUser.uid)) {
            document.getElementById("heart-icon").src =
                "/images/heart-fill.svg";
        }

        likeButton.addEventListener("click", async () => {
            if (userLikes.includes(credentialUser.uid)) {
                userLikes = userLikes.filter((id) => id !== credentialUser.uid);
                await updateDoc(doc(db, "posts", post.id), {
                    userLikes,
                });
                document.getElementById("heart-icon").src = "/images/heart.svg";
                document.getElementById("post-likes-count").innerText =
                    userLikes.length + " curtidas";
            } else {
                userLikes.push(credentialUser.uid);
                await updateDoc(doc(db, "posts", post.id), {
                    userLikes,
                });
                document.getElementById("heart-icon").src =
                    "/images/heart-fill.svg";
                document.getElementById("post-likes-count").innerText =
                    userLikes.length + " curtidas";
            }
        });
    }
});
