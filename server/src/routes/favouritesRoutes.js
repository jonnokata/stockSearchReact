const express = require("express");
const FavouritesModel = require("../models/FavouritesModel");
const fetch = require('node-fetch');

// Create a new router to handle favourites routes
const router = express.Router();

// router.use((request, response, next) => {
//   console.log("request user router session:" , request.session);
//   if(!request.session.user) {
//     response.status(401).send("Please login");
//   } else {
//     next();
//   }
// });

//Add favourite stock to favourites list
router.post("/new-favourite", (request, response) => {
    const requestBody = request.body;

    // stock name, stock symbol from your ui 
    const requestToDatabase = { 
      stockSymbol: request.body.stockSymbol,
      stockName: request.body.stockName,
      userId: request.body.id
    // add back request.session.user.id later
    };
// Parse data from UI (stockNameConst & stockSymbolConst). How do I make requestBody not include lastClosePrice?
FavouritesModel.create(requestBody).then((data) => {
    console.log(data);
    response.send(data);
});

});

router.get("/all", (req, res) => {
  FavouritesModel.find({ userId: req.session.user.id }).then((data) => {
    res.send(data);
  })
});

router.get("/favourite/:symbol", (req, res) => {
  FavouritesModel.find({ userId: req.session.user.id, stockSymbol: req.params.symbol }).then((data) => {
    res.send(data);
  })
});

router.get("/stocks/:name", async (request, response) => {
  
  // perform search for stonk
  const searchQueryResponse = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${request.params.name}&apikey=EU18KIHPYJ49OM7D`);
  const stockSearchData = await searchQueryResponse.json();

  const stockNameConst = stockSearchData.bestMatches[0][`2. name`];
  console.log(stockNameConst);
  const stockSymbolConst = stockSearchData.bestMatches[0][`1. symbol`];
  console.log("stockSymbol", stockSymbolConst);

    // getting price for stonk
  const priceQueryResponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbolConst}&apikey=EU18KIHPYJ49OM7D`)
  const stockPriceData = await priceQueryResponse.json();

  response.send(stockPriceData);
});


// Remove favourite stock from favourites list


// View favourites list (call external api for price + database for stock symbol and search)



// use findOne to check if a stock has already been favourited.

module.exports = router;