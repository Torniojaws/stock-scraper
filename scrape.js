const sortByTicker = require('./src/sort.js');
const stockValueFor = require('./src/stocks.js');
const { getStockDataFor } = require('./src/fetcher.js');
const formatPrice = priceFloat => (priceFloat
  ? priceFloat.toString().replace(/,/g, '').replace(/\./g, ',')
  : 'FAIL');

// Read the tickers from CLI input, eg. "node scrape MSFT AAPL BRK.A"
const FIRST_TICKER_INDEX = 2;
const tickers = process.argv.slice(FIRST_TICKER_INDEX);

// Fetch data for each ticker asynchronously
const pendingPromises = [];
tickers.forEach(ticker => {
  pendingPromises.push(stockValueFor(ticker, getStockDataFor));
});

// Once we have all values, show them in console in alphabetical order
Promise.all(pendingPromises)
  .then((results) => {
    const sorted = sortByTicker(results);
    // item.previousClose is also available
    sorted.forEach(item => console.log(item.ticker, '\t', formatPrice(item.currentPrice)));
  })
  .catch(e => {
    console.log(e);
  });
