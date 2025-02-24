// this file is for routes, end points
const express = require("express");
const router = express.Router();
const writingPrompts = require("./writingPromptsController");
const writings = require("./writingsController");
const users = require("./usersController");
const authenticateUser = require("./middleware");
const verifyCronSecret = require("./cronMiddleware");

//cron-job endpoint to update writing prompts
router.get(
    "/writingPrompts/daily",
    verifyCronSecret,
    writingPrompts.getDailyWPrompt
  );
  
  // New endpoint to fetch the current daily writing prompt
  router.get(
    "/writingPrompts/currentDaily",
    writingPrompts.getCurrentDailyWPrompt
  );

// //querying prompt database collection
router.get("/writingPrompts", writingPrompts.getAllWPrompts);
router.get("/writingPrompts/random", writingPrompts.getRandomWPrompt);
router.get("/writingPrompts/:id", writingPrompts.getWPromptById);
// router.get("/writingPrompts/byGenre/:genre", writingPrompts.getWPromptByGenre);
router.get(
  "/writingPrompts/byDateDisplayed/:date",
  writingPrompts.getWPromptByDateDisplayed
);
router.post("/writingPrompts/add", writingPrompts.addWPrompt);
router.put("/writingPrompts/:id", writingPrompts.updateWPrompt);
router.delete("/writingPrompts/:id", writingPrompts.deleteWPrompt);
// router.delete("/writingPrompts", writingPrompts.deleteAllWPrompts);



//querying writing database collection
router.get("/writings", authenticateUser, writings.getAllWritings);
router.get("/writings/:id", writings.getWritingById);
router.get("/writings/byGenre/:genre", writings.getWritingByGenre);
router.get("/writings/byDateWritten/:date", writings.getWritingByDateWritten);
router.post("/writings/add", authenticateUser, writings.addWriting);
router.put("/writings/:id", writings.updateWriting);
router.delete("/writings/:id", writings.deleteWriting);
router.delete("/writings", writings.deleteAllWritings);

// //querying user database collection
// router.get("/users", users.getAllUsers);
// router.get("/users/:id", users.getUserById);
// router.get("/users/byUsername/:username", users.getUserByUsername);
router.get(
  "/users/:user_id/writings",
  authenticateUser,
  users.getAllWritingsByUser
);
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


// Logout 

// Import necessary functions/modules
const { serialize } = require('cookie');  // Used for handling cookies

// Logout route to clear the JWT token cookie
router.post("/users/logout", (req, res) => {
  // Clear the JWT token cookie by setting its maxAge to -1 (expire immediately)
  res.setHeader('Set-Cookie', serialize('token', '', {
    httpOnly: true,  // The cookie cannot be accessed via JavaScript
    secure: process.env.NODE_ENV === 'production',  // Only use 'secure' in production (requires HTTPS)
    path: '/',  // Accessible throughout the entire app
    maxAge: -1  // Expire immediately (removes the cookie)
  }));

  return res.status(200).json({ message: "Logged out successfully" });
});



module.exports = router;
