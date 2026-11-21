
const books = [
    {
        title: "Cognitive Psychology",
        author: "College of the Canyons",
        category: "Psychology",
        file: "Cognitive-Psychology-College-of-the-Canyons.pdf",
        icon: "🧠"
    },
    {
        title: "Creative Vegetarian Cooking",
        author: "Radha Soami Satsang Beas",
        category: "Cooking",
        file: "Creative-Vegetarian-Cooking-Radha-Soami-Satsang-Beas.pdf",
        icon: "🥗"
    },
    {
        title: "Dracula",
        author: "Bram Stoker",
        category: "Horror & Fiction",
        file: "dracula-bram-stoker.pdf",
        icon: "🧛"
    },
    {
        title: "Frankenstein",
        author: "Mary Shelley",
        category: "Horror & Fiction",
        file: "frankenstein-mary-shelley.pdf",
        icon: "⚡"
    },
    {
        title: "Healthy Cookbook",
        author: "University of California, Riverside",
        category: "Cooking",
        file: "Healthy-Cookbook-University-of-California-Riverside.pdf",
        icon: "🍎"
    },
    {
        title: "Let's Go Birding!",
        author: "Ted Floyd",
        category: "Birds & Nature",
        file: "lets-go-birding-ted-floyd.pdf",
        icon: "🐦"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Classic Literature",
        file: "pride-and-prejudice-jane-austen (1).pdf",
        icon: "📜"
    },
    {
        title: "State of the World's Birds",
        author: "BirdLife International",
        category: "Birds & Nature",
        file: "state-of-the-worlds-birds-birdlife-international.pdf",
        icon: "🦜"
    }
];

// HTML elements
const bookList = document.getElementById("bookList");
const emptyMessage = document.getElementById("emptyMessage");

// Read saved data
function getSavedBooks(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

// Save data
function saveBooks(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
}

// Display books
function renderBooks(list, container, message) {
    if (!container) return;

    container.innerHTML = "";

    if (message) {
        message.hidden = list.length !== 0;
    }

    list.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        const icon = document.createElement("div");
        icon.className = "book-icon";
        icon.textContent = book.icon || "📘";

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const category = document.createElement("p");
        category.textContent = "Category: " + book.category;

        const openButton = document.createElement("a");
        openButton.className = "open-btn";
        openButton.textContent = "Open PDF";
        openButton.href = "books/" + encodeURIComponent(book.file);
        openButton.target = "_blank";
        openButton.rel = "noopener noreferrer";

        card.append(icon, title, author, category, openButton);
        container.appendChild(card);
    });
}

// All 8 books from Book Search
renderBooks(books, bookList, emptyMessage);

// Display issued books if these elements exist in HTML
const issuedList = document.getElementById("issuedList");
const issuedEmpty = document.getElementById("issuedEmpty");

renderBooks(
    getSavedBooks("booknova_issued"),
    issuedList,
    issuedEmpty
);

// Return a book
document.addEventListener("click", function (event) {
    if (!event.target.classList.contains("return-book-btn")) {
        return;
    }

    const title = event.target.dataset.title;
    let issued = getSavedBooks("booknova_issued");

    issued = issued.filter(book => book.title !== title);
    saveBooks("booknova_issued", issued);

    let history = getSavedBooks("booknova_history");
    history.push({
        title: title,
        action: "Returned",
        date: new Date().toLocaleDateString()
    });

    saveBooks("booknova_history", history);

    location.reload();
});
