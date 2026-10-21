
const searchInput = document.getElementById("searchInput");
const bookCards = document.querySelectorAll(".book-card");
const emptyMessage = document.getElementById("emptyMessage");
const toast = document.getElementById("toast");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.display = "none";
  }, 2600);
}

// Read the Google account details saved by login.html
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

// Search books
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  let count = 0;

  bookCards.forEach(card => {
    const text = card.dataset.search.toLowerCase();
    const matches = text.includes(query);

    card.hidden = !matches;

    if (matches) count++;
  });

  emptyMessage.hidden = count !== 0;
});

// Reserve buttons
document.querySelectorAll(".reserve-btn").forEach(button => {
  button.addEventListener("click", () => {
    showToast(
      button.dataset.book +
      " selected. Database connection is required to save a reservation."
    );
  });
});

// View all books
document.getElementById("viewAllBtn").addEventListener("click", () => {
  searchInput.value = "";
  bookCards.forEach(card => card.hidden = false);
  emptyMessage.hidden = true;
  showToast("Showing all sample books.");
});

// Notification and summary buttons
document.getElementById("notificationBtn").addEventListener("click", () => {
  showToast("You have 1 book due today.");
});

document.getElementById("issuedBtn").addEventListener("click", () => {
  showToast("You currently have 3 issued books.");
});

document.getElementById("dueBtn").addEventListener("click", () => {
  showToast("Please check your book return date.");
});

// Explore shortcuts
document.querySelectorAll(".shortcut").forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "books") {
      searchInput.value = "";
      bookCards.forEach(card => card.hidden = false);
      emptyMessage.hidden = true;
      document.getElementById("bookGrid").scrollIntoView({
        behavior: "smooth"
      });
    } else if (action === "categories") {
      showToast("Categories screen can be connected next.");
    } else if (action === "library") {
      showToast("My Library screen can be connected next.");
    } else if (action === "reserve") {
      showToast("Choose a book and click Reserve.");
      document.getElementById("bookGrid").scrollIntoView({
        behavior: "smooth"
      });
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
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (page === "library") {
      showToast("My Library screen can be connected next.");
    } else if (page === "profile") {
      let user = {};

      try {
        user = JSON.parse(
          sessionStorage.getItem("booknovaUser") || "{}"
        );
      } catch (error) {}

      showToast(
        user.email ? "Signed in as " + user.email : "Profile details unavailable."
      );
    }
  });
});
