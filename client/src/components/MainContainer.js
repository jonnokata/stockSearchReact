import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { StockSearchForm } from "./StockSearchForm";
import { StockChart } from "./StockChart";
import { StockSearchResults } from "./StockSearchResults";
import { FavouritesList } from "./FavouritesList";
import { FavouritesButton } from "./FavouritesButton";
import { Box, Image, Center, Text, Flex } from "@chakra-ui/react";

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
    const stockName = stockSearchResults.stockName;
    const stockSymbol = stockSearchResults.stockSymbol;
    if (isStockFavourite) {
      const stockToUnfavourite = { stockSymbol, stockName };
      // find stock symbol in favourites list & set favourite state with new array
      const newFavouritesList = favouritesList.filter((stockEl) => {
        return stockEl.stockSymbol !== stockSymbol;
      });
      // console.log("found stock: ", foundStock);
      // const newFavouritesList = [...favouritesList];
      // newFavouritesList[foundStock] = stockToUnfavourite;

      setFavouritesList(newFavouritesList);
      setIsStockFavourite(false);

      // do fetch call to delete

      fetch(`api/favourites/delete/${stockSymbol}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stockToUnfavourite),
      }).then((response) => {
        console.log("response: ", response);
      });
    } else {
      const newFavourite = { stockSymbol, stockName };

      const newFavouritesList = [...favouritesList];
      newFavouritesList.push(newFavourite);

      setFavouritesList(newFavouritesList);
      setIsStockFavourite(true);

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
    <Box>
      <Box
        w="30%"
        minW="150px"
        margin="0 auto"
        p="30px"
        className="logo-container"
      >
        <a href="https://imgur.com/gEQ7SUO">
          <img
            src="https://i.imgur.com/gEQ7SUO.png"
            title="source: imgur.com"
          />
        </a>
      </Box>
      <Center>
        <Box margin="0 auto" w="30%">
          <Box display="flex" alignItems="center" justifyContent="center">
            <StockSearchForm onSubmit={handleStockSearchFormSubmit} />

            {stockSearchResults && (
              <FavouritesButton
                onClick={handleFavouriteStockSubmit}
                isFavourite={isStockFavourite}
              />
            )}
          </Box>
        </Box>
      </Center>
      {stockSearchResults && <StockSearchResults data={stockSearchResults} />}

      {stockSearchResults && <StockChart data={stockSearchResults} />}

      <FavouritesList data={stockSearchResults} favourites={favouritesList} />
    </Box>
  );
};

export { FunctionalStockContainer };
