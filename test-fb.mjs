import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDrx0HxqenwEmurhVmA6vb5NjEm7EJOcMY",
    authDomain: "my-cabinet-archive.firebaseapp.com",
    projectId: "my-cabinet-archive"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
    try {
        const q = query(collection(db, "essays"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        console.log("Success! Docs:", snap.size);
    } catch (e) {
        console.error("Error:", e.message);
    }
}
test();
