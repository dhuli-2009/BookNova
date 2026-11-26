
document.addEventListener("DOMContentLoaded", function () {

    const API = "http://localhost:3001";

    const tabs = document.querySelectorAll(".tab-btn");
    const sections = document.querySelectorAll(".tab-content");

    // TAB SWITCHING
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {

            tabs.forEach(t => t.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));

            this.classList.add("active");

            const section = document.getElementById(
                this.dataset.tab + "Section"
            );

            if (section) {
                section.classList.add("active");
            }
        });
    });

    // GET LOGGED-IN USER
    async function getUserId() {

        const user = JSON.parse(
            sessionStorage.getItem("booknovaUser") || "{}"
        );

        if (user.user_id) {
            return user.user_id;
        }

        if (!user.email) {
            return null;
        }

        const response = await fetch(`${API}/api/user/lookup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: user.email
            })
        });

        if (!response.ok) {
            throw new Error("User not found");
        }

        const userData = await response.json();

        user.user_id = userData.user_id;

        sessionStorage.setItem(
            "booknovaUser",
            JSON.stringify(user)
        );

        return userData.user_id;
    }

    // SAFE TEXT
    function safeText(value) {
        const div = document.createElement("div");
        div.textContent = value || "";
        return div.innerHTML;
    }

    // FORMAT DATE
    function formatDate(date) {
        if (!date) return "Not available";

        return new Date(date).toLocaleDateString("en-IN");
    }

    // BOOK CARD
    function createBookCard(book, type) {

        const card = document.createElement("div");
        card.className = "book-card";

        const title = safeText(book.title);
        const author = safeText(book.author || "Unknown Author");
        const category = safeText(book.category || "General");

        const cover = book.cover_image
            ? `<img src="${safeText(book.cover_image)}" alt="${title}">`
            : `<div class="book-placeholder">📚</div>`;

        let details = "";

        if (type === "issued") {
            details = `
                <p>Issue Date: ${formatDate(book.issue_date)}</p>
                <p>Due Date: ${formatDate(book.due_date)}</p>
            `;
        }

        if (type === "reserved") {
            details = `
                <p>Reserved: ${formatDate(book.reservation_date)}</p>
                <p>Status: ${safeText(book.reservation_status)}</p>
            `;
        }

        if (type === "history") {
            details = `
                <p>Read Date: ${formatDate(book.read_date)}</p>
            `;
        }

        if (type === "favourites") {
            details = `
                <p>Category: ${category}</p>
                <p>♥ Favourite</p>
            `;
        }

        card.innerHTML = `
            <div class="book-cover">${cover}</div>
            <div class="book-info">
                <h3>${title}</h3>
                <p>${author}</p>
                ${details}
            </div>
        `;

        return card;
    }

    // DISPLAY BOOKS
    function displayBooks(sectionId, books, type, message) {

        const section = document.getElementById(sectionId);

        if (!section) return;

        section.innerHTML = "";

        if (!books || books.length === 0) {
            section.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📚</div>
                    <h3>${message}</h3>
                    <p>Your books will appear here.</p>
                </div>
            `;
            return;
        }

        books.forEach(book => {
            section.appendChild(createBookCard(book, type));
        });
    }

    // LOAD MY LIBRARY
    async function loadMyLibrary() {

        try {
            const userId = await getUserId();

            if (!userId) {
                throw new Error("Please login first");
            }

            const response = await fetch(
                `${API}/api/my-library/${userId}`
            );

            if (!response.ok) {
                throw new Error("Unable to load library");
            }

            const data = await response.json();

            displayBooks(
                "issuedSection",
                data.issued,
                "issued",
                "No Issued Books"
            );

            displayBooks(
                "reservedSection",
                data.reserved,
                "reserved",
                "No Reserved Books"
            );

            displayBooks(
                "historySection",
                data.history,
                "history",
                "No Reading History"
            );

            displayBooks(
                "favouritesSection",
                data.favourites,
                "favourites",
                "No Favourite Books"
            );

        } catch (error) {
            console.error("My Library Error:", error);

            document.querySelectorAll(".tab-content").forEach(section => {
                section.innerHTML = `
                    <div class="empty-state">
                        <h3>Unable to Load Books</h3>
                        <p>${safeText(error.message)}</p>
                    </div>
                `;
            });
        }
    }

    loadMyLibrary();

});
