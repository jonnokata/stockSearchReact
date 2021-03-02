import React, { useEffect, useState } from "react";
import { StockSearchForm } from "./StockSearchForm";

const StockSearchResults = (props) => {
  // if (props.data === null) {
  //   return null;
  // } else {
  //   return props.data;
  // }
  return (
    <div>
      {props.data.stockSymbol} | {props.data.stockName}
      <br></br>
    </div>
  );
};

export { StockSearchResults };
