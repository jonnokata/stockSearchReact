import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Text, Box } from "@chakra-ui/react";

const StockChart = (props) => {
  let dateData = Object.keys(props.data.stockPrice["Time Series (Daily)"]);
  const dateDataToday = dateData[0];
  const dateDataTodayMinus1 = dateData[1];
  const dateDataTodayMinus2 = dateData[2];
  const dateDataTodayMinus3 = dateData[3];
  const dateDataTodayMinus4 = dateData[4];

  const timeSeriesValues = Object.values(
    props.data.stockPrice["Time Series (Daily)"]
  );

  // extract prices and and create variables that can be used to chart
  const lastClose = timeSeriesValues[0]["4. close"];
  const lastCloseMinus1 = timeSeriesValues[1]["4. close"];
  const lastCloseMinus2 = timeSeriesValues[2]["4. close"];
  const lastCloseMinus3 = timeSeriesValues[3]["4. close"];
  const lastCloseMinus4 = timeSeriesValues[4]["4. close"];

  const chartData = {
    labels: [
      dateDataTodayMinus4,
      dateDataTodayMinus3,
      dateDataTodayMinus2,
      dateDataTodayMinus1,
      dateDataToday,
    ],
    datasets: [
      {
        label: "Close Price",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [
          lastCloseMinus4,
          lastCloseMinus3,
          lastCloseMinus2,
          lastCloseMinus1,
          lastClose,
        ],
      },
    ],
  };

  return (
    <Box w="50%" h="50%" maxWidth="720px" margin="0 auto">
      <Text>
        <Line
          data={chartData}
          options={{
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </Text>
    </Box>
  );
};

export { StockChart };
