const createError = require("http-errors");
const User = require("./schemas/User");
const Writing = require("./schemas/Writing");

// Creates a user
exports.createUser = async (req, res, next) => {
  try {
    //extract username and password from request body
    const { username, password, token, writings } = req.body;

    // Create a user
    const user = new User({
      username,
      password,
      token,
      writings,
    });
    await user.save();

    return res.status(200).json({ message: "User created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user:", error });
  }
};

// gets all writings by a user
exports.getAllWritingsByUser = async (req, res, next) => {
  try {
    //finds all documents by its id and returns it (no array)
    const writings = await Writing.find({ writtenBy: req.params.user_id });

    if (writings.length === 0) {
      return res.status(404).json({ message: "Nothing found by that author" });
    }
    res.send(writings);
  } catch (error) {
    next(createError(500, error.message));
  }
};
