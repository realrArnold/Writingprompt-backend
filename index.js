const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const router = require("./router");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const User = require("./schemas/User");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const CRON_SECRET = process.env.CRON_SECRET;

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Middleware setup - order is important!
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",

  "https://writingprompt.vercel.app",
  "https://writingapptestcron.vercel.app",
  "https://writing-prompt-frontend.vercel.app"

];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Preflight request handling
app.options('*', cors());

// Auth endpoint
app.post("/auth", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("USERNAME:", req.body.username);
    console.log("PASSWORD (from req):", JSON.stringify(req.body.password));

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log("PASSWORD (from DB):", JSON.stringify(user.password));
    console.log("EQUAL?", req.body.password === user.password);

    if (req.body.password !== user.password) {
      return res.status(403).json({ message: "Invalid password" });
    }

    // existing JWT/cookie logic below...


    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7 days" }
    );


// // old code, use it for local testing
// res.cookie("token", token, {
//   httpOnly: true,
//   secure: false,  // Set to true in production with HTTPS
//   sameSite: 'lax',
//   maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
//   path: '/',
// });

    // Set the token as a cookie. New code, use when deploying to production (live)
    res.cookie("token", 
               token, { httpOnly: true, secure: process.env.NODE_ENV === "production", // Secure in production
                       sameSite: 'none', // Required for cross-origin 
                       cookiesmaxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
                       path: '/', 
                      });


    // Send response with the token and user info (e.g., user ID)
    res.json({
      message: "login ok",
      token,
      user: {
        id: user._id, // Include user ID
        username: user.username, // Optionally include username
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Apply router after auth endpoint
app.use("/", router); // Consider using a base path like '/api'

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

