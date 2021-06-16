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
