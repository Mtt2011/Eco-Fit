import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    getDocs,
    serverTimestamp,
    doc,
    getDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


const auth = getAuth();
const db = getFirestore();


const feedbackInput = document.getElementById("feedback-input");
const submitBtn = document.getElementById("submit-feedback");
const accordion = document.getElementById("accordionExample");


onAuthStateChanged(auth, async (user) => {
    if (user) {
        submitBtn.disabled = false;


        submitBtn.addEventListener("click", async () => {
            const content = feedbackInput.value.trim();
            if (!content) return alert("Feedback cannot be empty!");

            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const name = userDoc.exists() ? userDoc.data().name : "Anonymous";

                await addDoc(collection(db, "feedbacks"), {
                    uid: user.uid,
                    name: name,
                    content: content,
                    timestamp: serverTimestamp()
                });

                feedbackInput.value = "";
                loadFeedbacks();
            } catch (err) {
                console.error(err);
                alert("Error posting feedback");
            }
        });

        loadFeedbacks();
    } else {
        submitBtn.disabled = true;
        submitBtn.title = "You must be signed in to post feedback.";
    }
});

async function loadFeedbacks() {
    accordion.innerHTML = "";
    const q = query(collection(db, "feedbacks"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const user = auth.currentUser;

    snapshot.forEach((docSnap, index) => {
        const data = docSnap.data();
        const time = data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleString() : "Just now";
        const itemId = docSnap.id;
        const isOwner = user && user.uid === data.uid;

        const accordionItem = document.createElement("div");
        accordionItem.classList.add("accordion-item");
        accordionItem.innerHTML = `
            <h2 class="accordion-header" id="heading-${itemId}">
                <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${itemId}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse-${itemId}">
                    ${data.name} - ${time}
                </button>
            </h2>
            <div id="collapse-${itemId}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading-${itemId}" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    ${data.content}
                    ${isOwner ? `<button class="btn btn-danger btn-sm mt-2" id="delete-${itemId}">Remove</button>` : ''}
                </div>
            </div>
        `;

        accordion.appendChild(accordionItem);

        if (isOwner) {
            const deleteBtn = document.getElementById(`delete-${itemId}`);
            deleteBtn.addEventListener("click", async () => {
                if (confirm("Are you sure you want to delete this comment?")) {
                    try {
                        await deleteDoc(doc(db, "feedbacks", itemId));
                        loadFeedbacks();
                    } catch (err) {
                        console.error(err);
                        alert("Failed to delete comment.");
                    }
                }
            });
        }
    });
}
