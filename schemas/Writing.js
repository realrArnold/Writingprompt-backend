const mongoose = require("mongoose");

const writingSchema = new mongoose.Schema({
    title: {
      type: String,
      required: false,
    },
    //on submit needs to pass the text from the writing text area
    words: {
      type: String,
      required: [true, "Please write your response to the prompt."],
    },
    //on submit needs to pass the prompt text
    prompt: {
      type: String,
    },
    //on submit needs to pass the genre
    //drop down menu or check boxes for genre?
    genre: {
        type: String,
        required: false,
      },
    //on submit needs to pass a datestamp
    date: {
      type: String,
      // Returns the date in ISO standard format (YYYY-MM-DD). Also allows for easy sorting by date.
      // ISO format avoids slashes in string, which can cause issues with database queries.
      default: () => new Date().toISOString().split('T')[0], // ISO format without time.
    },
    writtenBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
    },
    //Ranking based on number of likes here? Or should we have a separate ranking system?
    // ranking: {
    //     type: number,
    //     default: 0,
    //   },
    //on submit (for reader) needs to add text to this
    review: {
      type: String,
      default: Array,
    },
    //on submit needs to add one to this
    upvotes: {
      type: Number,
      default: 0,
    },
  });
  
  module.exports = mongoose.model("Writing", writingSchema);