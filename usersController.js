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
    return res.status(500).json ({ message: "Error creating user:", error});
  }
};
