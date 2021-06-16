const sortByTicker = objArray => objArray.sort((a, b) => {
  const tickerA = a.ticker.toLowerCase();
  const tickerB = b.ticker.toLowerCase();
  return tickerA.localeCompare(tickerB);
});

module.exports = sortByTicker;
