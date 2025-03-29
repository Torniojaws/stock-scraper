# Stock scraper

Scrape data for stock prices based on input

## Usage

After `npm install`, run the command: `node scrape <tickers>` where tickers is a space-separated
list of tickers to fetch. For example `node scrape KO PEP MSFT` will fetch the current stock price
for Coca-Cola, Pepsico and Microsoft as a linebreak separated list with prices using comma decimals
where the results are sorted alphabetically.

Example:

```
$ node scrape KO PEP MSFT
KO 	 55,05
MSFT 	 260,37
PEP 	 148,18
```

## Test

- `npm test`
- `npm run coverage` to create coverage report

## Nordnet helper

There is a separate Nordnet helper under `src/nordnet/`. The usage is:

1. Copy the Nordnet stock tracking page data as is. Just select all - beginning from the top left
   "Osta" corner, selecting all the way to the bottom right trashbin icon.
2. Paste that data into a text file inside `src/nordnet/`
3. Run the script: `node src/nordnet/nordnetParse.js <filename>` where filename is the file you
   created in step 2.
4. The expected output in terminal is eg.

```
Solid Försäkringsaktiebolag;61,50
Evolution AB;1 036,20
CapMan Plc;2,125
Valmet Corporation;22,49
```
