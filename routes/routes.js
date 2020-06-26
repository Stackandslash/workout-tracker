// Routes
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

module.exports = function (app) {
  // Route to post our form submission to mongoDB via mongoose
  app.get("/api/workouts", (req, res) => {
    console.log("We tried to get!");
    Workout.find({})
      .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.post("/api/workouts", (req, res) => {
    console.log("We tried to post!")
    // let user = new User(body);
  });

  app.put("/api/workouts", (req, res) => {
    console.log("We tried to put!")
    // let user = new User(body);

    // Chart.create(stuff)
    //   .then((thing) => {
    //     res.json(thing);
    //   })
    //   .catch((err) => {
    //   });
  });

  app.get("/api/workouts/range", (req, res) => {
    Workout.find({}).limit(7)
      .then(dbWorkouts => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
    });



  //HTML Routing here.
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });

  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
};
