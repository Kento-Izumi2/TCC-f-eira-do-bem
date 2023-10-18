import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "./firebase";

// DATA STRUCTURE
// {
//     chats: {
//         chatId: {
//             id: chatId,
//             participants: {
//                 userId: true,
//                 userId: true,
//             },
//             messages: {
//                 messageId: {
//                     id: messageId,
//                     userId: userId,
//                     content: "Hello",
//                     timestamp: 163123123123,
//                 },

export const database = getDatabase(app);
