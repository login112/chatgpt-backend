const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Route utama
app.get("/", (req, res) => {
    res.send("ChatGPT Backend is Running!");
});

// Route untuk menerima chat dari frontend
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    if (!userMessage) {
        return res.status(400).json({ error: "No message provided" });
    }

    res.json({ reply: `You said: ${userMessage}` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
