const fs = require("fs");

// Check if the filename is provided as a command-line argument
if (process.argv.length < 3) {
  console.error("Please provide a filename as a command-line argument.");
  process.exit(1);
}

// Get the filename from the command-line arguments
const filename = process.argv[2];

// Read the data from the file
const data = fs.readFileSync(filename, "utf8");

const lines = data.split("\n");
// const result = [];

// let symbol = "";
// let value = "";

// const symbolRegex = /^[A-Z0-9.-]+$/;
// const valueRegex = /^\s*([\d.,]+)\s+/;

// for (let i = 0; i < lines.length; i++) {
//   const line = lines[i].trim();

//   if (line !== "") {
//     if (symbolRegex.test(line)) {
//       symbol = line;
//     } else if (valueRegex.test(line)) {
//       value = line.match(valueRegex)[1].replace(/[.,]/g, (match) => {
//         return match === "." ? "," : "";
//       });
//     }
//   }

//   if (symbol && value) {
//     result.push(`${symbol};${value}`);
//     symbol = "";
//     value = "";
//   }
// }

// console.log(result.join("\n"));

function convertData(input) {
  const lines = input.split("\n");
  const output = [];

  // Ticker: only alphanumeric, dots, dashes — no whitespace
  const tickerRegex = /^[A-Z0-9][A-Z0-9.\-]*$/i;
  // Price data line: price + change % + absolute change (supports zero change without sign)
  const priceLineRegex = /^\s*\d[\d,]*\.\d+\s+[+-]?\d[\d,]*\.\d+%\s+[+-]?\d[\d,]*\.\d+/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (tickerRegex.test(line) && priceLineRegex.test(lines[i + 1] || "")) {
      const nextLine = lines[i + 1];
      const priceMatch = nextLine.match(/^\s*([\d,]+\.\d+)/);
      if (priceMatch) {
        output.push(`${line};${priceMatch[1].replace(".", ",")}`);
        i++; // skip the price line
      }
    }
  }

  return output.join("\n");
}

const result = convertData(data);
console.log(result);
