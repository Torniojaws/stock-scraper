import { readDataFile } from './src/datafile.ts';
import { parseData, formatted } from './src/parse.ts';
import type { StockData } from './src/types.ts';

// CONFIG
const datafileName = 'data.txt';

// APP
const main = async () => {
  try {
    const data = await readDataFile(datafileName);
    const parsedData: StockData[] = parseData(data);
    for (const data of parsedData) {
      console.log(formatted(data));
    }
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

// RUN
main();