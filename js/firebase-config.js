import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrx0HxqenwEmurhVmA6vb5NjEm7EJOcMY",
    authDomain: "my-cabinet-archive.firebaseapp.com",
    projectId: "my-cabinet-archive",
    storageBucket: "my-cabinet-archive.firebasestorage.app",
    messagingSenderId: "62408826485",
    appId: "1:62408826485:web:23423979a8f6a52329e23c",
    measurementId: "G-3GW6KD4C2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

console.log("Firebase Initialized");
