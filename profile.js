document.addEventListener("DOMContentLoaded", function () {

    // Get logged-in user details
    const user = JSON.parse(
        sessionStorage.getItem("booknovaUser") || "{}"
    );

    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userAvatar = document.getElementById("userAvatar");

    // Display user details
    if (user.full_name || user.name) {
        userName.textContent = user.full_name || user.name;
    } else {
        userName.textContent = "User";
    }

    if (user.email) {
        userEmail.textContent = user.email;
    } else {
        userEmail.textContent = "Email not available";
    }

    // Google Profile Photo
    if (user.photo && userAvatar) {
        userAvatar.innerHTML = "";

        const img = document.createElement("img");
        img.src = user.photo;
        img.alt = "Profile Photo";
        img.className = "profile-photo";

        userAvatar.appendChild(img);
    }

    // Menu Buttons
    const menuItems = document.querySelectorAll(".menu-item");
    const settingsBtn = document.getElementById("settingsBtn");

    menuItems.forEach(item => {

        item.addEventListener("click", function () {

            const action = item.dataset.action;

            switch (action) {

                case "personal":
                    alert("Personal Information will be available soon.");
                    break;

                case "password":
                    alert("Change Password feature will be available soon.");
                    break;

                case "statistics":
                    alert("Reading Statistics will be available soon.");
                    break;

                case "settings":
                    alert("Settings will be available soon.");
                    break;

                case "logout":
                    const confirmLogout = confirm("Are you sure you want to logout?");

                    if (confirmLogout) {
                        sessionStorage.removeItem("booknovaUser");
                        alert("Logged out successfully!");
                        window.location.href = "index.html";
                    }
                    break;
            }

        });

    });

    // Header Settings Button
    if (settingsBtn) {
        settingsBtn.addEventListener("click", function () {
            alert("Settings will be available soon.");
        });
    }

});