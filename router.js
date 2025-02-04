// this file is for routes, end points
const express = require("express")
const router = express.Router(); 
const prompts = require("./promptsController")

router.get("/prompts", prompts.getAllPrompts);
// router.post("/prompts/add", books.addBook);
// router.get("/prompts/:id", books.getBookById);
// router.delete("/prompts/:id", books.deleteBook);
// router.put("/prompts/:id", books.updateBook);
// router.delete("/prompts", books.deleteAllBooks);  
// router.delete("/prompts/bytitle/:title", books.deleteBookByTitle); 

module.exports = router;


