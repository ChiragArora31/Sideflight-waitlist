// server.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow CORS from your frontend domains
const allowedOrigins = [
  "http://localhost:3000",       // local frontend
  "https://www.sideflight.com", // production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// ✅ Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// API route
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Example email sending logic
    await resend.emails.send({
      from: "waitlist@sideflight.com",
      to: "your@email.com",
      subject: "New Waitlist Signup",
      html: `<p>New signup: ${email}</p>`,
    });

    return res.status(200).json({ success: true, message: "Subscribed!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Health check
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// Start server (only for local dev, Vercel ignores this)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
