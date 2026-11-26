
const express = require("express");
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("REQUEST RECEIVED:", req.method, req.url);
    next();
});

const db = mysql.createConnection({
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

const promiseDB = db.promise();

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }

    console.log("My Library Database Connected!");
});

app.get("/", (req, res) => {
    res.send("My Library Backend is Running!");
});

// GET ALL BOOKS
app.get("/api/books", (req, res) => {
    db.query("SELECT * FROM books", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
});

// FIND USER BY EMAIL
app.post("/api/user/lookup", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "Email is required"
        });
    }

    db.query(
        "SELECT user_id, full_name, email FROM users WHERE email = ?",
        [email],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    error: "User not found"
                });
            }

            res.json(results[0]);
        }
    );
});

// GET USER'S MY LIBRARY DATA
app.get("/api/my-library/:userId", async (req, res) => {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(400).json({
            error: "Invalid User ID"
        });
    }

    try {
        // ISSUED BOOKS
        const [issued] = await promiseDB.query(
            `SELECT b.*, bi.issue_date, bi.due_date,
                    bi.return_date, bi.status AS issue_status
             FROM book_issues bi
             INNER JOIN books b ON bi.book_id = b.book_id
             WHERE bi.user_id = ? AND bi.return_date IS NULL`,
            [userId]
        );

        // RESERVED BOOKS
        const [reserved] = await promiseDB.query(
            `SELECT b.*, br.reservation_date,
                    br.status AS reservation_status
             FROM book_reservations br
             INNER JOIN books b ON br.book_id = b.book_id
             WHERE br.user_id = ?`,
            [userId]
        );

        // READING HISTORY
        const [history] = await promiseDB.query(
            `SELECT b.*, rh.read_date
             FROM reading_history rh
             INNER JOIN books b ON rh.book_id = b.book_id
             WHERE rh.user_id = ?`,
            [userId]
        );

        // FAVOURITE BOOKS
        const [favourites] = await promiseDB.query(
            `SELECT b.*
             FROM favorites f
             INNER JOIN books b ON f.book_id = b.book_id
             WHERE f.user_id = ?`,
            [userId]
        );

        res.json({
            issued,
            reserved,
            history,
            favourites
        });

    } catch (err) {
        console.log("My Library Error:", err.message);

        res.status(500).json({
            error: err.message
        });
    }
});

app.listen(3001, () => {
    console.log("My Library Server running on http://localhost:3001");
});
