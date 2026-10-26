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

        message.style.color = "green";

        message.innerHTML = "Login successful!";

    } else {

        message.style.color = "red";

        message.innerHTML =
            "Please enter email and password.";
    }
}

function googleLogin() {
    document.getElementById("message").style.color = "green";
    document.getElementById("message").innerHTML =
        "Google Login Successful";

    window.location.href = "home.html";
}

