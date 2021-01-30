// import express
const express = require("express");
const StockModel = require("../models/StockModel");
const FavouritesModel = require("../models/FavouritesModel");
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

// Search for stock through AlphaVantage API
router.get("/search/:name", async (request, response) => {
  
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

    const stockData = {
      stockName: stockNameConst,
      stockSymbol: stockSymbolConst,
      stockPrice: stockPriceData,
      userId: request.session.user.id
    };
  
    response.send(stockData);
  });

  module.exports = router;
