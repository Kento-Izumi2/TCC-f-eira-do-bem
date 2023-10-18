import { deleteUser, onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import {
    collection,
    doc,
    getDocs,
    where,
    query,
    getDoc,
    setDoc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { updatePassword, updateEmail } from "firebase/auth";
import { db } from "./firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";

import { database } from "./realtime-database";
import { storage } from "./storage";
import { ref as dbRef, child, get, remove } from "firebase/database";

onAuthStateChanged(auth, async (credentialUser) => {
    if (credentialUser) {
        const userImg = document.getElementById("user-image");
        const userName = document.getElementById("user-name");
        const userDonationsRecived = document.getElementById(
            "user-donations-recived"
        );
        const userDonationsMade = document.getElementById(
            "user-donations-made"
        );

        const user = await getDoc(doc(db, "users", credentialUser.uid));
        const donationsRecived = await getDocs(
            query(
                collection(db, "scheduling"),
                where("ongId", "==", credentialUser.uid)
            )
        );
        const donationsMade = await getDocs(
            query(
                collection(db, "scheduling"),
                where("giverId", "==", credentialUser.uid)
            )
        );

        userImg.src = user.data().photoURL || "/images/user-circle.svg";
        userName.innerText = user.data().displayName;
        userDonationsRecived.innerText = donationsRecived.size;
        userDonationsMade.innerText = donationsMade.size;

        document.getElementById("name").value = user.data().displayName;
        document.getElementById("email").value = user.data().email;
        document.getElementById("cnpj").value = user.data().cnpj;
        document.getElementById("phone").value = user.data().phone;
        document.getElementById("address").value = user.data().address;
        document.getElementById("city").value = user.data().city;
        document.getElementById("state").value = user.data().state;

        const reportButton = document.getElementById("report-button");
        const viewDonationButton = document.getElementById(
            "view-donation-button"
        );
        const editButton = document.getElementById("edit-button");
        const saveButton = document.getElementById("save-button");
        const deleteButton = document.getElementById("delete-button");

        const deleteFirestore = async (userId) => {
            const userRef = doc(db, "users", credentialUser.uid);
            await deleteDoc(userRef);
            const userPosts = await getDocs(
                query(collection(db, "posts"), where("authorId", "==", userId))
            );
            userPosts.forEach(async (post) => {
                await deleteDoc(doc(db, "posts", post.id));
                deleteObject(ref(storage, `posts/${post.id}.jpg`));
            });
            const userComments = await getDocs(
                query(collection(db, "comments"),where("authorId", "==", userId))
            );
            userComments.forEach(async (comment) => {
                await deleteDoc(doc(db, "comments", comment.id));
            });
            // const userLikes = await getDocs(
            //     query(collection(db, "posts"), where("authorId", "==", userId))
            // );
        };

        const deleteStorage = async (userId) => {
            try{
                const storageRef = ref(storage, `users/${userId}.jpg`);
                if(user.data().photoURL){
                    await deleteObject(storageRef);
                }
            }
            catch(error){
                
            }
        };

        const deleteAuth = async () => {
            await deleteUser(credentialUser);
        };

        const deleteRealtime = async (userId) => {
            const deletedChats = [];
            const chatsRef = dbRef(database, "chats");
            const messagesRef = dbRef(database, "messages");
            const chatsSnapshot = await get(chatsRef);
            const messagesSnapshot = await get(messagesRef);
            chatsSnapshot.forEach((chat) => {
                if (chat.key.includes(userId)) {
                    deletedChats.push(chat.key);
                }
                remove(child(chatsRef, chat.key));
            });
            messagesSnapshot.forEach((message) => {
                if (deletedChats.includes(message.key)) {
                    remove(child(messagesRef, message.key));
                }
            });
        };

        const deleteAccount = async (userId) => {
            await deleteFirestore(userId);
            await deleteStorage(userId);
            await deleteAuth();
            await deleteRealtime(userId);
        };

        let isEditing = false;

        editButton.addEventListener("click", () => {
            if (isEditing) {
                window.location.reload(true);
                window.location.href = "/profile/edit";
            }
            isEditing = true;
            saveButton.disabled = false;
            editButton.innerText = "Cancelar";
            for (let input of document.querySelectorAll("input")) {
                input.disabled = false;
            }
        });

        saveButton.addEventListener("click", async () => {
            const newPassword = document.getElementById("password").value;
            const email = document.getElementById("email").value;
            const displayName = document.getElementById("name").value;
            const cnpj = document.getElementById("cnpj").value;
            const phone = document.getElementById("phone").value;
            const address = document.getElementById("address").value;
            const city = document.getElementById("city").value;
            const state = document.getElementById("state").value;

            try {
                if (newPassword !== null) {
                    await updatePassword(credentialUser, newPassword);
                }
                // if(email !== user.data().email){
                //     await updateEmail(credentialUser, email);
                // }
                await updateDoc(
                    doc(db, "users", credentialUser.uid),
                    {
                        displayName,
                        cnpj,
                        phone,
                        address,
                        city,
                        state,
                    },
                    { merge: true }
                );
                window.location.reload(true);
            } catch (error) {
                alert("Erro ao salvar");
            }
        });
        deleteButton.addEventListener("click", async () => {
            try {
                await deleteAccount(credentialUser.uid);
                window.location.href = "/";
            } catch (error) {
                alert("Erro ao deletar conta");
            }
        });
    }
});
