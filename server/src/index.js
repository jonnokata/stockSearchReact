const express = require("express");
const session = require("express-session");

const mongoose = require("mongoose");
const cors = require("cors");

// Connect to mongodb
mongoose.connect(`mongodb://localhost:27017/stockApp`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialise app object
const app = express();
app.use(
  session({
    secret: "This is a random secret example",
    resave: false,
    saveUninitialized: false,
  })
);
// This is the port your application will use
const port = 3000;

// Import all routers
const internalRouter = require("./routes/internalRoutes");
const userRouter = require("./routes/userRoutes");
const favouritesRouter = require("./routes/favouritesRoutes");
const stockRouter = require("./routes/stockRoutes");

// Add middleware to be able to read and understand json files
app.use(express.json());
app.use(cors()); 

// Tell express that it needs to use the routers we have initialised
app.use("/internal", internalRouter);
app.use("/api/users", userRouter);
app.use("/api/favourites", favouritesRouter);
app.use("/api/stocks", stockRouter);

app.listen(port, () =>
  console.log(`Stock app is listening at http://localhost:${port}`)
);
