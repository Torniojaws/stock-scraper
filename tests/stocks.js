const { expect } = require('chai');
const stockValueFor = require('../src/stocks.js');

const mockFetcher = () => ({
  currentValue: 1.3,
  previousClose: 1.2,
});

describe('Stocks', () => {
  it('returns previous close for stock ticker', () => stockValueFor('TEST', mockFetcher)
    .then(ticker => {
      expect(ticker).to.deep.equal({
        currentPrice: 1.3,
        previousClose: 1.2,
        ticker: 'TEST',
      });
    }));
});
