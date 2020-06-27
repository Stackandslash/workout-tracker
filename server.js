// Including our necessary materials.

const express = require("express");
const logger = require("morgan"); //This seemed pretty cool. Let's try it.
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;
const db = require("./models");
const app = express();

app.use(logger("dev"));

//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require("./routes/routes.js")(app); //This requires our routing file

//This guy makes sure our served-up pages come with CSS and such, instead of just being lost, lonely HTML.
app.use(express.static("public"));

//This (may) hook us up to our MongoDB DB.
var MONGODB_URI = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });
mongoose.connect(MONGODB_URI);
// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
