import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";

const ongName = document.getElementById('ongName');
const schedulingForm = document.getElementById('scheduling-form');
const schedulingDate = document.getElementById('schedulingDate');

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
schedulingDate.min = tomorrow.toISOString().split("T")[0];

const localInput = document.getElementById("schedulingLocal");
const mapsFrame = document.getElementById("maps-frame");

let userId

function listUsers(users, name){
    let containsName = []
    if(name == "") return

    users.forEach(item => {
        if (item.data().displayName.toLowerCase().includes(name.toLowerCase()))
            containsName.push({id: item.id, ...item.data()})
    })

    const ongsContainer = document.getElementById('ongsContainer')

    ongsContainer.innerHTML = ""
    if(containsName.length == 0) {
        const ong = document.createElement('div')
        ong.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'w-100', 'ong')
        ong.innerHTML += `
            <div class="d-flex align-items-center">
                <div class="ms-3">
                    <h5 class="mb-0 ongName"></h5>
                </div>
            </div>
        `
        const textOngName = ong.getElementsByClassName('ongName')[0]
        textOngName.innerText = "Nenhuma ONG encontrada"
        ongsContainer.appendChild(ong)
        return
    }
    containsName.forEach(item => {
        const ong = document.createElement('div')
        ong.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3', 'w-100', 'ong')
        ong.addEventListener('click', () => {
            ongName.value = item.displayName
            userId = item.id
            ongsContainer.classList.add('d-none')
        })
        ong.innerHTML += `
            <div class="d-flex align-items-center">
                <img src="${item.photoURL || "images/user.png"}" alt="Foto da ONG" class="rounded-circle" width="50" height="50">
                <div class="ms-3">
                    <h5 class="mb-0 ongName"></h5>
                </div>
            </div>
        `
        const textOngName = ong.getElementsByClassName('ongName')[0]
        textOngName.innerText = item.displayName
        ongsContainer.appendChild(ong)
    })
}



onAuthStateChanged(auth, async (user) => {

    const users = (await getDocs(collection(db, "users"))).docs.filter(item => item.id != user.uid)

    let timerId;
    ongName.addEventListener('input', (e) => {
        const ongsContainer = document.getElementById('ongsContainer')
        ongsContainer.classList.add('d-none')
        const name = e.target.value;
        if(timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
            ongsContainer.classList.remove('d-none')
            listUsers(users, name)
            clearTimeout(timerId);
        }, 500);
    })
    ongName.addEventListener('focusout', () => {
        const ongsContainer = document.getElementById('ongsContainer')
        setTimeout(() => {
        ongsContainer.classList.add('d-none')
        }, 200);
    })

    schedulingForm.addEventListener('submit', async(e) => {
        e.preventDefault()
        
        const iptTime = document.getElementById('schedulingTime')
        const iptdate = document.getElementById('schedulingDate')
        const iptitems = document.getElementById('schedulingItems')
        const iptongId = document.getElementById('ongName')
        const iptlocal = document.getElementById('schedulingLocal')
        
        const time = document.getElementById('schedulingTime').value
        const date = document.getElementById('schedulingDate').value
        const items = document.getElementById('schedulingItems').value
        const ongId = userId
        const local = document.getElementById('schedulingLocal').value

        if(!time || !date || !items || !ongId || !local) {
            alert("Preencha todos os campos")
            return
        }
        
        const fullDate = new Date(`${date} ${time}`)
        const schedulingId = crypto.randomUUID().toString() 

        try{
            await setDoc(doc(db, "scheduling", schedulingId), {
                datetime: fullDate.getTime(),
                items: items,
                local: local,
                ongId: ongId,
                giverId: user.uid,
                status: "waiting"
            })
            iptTime.value = ""
            iptdate.value = ""
            iptitems.value = ""
            iptongId.value = "" 
            iptongId.user = ""
            iptlocal.value = ""

            alert("Agendamento realizado com sucesso!")
        } catch (error) {
            alert("Erro ao realizar agendamento")
        }
    })

    let changeTimeout = null

    localInput.addEventListener("input", (event) => {
        const { value } = event.currentTarget;
        if (!value || value === "") return;

        const googleMapsUrl = `https://maps.google.com/maps?q=${value}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

        if (changeTimeout) clearTimeout(changeTimeout);

        changeTimeout = setTimeout(() => {
            mapsFrame.src = googleMapsUrl
        }, 500);
    })
})
