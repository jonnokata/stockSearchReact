import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
// import { FavouritesList } from "./FavouritesList";
import { SearchForm, StockSearchForm } from "./StockSearchForm";
// import { StockChart } from "./StockChart";
// import { StockResults } from "./StockSearchResults";

const FunctionalStockContainer = () => {
  // Initialize state variables
  //const [favouritesList, setFavouritesList] = useState([]);
  const [stockSearch, setStockSearch] = useState({
    searchParam: "",
  });
  // const [stockSearchResults, setStockSearchResults ] = useState({
  // stockSymbol: "",
  //stockName: "",
  // lastClose: ""
  // });
  //const [stockChart, setStockChart ] = useState({});
  // Do I need to set the state of the favourites buttone here?

  // const handleStockSearchFormSubmit = (searchParam) => {
  //     fetch("`http://localhost:9000/api/v1/movies`", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newMovie),
  //     }).then((response) => {
  //       console.log("response: ", response);
  //     });
  //   };

  //   handleFavouriteClick = (stock) => {
  //   };

  return (
    <div>
      <div class="logo-container">
        <a href="https://imgur.com/gEQ7SUO">
          <img
            src="https://i.imgur.com/gEQ7SUO.png"
            title="source: imgur.com"
          />
        </a>
      </div>
      <div>
        <StockSearchForm />
      </div>
    </div>
  );
};

export { FunctionalStockContainer };
