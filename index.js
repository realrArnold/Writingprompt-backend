const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const router = require("./router");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("./config/database");
const User = require("./schemas/User");
const cors = require("cors");
const cookieParser = require("cookie-parser")
dotenv.config();
const jwt = require("jsonwebtoken")

connectDB();

app.use(express.json());
app.use(cookieParser())
app.use(cors(
  { origin: "http://localhost:3000", credentials: true }
));

//this gets the token so you have ID for the bouncer to check...
//where does route link to?
app.post("/auth", async (req, res) => {
  console.log(req.body.username);
  console.log("arrived");
  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (!user) {
    //can use a library for error
    return res.sendStatus(401);
  }
  if (req.body.password !== user.password) {
    return res.sendStatus(403);
  }



  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1 week",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,  // Must be false for HTTP
    sameSite: 'lax',  // Use 'lax' for local HTTP development
    maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
    path: '/',
});
  console.log(res.getHeaders())

  res.json({message: "login ok"})
});

// Authorization middleware - this is the 'bouncer' checking your ID before entry!
// HAS TO BE BEFORE ROUTER STUFF

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
