const express = require("express");
const session = require("express-session");

const mongoose = require("mongoose");
const cors = require("cors");

// Connect to mongodb
mongoose.connect(`mongodb://localhost:27017/stockApp`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});