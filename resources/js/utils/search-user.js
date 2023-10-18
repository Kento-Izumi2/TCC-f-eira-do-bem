import { collection, getDocs } from "firebase/firestore";
import { db } from "../firestore";

export default async function searchUser(name) {
    const users = await getDocs(collection(db, "users"));
    const usersArray = [];
    users.forEach((user) => {
        if (
            user.data().displayName.toLowerCase().includes(name.toLowerCase())
        ) {
            usersArray.push(user);
        }
    });
    return usersArray;
}
