const mongoose = require("mongoose");

const writingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    words: {
      type: String,
      required: [true, "Please write your response to the prompt."],
    },
    //on submit needs to pass the prompt text
    writingPrompt: {
      type: String, // Changed from ObjectId to String since we're storing the prompt text
      required: true,
    },
    // writingPrompt: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "WPrompt", // References the WPrompt model
    // },
    //on submit needs to pass the genre
    //drop down menu or check boxes for genre? F
    genre: {
      type: String,
      required: false,
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

    //on submit in UI (for reader) needs to add text to this
    review: {
      type: [String], // Changed to array of strings if you need multiple reviews
      default: [],
    },

    //on submit needs to add one to this
    // upvotes: {
    //   type: Number,
    //   default: 0,
    //   required: false,
    // },
  },
  {
    timestamps: true, //creates automatic timestamps
  }
);

module.exports = mongoose.model("Writing", writingSchema);
