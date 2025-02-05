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
    genre: {
        type: String,
        required: [true, "Please pick your genre."],
      },
    date: {
      type: String,
      //returns date stamp in local date format (eg. 7/15/2021 for US, 15/7/2021 for UK)
      //Will this add date written to the writing entry in the database?
      default: new Date().toLocaleDateString(),
    },
    //Ranking based on number of likes here? Or should we have a separate ranking system?
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