const stockValueFor = async (ticker, getStockDataFor) => {
  const result = await getStockDataFor(ticker);
  return {
    currentPrice: result.currentValue,
    previousClose: result.previousClose,
    ticker,
  }
}

module.exports = stockValueFor;
