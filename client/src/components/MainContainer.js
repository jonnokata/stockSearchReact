import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { StockSearchForm } from "./StockSearchForm";
import { StockChart } from "./StockChart";
import { StockSearchResults } from "./StockSearchResults";
import { FavouritesList } from "./FavouritesList";
import { FavouritesButton } from "./FavouritesButton";

const FunctionalStockContainer = () => {
  // Initialize state variables

  const [stockSearchResults, setStockSearchResults] = useState(null);
  const [isStockFavourite, setIsStockFavourite] = useState(false);

  const [stockChart, setStockChart] = useState(null);

  const [favouritesList, setFavouritesList] = useState([]);

  const handleStockSearchFormSubmit = (searchParam) => {
    setIsStockFavourite(false);
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

        console.log(favouritesList);
        console.log(data);

        const isFavourite = favouritesList.find(
          (fav) => fav.stockSymbol === data.stockSymbol
        );
        console.log("isFav", isFavourite);
        if (isFavourite) {
          setIsStockFavourite(true);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleFavouriteStockSubmit = () => {
    if (isStockFavourite) {
      // find stock symbol in favourites list & set favourite state with new array
      // do fetch call to delete
    } else {
      const stockName = stockSearchResults.stockName;
      const stockSymbol = stockSearchResults.stockSymbol;
      const newFavourite = { stockSymbol, stockName };

      const newFavouritesList = [...favouritesList];
      newFavouritesList.push(newFavourite);

      setFavouritesList(newFavouritesList);

      fetch(`api/favourites/new-favourite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFavourite),
      }).then((response) => {
        console.log("response: ", response);
      });
    }
  };

  useEffect(() => {
    fetch(`api/favourites/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFavouritesList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // Then to do a GET request to get the updated list of favourites
  // Set favouriteList state with response from GET request

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
            isFavourite={isStockFavourite}
          />
        )}
        {stockSearchResults && <StockSearchResults data={stockSearchResults} />}
        {stockSearchResults && <StockChart data={stockSearchResults} />}

        <FavouritesList data={stockSearchResults} favourites={favouritesList} />
      </div>
    </div>
  );
};

export { FunctionalStockContainer };
