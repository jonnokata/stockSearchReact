import { eventNames } from "../../server/src/models/UserModel";

const searchForm = `
    <div class="container-fluid">
        <div class="logo-container">
            <a href="https://imgur.com/gEQ7SUO"><img src="https://i.imgur.com/gEQ7SUO.png" title="source: imgur.com" /></a>        
        </div>

        <form class="form-container">
            <div class="form-inline" id="stock-form">
                <label for="inlineFormInputGroupStockName"></label>
                <input type="text" class="form-input" id="inlineFormInputGroupStockName" name="stock" placeholder="&#128269 Search for stock"></input>
                <!-- <input type="submit" class="btn-primary" id="stock-search-submit" value="Search" data-bs-toggle="button" autocomplete="off"></input> -->
                <button  type="button" id="search-submit"  class="btn btn-primary">Search</button>
            </div>
        </form>

        <div class="company-and-price-container">
            <div id="symbol-and-name"></div>
            <div id="test-div"></div>
            <p id="price"></p>
        </div>

        <div class="chart-wrapper">
            <canvas id="stockChart"></canvas>
        </div>

        <div class="company-and-price-container">
          <div id="symbol-and-name-favourite"></div>
          <div id="test-div"></div>
          <p id="price-favourite"></p>
      </div>

    </div>
`;

let favouritesList = {
  stockSymbol,
  stockName
};

// call to get list of all favourites
const $.ajax('')
.then(allFavs => {
  favouritesList = allFavs;

  // rendering all favourites
});


const stockSearch = () => {
// Use name to find and extract symbol from search input
const onSearchSubmit = (event) => {
  event.preventDefault();
  // console.log('event', event);
  const $stockSearch = $('input[name="stock"]');
  console.log("stockSearch", $stockSearch);
  const stockName = $stockSearch.val();
  console.log(stockName);

  return findStockData(stockName);
};

const findStockData = (stockNameParam) => {
  const pendingStockData = $.ajax(`api/stocks/search/${stockNameParam}`
  ).then(stockData => {
    console.log("stockData", stockData);
    const stockSymbol = stockData.stockSymbol;
    const stockName = stockData.stockName;
    const userId = stockData.userId;

     // Checking if the stock is already favourited
     const isAlreadyFavourited = favouritesList.includes(stockSymbol);

     // create favourite button
       const favouriteButton =  `<button type="button" class="btn-primary" id="save-favourite">${isAlreadyFavourited ? 'Unfavourite' : 'Favourite'}</button>`

    $(document).on("click", "#save-favourite", async (e) => { 
        e.preventDefault();
        console.log("Fav button clicked!");
      
        const favouriteDataRequest = {
          stockSymbol: stockSymbol,
          stockName: stockName,
          userId: userId
        };

        console.log("favouriteDataRequest", favouriteDataRequest);
        if (isAlreadyFavourited) {add delete in here} else {
          const favouriteDataResponse = await $.ajax ({
          type: "POST",
          url: "/api/favourites/new-favourite",
          contentType: "application/json",
          data: JSON.stringify(favouriteDataRequest),}
      });

        window.alert("Favourite added!");
      
      });

    // $.ajax(`api/stocks/check/${stockSymbol}`)
    // .then(isFavourite => {
    //   if (isFavourite) {$("body").append("this works")} 
    //   // add in logic for adding favourites button
    // });  
    
    // extract dates from api and create variables that can be used to chart

    let dateData = Object.keys(stockData.stockPrice['Time Series (Daily)']);
    const dateDataToday = dateData[0];
    const dateDataTodayMinus1 = dateData[1];
    const dateDataTodayMinus2 = dateData[2];
    const dateDataTodayMinus3 = dateData[3];
    const dateDataTodayMinus4 = dateData[4];
    console.log("dateData", dateData);

    // turn object into array so that prices can be accessed from returned api results
    const timeSeriesValues = Object.values(stockData.stockPrice['Time Series (Daily)']);
    console.log(timeSeriesValues);

    // extract prices and and create variables that can be used to chart
    const lastClose = timeSeriesValues[0]['4. close'];
    const lastCloseMinus1 = timeSeriesValues[1]['4. close'];
    const lastCloseMinus2 = timeSeriesValues[2]['4. close'];
    const lastCloseMinus3 = timeSeriesValues[3]['4. close'];
    const lastCloseMinus4 = timeSeriesValues[4]['4. close'];
    console.log(lastClose);
    console.log(lastCloseMinus4);

   

    // append stock info and favourite button to body on search
    $("#symbol-and-name").empty();
    $("#symbol-and-name").append(`${stockSymbol} | ${stockName} ${favouriteButton}`);
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
console.log("find stock data", findStockData);


// $("#search-submit").on("click", onSearchSubmit);

// $("#stock-form").on("submit", function (e) 
// {e.preventDefault();
//   console.log("submit test")});

$(document).on("click", "#search-submit", (e) => { 
  e.preventDefault();
  onSearchSubmit(e);
  console.log("Stock button clicked!");
});



// $(document).on("click", "#save-favourite", async (e) => { 
//   e.preventDefault();
//   console.log("Fav button clicked!");

//   const favouriteDataRequest = {
//     stockSymbol: stockSymbol,
//     stockName: stockNameParam
    
//     // $("#symbol-and-name").empty();
//     // $("#symbol-and-name").append(`${stockSymbol} | ${stockNameParam} ${favouriteButton}`);
//     // $("#price").empty();
//     // $("#price").append(`${lastClose}`);
//   }

//   const favouriteDataResponse = await $.ajax ({
//     type: "POST",
//     url: "/favourites/new-favourite",
//     contentType: "application/json",
//     data: JSON.stringify(requestBody),
// });

//   window.alert("Favourite added!");

// });

return searchForm;

}; 

export default stockSearch;

// Step 1:
// const favouritesList = ajax call to lookup all favourites for user {
//   store all favourites for user
// }

// Step 2: find unfavourited
// 