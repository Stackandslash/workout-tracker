// Routes
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

module.exports = function (app) {
  // Route to post our form submission to mongoDB via mongoose
  app.post("/submit", ({ body }, res) => {
    // Create a new user using req.body
    let user = new User(body);

    User.create(user)
      .then((dbUser) => {
        // If saved successfully, send the the new User document to the client
        res.json(dbUser);
      })
      .catch((err) => {
        // If an error occurs, send the error to the client
        res.json(err);
      });
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/stats", (req, res) => {
    // If the user already has an account send them to the members page
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
};
