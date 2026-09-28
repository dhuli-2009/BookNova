function togglePassword() {
    let password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

function login() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email !== "" && password !== "") {

        // Open friend's next page
        window.location.href = "dashboard.html";

    } else {

        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerHTML =
            "Please enter email and password.";
    }
}