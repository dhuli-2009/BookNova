// ========================================
// BOOKNOVA - HOME DASHBOARD
// ========================================

const $ = id => document.getElementById(id);

const searchInput = $("searchInput");
const bookGrid = $("bookGrid");
const categoryFilters = $("categoryFilters");
const emptyMessage = $("emptyMessage");
const toast = $("toast");
const pdfUpload = $("pdfUpload");

const CATS = {
  "Food & Drinks": "🍹",
  "Psychology": "🧠",
  "Love Story": "❤️",
  "Horror": "👻",
  "Birds & Nature": "🐦"
};

const categories = [
  "All Books",
  ...Object.keys(CATS)
];

let selectedCategory = "All Books";
let mode = "all";
let uploadedBooks = [];
let favorites = [];
let toastTimer;

// ========================================
// TOAST MESSAGE
// ========================================

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.style.display = "none";
  }, 2600);
}

// ========================================
// FAVOURITES STORAGE
// ========================================

function loadFavorites() {
  try {
    favorites = JSON.parse(
      localStorage.getItem("booknovaFavorites") || "[]"
    );
  } catch {
    favorites = [];
  }
}

function saveFavorites() {
  localStorage.setItem(
    "booknovaFavorites",
    JSON.stringify(favorites)
  );
}

// ========================================
// GOOGLE DRIVE BOOKS
// 49 UNIQUE PDF BOOKS
// ========================================

const rawBooks = [

  // FOOD & DRINKS

  ["1Fpf60Hp19F8sZWZxf7rsHDvbzeUWdztR", "Food & Drinks", 1],
  ["1NPp34SldgYYqLZ7zU1y6ssRgiMx2v4Eg", "Food & Drinks", 2],
  ["169QrK29BpvK3tSwQ0WtFiPZmR4A61hTN", "Food & Drinks", 3],
  ["1ri27PYI2bnXJK7Zbq0oRmkvNnWT_ksjJ", "Food & Drinks", 4],
  ["1nEO1gSZMqNYq-MgAhTOS6WO2YCZROmHX", "Food & Drinks", 5],
  ["1S0lVg-ojIg770tDX7Ub-jbtdwexYwO2B", "Food & Drinks", 6],
  ["18F2lYCLQTpHfeuWhXdJOCsE6tKb5QNtF", "Food & Drinks", 7],
  ["1UUPRGTttW_CaukvBiOdqRBacnqmpnweM", "Food & Drinks", 8],
  ["1y_vCARoBnfZzkhDDrcaqaWn-J-t0trPx", "Food & Drinks", 9],
  ["15f_O46JAmb4Vec4KgfGi8WO1q8TzK2ej", "Food & Drinks", 10],

  // PSYCHOLOGY

  ["1IQm2VpxkpozWH5n5dYFPER-xd4ZSNEOk", "Psychology", 1],
  ["1TgzevIbuUYAcrck-o3mfJuDwSbcC_5Vo", "Psychology", 2],
  ["1R3Mi1zU42xmAj3MTf1-ML-kUgQ9QsAok", "Psychology", 3],
  ["1gM-Q8SAeW4OsqTsB_bRb06UbRs4b6JEw", "Psychology", 4],
  ["1Y0gSPt3KsqW4l_FgzSrCfrfLhKXeYjkH", "Psychology", 5],
  ["1Ru5UEGvx5IvZPgEis57WGCQCMlMDasWl", "Psychology", 6],
  ["197ymv9l4ZHRNF1Xuxc5JGBUNF5NgItcZ", "Psychology", 7],
  ["1wjEDkszF_nkWSb4dkpGz7SberxMt6TE4", "Psychology", 8],
  ["1U42oCDab4SrFMxkUxrbUs9Ty50Zqmupv", "Psychology", 9],
  ["1uv_29zIm9N4kAq_MyNUyGlNCIiljHlWn", "Psychology", 10],

  // LOVE STORY

  ["1Eny65PxkjCvjwPW7XMGltckvASHuw7Gn", "Love Story", 1],
  ["1i_1SS7LmcgNF5ZaVDk4KaDn-6LJbACs2", "Love Story", 2],
  ["1k9tnB65AypaW6kHlkRh8JpWGfubZy0DM", "Love Story", 3],
  ["1MpOUi3ZXp4ayLQd3uFbeU07eiOKRasBD", "Love Story", 4],
  ["1Dsd-EnUvi7tmIqiXDlg4xe-OsE5n6Hag", "Love Story", 5],
  ["1kmZ-DW82RL4f-AP9votM6HGS3jecxp8n", "Love Story", 6],
  ["1hrTAfj9luwXyZB9FtQ3Gf1JcDXG98C5q", "Love Story", 7],
  ["1aHanMhEd9HSjbo8cxW3j67Z03iiO0bYP", "Love Story", 8],
  ["1oubxYkUvRc6O1weS1lbcgT_4-0FBD9h0", "Love Story", 9],

  // HORROR

  ["1MRZEAneIwyVy_GBkI1gPtmsftsnvBhl1", "Horror", 1],
  ["10ou6cIoHULMrET9T3LTtIdZ835iCEFw4", "Horror", 2],
  ["1dM4PNSN1eCTtHAcIY7HVpTPhYw2mgpgd", "Horror", 3],
  ["11CDbVxfstgHe1muHLa69NHboyiMHRM5o", "Horror", 4],
  ["1VSF9AN5LwoAYJvuGcgLb20J7SH2pdAla", "Horror", 5],
  ["1QYyilwkZR1yx6arhaFcdMpXbp5lMwOVi", "Horror", 6],
  ["1WSKSSJC8Gz-SFZqwEXJshmDkPu09FQsl", "Horror", 7],
  ["1w7fuvNAOpWKy7G8vnWSqt11IxKHK0Ukq", "Horror", 8],
  ["1LYHD8TTOQqJRXZPjJO8ZV1r3clP_42Xd", "Horror", 9],
  ["1BynkWD-Ed-G9l2eduUn14_4ApunR1V-t", "Horror", 10],

  // BIRDS & NATURE

  ["1AkBCgT35No8XiKDg7JeSKnP3e6E-AC18", "Birds & Nature", 1],
  ["1yxe6xo-h_wVAlh3uGXD_GNMymKRDhehT", "Birds & Nature", 2],
  ["1liDR8LKVYNQeTh4Jj61_icx3g-siRYPq", "Birds & Nature", 3],
  ["1BTVZEx9749cxNpxfS55zBU6De77VofB8", "Birds & Nature", 4],
  ["1c6dPnQHSHrGbVQ-TKrH3OeS3jvfz2Y-4", "Birds & Nature", 5],
  ["1gwst9E1pG7AtmxmWKrakMqRoXABkX7Qp", "Birds & Nature", 6],
  ["1RUzskw1zAMVe6duE-AffeuaAwX4W0Kgw", "Birds & Nature", 7],
  ["1Gd3BexBdl0nVlY-_nIoNeIyzOW-kQvPa", "Birds & Nature", 8],
  ["10Ips0tW79MwY3X5HcfGaF4tvDwmwKXH8", "Birds & Nature", 9],
  ["1ZlnaYJw3w1ergogWnG-VGfrtAdlE6V4r", "Birds & Nature", 10]

];

// Create book objects

const driveBooks = rawBooks.map(([driveId, category, number]) => ({
  id: "drive-" + driveId,
  driveId: driveId,
  category: category,
  title: `${category} Book ${String(number).padStart(2, "0")}`,
  author: "Open PDF for book details",
  icon: CATS[category],
  source: "drive"
}));

// ========================================
// FIREBASE GOOGLE LOGIN USER DETAILS
// DO NOT CHANGE YOUR LOGIN CODE
// ========================================

try {

  const user = JSON.parse(
    sessionStorage.getItem("booknovaUser") || "null"
  );

  if (user) {

    const name = user.name || user.email || "Reader";

    $("userName").textContent = name.split(" ")[0];

    if (user.photo) {

      const img = document.createElement("img");

      img.src = user.photo;
      img.alt = "Profile photo";

      $("avatar").replaceChildren(img);

    } else {

      $("avatar").textContent =
        name.charAt(0).toUpperCase();

    }
  }

} catch (error) {

  console.warn("Unable to load user details:", error);

}

// ========================================
// INDEXED DB STORAGE
// ========================================

const DB = "BookNovaPDFs";
const STORE = "books";

function dbOpen() {

  return new Promise((resolve, reject) => {

    const request = indexedDB.open(DB, 1);

    request.onupgradeneeded = () => {

      if (!request.result.objectStoreNames.contains(STORE)) {

        request.result.createObjectStore(STORE, {
          keyPath: "id"
        });

      }
    };

    request.onsuccess = () => resolve(request.result);

    request.onerror = () => reject(request.error);

  });

}

async function dbGetAll() {

  const db = await dbOpen();

  return new Promise((resolve, reject) => {

    const request = db.transaction(STORE)
      .objectStore(STORE)
      .getAll();

    request.onsuccess = () => {
      db.close();
      resolve(request.result || []);
    };

    request.onerror = () => {
      db.close();
      reject(request.error);
    };

  });

}

async function dbPut(book) {

  const db = await dbOpen();

  return new Promise((resolve, reject) => {

    const transaction = db.transaction(STORE, "readwrite");

    transaction.objectStore(STORE).put(book);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };

  });

}

async function dbDelete(id) {

  const db = await dbOpen();

  return new Promise((resolve, reject) => {

    const transaction = db.transaction(STORE, "readwrite");

    transaction.objectStore(STORE).delete(id);

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };

  });

}

// ========================================
// ALL BOOKS
// ========================================

function allBooks() {

  return [...driveBooks, ...uploadedBooks];

}

// ========================================
// BOOK COVER
// ========================================

function coverFor(book) {

  const wrap = document.createElement("div");

  wrap.className = "cover-wrap";

  const fallback = document.createElement("div");

  fallback.className = "cover-fallback";

  const emoji = document.createElement("span");

  emoji.className = "cover-emoji";
  emoji.textContent = book.icon || "📘";

  const title = document.createElement("strong");

  title.textContent = book.title;

  const category = document.createElement("small");

  category.textContent = book.category;

  fallback.append(emoji, title, category);

  wrap.append(fallback);

  // Google Drive book cover thumbnail

  if (book.driveId) {

    const img = document.createElement("img");

    img.alt = book.title + " cover";
    img.loading = "lazy";

    img.src =
      `https://drive.google.com/thumbnail?id=${encodeURIComponent(book.driveId)}&sz=w500`;

    img.onerror = () => img.remove();

    wrap.append(img);

  }

  return wrap;

}

// ========================================
// OPEN PDF
// ========================================

function openBook(book) {

  if (book.fileBlob) {

    const url = URL.createObjectURL(book.fileBlob);

    const newWindow = window.open(url, "_blank");

    if (!newWindow) {

      showToast("Please allow pop-ups to open the PDF.");

    }

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);

  } else if (book.driveId) {

    window.open(
      `https://drive.google.com/file/d/${encodeURIComponent(book.driveId)}/preview`,
      "_blank",
      "noopener,noreferrer"
    );

  }

}

// ========================================
// FAVOURITE BOOKS
// ========================================

function toggleFavorite(book) {

  if (favorites.includes(book.id)) {

    favorites = favorites.filter(id => id !== book.id);

  } else {

    favorites.push(book.id);

  }

  saveFavorites();

  renderBooks();

  showToast(
    favorites.includes(book.id)
      ? "Added to favourites."
      : "Removed from favourites."
  );

}

// ========================================
// CATEGORY FILTERS
// ========================================

function renderCategories() {

  categoryFilters.replaceChildren();

  categories.forEach(category => {

    const button = document.createElement("button");

    button.type = "button";

    button.className =
      "category-chip" +
      (selectedCategory === category ? " active" : "");

    button.textContent = category;

    button.onclick = () => {

      selectedCategory = category;
      mode = "all";

      renderCategories();
      renderBooks();

    };

    categoryFilters.append(button);

  });

}

// ========================================
// DISPLAY BOOKS
// ========================================

function renderBooks() {

  let list = allBooks();

  const query = searchInput.value.toLowerCase().trim();

  if (mode === "favorites") {

    $("booksHeading").textContent = "My Favourites";

    list = list.filter(book =>
      favorites.includes(book.id)
    );

  } else {

    $("booksHeading").textContent =
      selectedCategory === "All Books"
        ? "Recommended For You"
        : selectedCategory;

    if (selectedCategory !== "All Books") {

      list = list.filter(book =>
        book.category === selectedCategory
      );

    }

  }

  // Search books

  list = list.filter(book => {

    const text =
      `${book.title} ${book.author || ""} ${book.category}`;

    return text.toLowerCase().includes(query);

  });

  bookGrid.replaceChildren();

  // Create cards

  list.forEach(book => {

    const card = document.createElement("article");

    card.className = "book-card";

    card.append(coverFor(book));

    const title = document.createElement("h3");

    title.textContent = book.title;

    const author = document.createElement("p");

    author.className = "author";
    author.textContent = "by " + (book.author || "Unknown");

    const category = document.createElement("p");

    category.className = "book-category";
    category.textContent = "Category: " + book.category;

    const bottom = document.createElement("div");

    bottom.className = "book-bottom";

    const status = document.createElement("span");

    status.className = "available";
    status.textContent = "● Available";

    const actions = document.createElement("div");

    actions.className = "book-actions";

    // Favourite button

    const fav = document.createElement("button");

    fav.type = "button";

    fav.className =
      "favorite-btn" +
      (favorites.includes(book.id) ? " is-favorite" : "");

    fav.textContent =
      favorites.includes(book.id) ? "♥" : "♡";

    fav.title = "Favourite";

    fav.onclick = () => toggleFavorite(book);

    // Open PDF button

    const open = document.createElement("button");

    open.type = "button";
    open.className = "reserve-btn";
    open.textContent = "Open PDF";

    open.onclick = () => openBook(book);

    actions.append(fav, open);

    // Delete uploaded books

    if (book.source === "upload") {

      const del = document.createElement("button");

      del.type = "button";
      del.className = "delete-btn";
      del.textContent = "Delete";

      del.onclick = async () => {

        if (confirm(`Delete ${book.title}?`)) {

          await dbDelete(book.id);

          uploadedBooks = uploadedBooks.filter(
            item => item.id !== book.id
          );

          favorites = favorites.filter(
            id => id !== book.id
          );

          saveFavorites();

          renderBooks();

          showToast("Book deleted.");

        }

      };

      actions.append(del);

    }

    bottom.append(status, actions);

    card.append(
      title,
      author,
      category,
      bottom
    );

    bookGrid.append(card);

  });

  emptyMessage.hidden = list.length !== 0;

  $("bookCountLabel").textContent =
    `${list.length} book${list.length === 1 ? "" : "s"} shown`;

}

// TOP SEARCH BAR REDIRECT

const topSearchBox = document.querySelector(".search-box");

if (topSearchBox) {
  topSearchBox.addEventListener("click", () => {
    window.location.href = "./book-search.html";
  });
}

// ========================================
// VIEW ALL BOOKS
// ========================================

$("viewAllBtn").onclick = () => {

  // Show all 49 Google Drive books
  selectedCategory = "All Books";
  mode = "all";

  // Clear search text
  searchInput.value = "";

  // Show all categories and books
  renderCategories();
  renderBooks();

  // Scroll to books section
  $("booksSection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  showToast("Showing all 49 books!");

};

// ========================================
// NOTIFICATIONS
// ========================================

$("notificationBtn").onclick = () => {

  showToast("Welcome to BookNova!");

};

// ========================================
// ISSUED BOOKS
// ========================================

$("issuedBtn").onclick = () => {

  showToast(
    "Issued-book tracking is not connected to a database yet."
  );

};

// ========================================
// DUE BOOKS
// ========================================

$("dueBtn").onclick = () => {

  showToast(
    "Due-date tracking is not connected to a database yet."
  );

};

// ========================================
// EXPLORE LIBRARY SHORTCUTS
// ========================================

document.querySelectorAll(".shortcut").forEach(button => {

  button.onclick = () => {

    const action = button.dataset.action;

    if (action === "books") {

      mode = "all";
      selectedCategory = "All Books";
      searchInput.value = "";

      renderCategories();
      renderBooks();

      $("booksSection").scrollIntoView({
        behavior: "smooth"
      });

    }

    if (action === "categories") {

      categoryFilters.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      showToast("Choose a category.");

    }

    if (action === "library") {

      mode = "favorites";
      searchInput.value = "";

      renderBooks();

      $("booksSection").scrollIntoView({
        behavior: "smooth"
      });

      showToast("Showing favourite books.");

    }

    if (action === "reserve") {

      showToast(
        "Reservation needs a library database. You can open PDFs now."
      );

      $("booksSection").scrollIntoView({
        behavior: "smooth"
      });

    }

  };

});

// ========================================
// BOTTOM NAVIGATION
// ========================================
// ========================================
// BOTTOM NAVIGATION
// ========================================

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => {

    const page = button.dataset.page;

    if (page === "search") {
      window.location.href = "./book-search.html";
      return;
    }

    if (page === "home") {
      window.location.href = "./home.html";
      return;
    }

    if (page === "library") { 
      mode = "favorites";
      searchInput.value = "";
      renderBooks();
      $("booksSection").scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (page === "profile") {
      showToast("Profile button clicked.");
      return;
    }

  });
});

// ========================================
// INITIALIZE DASHBOARD
// ========================================

(async function initializeDashboard() {

  loadFavorites();

  renderCategories();

  try {

    uploadedBooks = await dbGetAll();

  } catch (error) {

    console.warn(error);

    showToast(
      "Browser storage unavailable; Drive PDFs can still open."
    );

  }

  renderBooks();

})();