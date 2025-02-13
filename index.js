// const express = require("express");
// const app = express();
// const port = process.env.PORT || 3001;
// const router = require("./router");
// const dotenv = require("dotenv");
// const { v4: uuidv4 } = require("uuid");
// const connectDB = require("./config/database");
// const User = require("./schemas/User");
// const cors = require("cors");
// const cookieParser = require("cookie-parser")
// dotenv.config();
// const jwt = require("jsonwebtoken")

// connectDB();

// app.use(express.json());
// app.use(cookieParser())
// app.use(cors(
//   { origin: "http://localhost:3000", credentials: true }
// ));

// //this gets the token so you have ID for the bouncer to check...
// //where does route link to?
// app.post("/auth", async (req, res) => {
//   console.log(req.body.username);
//   console.log("arrived");
//   const user = await User.findOne({ username: req.body.username });
//   console.log(user);
//   if (!user) {
//     //can use a library for error
//     return res.sendStatus(401);
//   }
//   if (req.body.password !== user.password) {
//     return res.sendStatus(403);
//   }



//   const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
//     expiresIn: "12h",
//   });

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: false,  // Must be false for HTTP
//     sameSite: 'lax',  // Use 'lax' for local HTTP development
//     maxAge: 24 * 60 * 60 * 1000,
//     path: '/',
// });
//   console.log(res.getHeaders())

//   res.json({message: "login ok"})
// });

// // Authorization middleware - this is the 'bouncer' checking your ID before entry!
// // HAS TO BE BEFORE ROUTER STUFF

// app.use(router);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

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

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Middleware setup - order is important!
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Authentication endpoint
app.post("/auth", async (req, res) => {
  try {
    console.log("Auth request for username:", req.body.username);
    
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    if (req.body.password !== user.password) {
      return res.status(403).json({ message: "Invalid password" });
    }
    
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7 days" }
    );
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,  // Set to true in production with HTTPS
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 * 7,
      path: '/',
    });
    
    res.json({ message: "login ok", token });  // Include token in response
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Apply router after auth endpoint
app.use('/', router);  // Consider using a base path like '/api'

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});