
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from
"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// BookNova Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9Fxj1dX1pHNRQbYNI6fIm4aTOC2Qe6hA",
    authDomain: "booknova-b49ae.firebaseapp.com",
    projectId: "booknova-b49ae",
    storageBucket: "booknova-b49ae.firebasestorage.app",
    messagingSenderId: "990019812270",
    appId: "1:990019812270:web:2fab81904454314b63e63f",
    measurementId: "G-QQ3DXZRDD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Login
async function googleLogin() {
    const message = document.getElementById("message");
    const button = document.getElementById("googleBtn");

    try {
        button.disabled = true;
        message.style.color = "blue";
        message.textContent = "Please wait...";

        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Get Firebase unique user ID
        const uid = user.uid;

        sessionStorage.setItem("booknovaUser", JSON.stringify({
            uid: uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }));

        message.style.color = "green";
        message.textContent = "Google Login Successful!";

        window.location.href = "./home.html";

    } catch (error) {
        console.error("Google Login Error:", error);

        message.style.color = "red";
        message.textContent = error.message;

    } finally {
        button.disabled = false;
    }
}

// Password visibility
function togglePassword() {
    const password = document.getElementById("password");

    password.type =
        password.type === "password" ? "text" : "password";
}

window.togglePassword = togglePassword;

// Attach Google button
document.getElementById("googleBtn")
    .addEventListener("click", googleLogin);

// Existing email/password login
document.getElementById("loginBtn")
    .addEventListener("click", login);

async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!email || !password) {
        message.style.color = "red";
        message.textContent = "Please enter email and password.";
        return;
    }

    try {
        const response = await fetch(
            "https://booknova.onrender.com/api/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Login failed");
        }

        sessionStorage.setItem(
            "booknovaUser",
            JSON.stringify(result.user)
        );

        window.location.href = "./home.html";

    } catch (error) {
        message.style.color = "red";
        message.textContent = error.message;
    }
}
