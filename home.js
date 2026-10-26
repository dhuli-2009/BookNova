const searchInput = document.getElementById("searchInput");
const bookGrid = document.getElementById("bookGrid");
const emptyMessage = document.getElementById("emptyMessage");
const categoryFilters = document.getElementById("categoryFilters");
const toast = document.getElementById("toast");

let toastTimer;
let selectedCategory = "All Books";

// PDF.js setup
if (window.pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

function showToast(message) {
  if (!toast) return;

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

// Create a path to a PDF in the books folder
function getPdfPath(fileName) {
  return "books/" + encodeURIComponent(fileName)
    .replace(/%2F/g, "/");
}

// Render the first page of a PDF inside its book cover
async function loadPdfCover(canvas, book, fallback) {
  if (!window.pdfjsLib) {
    fallback.style.display = "flex";
    return;
  }

  try {
    const pdfPath = getPdfPath(book.file);
    const pdf = await pdfjsLib.getDocument(pdfPath).promise;
    const page = await pdf.getPage(1);

    const coverWidth = 240;
    const coverHeight = 180;
    const originalViewport = page.getViewport({ scale: 1 });

    const scale = Math.min(
      coverWidth / originalViewport.width,
      coverHeight / originalViewport.height
    );

    const viewport = page.getViewport({ scale });

    const outputScale = window.devicePixelRatio || 1;

    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);

    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    canvas.style.display = "block";

    const context = canvas.getContext("2d");

    await page.render({
      canvasContext: context,
      viewport: viewport,
      transform: outputScale !== 1
        ? [outputScale, 0, 0, outputScale, 0, 0]
        : null
    }).promise;

    fallback.style.display = "none";
  } catch (error) {
    console.error("Could not load PDF cover:", book.title, error);
    canvas.style.display = "none";
    fallback.style.display = "flex";
  }
}


 // Load the logged-in user's details
try {
  const googleUser = JSON.parse(
    sessionStorage.getItem("booknovaUser") || "null"
  );

  const emailLoginName = sessionStorage.getItem("readerName");

  const name =
    (googleUser && (googleUser.name || googleUser.email)) ||
    emailLoginName ||
    "Reader";

  const firstName = name.trim().split(/\s+/)[0] || "Reader";

  const userName = document.getElementById("userName");
  const avatar = document.getElementById("avatar");

  if (userName) {
    userName.textContent = firstName;
  }

  if (avatar) {
    if (googleUser && googleUser.photo) {
      const img = document.createElement("img");
      img.src = googleUser.photo;
      img.alt = "Profile photo";
      avatar.replaceChildren(img);
    } else {
      avatar.textContent = firstName.charAt(0).toUpperCase();
    }
  }
} catch (error) {
  console.error("Could not load user details:", error);

  const userName = document.getElementById("userName");
  const avatar = document.getElementById("avatar");

  if (userName) userName.textContent = "Reader";
  if (avatar) avatar.textContent = "R";
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

    // Book cover container
    const cover = document.createElement("div");

    cover.className = "pdf-cover";
    cover.style.cssText = `
      width: 100%;
      height: 190px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: #f1f5f9;
      border-radius: 10px;
      padding: 5px;
    `;

    // Canvas displays the actual first page of the PDF
    const canvas = document.createElement("canvas");
    canvas.style.cssText = `
      display: none;
      max-width: 100%;
      max-height: 180px;
      object-fit: contain;
    `;

    // Fallback shown if the PDF cover cannot be loaded
    const fallback = document.createElement("div");
    fallback.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
      font-size: 42px;
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

    fallback.append(icon, categoryLabel);
    cover.append(canvas, fallback);

    // Load the PDF cover without blocking the other book cards
    loadPdfCover(canvas, book, fallback);

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
      const pdfPath = getPdfPath(book.file);
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
