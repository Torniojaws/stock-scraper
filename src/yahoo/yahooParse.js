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
  const lines = input.split("\n"); // Split without trimming
  const output = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]; // Keep the original line

    // Check if the line starts with a ticker (alphanumeric)
    if (/^[A-Z0-9]/.test(line)) {
      // Extract the ticker from the line
      const ticker = line.split(/\s+/)[0]; // Get the first part (ticker)
      // Move to the next line to find price data
      const nextLine = lines[++i]?.trim(); // Get the next line with the data

      if (nextLine) {
        // Extract the price from the next line
        const priceMatch = nextLine.match(/^\s*([\d,]+\.\d+)/); // Match first numeric value (price) at the start of the line
        if (priceMatch) {
          const price = priceMatch[1]; // Get the matched price
          output.push(`${ticker};${price.replace(".", ",")}`); // Replace dot with comma
        }
      }
    }
  }

  return output.join("\n");
}

const result = convertData(data);
console.log(result);
