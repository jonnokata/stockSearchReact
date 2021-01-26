const searchForm = () => html `
    <div class="container-fluid">
        <div class="logo-container">
            <a href="https://imgur.com/gEQ7SUO"><img src="https://i.imgur.com/gEQ7SUO.png" title="source: imgur.com" /></a>        
        </div>


        <div class="form-container">
            <form class="form-inline" id="stock-form">
                <label for="inlineFormInputGroupStockName"></label>
                <input type="text" class="form-input" id="inlineFormInputGroupStockName" name="stock" placeholder="&#128269 Search for stock"></input>
                <input type="submit" class="btn-primary" id="stock-search-submit" value="Search" data-bs-toggle="button" autocomplete="off"></input>
            </form>
        </div>

        <div class="company-and-price-container">
            <div id="symbol-and-name"></div>
            <div id="test-div"></div>
            <p id="price"></p>
        </div>

        <div class="chart-wrapper">
            <canvas id="stockChart"></canvas>
        </div>

    </div>
`;
 
const stockSearch = () => {
// Use name to find and extract symbol from search input
const onSearchSubmit = (event) => {
  event.preventDefault();
  console.log('event', event);
  const $stockSearch = $('input[name="stock"]');
  console.log("stockSearch", $stockSearch);
  const stockName = $stockSearch.val();
  console.log(stockName);

  return findStockData(stockName);
};
 
const findStockData = (stockNameParam) => {
  const pendingStockData = $.ajax(`/stocks/${stockName}`
  ).then(stockData => {
    console.log("stockData", stockData);
    const stockSymbol = stockData["Meta Data"]["2. Symbol"];
    
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

  // create favourite button
    const favouriteButton =  `<button type="button" class="btn-primary" id="save-favourite">Favourite</button>`

    // append stock info and favourite button to body on search
    $("#symbol-and-name").empty();
    $("#symbol-and-name").append(`${stockSymbol} | ${stockNameParam} ${favouriteButton}`);
    $("#price").empty();
    $("#price").append(`${lastClose}`);

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

$("#stock-form").on("submit", onSearchSubmit);

$(document).on("click", "#save-favourite", (e) => { 
  e.preventDefault();
  console.log("Fav button clicked!");
  // take symbol and send to backend. Backend to store as favourite.
});

return searchForm;

};

export default stockSearch;