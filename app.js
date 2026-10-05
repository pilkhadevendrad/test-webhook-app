js
import express from "express";

const app = express().use(express.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "vibecode";

// Meta calls this once to verify your webhook URL
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("WEBHOOK VERIFIED");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Meta POSTs real webhook events here
app.post("/webhook", (req, res) => {
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Webhook app is running");
});

app.listen(PORT, () => {
  console.log(`Your service is live on port ${PORT}`);
});
