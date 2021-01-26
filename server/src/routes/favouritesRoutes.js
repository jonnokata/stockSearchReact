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
FavouritesModel.create(requestBody).then((data) => {
    console.log(data);
    response.send(data);
});

});

// Find all favourites for a specific users
router.get("/all", (req, res) => {
  FavouritesModel.find({ userId: req.session.user.id }).then((data) => {
    res.send(data);
  })
});

// Find if a user has favourited a specific stock
router.get("/favourite/:symbol", (req, res) => {
  FavouritesModel.find({ userId: req.session.user.id, stockSymbol: req.params.symbol }).then((data) => {
    res.send(data);
  })
});




// Remove favourite stock from favourites list



// View favourites list (call external api for price + database for stock symbol and search)



// use findOne to check if a stock has already been favourited.



module.exports = router;