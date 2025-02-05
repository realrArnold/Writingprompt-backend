// this file is for routes, end points
const express = require("express")
const router = express.Router(); 
const prompts = require("./promptsController")
const writings= require("./writingsController")
const users = require("./usersController")

// //querying prompt database collection
// router.get("/prompts", prompts.getAllPrompts);
// router.get("/prompts/:id", prompts.getPromptById);
// router.get("/prompts/byGenre/:genre", prompts.getPromptByGenre);
// router.get("/prompts/byDateDisplayed/:date", prompts.getPromptByDateDisplayed);
// router.post("/prompts/add", prompts.addPrompt);
// router.put("/prompts/:id", prompts.updatePrompt);
// router.delete("/prompts/:id", prompts.deletePrompt);
// router.delete("/prompts", prompts.deleteAllPrompts);  

//querying writing database collection
router.get("/writings", writings.getAllWritings);
router.get("/writings/:id", writings.getWritingById);
router.get("/writings/byGenre/:genre", writings.getWritingByGenre);
router.get("/writings/byDateWritten/:date", writings.getWritingByDateWritten);
router.post("/writings/add", writings.addWriting);
router.put("/writings/:id", writings.updateWriting);
router.delete("/writings/:id", writings.deleteWriting);
router.delete("/writings", writings.deleteAllWritings);  

// //querying user database collection
// router.get("/users", users.getAllUsers);
// router.get("/users/:id", users.getUserById);
// router.get("/users/byUsername/:username", users.getUserByUsername);
// router.get("/users/writings", users.getAllWritingsByUser);
// router.get("/users/writings/byGenre/:genre", users.getWritingsByGenre);
// router.get("/users/writings/byPrompt/:prompt_id", users.getWritingsByPrompt);
// router.get("/users/reviews", users.getAllReviewsByUser);
// router.get("/users/activity", users.getUserActivity);
router.post("/users/create", users.createUser);
// router.put("/users/:id", users.updateUser);
// router.delete("/users/:id", users.deleteUser);


// router.get("/test", (req, res) => {
//     res.send("Router is working!");
//   });
  

module.exports = router;


