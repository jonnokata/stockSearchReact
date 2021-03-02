import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const StockChart = (props) => {
  let dateData = Object.keys(props.data.stockPrice["Time Series (Daily)"]);
  const dateDataToday = dateData[0];
  const dateDataTodayMinus1 = dateData[1];
  const dateDataTodayMinus2 = dateData[2];
  const dateDataTodayMinus3 = dateData[3];
  const dateDataTodayMinus4 = dateData[4];
  console.log("Chart: ", dateDataToday);

  const timeSeriesValues = Object.values(
    props.data.stockPrice["Time Series (Daily)"]
  );
  console.log("Chart: ", timeSeriesValues);

  // extract prices and and create variables that can be used to chart
  const lastClose = timeSeriesValues[0]["4. close"];
  const lastCloseMinus1 = timeSeriesValues[1]["4. close"];
  const lastCloseMinus2 = timeSeriesValues[2]["4. close"];
  const lastCloseMinus3 = timeSeriesValues[3]["4. close"];
  const lastCloseMinus4 = timeSeriesValues[4]["4. close"];
  console.log("Chart: ", lastClose);
  console.log("Chart: ", lastCloseMinus4);

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
    <div>
      <Line
        data={chartData}
        options={{
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

export { StockChart };
