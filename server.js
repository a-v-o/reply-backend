const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

app.post("/generate-reply", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim() === "") {
      return res.status(400).json({
        error: "Invalid input",
        message: "Please provide a non-empty text field",
      });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return res.status(500).json({
        error: "Configuration error",
        message: "Google API key is not configured",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // Create the prompt for generating a tweet reply
    const prompt = `You are a witty and engaging Twitter/X user. Someone tweeted: "${text.trim()}"

Generate a clever, concise, and engaging tweet reply (maximum 280 characters) that:
- Responds directly to their tweet
- Is witty, helpful, or adds value to the conversation
- Maintains a friendly tone
- Does not include hashtags or @mentions

Reply with only the tweet text, nothing else.`;

    // Generate the reply
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedReply = response.text();

    res.status(200).json({
      success: true,
      originalText: text,
      reply: generatedReply.trim(),
    });
  } catch (error) {
    console.error("Error generating reply:", error);
    res.status(500).json({
      error: "Failed to generate reply",
      message: error.message,
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
