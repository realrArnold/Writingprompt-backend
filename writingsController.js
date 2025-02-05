const createError = require("http-errors");
const Writing = require("./schemas/Writing");

exports.getAllWritings = async (req, res) => {
  try {
    //.find allows us to return all items in the collection
    const writings = await Writing.find();
    res.send(writings);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getWritingById = async (req, res, next) => {
  try {
    const writing = await Writing.findById(req.params.id);

    if (!writing) {
      return next(createError(404, "no writing with that id"));
    }
    res.send(writing);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getWritingByGenre = async (req, res, next) => {
  try {
    const writing = await Writing.find({ genre: req.params.genre });

    if (!req.params.genre) {
      return next(createError(404, "no writing with that genre"));
    }
    res.send(writing);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getWritingByDateWritten = async (req, res, next) => {
  try {
    const writing = await Writing.findByID(req.params.date);

    if (!writing) {
      return next(createError(404, "nothing written on that date"));
    }
    res.send(writing);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.addWriting = async (req, res, next) => {
  try {
    const { title, words, date, genre, review, prompt } = req.body;
    const newWriting = await Writing.create({
      title,
      words,
      date,
      genre,
      review,
      prompt,
    });
    res.status(200).json({
      message: "Writing successfully added!",
      newWriting,});
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
        writing,});
    } else {
      console.error("Validation Error: No writing with that id");
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
      return next(createError(404, "No writings to delete"));
    }
  } catch (error) {
    next(createError(500, error.message));
  }
};
