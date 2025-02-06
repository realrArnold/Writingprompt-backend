const createError = require("http-errors");
const Writing = require("./schemas/Writing");
const User = require("./schemas/User");

exports.getAllWritings = async (req, res) => {
  try {
    //.find allows us to return all items in the collection
    //returns all items and puts them in an array
    const writings = await Writing.find().populate("user");
    //checks length of array to see if there are any writings. if not, returns a message.
    if (writings.length === 0) {
      return res.status(404).json({ message: "no writings yet" });
    }
    res.send(writings);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getWritingById = async (req, res, next) => {
  try {
    //finds one document by its id and returns it (no array)
    const writing = await Writing.findById(req.params.id).populate("user");

    if (!writing) {
      return res.status(404).json({ message: "no writing with that id" });
    }
    res.send(writing);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getWritingByGenre = async (req, res, next) => {
  try {
    //finds all documents with the given genre and returns them in an array
    const writing = await Writing.find({ genre: req.params.genre }).populate("user");

    // If no writings are found for the given genre
    if (writing.length === 0) {
      return res
        .status(404)
        .json({ message: "No writings found for that genre" });
    }

    res.send(writing);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getWritingByDateWritten = async (req, res, next) => {
  try {
    //finds all documents with the given date and returns them in an array
    const writing = await Writing.find({ date: req.params.date }).populate("user");

    // Check if the result array is empty
    if (writing.length === 0) {
      return res.status(404).json({ message: "Nothing written on that date" });
    }

    res.status(200).send(writing);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.addWriting = async (req, res, next) => {
  try {
    const { title, words, date, genre, review, prompt, user_id } = req.body;
    //find the user by the id passed in the request
    const user = await User.findById(user_id);
    // if (!user) {
    //   return res.status(404).json({ message: "User not found" });
    // }
    //create a new writing with the data passed in the request
    const newWriting = await Writing.create({
      title,
      words,
      date,
      genre,
      review,
      prompt,
      user: user_id, //associate the writing with the user
    });
     // Add the writing's ID to the user's writings array
    //  user.writings.push(newWriting._id);
    //  await user.save();
    res.status(200).json({
      message: "Writing successfully added!",
      newWriting,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.updateWriting = async (req, res, next) => {
  try {
    const { title, words, genre, } = req.body;
    const id = req.params.id;
    const writing = await Writing.findByIdAndUpdate(id, req.body, {
      new: true,
      //runValidators ensures that the data is validated (according to schema) before updating
      runValidators: true,
    });

    if (writing) {
      res.status(200).json({
        message: "Writing successfully updated!",
        writing,
      });
    } else {
      return res.status(404).json({ message: "No writing with that id" });
    }
    res.send(writing);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.deleteWriting = async (req, res, next) => {
  try {
    const writing = await Writing.findByIdAndDelete(req.params.id);

    if (writing) {
      return res.status(200).json({
        message: "Deletion successful!",
        //returns the deleted writing title
        deletedWriting: writing.title,
      });
    } else {
      return next(createError(404, "No writing with that id"));
    }
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.deleteAllWritings = async (req, res, next) => {
  try {
    const writings = await Writing.deleteMany();

    if (writings) {
      return res.status(200).json({
        message: "All writings deleted!",
      });
    } else {
      return res.status(404).json({ message: "No writings to delete" });
    }
  } catch (error) {
    next(createError(500, error.message));
  }
};
