// ===== UI TOGGLE =====
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,

    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
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

document.getElementById("su-btn").addEventListener("click", async () => {
    const name = document.getElementById("su-name").value.trim();
    const email = document.getElementById("su-email").value.trim();
    const password = document.getElementById("su-password").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const cred = await createUserWithEmailAndPassword(auth, email, password);


        await setDoc(doc(db, "users", cred.user.uid), {
            name: name,
            email: email,
            createdAt: serverTimestamp()
        });

        alert("Account created successfully!");
        window.location.href = "../index.html";

    } catch (err) {
        alert(err.message);
    }
});


document.getElementById("li-btn").addEventListener("click", async () => {
    const email = document.getElementById("li-email").value.trim();
    const password = document.getElementById("li-password").value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "../index.html";
    } catch (err) {
        alert(err.message);
    }
});





const provider = new GoogleAuthProvider();

document.getElementById("google-btn").addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) {
            await setDoc(userRef, {
                name: user.displayName || "User",
                email: user.email,
                provider: "google",
                createdAt: serverTimestamp()
            });
        }

        window.location.href = "../index.html";

    } catch (err) {
        alert(err.message);
    }
});
