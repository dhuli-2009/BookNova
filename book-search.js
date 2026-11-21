
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const categoryButtons = document.getElementById("categoryButtons");
const bookGrid = document.getElementById("bookGrid");
const bookCount = document.getElementById("bookCount");
const noBooks = document.getElementById("noBooks");
const viewAllBtn = document.getElementById("viewAllBtn");

let allBooks = [];
let selectedCategory = "All Books";

const categoryEmojis = {
    "Food & Drinks": "🍹",
    "Love Story": "❤️",
    "Birds & Nature": "🐦",
    "Psychology": "🧠",
    "Horror": "👻"
};

// Load books from PHP

async function loadBooks() {
    try {
        const response = await fetch("get-books.php");

        if (!response.ok) {
            throw new Error("PHP file not found: " + response.status);
        }

        const result = await response.text();

        console.log("PHP Response:", result);

        const books = JSON.parse(result);

        allBooks = books;
        displayBooks();

    } catch (error) {
        console.error("PHP Connection Error:", error);
        bookCount.textContent = "Books could not be loaded";
        bookGrid.innerHTML = "<p>" + error.message + "</p>";
    }
}

loadBooks();

// Category filter
categoryButtons.addEventListener("click", function(event) {
    const button = event.target.closest("button[data-category]");

    if (!button) return;

    selectedCategory = button.dataset.category;

    document.querySelectorAll(".category-buttons button").forEach(btn => {
        btn.classList.toggle("active", btn === button);
    });

    displayBooks();
});

// Display book cards
function displayBooks() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredBooks = allBooks.filter(book => {
        const categoryMatch =
            selectedCategory === "All Books" ||
            book.category === selectedCategory;

        const searchMatch =
            book.title.toLowerCase().includes(searchText) ||
            book.category.toLowerCase().includes(searchText);

        return categoryMatch && searchMatch;
    });

    bookGrid.innerHTML = "";

    bookCount.textContent =
        `${filteredBooks.length} books shown`;

    noBooks.style.display =
        filteredBooks.length === 0 ? "block" : "none";

    filteredBooks.forEach(book => {
        const card = document.createElement("article");
        card.className = "book-card";

        const cover = document.createElement("div");
        cover.className = "book-cover";

        const emoji = document.createElement("div");
        emoji.className = "book-emoji";
        emoji.textContent = categoryEmojis[book.category] || "📘";

        const coverTitle = document.createElement("h3");
        coverTitle.textContent = book.title;

        const coverCategory = document.createElement("p");
        coverCategory.textContent = book.category;

        cover.append(emoji, coverTitle, coverCategory);

        const details = document.createElement("div");
        details.className = "book-details";

        const title = document.createElement("h3");
        title.textContent = book.title;

        const description = document.createElement("p");
        description.textContent = "By Open PDF for book details";

        const category = document.createElement("p");
        category.textContent = "Category: " + book.category;

        details.append(title, description, category);

        const actions = document.createElement("div");
        actions.className = "book-actions";

        const available = document.createElement("span");
        available.className = "available";
        available.textContent = "✓ Available";

        const actionButtons = document.createElement("div");
        actionButtons.className = "action-buttons";

        const favorite = document.createElement("button");
        favorite.className = "favorite-btn";
        favorite.type = "button";
        favorite.textContent = "♡";
        favorite.title = "Add to favourites";

        const favorites = JSON.parse(
            localStorage.getItem("bookNovaFavorites") || "[]"
        );

        if (favorites.includes(book.pdf)) {
            favorite.classList.add("active");
            favorite.textContent = "♥";
        }

        favorite.addEventListener("click", () => {
            let saved = JSON.parse(
                localStorage.getItem("bookNovaFavorites") || "[]"
            );

            if (saved.includes(book.pdf)) {
                saved = saved.filter(item => item !== book.pdf);
                favorite.classList.remove("active");
                favorite.textContent = "♡";
            } else {
                saved.push(book.pdf);
                favorite.classList.add("active");
                favorite.textContent = "♥";
            }

            localStorage.setItem(
                "bookNovaFavorites",
                JSON.stringify(saved)
            );
        });

        const openPDF = document.createElement("a");
        openPDF.className = "open-pdf";
        openPDF.textContent = "Open PDF";
        openPDF.href = book.pdf;
        openPDF.target = "_blank";
        openPDF.rel = "noopener";

        actionButtons.append(favorite, openPDF);
        actions.append(available, actionButtons);

        card.append(cover, details, actions);
        bookGrid.appendChild(card);
    });
}

// Search
searchInput.addEventListener("input", displayBooks);

// Clear search
clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    displayBooks();
});

// View all books
viewAllBtn.addEventListener("click", () => {
    selectedCategory = "All Books";

    document.querySelectorAll(".category-buttons button").forEach(btn => {
        btn.classList.toggle(
            "active",
            btn.dataset.category === "All Books"
        );
    });

    searchInput.value = "";
    displayBooks();
});

// Start
loadBooks();
