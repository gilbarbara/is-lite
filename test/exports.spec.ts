import is from '../src';
import {
  isArray,
  isArrayOf,
  isAsyncFunction,
  isAsyncGeneratorFunction,
  isBigInt,
  isBoolean,
  isClass,
  isDate,
  isDefined,
  isDomElement,
  isEmpty,
  isError,
  isFunction,
  isGenerator,
  isGeneratorFunction,
  isInstanceOf,
  isInteger,
  isIterable,
  isMap,
  isNan,
  isNonEmptyString,
  isNull,
  isNullOrUndefined,
  isNumber,
  isNumericString,
  isObject,
  isOneOf,
  isPlainFunction,
  isPlainObject,
  isPrimitive,
  isPromise,
  isPropertyOf,
  isRegexp,
  isSet,
  isString,
  isSymbol,
  isUndefined,
  isUrl,
  isWeakMap,
  isWeakSet,
} from '../src/exports';

import { ClassTest, tagNames, types } from './__fixtures';

describe('isArray', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isArray(d.value)}`, () => {
      expect(isArray(d.value)).toBe(d.key === 'array');
    });
  });
});

describe('isArrayOf', () => {
  it('should return the expected value', () => {
    expect(isArrayOf([1, 2, 3], isNumber)).toBe(true);
    expect(isArrayOf(['a', 'b', 'c'], isString)).toBe(true);
    expect(isArrayOf([{ a: 1 }, { b: 2 }], isPlainObject)).toBe(true);

    expect(isArrayOf([1, 2, 'three'], isNumber)).toBe(false);
    expect(isArrayOf([1, 'b', { a: 1 }], isString)).toBe(false);

    // @ts-ignore
    expect(isArrayOf()).toBe(false);
  });
});

describe('isAsyncFunction', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isAsyncFunction(d.value)}`, () => {
      expect(isAsyncFunction(d.value)).toBe(d.key === 'asyncFunction');
    });
  });
});

describe('isAsyncGeneratorFunction', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isAsyncGeneratorFunction(d.value)}`, () => {
      expect(isAsyncGeneratorFunction(d.value)).toBe(d.key === 'asyncGeneratorFunction');
    });
  });
});

describe('isBigInt', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isBigInt(d.value)}`, () => {
      expect(isBigInt(d.value)).toBe(d.key === 'bigint');
    });
  });
});

describe('isBoolean', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isBoolean(d.value)}`, () => {
      expect(isBoolean(d.value)).toBe(d.key === 'boolean');
    });
  });
});

describe('isClass', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isClass(d.value)}`, () => {
      expect(isClass(d.value)).toBe(d.key === 'class');
    });
  });
});

describe('isDate', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isDate(d.value)}`, () => {
      expect(isDate(d.value)).toBe(d.key === 'date');
    });
  });
});

describe('isDefined', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isDefined(d.value)}`, () => {
      expect(isDefined(d.value)).toBe(d.key !== 'undefined');
    });
  });
});

describe('isDomElement', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isDomElement(d.value)}`, () => {
      expect(isDomElement(d.value)).toBe(d.key === 'domElement');
    });
  });

  it.each(tagNames.map(d => [d]))('%p should match HTMLElement', tagName => {
    expect(isDomElement(document.createElement(tagName))).toBe(true);
  });
});

describe('isEmpty', () => {
  const testMap = new Map();

  testMap.set('some', 'thing');

  it.each([
    [[], true],
    ['', true],
    [{}, true],
    [new Set(), true],
    [new Map(), true],
    [[1], false],
    ['something', false],
    [{ key: '' }, false],
    [new Set([1]), false],
    [testMap, false],
  ])('%p should return %p', (input: any, expected: boolean) => {
    expect(isEmpty(input)).toBe(expected);
  });
});

describe('isError', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isError(d.value)}`, () => {
      expect(isError(d.value)).toBe(d.key === 'error');
    });
  });
});

describe('isFunction', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isFunction(d.value)}`, () => {
      expect(isFunction(d.value)).toBe(d.key === 'function' || d.base === 'function');
    });
  });
});

describe('isGenerator', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isGenerator(d.value)}`, () => {
      expect(isGenerator(d.value)).toBe(d.key === 'generator');
    });
  });
});

describe('isGeneratorFunction', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isGeneratorFunction(d.value)}`, () => {
      expect(isGeneratorFunction(d.value)).toBe(d.key === 'generatorFunction');
    });
  });
});

describe('isInstanceOf', () => {
  const test = new ClassTest();

  it('should return the expected value', () => {
    expect(isInstanceOf(test, ClassTest)).toBe(true);

    expect(isInstanceOf(test, class Test2 {})).toBe(false);
  });

  types.forEach(d => {
    it(`${d.key} should return ${isInstanceOf(d.value, ClassTest)}`, () => {
      expect(isInstanceOf(d.value, ClassTest)).toBe(false);
    });
  });
});

describe('isInteger', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isInteger(d.value)}`, () => {
      expect(isInteger(d.value)).toBe(['integer', 'number'].includes(d.key));
    });
  });
});

describe('isIterable', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isIterable(d.value)}`, () => {
      expect(isIterable(d.value)).toBe(
        ['array', 'generator', 'map', 'nonEmptyString', 'numericString', 'set', 'string'].includes(
          d.key,
        ),
      );
    });
  });
});

describe('isMap', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isMap(d.value)}`, () => {
      expect(isMap(d.value)).toBe(d.key === 'map');
    });
  });
});

describe('isNan', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isNan(d.value)}`, () => {
      expect(isNan(d.value)).toBe(d.key === 'nan');
    });
  });
});

describe('isNull', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isNull(d.value)}`, () => {
      expect(isNull(d.value)).toBe(d.key === 'null');
    });
  });
});

describe('isNullOrUndefined', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isNullOrUndefined(d.value)}`, () => {
      expect(isNullOrUndefined(d.value)).toBe(['null', 'undefined'].includes(d.key));
    });
  });
});

describe('isNonEmptyString', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isNonEmptyString(d.value)}`, () => {
      expect(isNonEmptyString(d.value)).toBe(['nonEmptyString', 'numericString'].includes(d.key));
    });
  });
});

describe('isNumber', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isNumber(d.value)}`, () => {
      expect(isNumber(d.value)).toBe(['integer', 'number'].includes(d.key));
    });
  });
});

describe('isNumericString', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isNumericString(d.value)}`, () => {
      expect(isNumericString(d.value)).toBe(d.key === 'numericString');
    });
  });
});

describe('isObject', () => {
  const validTypes = [
    'array',
    'asyncGeneratorFunction',
    'asyncFunction',
    'class',
    'date',
    'domElement',
    'error',
    'function',
    'generator',
    'generatorFunction',
    'map',
    'object',
    'promise',
    'regexp',
    'set',
    'url',
    'weakMap',
    'weakSet',
  ];

  types.forEach(d => {
    it(`${d.key} should return ${isObject(d.value)}`, () => {
      expect(isObject(d.value)).toBe(validTypes.includes(d.key));
    });
  });
});

describe('isOneOf', () => {
  it('should return the expected value', () => {
    const dataset = ['some', 'thing', 10, null];

    expect(isOneOf(dataset, 'some')).toBe(true);
    expect(isOneOf(dataset, 10)).toBe(true);
    expect(isOneOf(dataset, null)).toBe(true);

    expect(isOneOf(dataset, 'other')).toBe(false);
    expect(isOneOf(dataset, 11)).toBe(false);
    expect(isOneOf(dataset, undefined)).toBe(false);

    // @ts-ignore
    expect(isOneOf()).toBe(false);
  });
});

describe('isPlainFunction', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isPlainFunction(d.value)}`, () => {
      expect(isPlainFunction(d.value)).toBe(['class', 'function'].includes(d.key));
    });
  });
});

describe('isPlainObject', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isPlainObject(d.value)}`, () => {
      expect(isPlainObject(d.value)).toBe(d.key === 'object');
    });
  });
});

describe('isPrimitive', () => {
  const validTypes = [
    'bigint',
    'boolean',
    'integer',
    'null',
    'nan',
    'nonEmptyString',
    'number',
    'numericString',
    'string',
    'symbol',
    'undefined',
  ];

  types.forEach(d => {
    it(`${d.key} should return ${isPrimitive(d.value)}`, () => {
      expect(isPrimitive(d.value)).toBe(validTypes.includes(d.key));
    });
  });
});

describe('isPromise', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isPromise(d.value)}`, () => {
      expect(isPromise(d.value)).toBe(d.key === 'promise');
    });
  });
});

describe('isPropertyOf', () => {
  const dataset = {
    fn: () => true,
    items: [],
    other: 1,
    some: 'thing',
  };

  it('basic usage', () => {
    expect(isPropertyOf(dataset, 'fn')).toBe(true);
    expect(isPropertyOf(dataset, 'items')).toBe(true);
    expect(isPropertyOf(dataset, 'other')).toBe(true);
    expect(isPropertyOf(dataset, 'some')).toBe(true);

    expect(isPropertyOf(dataset, 'something')).toBe(false);
    expect(isPropertyOf(dataset, 'fake')).toBe(false);

    // @ts-ignore
    expect(isPropertyOf()).toBe(false);
  });

  it('with predicate', () => {
    types.forEach(d => {
      // @ts-ignore
      expect(isPropertyOf(dataset, 'some', is[d.key])).toBe(
        ['nonEmptyString', 'string'].includes(d.key),
      );
    });

    types.forEach(d => {
      // @ts-ignore
      expect(isPropertyOf(dataset, 'other', is[d.key])).toBe(['integer', 'number'].includes(d.key));
    });

    types
      .filter(d => d.key !== 'object')
      .forEach(d => {
        // @ts-ignore
        expect(isPropertyOf(dataset, 'items', is[d.key])).toBe(d.key === 'array');
      });

    types
      .filter(d => d.key !== 'object')
      .forEach(d => {
        // @ts-ignore
        expect(isPropertyOf(dataset, 'fn', is[d.key])).toBe(d.key === 'function');
      });
  });
});

describe('isRegexp', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isRegexp(d.value)}`, () => {
      expect(isRegexp(d.value)).toBe(d.key === 'regexp');
    });
  });
});

describe('isSet', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isSet(d.value)}`, () => {
      expect(isSet(d.value)).toBe(d.key === 'set');
    });
  });
});

describe('isString', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isString(d.value)}`, () => {
      expect(isString(d.value)).toBe(['nonEmptyString', 'numericString', 'string'].includes(d.key));
    });
  });
});

describe('isSymbol', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isSymbol(d.value)}`, () => {
      expect(isSymbol(d.value)).toBe(d.key === 'symbol');
    });
  });
});

describe('isUndefined', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isUndefined(d.value)}`, () => {
      expect(isUndefined(d.value)).toBe(d.key === 'undefined');
    });
  });
});

describe('isUrl', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isUrl(d.value)}`, () => {
      expect(isUrl(d.value)).toBe(d.key === 'url');
    });
  });
});

describe('isWeakMap', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isWeakMap(d.value)}`, () => {
      expect(isWeakMap(d.value)).toBe(d.key === 'weakMap');
    });
  });
});

describe('isWeakSet', () => {
  types.forEach(d => {
    it(`${d.key} should return ${isWeakSet(d.value)}`, () => {
      expect(isWeakSet(d.value)).toBe(d.key === 'weakSet');
    });
  });
});
