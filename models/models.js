//This time, we're going to try to make any objects as type String, since it looks like the API JS is stringifying them on the way out.
//Seems wonky though.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Chart = new Schema({
    type: {
        type: String,
    },
    data: {
        type: String,
    },
    options: {
        type: String
    }
});




/*/
Chart(bar, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {},
      scales: {
        yAxes: [
          {
            ticks: {}
          }
        ]
      }
    }
  });



  
  /*/