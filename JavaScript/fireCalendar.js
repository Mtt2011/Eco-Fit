
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    updateDoc,
    setDoc,
    getDocs,
    query,
    orderBy,
    doc,
    deleteDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyC5xyHXXnWOccw5uoEmtDflhyMwSOIAXJk",
    authDomain: "localparkggwp.firebaseapp.com",
    databaseURL: "https://localparkggwp-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "localparkggwp",
    storageBucket: "localparkggwp.firebasestorage.app",
    messagingSenderId: "435613635871",
    appId: "1:435613635871:web:5c9e3b4fed6ae9caa64c2a",
    measurementId: "G-D6DKK2ZLCC"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const authNav = document.getElementById("auth-nav");
const calendarGrid = document.getElementById("calendarGrid");
const selectedDateEl = document.getElementById("selectedDate");
const selectedDayEl = document.getElementById("selectedDay");
const eventList = document.getElementById("eventList");
const popup = document.getElementById("popup");
const eventInput = document.getElementById("eventInput");
const saveEventBtn = document.getElementById("saveEvent");
if (!authNav) console.warn("auth-nav not found");

onAuthStateChanged(auth, async (user) => {
    if (!user || !authNav) return;

    let displayName = "";

    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().name) {
            displayName = userDoc.data().name;
        } else {

            await setDoc(doc(db, "users", user.uid), { name: "User" });
            displayName = "User";
        }
    } catch (err) {
        console.error("Error fetching Firestore data:", err);
        return;
    }

    authNav.innerHTML = `
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle"></i> ${displayName}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                    <button class="dropdown-item" id="change-name-btn">Change Name</button>
                </li>
                <li>
                    <button class="dropdown-item" id="logout-btn">Logout</button>
                </li>
            </ul>
        </li>
    `;

    document.getElementById("logout-btn").onclick = () => {
        signOut(auth).then(() => location.reload());
    };

    document.getElementById("change-name-btn").onclick = async () => {
        const newName = prompt("Enter your new name:");
        if (!newName) return alert("Name cannot be empty!");

        const password = prompt("Enter your password to confirm:");
        if (!password) return alert("Password is required!");

        try {

            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);


            await updateDoc(doc(db, "users", user.uid), { name: newName });


            authNav.querySelector(".nav-link").innerHTML = `<i class="bi bi-person-circle"></i> ${newName}`;

            alert("Name changed successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to change name. Check your password.");
        }
    };
});

let currentDate = new Date();
let events = {};
let selectedDay = null;


async function loadEvents() {
    events = {};
    const q = query(collection(db, "calendarEvents"), orderBy("timestamp", "asc"));
    const snapshot = await getDocs(q);
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const key = `${data.year}-${data.month}-${data.day}`;
        if (!events[key]) events[key] = [];
        events[key].push({
            id: docSnap.id,
            name: data.name,
            content: data.content,
            uid: data.uid
        });
    });
    renderCalendar();
    if (selectedDay) selectDate(selectedDay);
}


function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    calendarGrid.innerHTML = "";

    document.getElementById("monthYear").innerText =
        currentDate.toLocaleString("default", { month: "long" }) + " " + year;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach(d => {
        const div = document.createElement("div");
        div.className = "day-name";
        div.innerText = d;
        calendarGrid.appendChild(div);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    for (let i = 0; i < firstDay; i++) calendarGrid.appendChild(document.createElement("div"));

    for (let d = 1; d <= totalDays; d++) {
        const box = document.createElement("div");
        box.className = "date-box";
        box.innerHTML = `<div>${d}</div>`;
        const key = `${year}-${month + 1}-${d}`;

        if (today.getDate() === d && today.getMonth() === month && today.getFullYear() === year) {
            box.classList.add("today");
        }

        if (events[key]) {
            box.classList.add("has-event");
            const label = document.createElement("div");
            label.className = "event-text";
            label.innerText = `${events[key].length} Event${events[key].length > 1 ? "s" : ""}`;
            box.appendChild(label);
        }

        box.onclick = () => selectDate(d);
        calendarGrid.appendChild(box);
    }
}


function selectDate(day) {
    selectedDay = day;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const key = `${year}-${month}-${day}`;

    selectedDateEl.innerText = day;
    selectedDayEl.innerText = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        .toLocaleString("default", { weekday: "long" });

    eventList.innerHTML = "";
    if (events[key]) {
        events[key].forEach(e => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${e.name}</strong>: ${e.content} ${auth.currentUser && auth.currentUser.uid === e.uid ? `<span style="cursor:pointer;color:red" data-id="${e.id}">&times;</span>` : ""}`;
            eventList.appendChild(li);

            if (auth.currentUser && auth.currentUser.uid === e.uid) {
                li.querySelector("span").onclick = async () => {
                    if (confirm("Delete this event?")) {
                        await deleteDoc(doc(db, "calendarEvents", e.id));
                        loadEvents();
                    }
                };
            }
        });
    } else {
        eventList.innerHTML = "<li>No events</li>";
    }
}

document.getElementById("prevMonth").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};
document.getElementById("nextMonth").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};


document.getElementById("openPopup").onclick = () => {
    if (!selectedDay) return alert("Select a date first!");
    popup.style.display = "block";
};


saveEventBtn.onclick = async () => {
    const content = eventInput.value.trim();
    if (!content) return alert("Enter event details");
    if (!auth.currentUser) return alert("Sign in to add events! Refresh your page to reset!");
    if (!selectedDay) return alert("Select a date first!");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    try {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        let userName = "User";
        if (userDoc.exists() && userDoc.data().name) {
            userName = userDoc.data().name;
        }


        await addDoc(collection(db, "calendarEvents"), {
            uid: auth.currentUser.uid,
            name: userName,
            content: content,
            year: year,
            month: month,
            day: selectedDay,
            timestamp: serverTimestamp()
        });

        popup.style.display = "none";
        eventInput.value = "";
        await loadEvents();
    } catch (err) {
        console.error("Error saving event:", err);
        alert("Failed to save event. Check console.");
    }
};



onAuthStateChanged(auth, () => {
    loadEvents();
});
renderCalendar();






