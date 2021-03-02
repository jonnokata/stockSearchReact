import React, { useEffect, useState } from "react";

const StockSearchResults = (props) => {
  let dateData = Object.keys(props.data.stockPrice["Time Series (Daily)"]);
  const dateDataToday = dateData[0];
  console.log(dateDataToday);

  const timeSeriesValues = Object.values(
    props.data.stockPrice["Time Series (Daily)"]
  );
  console.log(timeSeriesValues);

  // extract prices and and create variables that can be used to chart
  const lastClose = timeSeriesValues[0]["4. close"];

  return (
    <div>
      {props.data.stockSymbol} | {props.data.stockName}
      <br></br>
      {lastClose}
    </div>
  );
};

export { StockSearchResults };
