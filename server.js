const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("BookNova Backend is Running!");
});

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true
    }
});
db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
        return;
    }
    console.log("MySQL Database Connected!");
});

app.get("/api/books", (req, res) => {
    db.query("SELECT * FROM books", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Unable to fetch books" });
        }
        res.json(results);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`BookNova server running on http://localhost:${PORT}`);
});