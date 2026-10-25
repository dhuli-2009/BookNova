
const searchInput = document.getElementById("searchInput");
const bookGrid = document.getElementById("bookGrid");
const emptyMessage = document.getElementById("emptyMessage");
const categoryFilters = document.getElementById("categoryFilters");
const toast = document.getElementById("toast");

let toastTimer;
let selectedCategory = "All Books";

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.display = "none";
  }, 2600);
}

// Your 8 PDF books
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

// Load Google account details
try {
  const user = JSON.parse(
    sessionStorage.getItem("booknovaUser") || "null"
  );

  if (user) {
    const name = user.name || user.email || "Reader";

    document.getElementById("userName").textContent =
      name.split(" ")[0];

    const avatar = document.getElementById("avatar");

    if (user.photo) {
      const img = document.createElement("img");
      img.src = user.photo;
      img.alt = "Profile photo";
      avatar.replaceChildren(img);
    } else {
      avatar.textContent = name.charAt(0).toUpperCase();
    }
  }
} catch (error) {
  console.error("Could not load user details:", error);
}

// Create category buttons
const categories = [
  "All Books",
  ...new Set(books.map(book => book.category))
];

categories.forEach(category => {
  const button = document.createElement("button");

  button.type = "button";
  button.textContent = category;
  button.dataset.category = category;

  button.style.cssText = `
    padding: 9px 15px;
    border: 1px solid #1565c0;
    border-radius: 20px;
    background: white;
    color: #1565c0;
    cursor: pointer;
    font-size: 13px;
  `;

  button.addEventListener("click", () => {
    selectedCategory = category;
    updateCategoryButtons();
    renderBooks();
  });

  categoryFilters.appendChild(button);
});

// Highlight selected category
function updateCategoryButtons() {
  categoryFilters.querySelectorAll("button").forEach(button => {
    const active = button.dataset.category === selectedCategory;

    button.style.background = active ? "#1565c0" : "white";
    button.style.color = active ? "white" : "#1565c0";
  });
}

// Display book cards
function renderBooks() {
  const query = searchInput.value.toLowerCase().trim();

  const filteredBooks = books.filter(book => {
    const matchesCategory =
      selectedCategory === "All Books" ||
      book.category === selectedCategory;

    const searchableText =
      `${book.title} ${book.author} ${book.category}`.toLowerCase();

    const matchesSearch = searchableText.includes(query);

    return matchesCategory && matchesSearch;
  });

  bookGrid.replaceChildren();

  filteredBooks.forEach(book => {
    const card = document.createElement("article");
    card.className = "book-card";

    const cover = document.createElement("div");

    cover.style.cssText = `
      width: 100%;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
      background: #f1f5f9;
      border-radius: 10px;
      font-size: 48px;
    `;

    const icon = document.createElement("span");
    icon.textContent = book.icon;

    const categoryLabel = document.createElement("span");
    categoryLabel.textContent = book.category;

    categoryLabel.style.cssText = `
      font-size: 12px;
      color: #1565c0;
      font-weight: 600;
      text-align: center;
      padding: 0 8px;
    `;

    cover.append(icon, categoryLabel);

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.className = "author";
    author.textContent = "by " + book.author;

    const category = document.createElement("p");
    category.style.cssText =
      "font-size:12px;color:#64748b;margin:6px 0;";
    category.textContent = "Category: " + book.category;

    const bottom = document.createElement("div");
    bottom.className = "book-bottom";

    const status = document.createElement("span");
    status.className = "available";
    status.textContent = "● Available";

    const openButton = document.createElement("button");
    openButton.className = "reserve-btn";
    openButton.textContent = "Open PDF";
    openButton.type = "button";

    openButton.addEventListener("click", () => {
      const pdfPath = "books/" + encodeURIComponent(book.file)
        .replace(/%2F/g, "/");

      window.open(pdfPath, "_blank", "noopener");
    });

    bottom.append(status, openButton);
    card.append(cover, title, author, category, bottom);
    bookGrid.appendChild(card);
  });

  emptyMessage.hidden = filteredBooks.length !== 0;
}

// Search by book name, author, or category
searchInput.addEventListener("input", renderBooks);

// View all books
document.getElementById("viewAllBtn").addEventListener("click", () => {
  searchInput.value = "";
  selectedCategory = "All Books";
  updateCategoryButtons();
  renderBooks();
  showToast("Showing all 8 PDF books.");
});

// Notification and summary buttons
document.getElementById("notificationBtn").addEventListener("click", () => {
  showToast("Welcome to BookNova!");
});

document.getElementById("issuedBtn").addEventListener("click", () => {
  showToast("Issued-book tracking can be connected to your database.");
});

document.getElementById("dueBtn").addEventListener("click", () => {
  showToast("Return-date tracking can be connected to your database.");
});

// Explore shortcuts
document.querySelectorAll(".shortcut").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "books") {
      searchInput.value = "";
      selectedCategory = "All Books";
      updateCategoryButtons();
      renderBooks();

      bookGrid.scrollIntoView({ behavior: "smooth" });
    } else if (action === "categories") {
      categoryFilters.scrollIntoView({ behavior: "smooth" });
      showToast("Choose a category to filter books.");
    } else if (action === "library") {
      showToast("My Library can be connected to your account later.");
    } else if (action === "reserve") {
      showToast("Click Open PDF to read a book.");
      bookGrid.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Bottom navigation
document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;

    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    if (page === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "search") {
      searchInput.focus();
      searchInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    } else if (page === "library") {
      showToast("My Library can be connected to your account later.");
    } else if (page === "profile") {
      let user = {};

      try {
        user = JSON.parse(
          sessionStorage.getItem("booknovaUser") || "{}"
        );
      } catch (error) {
        console.error(error);
      }

      showToast(
        user.email
          ? "Signed in as " + user.email
          : "Profile details unavailable."
      );
    }
  });
});

// Initial display
updateCategoryButtons();
renderBooks();