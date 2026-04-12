import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log(`\n💬 User asked: ${message.substring(0, 50)}...`);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Groq Error:", data);
      return res.status(response.status).json({ error: data.error?.message });
    }

    const reply = data.choices[0].message.content;
    console.log(`✅ Success! Response length: ${reply.length} characters.`);
    
    res.json({ reply: reply });

  } catch (error) {
    console.error("❌ Fetch Error:", error.message);
    res.status(500).json({ error: "Server failed to reach AI" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));