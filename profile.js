document.addEventListener("DOMContentLoaded", function () {

    // Get logged-in user details
    const user = JSON.parse(
        sessionStorage.getItem("booknovaUser") || "{}"
    );

    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userAvatar = document.getElementById("userAvatar");

    // Show / Hide Password
    const toggleButtons = document.querySelectorAll(".toggle-password");

    toggleButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.dataset.target;
            const passwordInput = document.getElementById(targetId);

            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                this.textContent = "🙈";
            } else {
                passwordInput.type = "password";
                this.textContent = "👁️";
        }
    });
});
// Close Settings Popup
    const settingsModal = document.getElementById("settingsModal");
    // Notifications Popup

    // Save Notification Preference
    const notificationToggle = document.getElementById("notificationToggle");

    // Load saved setting
    const savedNotification = localStorage.getItem("booknovaNotifications");

    if (savedNotification !== null) {
        notificationToggle.checked = savedNotification === "true";
    }

    // Save when toggle changes
    notificationToggle.addEventListener("change", function () {
        localStorage.setItem("booknovaNotifications", this.checked);
}); 
    const notificationsModal = document.getElementById("notificationsModal");

    document.querySelectorAll(".settings-option").forEach(option => {
        option.addEventListener("click", function () {
            if (this.dataset.setting === "notifications") {
                settingsModal.classList.remove("show");
                notificationsModal.classList.add("show");
            }
    });
});

    const closeNotificationsModal = document.getElementById("closeNotificationsModal");

        closeNotificationsModal.addEventListener("click", function () {
        notificationsModal.classList.remove("show");
    });

        notificationsModal.addEventListener("click", function (event) {
        if (event.target === notificationsModal) {
            notificationsModal.classList.remove("show");
    }
});
    
const closeSettingsModal = document.getElementById("closeSettingsModal");

    closeSettingsModal.addEventListener("click", function () {
        settingsModal.classList.remove("show");
});

settingsModal.addEventListener("click", function (event) {
    if (event.target === settingsModal) {
        settingsModal.classList.remove("show");
    }
});

    // DARK MODE POPUP
    const darkModeModal = document.getElementById("darkModeModal");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const closeDarkModeModal = document.getElementById("closeDarkModeModal");

    document.querySelectorAll(".settings-option").forEach(option => {
        option.addEventListener("click", function () {

            if (this.dataset.setting === "darkmode") {
                settingsModal.classList.remove("show");
                darkModeModal.classList.add("show");
            }

    });
});

closeDarkModeModal.addEventListener("click", function () {
    darkModeModal.classList.remove("show");
});

darkModeModal.addEventListener("click", function (event) {
    if (event.target === darkModeModal) {
        darkModeModal.classList.remove("show");
    }
});

// DARK MODE FUNCTIONALITY

const savedDarkMode = localStorage.getItem("booknovaDarkMode");

if (savedDarkMode === "true") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", function () {
    if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("booknovaDarkMode", "true");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("booknovaDarkMode", "false");
    }
});

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
                    document.getElementById("detailName").textContent =
                    user.full_name || user.name || "Not available";

                    document.getElementById("detailUserId").textContent =
                    user.user_id || user.uid || "Not available";

                    document.getElementById("detailEmail").textContent =
                    user.email || "Not available";

                    document.getElementById("detailMobile").textContent =
                    user.phone || user.mobile || "Not added";

                    document.getElementById("detailRole").textContent =
                    user.role || "User";

                    document.getElementById("personalModal").classList.add("show");
                    break;

                case "password":
                    document.getElementById("passwordModal").classList.add("show");
                    break;
                    
                case "statistics":
                    alert("Reading Statistics will be available soon.");
                    break;

                case "settings":
                    document.getElementById("settingsModal").classList.add("show");
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
        document.getElementById("settingsModal").classList.add("show");
    });
}

});
    const personalModal = document.getElementById("personalModal");
    const closePersonalModal = document.getElementById("closePersonalModal");

    closePersonalModal.addEventListener("click", function () {
    personalModal.classList.remove("show");
});

    personalModal.addEventListener("click", function (event) {
        if (event.target === personalModal) {
            personalModal.classList.remove("show");
        }
});

// Close Change Password Popup
    const passwordModal = document.getElementById("passwordModal");
    const closePasswordModal = document.getElementById("closePasswordModal");

    closePasswordModal.addEventListener("click", function () {
    passwordModal.classList.remove("show");
});

    passwordModal.addEventListener("click", function (event) {
        if (event.target === passwordModal) {
            passwordModal.classList.remove("show");
        }
});