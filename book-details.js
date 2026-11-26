
const params = new URLSearchParams(window.location.search);

const book = {
    title: params.get("title") || "Dracula",
    author: params.get("author") || "Bram Stoker",
    category: params.get("category") || "Horror & Fiction",
    icon: params.get("icon") || "🧛",
    file: params.get("file") || ""
};

// Display book details

document.getElementById("bookTitle").textContent = book.title;

document.getElementById("bookAuthor").textContent =
    "By " + book.author;

document.getElementById("bookCategory").textContent =
    book.category;

document.getElementById("bookIcon").textContent =
    book.icon;


// Issue Book

function issueBook() {

    let issuedBooks =
        JSON.parse(localStorage.getItem("issuedBooks")) || [];

    const alreadyIssued = issuedBooks.some(
        item => item.title === book.title
    );

    if (alreadyIssued) {
        alert("This book is already in your library!");
        return;
    }

    issuedBooks.push(book);

    localStorage.setItem(
        "issuedBooks",
        JSON.stringify(issuedBooks)
    );

    alert("Book issued successfully! 📚");
}


// Add Favourite

function addFavourite() {

    let favouriteBooks =
        JSON.parse(localStorage.getItem("favouriteBooks")) || [];

    const alreadyFavourite = favouriteBooks.some(
        item => item.title === book.title
    );

    if (alreadyFavourite) {
        alert("This book is already in your favourites!");
        return;
    }

    favouriteBooks.push(book);

    localStorage.setItem(
        "favouriteBooks",
        JSON.stringify(favouriteBooks)
    );

    alert("Added to favourites! ❤️");
}
