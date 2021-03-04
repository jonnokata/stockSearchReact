const mongoose = require("mongoose");

// Define schema
const stockSchema = mongoose.Schema({
  stockSymbol: String,
  stockName: String,
});

// Export model to use in stockSearchRoutes.js
module.exports = mongoose.model("stockSearch", stockSchema);
