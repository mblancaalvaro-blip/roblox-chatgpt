const express = require("express");
const OpenAI = require("openai");

const app = express();

app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const response = await client.responses.create({
      model: "gpt-5",
      input: req.body.message
    });

    res.json({
      reply: response.output_text
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al conectar con OpenAI"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Servidor ChatGPT funcionando");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
