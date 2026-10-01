import { describe, expect, it } from 'vitest';
import { buildTickerData } from './parse.ts';

describe('string parsing', () => {
  describe('buildTickerData', () => {
    it('handles basic CSV string', () => {
      const result = buildTickerData("HTGC;16.83;-0.82%;-0.14;USD");
      expect(result).toEqual({
        ticker: 'HTGC',
        lastPrice: 16.83,
        changeAsPercent: '-0.82%',
        changeAsValue: -0.14,
        currency: 'USD',
      });
    });

    it('handles partially broken CSV string', () => {
      const result = buildTickerData("HTGC;16.83;undefined;null;");
      expect(result).toEqual({
        ticker: 'HTGC',
        lastPrice: 16.83,
        changeAsPercent: 'undefined',
        changeAsValue: NaN,
        currency: '',
      });
    });

    it('handles completely broken CSV string without crashing', () => {
      const result = buildTickerData(";;;null");
      expect(result).toEqual({
        ticker: '',
        lastPrice: 0,
        changeAsPercent: '',
        changeAsValue: NaN,
        currency: undefined,
      });
    });
  });
});