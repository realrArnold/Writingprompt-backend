const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const router = require("./router");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("./config/database");
const User = require("./schemas/User");
const cors = require("cors");

dotenv.config();

connectDB();

app.use(express.json());
app.use(router);
app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true
  }
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
  //uuid is a library that generates random strings
  user.token = uuidv4();
  await user.save();
  res.send({ token: user.token });
});

// Authorization middleware - this is the 'bouncer' checking your ID before entry!
// HAS TO BE BEFORE ROUTER STUFF
app.use(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const user = await User.findOne({ token: authHeader });
  console.log(user);
  if (user) {
    next();
  } else {
    res.sendStatus(403);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
