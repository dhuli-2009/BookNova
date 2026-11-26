
document.addEventListener("DOMContentLoaded", function () {

    // ===== MY LIBRARY TABS =====

    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {

            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(section => section.classList.remove("active"));

            button.classList.add("active");

            const selectedTab = button.dataset.tab;
            const selectedSection = document.getElementById(selectedTab);

            if (selectedSection) {
                selectedSection.classList.add("active");
            }
        });
    });

    // ===== USER ID =====

    async function getUserId() {
        const user = JSON.parse(
            sessionStorage.getItem("booknovaUser") || "{}"
        );

        if (user.user_id) {
            return user.user_id;
        }

        // Google login user: find MySQL user by email
        if (user.email) {
            const response = await fetch(
                "http://localhost:3001/api/user/lookup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user.email
                    })
                }
            );

            if (!response.ok) {
                throw new Error("User not found in database");
            }

            const userData = await response.json();

            user.user_id = userData.user_id;

            sessionStorage.setItem(
                "booknovaUser",
                JSON.stringify(user)
            );

            return userData.user_id;
        }

        throw new Error("Please login first");
    }

    // ===== SAFE TEXT =====

    function safeText(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
    }

    // ===== DATE FORMAT =====

    function formatDate(value) {
        if (!value) return "Not available";

        const date = new Date(value);

        if (isNaN(date.getTime())) return "Not available";

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    // ===== BOOK CARD =====

    function createBookCard(book, type) {

        const title = safeText(book.title || "Untitled Book");
        const author = safeText(book.author || book.category || "Unknown Author");

        let cover = "📘";

        if (book.cover_image) {
            const imagePath = safeText(book.cover_image);

            cover = `<img src="${imagePath}" alt="${title}"
                onerror="this.style.display='none'">`;
        }

        let extraDetails = "";

        if (type === "issued") {

            const issueDate = formatDate(book.issue_date);
            const dueDate = formatDate(book.due_date);

            let statusText = "Issued";
            let statusClass = "remaining";

            if (book.due_date) {
                const due = new Date(book.due_date);
                const today = new Date();

                due.setHours(0, 0, 0, 0);
                today.setHours(0, 0, 0, 0);

                const days = Math.ceil(
                    (due - today) / (1000 * 60 * 60 * 24)
                );

                if (days < 0) {
                    statusText = "Overdue";
                    statusClass = "overdue";
                } else {
                    statusText = days + " Days Left";
                }
            }

            extraDetails = `
                <p class="date-info">Issued on: ${issueDate}</p>
                <p class="date-info">Due on: ${dueDate}</p>
                <span class="status-badge ${statusClass}">
                    ${statusText}
                </span>
            `;

        } else if (type === "reserved") {

            extraDetails = `
                <p class="date-info">
                    Reserved on: ${formatDate(book.reservation_date)}
                </p>
                <span class="status-badge remaining">
                    ${safeText(book.reservation_status || "Reserved")}
                </span>
            `;

        } else if (type === "history") {

            extraDetails = `
                <p class="date-info">
                    Read on: ${formatDate(book.read_date)}
                </p>
            `;

        } else if (type === "favourites") {

            extraDetails = `
                <span class="status-badge remaining">
                    ♥ Favourite
                </span>
            `;
        }

        return `
            <div class="library-book-card">

                <div class="book-cover cover-blue">
                    <span>${cover}</span>
                </div>

                <div class="book-info">
                    <h3>${title}</h3>
                    <p class="book-author">${author}</p>
                    ${extraDetails}
                </div>

            </div>
        `;
    }

    // ===== DISPLAY BOOKS =====

    function displayBooks(sectionId, books, type, emptyTitle, emptyMessage, emoji) {

        const section = document.getElementById(sectionId);

        if (!section) return;

        if (books.length === 0) {

            section.innerHTML = `
                <div class="empty-state">
                    <span>${emoji}</span>
                    <h3>${emptyTitle}</h3>
                    <p>${emptyMessage}</p>
                </div>
            `;

            return;
        }

        section.innerHTML = `
            <div class="book-list">
                ${books.map(book => createBookCard(book, type)).join("")}
            </div>
        `;
    }

    // ===== LOAD MY LIBRARY DATA =====

    async function loadMyLibrary() {

        try {
            const userId = await getUserId();

            const response = await fetch(
                `http://localhost:3001/api/my-library/${encodeURIComponent(userId)}`
            );

            if (!response.ok) {
                throw new Error("Unable to load My Library data");
            }

            const data = await response.json();

            displayBooks(
                "issued",
                data.issued || [],
                "issued",
                "No Issued Books",
                "Your issued books will appear here.",
                "📚"
            );

            displayBooks(
                "reserved",
                data.reserved || [],
                "reserved",
                "No Reserved Books",
                "Your reserved books will appear here.",
                "📚"
            );

            displayBooks(
                "history",
                data.history || [],
                "history",
                "No Reading History",
                "Your reading history will appear here.",
                "📖"
            );

            displayBooks(
                "favourites",
                data.favourites || [],
                "favourites",
                "No Favourite Books",
                "Your favourite books will appear here.",
                "♡"
            );

            console.log("My Library Data Loaded Successfully!");

        } catch (error) {
            console.error("My Library Error:", error);

            document.querySelectorAll(".tab-content").forEach(section => {
                section.innerHTML = `
                    <div class="empty-state">
                        <span>⚠️</span>
                        <h3>Unable to Load Books</h3>
                        <p>Please login again or try later.</p>
                    </div>
                `;
            });
        }
    }

    loadMyLibrary();

});
