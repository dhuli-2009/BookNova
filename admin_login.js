
const adminLoginForm = document.getElementById("adminLoginForm");

const adminId = document.getElementById("adminId");
const adminPassword = document.getElementById("adminPassword");

const errorMessage = document.getElementById("errorMessage");
const togglePassword = document.getElementById("togglePassword");

// Demo credentials
// Replace with secure Firebase authentication before deployment.
const ADMIN_ID = "admin";
const ADMIN_PASSWORD = "Admin@123";

togglePassword.addEventListener("click", function () {

    if (adminPassword.type === "password") {
        adminPassword.type = "text";
    } else {
        adminPassword.type = "password";
    }

});

adminLoginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const enteredId = adminId.value.trim();
    const enteredPassword = adminPassword.value;

    if (
        enteredId === ADMIN_ID &&
        enteredPassword === ADMIN_PASSWORD
    ) {

        errorMessage.style.color = "green";
        errorMessage.textContent = "Login successful!";

        sessionStorage.setItem("bookNovaAdmin", "true");

        setTimeout(function () {
            window.location.href = "admin-dashboard.html";
        }, 700);

    } else {

        errorMessage.style.color = "red";
        errorMessage.textContent =
            "Invalid Admin ID or Password!";

    }

});
