
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // USER DETAILS
    // =========================
    const user = JSON.parse(sessionStorage.getItem("booknovaUser") || "{}");

    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const userAvatar = document.getElementById("userAvatar");

    // =========================
    // TRANSLATIONS
    // =========================
    const translations = {
        en: {
            myProfile: "My Profile",
            booksIssued: "Books Issued",
            booksRead: "Books Read",
            fine: "Fine",
            personal: "Personal Info",
            personalTitle: "Personal Information",
            fullName: "Full Name",
            userId: "User ID",
            emailAddress: "Email Address",
            mobileNumber: "Mobile Number",
            accountRole: "Account Role",
            notAvailable: "Not available",
            notAdded: "Not added",
            user: "User",
            password: "Change Password",
            statistics: "Reading Statistics",
            settings: "Settings",
            logout: "Logout",
            notifications: "Notifications",
            darkMode: "Dark Mode",
            language: "Language",
            privacy: "Privacy",
            about: "About BookNova",
            notificationTitle: "Notifications",
            notificationMessage: "Enable or disable BookNova notifications.",
            darkModeTitle: "Dark Mode",
            darkModeMessage: "Switch between light and dark appearance.",
            languageTitle: "Language",
            languageMessage: "Choose your preferred language.",
            selectLanguage: "Select Language",
            privacyTitle: "Privacy",
            privacySecurity: "Privacy & Security",
            privacySecurityMessage: "Your account information is private and secure.",
            personalInformation: "Personal Information",
            personalInformationMessage: "Your personal details are used only for your BookNova account.",
            accountSecurity: "Account Security",
            accountSecurityMessage: "Keep your password safe and do not share it with anyone.",
            aboutTitle: "About BookNova",
            aboutMessage: "BookNova Smart Library Management System",
            aboutDescription: "BookNova helps readers explore books and manage their library.",
            home: "Home",
            search: "Search",
            myLibrary: "My Library",
            profile: "Profile",
            currentPasswordPlaceholder: "Enter current password",
            newPasswordPlaceholder: "Enter new password",
            confirmPasswordPlaceholder: "Confirm new password",
            updatePassword: "Update Password",
            readingStatistics: "Reading Statistics will be available soon.",
            logoutConfirm: "Are you sure you want to logout?",
            logoutSuccess: "Logged out successfully!"
        },

        hi: {
            myProfile: "मेरी प्रोफ़ाइल",
            booksIssued: "जारी की गई पुस्तकें",
            booksRead: "पढ़ी गई पुस्तकें",
            fine: "जुर्माना",
            personal: "व्यक्तिगत जानकारी",
            personalTitle: "व्यक्तिगत जानकारी",
            fullName: "पूरा नाम",
            userId: "यूज़र आईडी",
            emailAddress: "ईमेल पता",
            mobileNumber: "मोबाइल नंबर",
            accountRole: "खाता प्रकार",
            notAvailable: "उपलब्ध नहीं",
            notAdded: "जोड़ा नहीं गया",
            user: "उपयोगकर्ता",
            password: "पासवर्ड बदलें",
            statistics: "पठन आंकड़े",
            settings: "सेटिंग्स",
            logout: "लॉग आउट",
            notifications: "सूचनाएं",
            darkMode: "डार्क मोड",
            language: "भाषा",
            privacy: "गोपनीयता",
            about: "BookNova के बारे में",
            notificationTitle: "सूचनाएं",
            notificationMessage: "BookNova सूचनाएं चालू या बंद करें।",
            darkModeTitle: "डार्क मोड",
            darkModeMessage: "लाइट और डार्क मोड बदलें।",
            languageTitle: "भाषा",
            languageMessage: "अपनी पसंदीदा भाषा चुनें।",
            selectLanguage: "भाषा चुनें",
            privacyTitle: "गोपनीयता",
            privacySecurity: "गोपनीयता और सुरक्षा",
            privacySecurityMessage: "आपकी अकाउंट जानकारी निजी और सुरक्षित है।",
            personalInformation: "व्यक्तिगत जानकारी",
            personalInformationMessage: "आपकी व्यक्तिगत जानकारी केवल BookNova अकाउंट के लिए उपयोग की जाती है।",
            accountSecurity: "अकाउंट सुरक्षा",
            accountSecurityMessage: "अपना पासवर्ड सुरक्षित रखें और किसी के साथ साझा न करें।",
            aboutTitle: "BookNova के बारे में",
            aboutMessage: "BookNova स्मार्ट लाइब्रेरी मैनेजमेंट सिस्टम",
            aboutDescription: "BookNova पाठकों को किताबें खोजने और लाइब्रेरी व्यवस्थित करने में मदद करता है।",
            home: "होम",
            search: "खोजें",
            myLibrary: "मेरी लाइब्रेरी",
            profile: "प्रोफ़ाइल",
            currentPasswordPlaceholder: "वर्तमान पासवर्ड दर्ज करें",
            newPasswordPlaceholder: "नया पासवर्ड दर्ज करें",
            confirmPasswordPlaceholder: "नया पासवर्ड पुष्टि करें",
            updatePassword: "पासवर्ड अपडेट करें",
            readingStatistics: "पठन आंकड़े जल्द उपलब्ध होंगे।",
            logoutConfirm: "क्या आप लॉग आउट करना चाहते हैं?",
            logoutSuccess: "सफलतापूर्वक लॉग आउट हो गए!"
        },

        gu: {
            myProfile: "મારી પ્રોફાઇલ",
            booksIssued: "આપેલ પુસ્તકો",
            booksRead: "વાંચેલ પુસ્તકો",
            fine: "દંડ",
            personal: "વ્યક્તિગત માહિતી",
            personalTitle: "વ્યક્તિગત માહિતી",
            fullName: "પૂરું નામ",
            userId: "યુઝર આઈડી",
            emailAddress: "ઈમેલ સરનામું",
            mobileNumber: "મોબાઇલ નંબર",
            accountRole: "ખાતાનો પ્રકાર",
            notAvailable: "ઉપલબ્ધ નથી",
            notAdded: "ઉમેર્યું નથી",
            user: "વપરાશકર્તા",
            password: "પાસવર્ડ બદલો",
            statistics: "વાંચન આંકડા",
            settings: "સેટિંગ્સ",
            logout: "લોગઆઉટ",
            notifications: "નોટિફિકેશન",
            darkMode: "ડાર્ક મોડ",
            language: "ભાષા",
            privacy: "પ્રાઇવસી",
            about: "BookNova વિશે",
            notificationTitle: "નોટિફિકેશન",
            notificationMessage: "BookNova નોટિફિકેશન ચાલુ અથવા બંધ કરો.",
            darkModeTitle: "ડાર્ક મોડ",
            darkModeMessage: "લાઇટ અને ડાર્ક મોડ બદલો.",
            languageTitle: "ભાષા",
            languageMessage: "તમારી પસંદગીની ભાષા પસંદ કરો.",
            selectLanguage: "ભાષા પસંદ કરો",
            privacyTitle: "પ્રાઇવસી",
            privacySecurity: "પ્રાઇવસી અને સુરક્ષા",
            privacySecurityMessage: "તમારા એકાઉન્ટની માહિતી ખાનગી અને સુરક્ષિત છે.",
            personalInformation: "વ્યક્તિગત માહિતી",
            personalInformationMessage: "તમારી વ્યક્તિગત વિગતો ફક્ત BookNova એકાઉન્ટ માટે વપરાય છે.",
            accountSecurity: "એકાઉન્ટ સુરક્ષા",
            accountSecurityMessage: "તમારો પાસવર્ડ સુરક્ષિત રાખો અને કોઈની સાથે શેર કરશો નહીં.",
            aboutTitle: "BookNova વિશે",
            aboutMessage: "BookNova સ્માર્ટ લાઇબ્રેરી મેનેજમેન્ટ સિસ્ટમ",
            aboutDescription: "BookNova વાચકોને પુસ્તકો શોધવા અને લાઇબ્રેરી સંચાલિત કરવામાં મદદ કરે છે.",
            home: "હોમ",
            search: "શોધ",
            myLibrary: "મારી લાઇબ્રેરી",
            profile: "પ્રોફાઇલ",
            currentPasswordPlaceholder: "હાલનો પાસવર્ડ દાખલ કરો",
            newPasswordPlaceholder: "નવો પાસવર્ડ દાખલ કરો",
            confirmPasswordPlaceholder: "નવો પાસવર્ડ ફરી દાખલ કરો",
            updatePassword: "પાસવર્ડ અપડેટ કરો",
            readingStatistics: "વાંચન આંકડા ટૂંક સમયમાં ઉપલબ્ધ થશે.",
            logoutConfirm: "શું તમે ખરેખર લોગઆઉટ કરવા માંગો છો?",
            logoutSuccess: "સફળતાપૂર્વક લોગઆઉટ થયું!"
        }
    };

    // =========================
    // LANGUAGE
    // =========================
    let currentLanguage = localStorage.getItem("booknovaLanguage") || "en";

    if (!translations[currentLanguage]) {
        currentLanguage = "en";
    }

    // =========================
    // PERSONAL DETAILS
    // =========================
    function updatePersonalDetails() {
        const t = translations[currentLanguage];

        const detailName = document.getElementById("detailName");
        const detailUserId = document.getElementById("detailUserId");
        const detailEmail = document.getElementById("detailEmail");
        const detailMobile = document.getElementById("detailMobile");
        const detailRole = document.getElementById("detailRole");

        if (detailName)
            detailName.textContent = user.full_name || user.name || t.notAvailable;

        if (detailUserId)
            detailUserId.textContent = user.user_id || user.uid || t.notAvailable;

        if (detailEmail)
            detailEmail.textContent = user.email || t.notAvailable;

        if (detailMobile)
            detailMobile.textContent = user.phone || user.mobile || t.notAdded;

        if (detailRole)
            detailRole.textContent = user.role || t.user;
    }

    // =========================
    // APPLY LANGUAGE
    // =========================
    function applyLanguage(lang) {

        if (!translations[lang]) lang = "en";

        currentLanguage = lang;
        const t = translations[lang];

        // Translate text
        document.querySelectorAll("[data-lang]").forEach(element => {
            const key = element.dataset.lang;
            if (t[key]) {
                element.textContent = t[key];
            }
        });

        // Translate placeholders
        document.querySelectorAll("[data-lang-placeholder]").forEach(element => {
            const key = element.dataset.langPlaceholder;
            if (t[key]) {
                element.placeholder = t[key];
            }
        });

        // Update user details
        if (userName)
            userName.textContent = user.full_name || user.name || t.user;

        if (userEmail)
            userEmail.textContent = user.email || t.notAvailable;

        updatePersonalDetails();

        document.documentElement.lang = lang;
        localStorage.setItem("booknovaLanguage", lang);
    }

    applyLanguage(currentLanguage);

    // =========================
    // PASSWORD VISIBILITY
    // =========================
    document.querySelectorAll(".toggle-password").forEach(button => {
        button.addEventListener("click", function () {

            const input = document.getElementById(this.dataset.target);
            if (!input) return;

            if (input.type === "password") {
                input.type = "text";
                this.textContent = "🙈";
            } else {
                input.type = "password";
                this.textContent = "👁️";
            }
        });
    });

    // =========================
    // MODALS
    // =========================
    const modalIds = [
        "settingsModal",
        "notificationsModal",
        "darkModeModal",
        "languageModal",
        "personalModal",
        "passwordModal",
        "privacyModal",
        "aboutModal"
    ];

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove("show");
    }

    modalIds.forEach(id => {
        const modal = document.getElementById(id);

        if (modal) {
            modal.addEventListener("click", function (event) {
                if (event.target === modal) {
                    modal.classList.remove("show");
                }
            });
        }
    });

    // Close buttons
    const closeButtons = {
        closeSettingsModal: "settingsModal",
        closeNotificationsModal: "notificationsModal",
        closeDarkModeModal: "darkModeModal",
        closeLanguageModal: "languageModal",
        closePersonalModal: "personalModal",
        closePasswordModal: "passwordModal",
        closePrivacyModal: "privacyModal",
        closeAboutModal: "aboutModal"
    };

    Object.keys(closeButtons).forEach(buttonId => {
        const button = document.getElementById(buttonId);

        if (button) {
            button.addEventListener("click", function () {
                closeModal(closeButtons[buttonId]);
            });
        }
    });

    // =========================
    // NOTIFICATIONS
    // =========================
    const notificationToggle = document.getElementById("notificationToggle");

    const savedNotification = localStorage.getItem("booknovaNotifications");

    if (notificationToggle && savedNotification !== null) {
        notificationToggle.checked = savedNotification === "true";
    }

    if (notificationToggle) {
        notificationToggle.addEventListener("change", function () {
            localStorage.setItem("booknovaNotifications", this.checked);
        });
    }

    // =========================
    // DARK MODE
    // =========================
    const darkModeToggle = document.getElementById("darkModeToggle");

    const savedDarkMode = localStorage.getItem("booknovaDarkMode");

    if (savedDarkMode === "true") {
        document.body.classList.add("dark-mode");

        if (darkModeToggle) darkModeToggle.checked = true;
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("change", function () {

            document.body.classList.toggle("dark-mode", this.checked);

            localStorage.setItem("booknovaDarkMode", this.checked);
        });
    }

    // =========================
    // LANGUAGE SELECT
    // =========================
    const languageSelect = document.getElementById("languageSelect");

    if (languageSelect) {
        languageSelect.value = currentLanguage;

        languageSelect.addEventListener("change", function () {
            applyLanguage(this.value);
        });
    }

    // =========================
    // SETTINGS OPTIONS
    // =========================
    document.querySelectorAll(".settings-option").forEach(option => {

        option.addEventListener("click", function () {

            const setting = this.dataset.setting;

            closeModal("settingsModal");

            const modalMap = {
                notifications: "notificationsModal",
                darkmode: "darkModeModal",
                language: "languageModal",
                privacy: "privacyModal",
                about: "aboutModal"
            };

            if (modalMap[setting]) {
                const targetModal = document.getElementById(modalMap[setting]);

                if (targetModal) {
                    targetModal.classList.add("show");
                }
            }
        });
    });

    // =========================
    // USER PROFILE
    // =========================
    if (userName) {
        userName.textContent = user.full_name || user.name || translations[currentLanguage].user;
    }

    if (userEmail) {
        userEmail.textContent = user.email || translations[currentLanguage].notAvailable;
    }

    // Profile photo
    if (user.photo && userAvatar) {
        userAvatar.innerHTML = "";

        const img = document.createElement("img");
        img.src = user.photo;
        img.alt = "Profile Photo";
        img.className = "profile-photo";

        userAvatar.appendChild(img);
    }

    // =========================
    // PROFILE MENU
    // =========================
    document.querySelectorAll(".menu-item").forEach(item => {

        item.addEventListener("click", function () {

            const action = this.dataset.action;
            const t = translations[currentLanguage];

            switch (action) {

                case "personal":
                    updatePersonalDetails();
                    document.getElementById("personalModal").classList.add("show");
                    break;

                case "password":
                    document.getElementById("passwordModal").classList.add("show");
                    break;

                case "statistics":
                    alert(t.readingStatistics);
                    break;

                case "settings":
                    document.getElementById("settingsModal").classList.add("show");
                    break;

                case "logout":
                    if (confirm(t.logoutConfirm)) {
                        sessionStorage.removeItem("booknovaUser");
                        alert(t.logoutSuccess);
                        window.location.href = "index.html";
                    }
                    break;
            }
        });
    });

    // =========================
    // HEADER SETTINGS BUTTON
    // =========================
    const settingsBtn = document.getElementById("settingsBtn");

    if (settingsBtn) {
        settingsBtn.addEventListener("click", function () {
            document.getElementById("settingsModal").classList.add("show");
        });
    }

});
