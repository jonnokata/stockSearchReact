import React, { useEffect, useState } from "react";

const FavouritesList = (props) => {
  console.log("ash check", props.favourites);
  return (
    <ul>
      {props.favourites &&
        props.favourites.map((el, index) => (
          <li key={index}>
            {el.stockSymbol} | {el.stockName}
          </li>
        ))}
    </ul>
  );
};

export { FavouritesList };
