
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const booksFolder = path.join(__dirname, "books");

const categoryFolders = {
    "Brids&nature books": "Birds & Nature",
    "food and drinks books": "Food & Drinks",
    "Horror strory books": "Horror Story",
    "love story books": "Love Story",
    "pschology books": "Psychology"
};

function getCategory(folder, filename) {
    if (categoryFolders[folder]) {
        return categoryFolders[folder];
    }

    const name = filename.toLowerCase();

    if (name.includes("bird") || name.includes("ecology") ||
        name.includes("botany") || name.includes("environment")) {
        return "Birds & Nature";
    }

    if (name.includes("cook") || name.includes("food") ||
        name.includes("coffee") || name.includes("vegetarian") ||
        name.includes("chocolate")) {
        return "Food & Drinks";
    }

    if (name.includes("dracula") || name.includes("frankenstein") ||
        name.includes("horror")) {
        return "Horror Story";
    }

    if (name.includes("love") || name.includes("romance") ||
        name.includes("jane-eyre") || name.includes("pride-and-prejudice") ||
        name.includes("romeo")) {
        return "Love Story";
    }

    return "Psychology";
}

function getTitle(filename) {
    return path.basename(filename, ".pdf")
        .replace(/\s*\(\d+\)/g, "")
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, char => char.toUpperCase());
}

async function main() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            ca: fs.readFileSync(
                path.join(__dirname, "certificates", "ca.pem")
            )
        }
    });

    try {
        const files = [];

        function scan(folder) {
            for (const item of fs.readdirSync(folder, {
                withFileTypes: true
            })) {
                const fullPath = path.join(folder, item.name);

                if (item.isDirectory()) {
                    scan(fullPath);
                } else if (item.isFile() &&
                           item.name.toLowerCase().endsWith(".pdf")) {
                    files.push(fullPath);
                }
            }
        }

        scan(booksFolder);

        let added = 0;
        let skipped = 0;

        for (const file of files) {
            const relativePath = path.relative(__dirname, file)
                .split(path.sep).join("/");

            const folder = path.basename(path.dirname(file));
            const filename = path.basename(file);

            const title = getTitle(filename);
            const category = getCategory(folder, filename);

            const [existing] = await db.execute(
                "SELECT book_id FROM books WHERE pdf_path = ? LIMIT 1",
                [relativePath]
            );

            if (existing.length > 0) {
                skipped++;
                continue;
            }

            await db.execute(
                `INSERT INTO books (title, author, category, pdf_path)
                 VALUES (?, ?, ?, ?)`,
                [title, "Not specified", category, relativePath]
            );

            added++;
        }

        console.log("Total PDF files:", files.length);
        console.log("Books added:", added);
        console.log("Already present:", skipped);

        const [rows] = await db.execute(
            "SELECT COUNT(*) AS total FROM books"
        );

        console.log("Total books in database:", rows[0].total);

    } finally {
        await db.end();
    }
}

main().catch(error => {
    console.error("Import failed:", error.message);
});
