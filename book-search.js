
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

const bookGrid = document.getElementById("bookGrid");
const searchInput = document.getElementById("searchInput");
const noBooks = document.getElementById("noBooks");

function renderBooks(bookList) {
    bookGrid.innerHTML = "";

    noBooks.hidden = bookList.length !== 0;

    bookList.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        const icon = document.createElement("div");
        icon.className = "book-icon";
        icon.textContent = book.icon;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "Author: " + book.author;

        const category = document.createElement("span");
        category.className = "category";
        category.textContent = book.category;

        const openButton = document.createElement("a");
        openButton.className = "open-btn";
        openButton.textContent = "Open PDF";
        openButton.href = "books/" + encodeURIComponent(book.file);
        openButton.target = "_blank";
        openButton.rel = "noopener noreferrer";

        card.append(icon, title, author, category, openButton);
        bookGrid.appendChild(card);
    });
}

searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );

    renderBooks(filteredBooks);
});

renderBooks(books);
