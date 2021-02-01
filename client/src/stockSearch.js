import updateUser from "./user/updateUser";

const searchForm = `
    <div class="container-fluid">
        <div class="logo-container">
            <a href="https://imgur.com/gEQ7SUO"><img src="https://i.imgur.com/gEQ7SUO.png" title="source: imgur.com" /></a>        
        </div>

        <form class="form-container" id="stock-form">
            <div class="form-inline">
                <label for="inlineFormInputGroupStockName"></label>
                <input type="text" class="form-input" id="inlineFormInputGroupStockName" name="stock" placeholder="&#128269 Search for stock"></input>
                <!-- <input type="submit" class="btn-primary" id="stock-search-submit" value="Search" data-bs-toggle="button" autocomplete="off"></input> -->
                <button  type="submit" id="search-submit"  class="btn btn-primary">Search</button>
                <button type="button" id="update-user" class="btn btn-primary">Update profile</button>
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

        <div id="favourites-container">
          
        </div>

    </div>
`;

// top level variable to store favourites data on page load
let favouritesList;

const loadFavourites = () => {
  return $.ajax(`api/favourites/all`).then((allFavourites) => {
    let favouritesHtml = ``;
    console.log("allFavourites", allFavourites);
    favouritesList = allFavourites;
    allFavourites.forEach((fav) => {
      favouritesHtml += `<li>${fav.stockName} - ${fav.stockSymbol}</li>`;
    });
    console.log("favouritesHtml", favouritesHtml);
    $("#favourites-container").empty();
    $("#favourites-container").append(`
    <h2>Favourites</h2>
    <br></br>
    <ul>${favouritesHtml}</ul>`);
  });
};

const findFavouriteSymbol = (symbol) => {
  const findSymbol = favouritesList.find((fav) => {
    return fav.stockSymbol === symbol;
  });
  console.log("find symbol", findSymbol);
  return findSymbol;
};

const favouriteButton = (symbol) => {
  const favourite = findFavouriteSymbol(symbol);
  if (!symbol) {
    return `<button type="button" class="btn-primary" id="save-favourite">Favourite</button>`;
  }
  if (favourite) {
    return `<button type="button" class="btn-primary" id="save-favourite">Unfavourite</button>`;
  } else {
    return `<button type="button" class="btn-primary" id="save-favourite">Favourite</button>`;
  }
};

const stockSearch = () => {
  loadFavourites();

  const findStockData = (stockNameParam) => {
    const pendingStockData = $.ajax(`api/stocks/search/${stockNameParam}`).then(
      (stockData) => {
        console.log("stockData", stockData);
        const stockSymbol = stockData.stockSymbol;
        const stockName = stockData.stockName;
        const userId = stockData.userId;

        $(document).on("click", "#save-favourite", async (e) => {
          e.preventDefault();
          console.log("Fav button clicked!");

          const favourited = findFavouriteSymbol(stockSymbol);

          const favouriteDataRequest = {
            stockSymbol: stockSymbol,
            stockName: stockName,
            userId: userId,
            favourited: !Boolean(favourited),
          };

          const favouriteDataResponse = await $.ajax({
            type: "POST",
            url: "/api/favourites/new-favourite",
            contentType: "application/json",
            data: JSON.stringify(favouriteDataRequest),
          });
          await loadFavourites().catch(console.error);

          console.log("Favourite Data Response:", favouriteDataResponse);

          $("#symbol-and-name").empty();
          $("#symbol-and-name").append(
            `${stockSymbol} | ${stockName} ${favouriteButton(stockSymbol)}`
          );
        });

        // extract dates from api and create variables that can be used to chart

        let dateData = Object.keys(stockData.stockPrice["Time Series (Daily)"]);
        const dateDataToday = dateData[0];
        const dateDataTodayMinus1 = dateData[1];
        const dateDataTodayMinus2 = dateData[2];
        const dateDataTodayMinus3 = dateData[3];
        const dateDataTodayMinus4 = dateData[4];
        console.log("dateData", dateData);

        // turn object into array so that prices can be accessed from returned api results
        const timeSeriesValues = Object.values(
          stockData.stockPrice["Time Series (Daily)"]
        );
        console.log(timeSeriesValues);

        // extract prices and and create variables that can be used to chart
        const lastClose = timeSeriesValues[0]["4. close"];
        const lastCloseMinus1 = timeSeriesValues[1]["4. close"];
        const lastCloseMinus2 = timeSeriesValues[2]["4. close"];
        const lastCloseMinus3 = timeSeriesValues[3]["4. close"];
        const lastCloseMinus4 = timeSeriesValues[4]["4. close"];
        console.log(lastClose);
        console.log(lastCloseMinus4);

        // append stock info and favourite button to body on search
        $("#symbol-and-name").empty();
        $("#symbol-and-name").append(
          `${stockSymbol} | ${stockName} ${favouriteButton(stockSymbol)}`
        );
        $("#price").empty();
        $("#price").append(`$${lastClose}`);

        // create chart

        const ctx = document.getElementById("stockChart");

        const closePriceList = [
          lastCloseMinus4,
          lastCloseMinus3,
          lastCloseMinus2,
          lastCloseMinus1,
          lastClose,
        ];
        const dates = [
          dateDataTodayMinus4,
          dateDataTodayMinus3,
          dateDataTodayMinus2,
          dateDataTodayMinus1,
          dateDataToday,
        ];

        const stockChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: dates,
            datasets: [
              {
                label: "Close Price",
                data: closePriceList,
                backgroundColor: "#e6e9fe",
                borderColor: "#f6f7fe",
                borderWidth: 3,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
          },
        });
      }
    );
  };
  // console.log("find stock data", findStockData);

  // Use name to find and extract symbol from search input
  const onSearchSubmit = () => {
    console.log("on search submit", onSearchSubmit);
    // console.log('event', event);
    const $stockSearch = $('input[name="stock"]');
    console.log("stockSearch", $stockSearch);
    const stockName = $stockSearch.val();
    console.log(stockName);

    findStockData(stockName);
  };

  $(document).on("submit", "#stock-form", (e) => {
    e.preventDefault();
    onSearchSubmit(e);
    console.log("Stock button clicked!");
  });

  //   const favouriteDataResponse = await $.ajax ({
  //     type: "POST",
  //     url: "/favourites/new-favourite",
  //     contentType: "application/json",
  //     data: JSON.stringify(requestBody),
  // });

  //   window.alert("Favourite added!");

  // });

  $(document).on("click", "#update-user", () => {
    // Clear current login form
    $("body").empty();

    // Append update user form
    $("body").append(updateUser());
  });

  return searchForm;
};

export default stockSearch;
