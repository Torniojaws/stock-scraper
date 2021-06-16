const { expect } = require('chai');

const { getStockDataFor } = require('../src/fetcher.js');

describe('Fetcher', () => {
  it('gets stock data from URL', () => {
    const htmlData = getStockDataFor('ACRE');
    expect(htmlData).to.not.equal(null);
  });
});
