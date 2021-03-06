import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

const FavouritesList = (props) => {
  return (
    <ul>
      {props.favourites &&
        props.favourites.map((el, index) => (
          <li key={index}>
            <Text fontSize="16px">
              {el.stockSymbol} | {el.stockName}
            </Text>
          </li>
        ))}
    </ul>
  );
};

export { FavouritesList };
