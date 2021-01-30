const express = require("express");
const FavouritesModel = require("../models/FavouritesModel");
const StockModel = require("../models/StockModel");
const fetch = require('node-fetch');

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
    const favouriteDataRequest = request.body;
  console.log("favouriteDataRequest", favouriteDataRequest);
    // stock name, stock symbol from your ui 
    // const requestToDatabase = { 
    //   stockSymbol: responseBody.stockSymbol,
    //   stockName: responseBody.stockName,
    //   userId: responseBody.userId
    // };
//Parse data from UI (stockNameConst & stockSymbolConst). How do I make requestBody not include lastClosePrice?
FavouritesModel.create(favouriteDataRequest).then((data) => {
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


// --------------------------------------------------

// use findOne to check if a stock has already been favourited. HOW DO YOU USE DATA FROM UI AND PARSE INTO :symbol?
router.get("/check/:symbol", (req, res) => {
  FavouritesModel.findOne({stockSymbol: req.params.symbol, userId: req.session.user.id})
  .then((data) => {
    res.send(data ?true:false);
  });
});


// --------------------------------------------------------

// Remove favourite stock from favourites list. 

router.delete("delete/:symbol", (request, response) => {
  FavouritesModel.findByIdAndDelete({ userId: request.session.user.id, stockSymbol: request.params.symbol})
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



module.exports = router;