import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

// read your API key from environment variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());          // allow your website to call this API
app.use(express.json());  // parse JSON bodies

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",               // small, fast model :contentReference[oaicite:1]{index=1}
      messages: [
        {
          role: "system",
          content:
            "You are a friendly assistant for Ulloa Construction, a residential " +
            "remodeling company in Orange County, CA. Answer questions about " +
            "kitchen and bathroom remodeling, flooring, permits, process, and " +
            "pricing ranges. If you aren't sure, say you'll have the owner follow up."
        },
        { role: "user", content: userMessage }
      ]
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong talking to the AI." });
  }
});

app.listen(port, () => {
  console.log(`Ulloa chat backend listening on port ${port}`);
});
