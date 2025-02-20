const mongoose = require("mongoose");

const writingPromptSchema = new mongoose.Schema({
  words: {
    type: String,
    required: [true, "Please write a prompt."],
  },
  dateDisplayed: {
    type: String,
    default: () => new Date().toISOString().split("T")[0], // ISO format without time.
  },
  isDailyPrompt: {
    type: Boolean,
    default: false,
  },
  writings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Writing", // References the Writing model
  },
});

module.exports = mongoose.model("WPrompts", writingPromptSchema);
