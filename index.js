const express = require("express");
const app = express(); 
const port = process.env.PORT || 3001;
const router = require("./router");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();

connectDB();

app.use(express.json());
app.use(router);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });
  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    })