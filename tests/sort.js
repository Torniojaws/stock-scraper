const { expect } = require('chai');

const sortByTicker = require('../src/sort.js');

describe('Sorting', () => {
  it('Sorts an array of objects alphabetically by ticker', () => {
    const data = [
      { currentValue: 23.45, ticker: 'SAMPO.HE' },
      { currentValue: 12.34, ticker: 'DCRB' },
      { currentValue: 9.99, ticker: 'REI-UN.TO' },
    ];
    const sorted = sortByTicker(data);
    expect(sorted).to.deep.equal([
      { currentValue: 12.34, ticker: 'DCRB' },
      { currentValue: 9.99, ticker: 'REI-UN.TO' },
      { currentValue: 23.45, ticker: 'SAMPO.HE' },
    ]);
  });
});
