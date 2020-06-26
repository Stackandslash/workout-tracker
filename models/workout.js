//This time, we're going to try to make any objects as type String, since it looks like the API JS is stringifying them on the way out.
//This is, in fact, apparently how that works.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
     type: Date
  },
  exercises: {
    type: Array
  } 
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
