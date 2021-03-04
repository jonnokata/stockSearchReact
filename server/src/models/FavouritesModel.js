const mongoose = require("mongoose");

// Define schema
const favouritesSchema = mongoose.Schema({
  stockSymbol: String,
  stockName: String,
  favourited: Boolean,
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user",
  // },
});

// Export model to use in favouritesRoutes.js
module.exports = mongoose.model("favourites", favouritesSchema);
