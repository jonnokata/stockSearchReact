import React, { useEffect, useState } from "react";
import { Text, Box, Center } from "@chakra-ui/react";

const StockSearchResults = (props) => {
  let dateData = Object.keys(props.data.stockPrice["Time Series (Daily)"]);
  const dateDataToday = dateData[0];

  const timeSeriesValues = Object.values(
    props.data.stockPrice["Time Series (Daily)"]
  );

  // extract prices and and create variables that can be used to chart
  const lastClose = timeSeriesValues[0]["4. close"];

  return (
    <Center>
      <Box w="40%">
        <Text fontSize="28px" fontWeight="600" textAlign="center">
          {props.data.stockSymbol} | {props.data.stockName}
        </Text>
        <Text fontSize="26px" fontWeight="200" textAlign="center" mb="30px">
          ${lastClose}
        </Text>
      </Box>
    </Center>
  );
};

export { StockSearchResults };
