const createError = require("http-errors");
const Prompt = require("./schemas/Writing");

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
      res.send(book);
    } catch (error) {
      next(createError(500, error.message));
    }
  };