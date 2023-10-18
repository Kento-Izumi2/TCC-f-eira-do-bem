import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "./firestore";


async function donationsManage (accept, donationId) {
    const donationRef = doc(db, "scheduling", donationId);
    if(accept){
        await setDoc(donationRef, {
            status: "accepted"
        },{merge: true})
    } else {
        await setDoc(donationRef, {
            status: "refused"
        },{merge: true})
    }
}
function loadDonations(donations, param) {
    const donationsContainer = document.getElementById("donations-container")
    donationsContainer.innerHTML = "";
    donations.forEach(async(donation) => {
        const giverUser = await getDoc(doc(db, "users", donation.data().giverId));
        if(donation.data().status == param){
            const card = document.createElement("div");
            card.classList.add("donation-card");
            card.innerHTML = `
                <div class="donation-card-header">
                    <div class="donation-header-user">
                        <img src="${giverUser.data().photoURL || '/images/user-circle.svg'}" alt="foto do doador" class="icon-32">
                        <p>${giverUser.data().displayName}</p>
                    </div>
                    <p>${new Date(donation.data().datetime).toLocaleString()}</p>
                </div>
                <div class="donation-card-body">
                    <p>${donation.data().local}</p>
                    <div class="donation-card-container-items">
                        <p class="donation-card-items">${donation.data().items}</p>
                    </div>
                    <div class="donation-card-control"></div>
                </div>
            `
            if(param == "waiting"){
                const donationCardControl = card.getElementsByClassName("donation-card-control")[0];
                const btnRefuse = document.createElement("button");
                btnRefuse.classList.add("btn", "btnRefuse");
                btnRefuse.innerHTML = "Recusar";
                btnRefuse.addEventListener("click", () => {
                    donationsManage(false, donation.id);
                    window.location.reload(true);
                })

                const btnAccept = document.createElement("button");
                btnAccept.classList.add("btn", "btnAccept");
                btnAccept.innerHTML = "Aceitar";
                btnAccept.addEventListener("click", () => {
                    donationsManage(true, donation.id);
                    window.location.reload(true);
                })

                donationCardControl.append(btnRefuse)
                donationCardControl.append(btnAccept)
            }
            donationsContainer.appendChild(card);
        }
    })
}
onAuthStateChanged(auth, async(user) => {
    if(user) {
        const donations = await getDocs(query(collection(db, "scheduling"), where("ongId", "==", user.uid)));

        loadDonations(donations, "waiting");

        const refused = document.getElementById("refused");
        const accepted = document.getElementById("accepted");
        const waiting = document.getElementById("waiting");

        refused.addEventListener("click", () => {
            loadDonations(donations, "refused")
            refused.classList.add("text-primary");
            if(accepted.classList.contains("text-primary")){
                accepted.classList.toggle("text-primary");
            }
            if(waiting.classList.contains("text-primary")){
                waiting.classList.toggle("text-primary");
            }
        });
        accepted.addEventListener("click", () => {
            loadDonations(donations, "accepted")
            accepted.classList.add("text-primary");
            if(refused.classList.contains("text-primary")){
                refused.classList.toggle("text-primary");
            }
            if(waiting.classList.contains("text-primary")){
                waiting.classList.toggle("text-primary");
            }
        });
        waiting.addEventListener("click", () => {
            loadDonations(donations, "waiting")
            waiting.classList.add("text-primary");
            if(accepted.classList.contains("text-primary")){
                accepted.classList.toggle("text-primary");
            }
            if(refused.classList.contains("text-primary")){
                refused.classList.toggle("text-primary");
            }
        });
    }
})