import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
// import { FavouritesList } from "./FavouritesList";
import { StockSearchForm } from "./StockSearchForm";
import { StockChart } from "./StockChart";
import { StockSearchResults } from "./StockSearchResults";
// import { FavouritesList } from "./FavouritesList";
import { FavouritesButton } from "./FavouritesButton";

const FunctionalStockContainer = () => {
  // Initialize state variables

  const [stockSearchResults, setStockSearchResults] = useState(null);

  const [stockChart, setStockChart] = useState(null);

  const [favouritesList, setFavouritesList] = useState([]);

  const handleStockSearchFormSubmit = (searchParam) => {
    fetch(`/api/stocks/search/${searchParam}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStockSearchResults(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleFavouriteStockSubmit = () => {
    const stockName = stockSearchResults.stockName;
    const stockSymbol = stockSearchResults.stockSymbol;
    const newFavourite = { stockSymbol, stockName };

    const newFavouritesList = [...favouritesList];
    newFavouritesList.push(newFavouritesList);

    setFavouritesList(newFavourite);

    fetch(`api/favourites/new-favourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFavourite),
    }).then((response) => {
      console.log("response: ", response);
    });
  };

  // const handleUnfavourite =

  //   handleFavouriteClick = (stock) => {
  //   };

  // Add useEffect to render favourites list on load of page

  return (
    <div>
      <div className="logo-container">
        <a href="https://imgur.com/gEQ7SUO">
          <img
            src="https://i.imgur.com/gEQ7SUO.png"
            title="source: imgur.com"
          />
        </a>
      </div>
      <div>
        <StockSearchForm onSubmit={handleStockSearchFormSubmit} />
        {stockSearchResults && (
          <FavouritesButton
            onClick={handleFavouriteStockSubmit}
            data={StockSearchResults}
          />
        )}
        {stockSearchResults && <StockSearchResults data={stockSearchResults} />}
        {stockSearchResults && <StockChart data={stockSearchResults} />}
        {/* {stockSearchResults && (
          <FavouritesList
            data={stockSearchResults}
            favourites={favouritesList}
          />
        )} */}
      </div>
    </div>
  );
};

export { FunctionalStockContainer };
