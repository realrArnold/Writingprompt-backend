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
      // Returns the date in ISO standard format (YYYY-MM-DD). Also allows for easy sorting by date.
      // ISO format avoids slashes in string, which can cause issues with database queries.
      // split to take out time and time zone part of ISO string
      default: new Date().toISOString().split('T')[0],
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