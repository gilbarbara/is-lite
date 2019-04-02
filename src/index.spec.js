/* eslint-disable array-callback-return */
/* tslint:disable */
import is from './index'; // eslint-disable-line import/no-unresolved

describe('is', () => {
  describe('array', () => {
    it('should return the expected value', () => {
      expect(is.array([])).toBe(true);
      expect(is.array(Array(4))).toBe(true);

      expect(is.array()).toBe(false);
      expect(is.array(null)).toBe(false);
      expect(is.array(undefined)).toBe(false);
      expect(is.array('')).toBe(false);
      expect(is.array(() => {})).toBe(false);
      expect(is.array({})).toBe(false);
    });
  });

  describe('boolean', () => {
    it('should return the expected value', () => {
      expect(is.boolean(true)).toBe(true);
      expect(is.boolean(false)).toBe(true);

      expect(is.boolean()).toBe(false);
      expect(is.boolean(null)).toBe(false);
      expect(is.boolean(undefined)).toBe(false);
      expect(is.boolean('')).toBe(false);
      expect(is.boolean(() => {})).toBe(false);
      expect(is.boolean({})).toBe(false);
      expect(is.boolean([])).toBe(false);
    });
  });

  describe('date', () => {
    it('should return the expected value', () => {
      expect(is.date(new Date())).toBe(true);

      expect(is.date()).toBe(false);
      expect(is.date(null)).toBe(false);
      expect(is.date(undefined)).toBe(false);
      expect(is.date('')).toBe(false);
      expect(is.date(() => {})).toBe(false);
      expect(is.date([])).toBe(false);
      expect(is.date({})).toBe(false);
    });
  });

  describe('domElement', () => {
    let div;
    beforeAll(() => {
      div = document.createElement('div');
    });

    afterAll(() => {
      div.remove();
    });

    it('should return the expected value', () => {
      expect(is.domElement(div)).toBe(true);

      expect(is.domElement()).toBe(false);
      expect(is.domElement(null)).toBe(false);
      expect(is.domElement(undefined)).toBe(false);
      expect(is.domElement('')).toBe(false);
      expect(is.domElement(() => {})).toBe(false);
      expect(is.domElement([])).toBe(false);
      expect(is.domElement({})).toBe(false);
    });
  });

  describe('function', () => {
    it('should return the expected value', () => {
      expect(is.function(function() {})).toBe(true); //eslint-disable-line prefer-arrow-callback, func-names
      expect(is.function(function named() {})).toBe(true); //eslint-disable-line prefer-arrow-callback
      expect(is.function(() => {})).toBe(true);

      expect(is.function()).toBe(false);
      expect(is.function(undefined)).toBe(false);
      expect(is.function(null)).toBe(false);
      expect(is.function('')).toBe(false);
      expect(is.function({})).toBe(false);
      expect(is.function([])).toBe(false);
    });
  });

  describe('generator', () => {
    it('should return the expected value', () => {
      // eslint-disable-next-line func-names
      const gen = function*() {
        yield false;
        return true;
      };

      expect(is.generator(gen())).toBe(true);

      expect(is.generator()).toBe(false);
      expect(is.generator(null)).toBe(false);
      expect(is.generator(undefined)).toBe(false);
      expect(is.generator('')).toBe(false);
      expect(is.generator(() => {})).toBe(false);
      expect(is.generator({})).toBe(false);
    });
  });

  describe('iterable', () => {
    it('should return the expected value', () => {
      expect(is.iterable([])).toBe(true);
      expect(is.iterable(Array(4))).toBe(true);
      expect(is.iterable('')).toBe(true);

      expect(is.iterable()).toBe(false);
      expect(is.iterable(null)).toBe(false);
      expect(is.iterable(undefined)).toBe(false);
      expect(is.iterable(() => {})).toBe(false);
      expect(is.iterable({})).toBe(false);
    });
  });

  describe('map', () => {
    it('should return the expected value', () => {
      expect(is.map(new Map())).toBe(true);

      expect(is.map(new WeakMap())).toBe(false);
      expect(is.map()).toBe(false);
      expect(is.map(null)).toBe(false);
      expect(is.map(undefined)).toBe(false);
      expect(is.map('')).toBe(false);
      expect(is.map(() => {})).toBe(false);
      expect(is.map([])).toBe(false);
      expect(is.map({})).toBe(false);
    });
  });

  describe('nan', () => {
    it('should return the expected value', () => {
      expect(is.nan(NaN)).toBe(true);
      expect(is.nan(parseInt('', 10))).toBe(true);
      expect(is.nan(Number('a'))).toBe(true);

      expect(is.nan(1)).toBe(false);
      expect(is.nan(-1)).toBe(false);
      expect(is.nan(Infinity)).toBe(false);
      expect(is.nan()).toBe(false);
      expect(is.nan(undefined)).toBe(false);
      expect(is.nan(null)).toBe(false);
      expect(is.nan('')).toBe(false);
      expect(is.nan(() => {})).toBe(false);
      expect(is.nan({})).toBe(false);
      expect(is.nan([])).toBe(false);
    });
  });

  describe('null', () => {
    it('should return the expected value', () => {
      expect(is.null(null)).toBe(true);

      expect(is.null()).toBe(false);
      expect(is.null(undefined)).toBe(false);
      expect(is.null('')).toBe(false);
      expect(is.null(() => {})).toBe(false);
      expect(is.null({})).toBe(false);
      expect(is.null([])).toBe(false);
    });
  });

  describe('nullOrUndefined', () => {
    it('should return the expected value', () => {
      expect(is.nullOrUndefined(null)).toBe(true);
      expect(is.nullOrUndefined(undefined)).toBe(true);
      expect(is.nullOrUndefined()).toBe(true);

      expect(is.nullOrUndefined('')).toBe(false);
      expect(is.nullOrUndefined(() => {})).toBe(false);
      expect(is.nullOrUndefined({})).toBe(false);
      expect(is.nullOrUndefined([])).toBe(false);
    });
  });

  describe('number', () => {
    it('should return the expected value', () => {
      expect(is.number(5)).toBe(true);
      expect(is.number(1.2)).toBe(true);

      expect(is.number()).toBe(false);
      expect(is.number(undefined)).toBe(false);
      expect(is.number(null)).toBe(false);
      expect(is.number('')).toBe(false);
      expect(is.number(() => {})).toBe(false);
      expect(is.number({})).toBe(false);
      expect(is.number([])).toBe(false);
    });
  });

  describe('numericString', () => {
    it('should return the expected value', () => {
      expect(is.numericString('1')).toBe(true);
      expect(is.numericString('10.5')).toBe(true);
      expect(is.numericString('-20')).toBe(true);
      expect(is.numericString('Infinity')).toBe(true);

      expect(is.numericString('')).toBe(false);
      expect(is.numericString(5)).toBe(false);
      expect(is.numericString()).toBe(false);
      expect(is.numericString(undefined)).toBe(false);
      expect(is.numericString(null)).toBe(false);
      expect(is.numericString(() => {})).toBe(false);
      expect(is.numericString({})).toBe(false);
      expect(is.numericString([])).toBe(false);
    });
  });

  describe('object', () => {
    it('should return the expected value', () => {
      expect(is.object({})).toBe(true);
      expect(is.object([])).toBe(true);
      expect(is.object(() => {})).toBe(true);

      expect(is.object()).toBe(false);
      expect(is.object(null)).toBe(false);
      expect(is.object(undefined)).toBe(false);
      expect(is.object('')).toBe(false);
    });
  });

  describe('plainObject', () => {
    it('should return the expected value', () => {
      expect(is.plainObject({})).toBe(true);

      expect(is.plainObject()).toBe(false);
      expect(is.plainObject(null)).toBe(false);
      expect(is.plainObject(undefined)).toBe(false);
      expect(is.plainObject('')).toBe(false);
      expect(is.plainObject(() => {})).toBe(false);
      expect(is.plainObject([])).toBe(false);
    });
  });

  describe('promise', () => {
    it('should return the expected value', () => {
      expect(is.promise(new Promise(() => {}))).toBe(true);

      expect(is.promise()).toBe(false);
      expect(is.promise(null)).toBe(false);
      expect(is.promise(undefined)).toBe(false);
      expect(is.promise('')).toBe(false);
      expect(is.promise(() => {})).toBe(false);
      expect(is.promise([])).toBe(false);
      expect(is.promise({})).toBe(false);
    });
  });

  describe('regexp', () => {
    it('should return the expected value', () => {
      expect(is.regexp(new RegExp('[a-z]'))).toBe(true);

      expect(is.regexp()).toBe(false);
      expect(is.regexp(null)).toBe(false);
      expect(is.regexp(undefined)).toBe(false);
      expect(is.regexp('')).toBe(false);
      expect(is.regexp(() => {})).toBe(false);
      expect(is.regexp({})).toBe(false);
    });
  });

  describe('set', () => {
    it('should return the expected value', () => {
      expect(is.set(new Set())).toBe(true);

      expect(is.set(new WeakSet())).toBe(false);
      expect(is.set()).toBe(false);
      expect(is.set(null)).toBe(false);
      expect(is.set(undefined)).toBe(false);
      expect(is.set('')).toBe(false);
      expect(is.set(() => {})).toBe(false);
      expect(is.set([])).toBe(false);
      expect(is.set({})).toBe(false);
    });
  });

  describe('string', () => {
    it('should return the expected value', () => {
      expect(is.string('')).toBe(true);

      expect(is.string()).toBe(false);
      expect(is.string(undefined)).toBe(false);
      expect(is.string(null)).toBe(false);
      expect(is.string(() => {})).toBe(false);
      expect(is.string({})).toBe(false);
      expect(is.string([])).toBe(false);
    });
  });

  describe('symbol', () => {
    it('should return the expected value', () => {
      expect(is.symbol(Symbol('test'))).toBe(true);

      expect(is.symbol()).toBe(false);
      expect(is.symbol(null)).toBe(false);
      expect(is.symbol(undefined)).toBe(false);
      expect(is.symbol('')).toBe(false);
      expect(is.symbol(() => {})).toBe(false);
      expect(is.symbol({})).toBe(false);
    });
  });

  describe('undefined', () => {
    it('should return the expected value', () => {
      expect(is.undefined(undefined)).toBe(true);
      expect(is.undefined()).toBe(true);

      expect(is.undefined(null)).toBe(false);
      expect(is.undefined('')).toBe(false);
      expect(is.undefined(() => {})).toBe(false);
      expect(is.undefined({})).toBe(false);
      expect(is.undefined([])).toBe(false);
    });
  });

  describe('weakMap', () => {
    it('should return the expected value', () => {
      expect(is.weakMap(new WeakMap())).toBe(true);

      expect(is.weakMap(new Map())).toBe(false);
      expect(is.weakMap()).toBe(false);
      expect(is.weakMap(null)).toBe(false);
      expect(is.weakMap(undefined)).toBe(false);
      expect(is.weakMap('')).toBe(false);
      expect(is.weakMap(() => {})).toBe(false);
      expect(is.weakMap([])).toBe(false);
      expect(is.weakMap({})).toBe(false);
    });
  });

  describe('weakSet', () => {
    it('should return the expected value', () => {
      expect(is.weakSet(new WeakSet())).toBe(true);

      expect(is.weakSet(new Set())).toBe(false);
      expect(is.weakSet()).toBe(false);
      expect(is.weakSet(null)).toBe(false);
      expect(is.weakSet(undefined)).toBe(false);
      expect(is.weakSet('')).toBe(false);
      expect(is.weakSet(() => {})).toBe(false);
      expect(is.weakSet([])).toBe(false);
      expect(is.weakSet({})).toBe(false);
    });
  });
});
