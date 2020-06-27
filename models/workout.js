const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//You can apparently just do this with the day: and exercises: keys, and I initially thought that was the only way it worked.
//Turns out it's not, and enumerating these keys helps you trim and control them. Also it's probably easier to follow for someone reading the code.
const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date(),
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Need an exercise type!",
        },
        name: {
          type: String,
          trim: true,
          required: "Need an exercise name!",
        },
        duration: {
          type: Number,
          required: "Need a duration!",
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  //This bit is valuable, because it lets created properties ride along when this gets shuffled through the system.
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// This was put here to troubleshoot an issue. I can't take credit for writing it, so I just decided to research it as well as I could, so I understand it properly. Still a bit dizzying though.
// This bit is said created property. It pares down the exercise durations, and adds them up for the total workout duration. 
// Not a huge fan of counting minutes for resistance training, or mixing that and cardio in one spot, for that matter. But that's the spec.
workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
