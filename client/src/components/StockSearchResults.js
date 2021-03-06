import React, { useEffect, useState } from "react";
import { Text, Box } from "@chakra-ui/react";

const StockSearchResults = (props) => {
  let dateData = Object.keys(props.data.stockPrice["Time Series (Daily)"]);
  const dateDataToday = dateData[0];

  const timeSeriesValues = Object.values(
    props.data.stockPrice["Time Series (Daily)"]
  );

  // extract prices and and create variables that can be used to chart
  const lastClose = timeSeriesValues[0]["4. close"];

  return (
    <Box>
      <Text fontSize="28px" fontWeight="600">
        {props.data.stockSymbol} | {props.data.stockName}
      </Text>
      <br></br>
      <Text fontSize="26px" fontWeight="200">
        ${lastClose}
      </Text>
    </Box>
  );
};

export { StockSearchResults };
