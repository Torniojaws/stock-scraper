import type { StockData } from "./types.ts";

// Parse raw data into an array of objects
export const parseData = (data: string): StockData[] => {
  const tickerLines = getTickerLines(data);
  return tickerLines.map(buildTickerData)
};

export const buildTickerData = (rawCsv: string): StockData => {
  // CSV line, for example HTGC;16,83;-0,82%;-0,14;USD;
  const [ticker, price, changeAsPercent, changeVal, currency] = rawCsv.split(';');
  return {
    ticker,
    lastPrice: Number(price),
    changeAsPercent,
    changeAsValue: Number(changeVal),
    currency
  }
}

// Return the data from a range of raw multiline strings as a csv line of relevant data
export const getTickerLines = (data: string): string[] => {
  const allRows = data.split('\n').map(line => line.trim());
  const tickerLines: string[] = [];

  let prevLineWasTicker = false;
  let currentTickerData: string[] = [];
  // Go through rows until we find a ticker. Then build its contents until we hit the next ticker
  for (const [index, row] of allRows.entries()) {
    if (isTicker(row)) {
      // A ticker dataset is ready - add it to final data as CSV string
      if (currentTickerData.length > 0) tickerLines.push(currentTickerData.join(';'));
      // And start a new dataset
      currentTickerData = [row];
      // And we can take advantage of the standardized dataset - the relevant data is alwys
      // in the next line after a ticker
      prevLineWasTicker = true;
    } else if (prevLineWasTicker) {
      // Here we rely on the knowledge that the line after a ticker is standard:
      // 360.82	-0.07%	-0.26	EUR	10:00PM CEST	--	Add	--	
      // Where the values are in order: lastPrice, changeAsPercent, changeAsValue, currency
      const lastPrice = getLastPrice(row);
      const changeAsPercent = getChangeAsPercent(row);
      const changeAsValue = getChangeAsValue(row);
      const currency = getCurrency(row);

      // And append them to our current line data
      currentTickerData = currentTickerData.concat([lastPrice, changeAsPercent, changeAsValue, currency]);
      prevLineWasTicker = false;
    } else if (index === allRows.length - 1) {
      // Last line, append last ticker data
      tickerLines.push(currentTickerData.join(';'));
    } else {
      // We ignore all lines that are not a ticker line, or the line after a ticker
      prevLineWasTicker = false;
      continue;
    }
  }

  return tickerLines;
};

// A ticker is always in the beginning of a row, and has a string, like AAPL, O; SAMPO.HE
// or 0P0000UP8X.F
// Example of a single set of data. Notice how "USD", "EDT", "Add" are in the middle of a string
//
// HTGC
// 16.83	-0.82%	-0.14	USD	4:00PM EDT	1.281M	Add	1.491M	
// 16.78
// 17.04
// 13.70
// 19.13
// 3.15B	
//
// So the rule we use for now is that the value is in the beginning of the line
// and contains an alphabetic character
const tickerRegex = /^(?:[A-Z]|0P)/;

export const isTicker = (value: string): boolean => tickerRegex.test(value);

export const getLastPrice = (row: string): string => row.split("\t")[0] ?? '';

export const getChangeAsPercent = (row: string) => row.split("\t")[1] ?? '';

export const getChangeAsValue = (row: string) => row.split("\t")[2] ?? '';

export const getCurrency = (row: string) => row.split("\t")[3] ?? '';