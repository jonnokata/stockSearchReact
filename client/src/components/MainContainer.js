import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
// import { FavouritesList } from "./FavouritesList";
import { StockSearchForm } from "./StockSearchForm";
import { StockChart } from "./StockChart";
import { StockSearchResults } from "./StockSearchResults";

const FunctionalStockContainer = () => {
  // Initialize state variables
  //const [favouritesList, setFavouritesList] = useState([]);

  const [stockSearchResults, setStockSearchResults] = useState(null);

  const [stockChart, setStockChart] = useState(null);
  // Do I need to set the state of the favourites buttone here?

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
        {stockSearchResults && <StockSearchResults data={stockSearchResults} />}
        {stockSearchResults && <StockChart data={stockSearchResults} />}
      </div>
    </div>
  );
};

export { FunctionalStockContainer };

// {" "}
// {JSON.stringify(stockChart)}
