const fetch = require('node-fetch');
const { parse } = require('node-html-parser');

const baseUrl = 'https://finance.yahoo.com/quote/';

const fetchPrices = async (url) => {
  const request = await fetch(url, { follow: 5 });
  return request.text();
};

// Fetch the price page where we read the values from and then parse it
const getStockDataFor = ticker => fetchPrices(baseUrl + ticker)
  .then(handleResponse)
  .catch(e => e);

// Return the price values from the HTML page
const handleResponse = response => {
  const parsedHtml = parse(response);
  const result = {
    currentValue: getCurrentPrice(parsedHtml),
    previousClose: getClosePrice(parsedHtml),
  }
  return result;
};

// Get the last close price from the page
const getClosePrice = rawHtml => {
  const sourceElement = rawHtml.querySelector('#quote-summary');
  const priceElement = sourceElement
    .querySelector('[data-test="PREV_CLOSE-value"]').firstChild.firstChild;
  return parseFloat(priceElement.toString());
};

// Get the current price from the page
const getCurrentPrice = rawHtml => {
  const sourceElement = rawHtml.querySelector('#quote-header-info').lastChild;
  const priceElement = sourceElement.querySelector('div div').firstChild.firstChild;
  return parseFloat(priceElement.toString());
};

module.exports = {
  getStockDataFor,
}
