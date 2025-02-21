const createError = require("http-errors");
const Writing = require("./schemas/Writing");
const WPrompt = require("./schemas/WPrompt");

exports.getAllWPrompts = async (req, res, next) => {
  try {
    //.find allows us to return all items in the collection
    //returns all items and puts them in an array
    const writingPrompts = await WPrompt.find().populate("writings");
    //checks length of array to see if there are any prompts. if not, returns a message.
    if (writingPrompts.length === 0) {
      return res.status(404).json({ message: "no writing prompts available" });
    }
    res.send(writingPrompts);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getWPromptById = async (req, res, next) => {
  try {
    //finds one document by its id and returns it (no array)
    const writingPrompt = await WPrompt.findById(req.params.id).populate(
      "writings"
    );

    if (!writingPrompt) {
      return res
        .status(404)
        .json({ message: "no writing prompt with that id" });
    }
    res.send(writingPrompt);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getWPromptByDateDisplayed = async (req, res, next) => {
  try {
    //finds all documents with the given date and returns them in an array
    const writingPrompt = await WPrompt.find({
      dateDisplayed: req.params.date,
    }).populate("writings");

    // Check if the result array is empty
    if (writingPrompt.length === 0) {
      return res
        .status(404)
        .json({ message: "No writing prompt was displayed on that date" });
    }
    //sends writing prompt
    res.status(200).send(writingPrompt);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getRandomWPrompt = async (req, res, next) => {
  try {
    // Count the total number of documents
    const count = await WPrompt.countDocuments();

    if (count === 0) {
      return res.status(404).json({ message: "No writing prompts found" });
    }

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * count);

    // Use skip to fetch the document at the random index
    const writingPrompt = await WPrompt.findOne().skip(randomIndex);

    res.status(200).send(writingPrompt);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.addWPrompt = async (req, res, next) => {
  try {
    const { words, dateDisplayed } = req.body;
    //create a new writing with the data passed in the request
    const newWritingPrompt = await WPrompt.create({
      words,
      dateDisplayed,
    });
    //send a response to the client
    res.status(200).json({
      message: "Writing prompt successfully added!",
      newWritingPrompt,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.updateWPrompt = async (req, res, next) => {
  try {
    const id = req.params.id;
    const writingPrompt = await WPrompt.findByIdAndUpdate(id, req.body, {
      new: true,
      //runValidators ensures that the data is validated (according to schema) before updating
      runValidators: true,
    });

    if (writingPrompt) {
      res.status(200).json({
        message: "Writing prompt successfully updated!",
        writingPrompt,
      });
    } else {
      return res
        .status(404)
        .json({ message: "No writing prompt with that id" });
    }
  } catch (error) {
    next(createError(500, error.message));
  }
};
// make sure the corrct person is deleting the entry, not just anyone.
exports.deleteWPrompt = async (req, res, next) => {
  try {
    const writingPrompt = await WPrompt.findByIdAndDelete(req.params.id);

    if (writingPrompt) {
      return res.status(200).json({
        message: "Deletion successful!",
        //returns the deleted writing prompt
        deletedWritingPrompt: writingPrompt,
      });
    } else {
      return next(createError(404, "No writing prompt with that id"));
    }
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getDailyWPrompt = async (req, res, next) => {
  try {
    // Count the total number of documents
    const count = await WPrompt.countDocuments();

    if (count === 0) {
      return res.status(404).json({ message: "No writing prompts found" });
    }

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * count);

    // Use skip to fetch the document at the random index
    const writingPrompt = await WPrompt.findOne().skip(randomIndex);

    // Set the selected prompt as the daily prompt
    await WPrompt.updateMany({}, { $set: { isDailyPrompt: false } }); // Reset all prompts
    writingPrompt.isDailyPrompt = true;
    await writingPrompt.save();

    res.status(200).send(writingPrompt);
  } catch (error) {
    next(createError(500, error.message));
  }
};

exports.getCurrentDailyWPrompt = async (req, res, next) => {
  try {
    const writingPrompt = await WPrompt.findOne({ isDailyPrompt: true });

    if (!writingPrompt) {
      return res.status(404).json({ message: "No daily writing prompt found" });
    }

    res.status(200).send(writingPrompt);
  } catch (error) {
    next(createError(500, error.message));
  }
};
