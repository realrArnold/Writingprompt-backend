// this file is for routes, end points
const express = require("express")
const router = express.Router(); 
const prompts = require("./promptsController")
const writings= require("./writingsController")


// router.get("/prompts", prompts.getAllPrompts);
// router.get("/prompts/:id", prompts.getPromptById);
// router.get("/prompts/byGenre/:genre", prompts.getPromptByGenre);
// router.post("/prompts/add", prompts.addPrompt);
// router.put("/prompts/:id", prompts.updatePrompt);
// router.delete("/prompts/:id", prompts.deletePrompt);
// router.delete("/prompts", prompts.deleteAllPrompts);  


router.get("/writings", writings.getAllWritings);
router.get("/writings/:id", writings.getWritingById);
router.get("/writings/byGenre/:genre", writings.getWritingByGenre);
router.get("/writings/byDateWritten/:date", writings.getWritingByDateWritten);
router.post("/writings/add", writings.addWriting);
router.put("/writings/:id", writings.updateWriting);
router.delete("/writings/:id", writings.deleteWriting);
router.delete("/writings", writings.deleteAllWritings);  


// router.get("/test", (req, res) => {
//     res.send("Router is working!");
//   });
  

module.exports = router;


