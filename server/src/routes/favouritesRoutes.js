const express = require("express");
const FavouritesModel = require("../models/FavouritesModel");

// Create a new router to handle favourites routes
const router = express.Router();

router.use((request, response, next) => {
  console.log("request user router session:" , request.session);
  if(!request.session.user) {
    response.status(401).send("Please login");
  } else {
    next();
  }
});


// --------------------------------------------------------

//Add favourite stock to favourites list
router.post("/new-favourite", (request, response) => {
    const requestBody = request.body;

    // stock name, stock symbol from your ui 
    const requestToDatabase = { 
      stockSymbol: request.body.stockSymbol,
      stockName: request.body.stockName,
      userId: request.session.user.id 
    };

// Parse data from UI (stockNameConst & stockSymbolConst). How do I make requestBody not include lastClosePrice?
FavouritesModel.create(requestToDatabase).then((data) => {
    console.log(data);
    response.send(data);
  });
});


// --------------------------------------------------------

// Find all favourites for a specific users
router.get("/all", (req, res) => {
  FavouritesModel.find({ userId: req.session.user.id })
  .then((data) => {
    res.send(data);
  });
});


// --------------------------------------------------------

// Find if a user has favourited a specific stock
router.get("/favourite-check/:symbol", (req, res) => {
  FavouritesModel.find({ userId: req.session.user.id, stockSymbol: req.params.symbol }).then((data) => {
    res.send(data);
  });
});


// --------------------------------------------------------

// Remove favourite stock from favourites list

router.delete("delete-favourite/:symbol", (request, response) => {
  FavouritesModel.findByIdAndRemove({ userId: request.session.user.id, stockSymbol: request.params.symbol})
  .then((data) => {
    console.log("Unfavourite successful!");
    response.send(data);
  })
  .catch(() => {
    console.log("Something went wrong!");
    response.status(404).send("Favourite not found");
  });
});

// --------------------------------------------------------

// use findOne to check if a stock has already been favourited.



module.exports = router;