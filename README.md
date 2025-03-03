# Writingprompt-backend

API for Writing Prompts App - linked to a MongoDB database.

### Project Support Features
* Users can signup and login to their accounts
* Public (non-authenticated) users can see writing prompts on the platform but not submit their response or see other people's writing.
* Authenticated users can access all public writings as well as creating their own and adding title/genre to their work. They can also delete what they've created and view their writing statistics/awards based on progress.

### API Endpoints

**querying prompt database collection**

router.get("/writingPrompts", writingPrompts.getAllWPrompts);
router.get("/writingPrompts/random", writingPrompts.getRandomWPrompt);
router.get("/writingPrompts/:id", writingPrompts.getWPromptById);
router.get(
  "/writingPrompts/byDateDisplayed/:date",
  writingPrompts.getWPromptByDateDisplayed
);
router.post("/writingPrompts/add", writingPrompts.addWPrompt);
router.put("/writingPrompts/:id", writingPrompts.updateWPrompt);
router.delete("/writingPrompts/:id", writingPrompts.deleteWPrompt);
** endpoint to fetch the current daily writing prompt**
  router.get(
    "/writingPrompts/currentDaily",
    writingPrompts.getCurrentDailyWPrompt
  );

**querying writing database collection**

router.get("/writings", authenticateUser, writings.getAllWritings);
router.get("/writings/:id", writings.getWritingById);
router.get("/writings/byGenre/:genre", writings.getWritingByGenre);
router.get("/writings/byDateWritten/:date", writings.getWritingByDateWritten);
router.post("/writings/add", authenticateUser, writings.addWriting);
router.put("/writings/:id", writings.updateWriting);
router.delete("/writings/:id", writings.deleteWriting);
router.delete("/writings", writings.deleteAllWritings);
router.get(
  "/users/:user_id/writings",
  authenticateUser,
  users.getAllWritingsByUser
);

**User endpoints**

router.post("/users/create", users.createUser);


### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

**Daily Prompt Scheduling - the writing prompt changes every 24 hours and can use CRON scheduling in the following ways**
BACKEND:
getDailyWPrompt Function:

This function selects a random prompt from the database and marks it as ‘daily’. This is done through the schema (isDailyPrompt field. Default set to false).
When triggered by the cron job, it sets the isDailyPrompt field of the selected prompt to true.

Cron Job Endpoint:
The cron job uses the following endpoint, which is protected by middleware and scheduled to run daily at 00:01:
"/writingPrompts/daily"
getCurrentDailyWPrompt Function:
This function retrieves the writing prompt marked as daily.
There is a separate endpoint that the frontend can call to get the current daily writing prompt:

"/writingPrompts/currentDaily"
Purpose:This setup allows the cron job to update the daily prompt in the database, and the frontend to fetch it without triggering the random selection process again.

CRON JOB: This ensures that the daily writing prompt is marked in the database.

This is currently run from MongoDB Atlas - via the Triggers service. This changes the prompt marked as daily directly on the database. Uses similar code to the backend endpoint function.  
A cron job is also set up via cron-job.org to call the /writingPrompts/daily endpoint every 24 hours. THIS DOESN’T WORK WITH THE FREE RENDER HOSTING - due to hibernation. 

FRONTEND:
getCurrentDailyWritingPrompt Function:

This function in the ApiClient class calls the endpoint to fetch the daily writing prompt.
The prompt is displayed via the HeroPrompt component.

Outcome: This setup ensures that a different prompt is displayed every day, as the cron job updates the prompt daily and the frontend fetches the updated prompt.

