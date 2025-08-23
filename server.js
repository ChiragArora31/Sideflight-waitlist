import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// CORS middleware - MUST be first
app.use(cors({
  origin: true, // Allow all origins for now (you can restrict later)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.static("public"));

const resend = new Resend(process.env.RESEND_API_KEY);

// Subscribe route
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    console.log("Attempting to send email to:", email);
    await resend.emails.send({
      from: "welcome@sideflight.com",
      to: [email],
      subject: "Welcome to Sideflight – Your journey starts now! ✈️",
      html: `<h1>You're on board!</h1><p>Welcome to the Sideflight waitlist — we're thrilled to have you. 🎉</p>
      <p>We're building a way to turn travel time into growth time by connecting learners with industry experts, even mid-flight. Mentorship, career guidance, or a spark of inspiration — it's all about to take off.</p>
      <p>As an early joiner, you'll get:</p>
      <p>✨ Early access before public launch<br>
      ✨ Priority booking for expert sessions<br>
      ✨ Insider updates as we taxi to takeoff</p>
      <p>We'll be in touch soon with next steps. Until then, buckle up — exciting things ahead!</p>
      <p>— The Sideflight Crew</p>
      <hr>
      <p><strong>Let's stay connected!</strong> 🚀 Follow us for updates, sneak peeks, and launch news:</p>
      <p>
      <a href="https://www.linkedin.com/package.json
      <a href="https://x.com/sideflightapp" target="_blank">X (Twitter)</a> | 
      <a href="https://www.instagram.com/sideflightapp" target="_blank">Instagram</a>
      </p>`,
    });

    res.json({ message: "Welcome email sent successfully!" });
    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

// Export for Vercel (remove app.listen for production)
export default app;

// Only listen locally if not in production
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
}
