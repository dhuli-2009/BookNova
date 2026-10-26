function togglePassword() {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");
    const name = email.split("@")[0];
    sessionStorage.setItem("readerName", name);

    if (email !== "" && password !== "") {
        const name = email.includes("@")
            ? email.split("@")[0]
            : email;

        sessionStorage.setItem("readerName", name);

        message.style.color = "green";
        message.textContent = "Login successful!";

        window.location.href = "./home.html";
    } else {
        message.style.color = "red";
        message.textContent = "Please enter email and password.";
    }
}

function googleLogin() {
    // Google login is handled by Firebase in login.html.
    // Do not use this function for Firebase authentication.
}