const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || "GANTI_DENGAN_API_KEY_OPENAI";

app.use(cors());
app.use(express.json());

// Route utama untuk cek apakah backend berjalan
app.get("/", (req, res) => {
    res.send("ChatGPT Backend is Running!");
});

// Route untuk menerima pesan dari frontend & menghubungkan ke OpenAI
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userMessage }]
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });

    } catch (error) {
        res.status(500).json({ error: "Error processing request" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
