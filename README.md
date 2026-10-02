# Yahoo parser

(old name: `stock-scraper`)

Parse data from Yahoo Finance portfolio into csv format that you can paste to
calc / excel

## Usage

After `npm install`, paste data from Yahoo Finance portfolio into **data.txt**.
It should look something like this:

```
AAPL
333.02	+1.10%	+3.62	USD	4:00PM EDT	49.875M	Add	46.831M
330.14
339.50
243.42
345.34
4.86T
ABBV
261.59	-0.65%	-1.70	USD	4:03PM EDT	4.311M	Add	4.974M
261.59
265.16
190.75
269.39
462.26B
ADC
66.81	-0.85%	-0.57	USD	4:00PM EDT	1.931M	Add	1.42M
66.72
67.40
66.50
82.08
8.333B
```

and run the command: `npm run parse`. The output for above will be like:

```
$ node run parse
AAPL;333,02
ABBV;261,59
ADC;66,81
```

## Test

- `npm test`
