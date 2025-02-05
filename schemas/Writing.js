const mongoose = require("mongoose");

const writingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [false, "Would you like to enter a title for your writing?"],
    },
    //on submit needs to pass the text from the writing text area
    words: {
      type: String,
      required: [true, "Please write your response to the prompt here."],
    },
    //on submit needs to pass the prompt text
    prompt: {
      type: String,
    },
    //on submit needs to pass the genre
    //drop down menu or check boxes for genre?
    genre: {
        type: String,
        required: [false, "Would you like to pick a genre?"],
      },
    //on submit needs to pass a datestamp
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
    //on submit (for reader) needs to add text to this
    review: {
      type: String,
      default: "No review yet.",
    },
    //on submit needs to add one to this
    upvotes: {
      type: Number,
      default: 0,
    },
  });
  
  module.exports = mongoose.model("Writing", writingSchema);