import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    EmailAuthProvider,
    reauthenticateWithCredential
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// 🔥 FULL CONFIG
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

onAuthStateChanged(auth, async (user) => {
    if (!user || !authNav) return;

    let displayName = "User";

    try {
        const snap = await getDoc(doc(db, "users", user.uid));
        console.log("Firestore snapshot:", snap.exists(), snap.data());

        if (snap.exists() && snap.data().name) {
            displayName = snap.data().name;
        }
    } catch (err) {
        console.error("Firestore error:", err);
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

    document.getElementById("logout-btn").onclick = () => signOut(auth).then(() => location.reload());

    document.getElementById("change-name-btn").onclick = async () => {
        const newName = prompt("Enter your new name:");
        if (!newName) return alert("Name cannot be empty");

        const password = prompt("Enter your password:");
        if (!password) return alert("Password required");

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            await updateDoc(doc(db, "users", user.uid), { name: newName });

            authNav.querySelector(".nav-link").innerHTML =
                `<i class="bi bi-person-circle"></i> ${newName}`;

            alert("Name updated successfully ✅");
        } catch (err) {
            console.error(err);
            alert("Wrong password or error occurred");
        }
    };
});
