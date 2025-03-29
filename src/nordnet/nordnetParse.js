const fs = require('fs');

// This parses a copypasted output (in a file, filename passed as param) from Nordnet stock tracking view
// and outputs it in a CSV format that contains: Company;Shareprice\n
const processData = (data) => {
  const stockData = [];
  let currentItem = null;
  let rowCounter = 0;

  for (const row of data) {
    if (row === 'OstaMyy') {
      if (currentItem !== null) {
        stockData.push(currentItem);
      }
      currentItem = {
        name: '',
        price: ''
      };
      rowCounter = 0;
    } else if (currentItem !== null) {
      if (rowCounter === 4) {
        currentItem.price = row.trim().replace('undefined', '');
      } else if (rowCounter === 0) {
        currentItem.name = row;
      }
      rowCounter++;
    }
  }

  if (currentItem !== null) {
    stockData.push(currentItem);
  }

  return stockData;
}

// Get the filename that contains our data from command-line argument
const filePath = process.argv[2]; 

if (!filePath) {
  console.error('Please provide a filename as a command-line argument');
  process.exit(1);
}

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  const inputLines = data.split('\r\n');
  const processedData = processData(inputLines);

  for (const item of processedData) {
    console.log(`${item.name};${item.price}`);
  }
});