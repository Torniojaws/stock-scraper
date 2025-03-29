const fetch = require("node-fetch");
const { parse } = require("node-html-parser");
const { writeFileSync } = require("fs");

const baseUrl = "https://finance.yahoo.com/quote/";

const fetchPrices = async (url, retries = 3) => {
  const request = await fetch(url, { redirect: "follow" });
  const rawHtml = await request.text();
  const parsed = parse(rawHtml);
  writeFileSync("./site.html", parsed.toString());
  // Silloin tällöin tulee herjasivu (myös selaimessa), ettei löydy tickeriä
  if (!parsed.querySelector('[data-test="qsp-price"]')) {
    console.log("raw html is missing the article data. Retrying");
    if (retries < 0) {
      console.log("max retries (3) reached, stopping");
      return Promise.reject("Max retries reached and no data received");
    }
    return fetchPrices(url, retries - 1);
  }
  return parsed;
};

// Fetch the price page where we read the values from and then parse it
const getStockDataFor = (ticker) =>
  fetchPrices(baseUrl + ticker)
    .then(handleResponse)
    .catch((e) => e);

// Return the price values from the HTML page
const handleResponse = (parsedHtml) => {
  return {
    currentValue: getCurrentPrice(parsedHtml),
    previousClose: getClosePrice(parsedHtml),
  };
};

// Get the last close price from the page
const getClosePrice = (rawHtml) => {
  const sourceElement = rawHtml.querySelector("#quote-summary");
  const priceElement = sourceElement.querySelector(
    '[data-test="PREV_CLOSE-value"]'
  );
  return priceElement.textContent || "0";
};

// Get the current price from the page
const getCurrentPrice = (rawHtml) => {
  try {
    const element = rawHtml.querySelector('[data-test="qsp-price"]');
    return element.textContent;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getStockDataFor,
};
