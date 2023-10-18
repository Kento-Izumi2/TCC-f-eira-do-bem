import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import searchUser from "./utils/search-user";
import {
    child,
    get,
    onValue,
    ref,
    serverTimestamp,
    set,
    update,
} from "firebase/database";
import { database } from "./realtime-database";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firestore";

const userChatsContainer = document.querySelector(".user-chats-container");
const messagesArea = document.querySelector(".messages-area");
const searchUsersInput = document.querySelector("#search-users");
const searchUsersResults = document.querySelector("#search-users-result");
const messageInput = document.querySelector("#message-input");
const messageSendButton = document.querySelector("#message-send");

const chatId = document.getElementById("chat-id")
    ? document.getElementById("chat-id").getAttribute("content")
    : null;

const chatsRef = ref(database, "chats");
const messagesRef = ref(database, "messages/" + chatId);

async function createChat(user1Id, user2Id) {
    const usersId = [user1Id, user2Id];
    const chatId = usersId.sort().join("-");
    const chatRef = child(chatsRef, chatId);
    await set(chatRef, true);
}

onAuthStateChanged(auth, async (user) => {
    let timeout = null;
    searchUsersInput.addEventListener("input", async (e) => {
        if (e.target.value.trim() === "") {
            searchUsersResults.classList.add("d-none");
            return;
        }
        searchUsersResults.classList.remove("d-none");
        timeout && clearTimeout(timeout);
        timeout = setTimeout(async () => {
            let users = await searchUser(e.target.value);
            user = users.filter((u) => u.id !== user.uid);
            searchUsersResults.innerHTML = "";
            users.forEach((userEntry) => {
                const userEntryElement = document.createElement("div");
                userEntryElement.classList.add("chat-search-entry");
                userEntryElement.innerHTML = `
                    <img
                        src="${userEntry.data().photoURL || "/images/user.png"}"
                        class="search-user-photo"
                    />
                    <p></p>
                `;
                userEntryElement.querySelector("p").innerText =
                    userEntry.data().displayName;
                userEntryElement.addEventListener("click", async () => {
                    const userId = userEntry.id;
                    const userIds = [user.uid, userId].sort();
                    const chatId = userIds.join("-");
                    const chatRef = ref(database, `chats/${chatId}`);
                    const chatExists = (await get(chatRef)).exists();
                    if (!chatExists) await createChat(user.uid, userId);
                    window.location.href = `/chat/${chatId}`;
                });
                searchUsersResults.appendChild(userEntryElement);
            });
        }, 500);
    });
    onValue(chatsRef, async (snapshot) => {
        userChatsContainer.innerHTML = "";
        for (const chatId in snapshot.val()) {
            const chat = snapshot.val()[chatId];
            if (!chatId.includes(user.uid)) continue;
            const pendingMessage =
                chat.sender !== user.uid && chat.visualized === false;
            const anotherUserId = chatId
                .split("-")
                .filter((u) => u !== user.uid)[0];
            const anotherUser = await getDoc(doc(db, "users", anotherUserId));
            const chatEntry = document.createElement("div");
            chatEntry.classList.add("user-chat-entry");
            chatEntry.innerHTML = `
                <div>
                <img
                    src=""
                    class="user-chat-photo"
                />
                <p></p>
                </div>
                <div class="d-none" id="pending-message"></div>
            `;
            chatEntry.querySelector("p").innerText =
                anotherUser.data().displayName;
            chatEntry.querySelector("img").src =
                anotherUser.data().photoURL || "/images/user.png";
            if (pendingMessage) {
                chatEntry
                    .querySelector("#pending-message")
                    .classList.remove("d-none");
            }
            chatEntry.addEventListener("click", () => {
                window.location.href = `/chat/${chatId}`;
            });
            userChatsContainer.appendChild(chatEntry);
        }
    });
    if (chatId) {
        const chat = await get(child(chatsRef, chatId));
        const anotherUserId = chatId
            .split("-")
            .filter((u) => u !== user.uid)[0];
        const anotherUser = await getDoc(doc(db, "users", anotherUserId));
        document.getElementById("user-chat-title").innerText =
            anotherUser.data().displayName;
        onValue(messagesRef, async (snapshot) => {
            messagesArea.innerHTML = "";
            if (chat.val().sender !== user.uid && !chat.val().visualized) {
                await update(child(chatsRef, chatId), {
                    visualized: true,
                });
            }
            snapshot.forEach((message) => {
                const messageEntry = document.createElement("div");
                messageEntry.classList.add("message");
                messageEntry.innerHTML = `
                    <p></p>
                `;
                const messageTextElement = messageEntry.querySelector("p");
                messageTextElement.innerText = message.val().message;
                if (message.val().sender === user.uid) {
                    messageEntry.classList.add("message-sent");
                } else {
                    messageEntry.classList.add("message-received");
                }
                message.val().message;
                messagesArea.appendChild(messageEntry);
            });
        });
        messageSendButton.addEventListener("click", async () => {
            if (messageInput.value.trim() === "") return;
            const messagesChatRef = ref(database, `messages/${chatId}`);

            const lastMessageTimeRef = ref(database, "lastMessageTime");
            await set(lastMessageTimeRef, serverTimestamp());
            const time = (await get(lastMessageTimeRef)).val();

            const messageRef = child(messagesChatRef, time.toString());
            await set(messageRef, {
                message: messageInput.value,
                sender: user.uid,
            });
            await update(child(chatsRef, chatId), {
                visualized: false,
                sender: user.uid,
            });
            messageInput.value = "";
        });
    }
});
