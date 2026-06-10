import express from "express";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(join(__dirname, "public")));

// ─── AI proxy endpoint ───────────────────────────────────────
// The browser POSTs { prompt: "..." } here.
// The server adds the API key and forwards to Groq.
// The API key never leaves the server.
// ─────────────────────────────────────────────────────────────
app.post("/api/suggest", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "GROQ_API_KEY is not set in .env" });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "meta-llama/llama-4-scout-17b-16e-instruct",
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await groqRes.json();

    if (data.error) {
      return res.status(502).json({ error: data.error.message || "Groq API error" });
    }

    const text = data.choices?.[0]?.message?.content || "";
    res.json({ text });

  } catch (err) {
    console.error("Groq request failed:", err);
    res.status(500).json({ error: "Server error — check your API key and network." });
  }
});

// ─── Catch-all: serve index.html for any unknown route ───────
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`PantryChef running at http://localhost:${PORT}`);
});
