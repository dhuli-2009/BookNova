<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Library - BookNova</title>

    <link rel="stylesheet" href="my-library.css">
</head>
<body>

    <!-- Header -->
    <header class="library-header">
        <a href="home.html" class="back-btn">‹</a>
        <h2>My Library</h2>
        <span class="header-space"></span>
    </header>

    <!-- Main Container -->
    <main class="library-container">

        <!-- Library Tabs -->
        <div class="library-tabs">
            <button class="tab-btn active" data-tab="issued">Issued</button>
            <button class="tab-btn" data-tab="reserved">Reserved</button>
            <button class="tab-btn" data-tab="history">History</button>
            <button class="tab-btn" data-tab="favourites">Favourites</button>
        </div>

        <!-- Issued Books -->
        <section class="tab-content active" id="issued">

            <div class="book-list">

                <!-- Book 1 -->
                <div class="library-book-card">

                    <div class="book-cover cover-blue">
                        <span>📘</span>
                    </div>

                    <div class="book-info">
                        <h3>Data Structures</h3>
                        <p class="book-author">Computer Science</p>

                        <p class="date-info">Issued on: 01 May 2026</p>
                        <p class="date-info">Due on: 15 May 2026</p>

                        <span class="status-badge remaining">
                            5 Days Left
                        </span>
                    </div>

                </div>

                <!-- Book 2 -->
                <div class="library-book-card">

                    <div class="book-cover cover-dark">
                        <span>📕</span>
                    </div>

                    <div class="book-info">
                        <h3>Clean Code</h3>
                        <p class="book-author">Programming</p>

                        <p class="date-info">Issued on: 28 Apr 2026</p>
                        <p class="date-info">Due on: 12 May 2026</p>

                        <span class="status-badge remaining">
                            2 Days Left
                        </span>
                    </div>

                </div>

                <!-- Book 3 -->
                <div class="library-book-card">

                    <div class="book-cover cover-green">
                        <span>📗</span>
                    </div>

                    <div class="book-info">
                        <h3>Database System Concepts</h3>
                        <p class="book-author">Database</p>

                        <p class="date-info">Issued on: 25 Apr 2026</p>
                        <p class="date-info">Due on: 10 May 2026</p>

                        <span class="status-badge overdue">
                            Overdue
                        </span>
                    </div>

                </div>

            </div>

        </section>

        <!-- Reserved Books -->
        <section class="tab-content" id="reserved">
            <div class="empty-state">
                <span>📚</span>
                <h3>No Reserved Books</h3>
                <p>Your reserved books will appear here.</p>
            </div>
        </section>

        <!-- History -->
        <section class="tab-content" id="history">
            <div class="empty-state">
                <span>📖</span>
                <h3>No Reading History</h3>
                <p>Your returned books will appear here.</p>
            </div>
        </section>

        <!-- Favourites -->
        <section class="tab-content" id="favourites">
            <div class="empty-state">
                <span>♡</span>
                <h3>No Favourite Books</h3>
                <p>Your favourite books will appear here.</p>
            </div>
        </section>

    </main>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">

        <a href="home.html" class="nav-item">
            <span>⌂</span>
            <small>Home</small>
        </a>

        <a href="book-search.html" class="nav-item">
            <span>⌕</span>
            <small>Search</small>
        </a>

        <a href="my-library.php" class="nav-item active">
            <span>📖</span>
            <small>My Library</small>
        </a>

        <a href="profile.html" class="nav-item">
            <span>♙</span>
            <small>Profile</small>
        </a>

    </nav>

    <script src="my-library.js"></script>

</body>
</html>