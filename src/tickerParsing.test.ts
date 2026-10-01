import { describe, expect, it } from 'vitest';
import { getTickerLines } from './parse.ts';

const simpleRawData = `HTGC
16.83	-0.82%	-0.14	USD	4:00PM EDT	1.281M	Add	1.491M	
16.78
17.04
13.70
19.13
3.15B	`;

const twoItemRawData = `MANTA.HE
6.07	-0.82%	-0.05	EUR	6:29PM EEST	691,090	Add	1.111M	
6.07
6.17
5.36
7.47
3.054B	
MO
67.33	-2.02%	-1.39	USD	3:59PM EDT	5.387M	Add	8.405M	
66.91
69.05
54.70
77.06
112.424B	`;

describe('Ticker parsing', () => {
  describe('getTickerLines', () => {
    it('handles a simple raw dataset', () => {
      const result = getTickerLines(simpleRawData);
      expect(result).toEqual(['HTGC;16.83;-0.82%;-0.14;USD']);
    });

    it('handles multi-item simple raw dataset', () => {
      const result = getTickerLines(twoItemRawData);
      expect(result).toEqual([
        'MANTA.HE;6.07;-0.82%;-0.05;EUR',
        'MO;67.33;-2.02%;-1.39;USD',
      ]);
    });
  });
});