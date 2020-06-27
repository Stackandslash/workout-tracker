// Routes
// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
let db = require("../models");

module.exports = function (app) {
  // Route to get all workouts
  app.get("/api/workouts", (req, res) => {
    console.log("We tried to get!");
    db.Workout.find({})
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //- POST is called by the async createWorkout function in the API. It sends a blank object for a body. This may only exist to create a shell object.
  app.post("/api/workouts", (req, res) => {
    console.log("We tried to post!");
    //We can set up a new Workout object here, set its :day: with Date and its :exercises: as a blank array.
    db.Workout.create({ day: Date(), exercises: [] })
      .then((dbWork) => {
        res.json(dbWork);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //api/workouts flow:  - PUT /api/workouts/:id is called by the async addExercise function in api.js, which is called by the handleFormSubmit function in exercise.js

  //the handleFormSubmit function builds an object with the workout data inside, then calls API.addExercise and passes that data.

  //Then, the addExercise function gets the id to add the exercise to, and calls the PUT, with the body being a stringified version of the workout data.

  //It waits for a res.json() back, and returns that res.json(), which serves to let the handleFormSubmit function know to proceed with clearing inputs and adding classes.

  app.put("/api/workouts/:id", (req, res) => {
    console.log("We tried to put!");
    let newExercise = req.body;
    let passedId = req.params.id;
    console.log(newExercise);
    db.Workout.updateOne(
      { _id: passedId },
      { $push: { exercises: newExercise } }
    )
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //This gets the past 7 days of workouts. Specifically 7, rather than a variable range. Presumably for charting purposes, by the look of things.
  app.get("/api/workouts/range", (req, res) => {
    console.log("We tried to get range!");
    db.Workout.find({})
      .limit(7)
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
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
