import { describe, expect, it } from 'vitest';

import { getChangeAsPercent, getChangeAsValue, getCurrency, getLastPrice, isTicker } from './parse.ts';

describe('Parsing', () => {
  describe('isTicker', () => {
    it('finds ticker from very easy data', () => {
      const result = isTicker('HTGC');
      expect(result).toBe(true);
    });

    it('finds ticker from easy data', () => {
      const result = isTicker('O');
      expect(result).toBe(true);
    });

    it('finds ticker from medium data', () => {
      const result = isTicker('NDA-FI.HE');
      expect(result).toBe(true);
    });

    it('finds ticker from hard data', () => {
      const result = isTicker('0P0000UP8X.F');
      expect(result).toBe(true);
    });

    it('ignores number row with no ticker', () => {
      const result = isTicker('16.78');
      expect(result).toBe(false);
    });

    it('ignores mcap row with no ticker', () => {
      const result = isTicker('3.15B');
      expect(result).toBe(false);
    });

    it('ignores percentage row with no ticker', () => {
      const result = isTicker('-0.82%');
      expect(result).toBe(false);
    });

    it('ignores complex rows with no ticker', () => {
      const result = isTicker('16.83	-0.82%	-0.14	USD	4:00PM EDT	1.281M	Add	1.491M	');
      expect(result).toBe(false);
    });
  });

  describe('getLastPrice', () => {
    it('finds price from easy data', () => {
      const result = getLastPrice('16.83	-0.82%	-0.14	USD	4:00PM EDT	1.281M	Add	1.491M	');
      expect(result).toBe("16.83")
    });

    it('finds zero price from data', () => {
      const result = getLastPrice('0.00	-0.82%	-0.14	USD	4:00PM EDT	1.281M	Add	1.491M	');
      expect(result).toBe("0.00")
    });

    it('finds small price from data', () => {
      const result = getLastPrice('2.6500	-0.82%	-0.14	USD	4:00PM EDT	1.281M	Add	1.491M	');
      expect(result).toBe("2.6500")
    });

    it('finds large price from data', () => {
      const result = getLastPrice('753,368.00	-0.82%	-0.14	USD	4:00PM EDT	1.281M	Add	1.491M	');
      expect(result).toBe("753,368.00")
    });
  });

  describe('getChangeAsPercent', () => {
    it('finds negative change percent from data', () => {
      const result = getChangeAsPercent('16.83	-0.82%	-0.14	USD	4:00PM EDT	1.281M	Add	1.491M	');
      expect(result).toBe("-0.82%")
    });

    it('finds positive change percent from data', () => {
      const result = getChangeAsPercent('333.02	+1.10%	+3.62	USD	4:00PM EDT	45.105M	Add	46.834M	');
      expect(result).toBe("+1.10%")
    });
  });

  describe('getChangeAsValue', () => {
    it('finds negative change value from data', () => {
      const result = getChangeAsValue('16.83	-0.82%	-0.14	USD	4:00PM EDT	1.281M	Add	1.491M	');
      expect(result).toBe("-0.14")
    });

    it('finds positive change value from data', () => {
      const result = getChangeAsValue('333.02	+1.10%	+3.62	USD	4:00PM EDT	45.105M	Add	46.834M	');
      expect(result).toBe("+3.62")
    });
  });

  describe('getCurrency', () => {
    it('finds USD string from data', () => {
      const result = getCurrency('16.83	-0.82%	-0.14	USD	4:00PM EDT	1.281M	Add	1.491M	');
      expect(result).toBe("USD")
    });

    it('finds EUR string from data', () => {
      const result = getCurrency('261.08	-0.10%	-0.25	EUR	10:00PM CEST	--	Add	--	');
      expect(result).toBe("EUR")
    });

    it('finds CAD string from data', () => {
      const result = getCurrency('50.69	+0.28%	+0.14	CAD	4:00PM EDT	321,997	Add	249,232	');
      expect(result).toBe("CAD")
    });

    it('finds SEK string from data', () => {
      const result = getCurrency('398.40	-0.50%	-2.00	SEK	5:29PM CEST	379,919	Add	387,203	');
      expect(result).toBe("SEK")
    });

    it('finds GBp string from data', () => {
      const result = getCurrency('83.29	-3.16%	-2.71	GBp	11:04AM BST	5.031M	Add	');
      expect(result).toBe("GBp")
    });
  });
});