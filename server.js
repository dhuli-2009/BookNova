const fs=require("fs");
const path=require("path");
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
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
    ca: fs.readFileSync("/etc/secrets/ca.pem"),
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
app.post("/api/register", async (req, res) => {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users
        (full_name, email, password_hash, phone, role, created_at)
        VALUES (?, ?, ?, ?, 'user', NOW())`;

        db.query(
            sql,
            [name, email, hashedPassword, mobile],
            (err, result) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({
                            message: "Email already registered"
                        });
                    }

                    return res.status(500).json({
                        message: "Registration failed"
                    });
                }

                res.status(201).json({
                    message: "Registration successful"
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});
const PORT = process.env.PORT||3000;

app.post("/api/login", async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, async (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Login failed"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                user_id: user.user_id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });
    });
});




app.listen(PORT, () => {
    console.log(`BookNova server running on http://localhost:${PORT}`);
});