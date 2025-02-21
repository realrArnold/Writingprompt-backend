const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  writings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Writing", // References the Writing model
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
