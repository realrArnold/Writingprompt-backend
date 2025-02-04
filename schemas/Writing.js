const mongoose = require("mongoose");

const writingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please enter a title for your writing."],
    },
    words: {
      type: String,
      required: [true, "Please write your response to the prompt here."],
    },
    //Ranking based on number of likes here?
    // ranking: {
    //     type: number,
    //     default: 0,
    //   },
    review: {
      type: String,
      default: "No review yet.",
    },
  });
  
  module.exports = mongoose.model("Writing", writingSchema);