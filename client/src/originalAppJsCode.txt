console.log("app is running");

// Use name to find and extract symbol from search input
const onSearchSubmit = (event) => {
  event.preventDefault();
  console.log('event', event);
  const $stockSearch = $('input[name="stock"]');
  console.log("stockSearch", $stockSearch);
  const stockName = $stockSearch.val();
  console.log(stockName);
  
  // Get stock symbol
  const pendingStockSymbol = $.ajax(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=EU18KIHPYJ49OM7D`
  ).then((stockSearchData) => {
    // return object with closest stock search results as arrays
    console.log("stockSearchData", stockSearchData);
    // extract name and symbol from first item in array
    const stockNameConst = stockSearchData.bestMatches[0][`2. name`];
    console.log(stockNameConst);
    const stockSymbolConst = stockSearchData.bestMatches[0][`1. symbol`];
    console.log("stockSymbol", stockSymbolConst);
    findStockData(stockSymbolConst, stockNameConst);
  });

}; 

// get price by parsing stock symbol into daily price api

const findStockData = (stockSymbolParam, stockNameParam) => {
  const pendingStockData = $.ajax(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbolParam}&apikey=EU18KIHPYJ49OM7D`
  ).then(stockData => {
    console.log("stockData", stockData);
    
    // extract dates from api and create variables that can be used to chart

    dateData = Object.keys(stockData['Time Series (Daily)']);
    const dateDataToday = dateData[0];
    const dateDataTodayMinus1 = dateData[1];
    const dateDataTodayMinus2 = dateData[2];
    const dateDataTodayMinus3 = dateData[3];
    const dateDataTodayMinus4 = dateData[4];
    console.log("dateData", dateData);

    // turn object into array so that prices can be accessed from returned api results
    const timeSeriesValues = Object.values(stockData['Time Series (Daily)']);
    console.log(timeSeriesValues);

    // extract prices and and create variables that can be used to chart
    const lastClose = timeSeriesValues[0]['4. close'];
    const lastCloseMinus1 = timeSeriesValues[1]['4. close'];
    const lastCloseMinus2 = timeSeriesValues[2]['4. close'];
    const lastCloseMinus3 = timeSeriesValues[3]['4. close'];
    const lastCloseMinus4 = timeSeriesValues[4]['4. close'];
    console.log(lastClose);
    console.log(lastCloseMinus4);


    $("#symbol-and-name").empty();
    $("#symbol-and-name").append(`${stockSymbolParam} | ${stockNameParam} `)
    $("#price").empty();
    $("#price").append(`$${lastClose}`);

    // create chart

    const ctx = document.getElementById('stockChart');

    const closePriceList = [lastCloseMinus4, lastCloseMinus3, lastCloseMinus2, lastCloseMinus1, lastClose];
    const dates = [dateDataTodayMinus4, dateDataTodayMinus3, dateDataTodayMinus2, dateDataTodayMinus1, dateDataToday];
    
    const stockChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'Close Price',
            data: closePriceList,
            backgroundColor: "#e6e9fe",
            borderColor: "#f6f7fe",
            borderWidth: 3,
        }]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
    },
    });


    });



};

$("#stock-form").on("submit", onSearchSubmit)

