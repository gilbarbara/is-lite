/* eslint-disable symbol-description,prefer-regex-literals,no-promise-executor-return */

import { asyncFn, asyncGeneratorFn, ClassTest, generatorFn, tagNames, types } from './__fixtures';

import is from '../src';

describe('is', () => {
  it.each([
    { input: [], expected: 'Array' },
    { input: asyncFn, expected: 'AsyncFunction' },
    { input: asyncGeneratorFn, expected: 'AsyncGeneratorFunction' },
    { input: BigInt(9007199254740991), expected: 'bigint' },
    { input: true, expected: 'boolean' },
    { input: new Date(), expected: 'Date' },
    { input: document.createElement('div'), expected: 'HTMLElement' },
    { input: new Error(), expected: 'Error' },
    { input: (): any => undefined, expected: 'Function' },
    { input: generatorFn(), expected: 'Generator' },
    { input: generatorFn, expected: 'GeneratorFunction' },
    { input: new Map(), expected: 'Map' },
    { input: NaN, expected: 'number' },
    { input: null, expected: 'null' },
    { input: 1, expected: 'number' },
    { input: {}, expected: 'Object' },
    { input: new Promise(() => undefined), expected: 'Promise' },
    { input: new RegExp('a-z'), expected: 'RegExp' },
    { input: new Set(), expected: 'Set' },
    { input: '', expected: 'string' },
    { input: Symbol(), expected: 'symbol' },
    { input: undefined, expected: 'undefined' },
    { input: new WeakMap(), expected: 'WeakMap' },
    { input: new WeakSet(), expected: 'WeakSet' },
  ])('should match $expected', ({ expected, input }) => {
    expect(is(input)).toBe(expected);
  });

  it.each(tagNames.map(d => [d]))('%s should return HTMLElement', tagName => {
    expect(is(document.createElement(tagName))).toBe('HTMLElement');
  });
});

describe('is.array', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.array(d.value)}`, () => {
      expect(is.array(d.value)).toBe(d.key === 'array');
    });
  });
});

describe('is.arrayOf', () => {
  it('should return the expected value', () => {
    expect(is.arrayOf([1, 2, 3], is.number)).toBe(true);
    expect(is.arrayOf(['a', 'b', 'c'], is.string)).toBe(true);
    expect(is.arrayOf([{ a: 1 }, { b: 2 }], is.plainObject)).toBe(true);

    expect(is.arrayOf([1, 2, 'three'], is.number)).toBe(false);
    expect(is.arrayOf([1, 'b', { a: 1 }], is.string)).toBe(false);

    // @ts-ignore
    expect(is.arrayOf()).toBe(false);
  });
});

describe('is.asyncFunction', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.asyncFunction(d.value)}`, () => {
      expect(is.asyncFunction(d.value)).toBe(d.key === 'asyncFunction');
    });
  });
});

describe('is.asyncGeneratorFunction', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.asyncGeneratorFunction(d.value)}`, () => {
      expect(is.asyncGeneratorFunction(d.value)).toBe(d.key === 'asyncGeneratorFunction');
    });
  });
});

describe('is.bigint', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.bigint(d.value)}`, () => {
      expect(is.bigint(d.value)).toBe(d.key === 'bigint');
    });
  });
});

describe('is.boolean', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.boolean(d.value)}`, () => {
      expect(is.boolean(d.value)).toBe(d.key === 'boolean');
    });
  });
});

describe('is.date', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.date(d.value)}`, () => {
      expect(is.date(d.value)).toBe(d.key === 'date');
    });
  });
});

describe('is.defined', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.defined(d.value)}`, () => {
      expect(is.defined(d.value)).toBe(d.key !== 'undefined');
    });
  });
});

describe('is.domElement', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.domElement(d.value)}`, () => {
      expect(is.domElement(d.value)).toBe(d.key === 'domElement');
    });
  });

  it.each(tagNames.map(d => [d]))('%p should match HTMLElement', tagName => {
    expect(is.domElement(document.createElement(tagName))).toBe(true);
  });
});

describe('is.empty', () => {
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
    expect(is.empty(input)).toBe(expected);
  });
});

describe('is.error', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.error(d.value)}`, () => {
      expect(is.error(d.value)).toBe(d.key === 'error');
    });
  });
});

describe('is.function', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.function(d.value)}`, () => {
      expect(is.function(d.value)).toBe(d.key === 'function' || d.base === 'function');
    });
  });
});

describe('is.generator', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.generator(d.value)}`, () => {
      expect(is.generator(d.value)).toBe(d.key === 'generator');
    });
  });
});

describe('is.generatorFunction', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.generatorFunction(d.value)}`, () => {
      expect(is.generatorFunction(d.value)).toBe(d.key === 'generatorFunction');
    });
  });
});

describe('is.instanceOf', () => {
  const test = new ClassTest();

  it('should return the expected value', () => {
    expect(is.instanceOf(test, ClassTest)).toBe(true);

    expect(is.instanceOf(test, class Test2 {})).toBe(false);
  });

  types.forEach(d => {
    it(`${d.key} should return ${is.instanceOf(d.value, ClassTest)}`, () => {
      expect(is.instanceOf(d.value, ClassTest)).toBe(false);
    });
  });
});

describe('is.iterable', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.iterable(d.value)}`, () => {
      expect(is.iterable(d.value)).toBe(
        ['array', 'generator', 'map', 'numericString', 'set', 'string'].includes(d.key),
      );
    });
  });
});

describe('is.map', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.map(d.value)}`, () => {
      expect(is.map(d.value)).toBe(d.key === 'map');
    });
  });
});

describe('is.nan', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.nan(d.value)}`, () => {
      expect(is.nan(d.value)).toBe(d.key === 'nan');
    });
  });
});

describe('is.null', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.null(d.value)}`, () => {
      expect(is.null(d.value)).toBe(d.key === 'null');
    });
  });
});

describe('is.nullOrUndefined', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.nullOrUndefined(d.value)}`, () => {
      expect(is.nullOrUndefined(d.value)).toBe(['null', 'undefined'].includes(d.key));
    });
  });
});

describe('is.number', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.number(d.value)}`, () => {
      expect(is.number(d.value)).toBe(d.key === 'number');
    });
  });
});

describe('is.numericString', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.numericString(d.value)}`, () => {
      expect(is.numericString(d.value)).toBe(d.key === 'numericString');
    });
  });
});

describe('is.object', () => {
  const validTypes = [
    'array',
    'asyncGeneratorFunction',
    'asyncFunction',
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
    'weakMap',
    'weakSet',
  ];

  types.forEach(d => {
    it(`${d.key} should return ${is.object(d.value)}`, () => {
      expect(is.object(d.value)).toBe(validTypes.includes(d.key));
    });
  });
});

describe('is.oneOf', () => {
  it('should return the expected value', () => {
    const dataset = ['some', 'thing', 10, null];

    expect(is.oneOf(dataset, 'some')).toBe(true);
    expect(is.oneOf(dataset, 10)).toBe(true);
    expect(is.oneOf(dataset, null)).toBe(true);

    expect(is.oneOf(dataset, 'other')).toBe(false);
    expect(is.oneOf(dataset, 11)).toBe(false);
    expect(is.oneOf(dataset, undefined)).toBe(false);

    // @ts-ignore
    expect(is.oneOf()).toBe(false);
  });
});

describe('is.plainFunction', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.plainFunction(d.value)}`, () => {
      expect(is.plainFunction(d.value)).toBe(d.key === 'function');
    });
  });
});

describe('is.plainObject', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.plainObject(d.value)}`, () => {
      expect(is.plainObject(d.value)).toBe(d.key === 'object');
    });
  });
});

describe('is.primitive', () => {
  const validTypes = [
    'bigint',
    'boolean',
    'null',
    'nan',
    'number',
    'numericString',
    'string',
    'symbol',
    'undefined',
  ];

  types.forEach(d => {
    it(`${d.key} should return ${is.primitive(d.value)}`, () => {
      expect(is.primitive(d.value)).toBe(validTypes.includes(d.key));
    });
  });
});

describe('is.promise', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.promise(d.value)}`, () => {
      expect(is.promise(d.value)).toBe(d.key === 'promise');
    });
  });
});

describe('is.propertyOf', () => {
  const dataset = {
    fn: () => true,
    items: [],
    other: 1,
    some: 'thing',
  };

  it('basic usage', () => {
    expect(is.propertyOf(dataset, 'fn')).toBe(true);
    expect(is.propertyOf(dataset, 'items')).toBe(true);
    expect(is.propertyOf(dataset, 'other')).toBe(true);
    expect(is.propertyOf(dataset, 'some')).toBe(true);

    expect(is.propertyOf(dataset, 'something')).toBe(false);
    expect(is.propertyOf(dataset, 'fake')).toBe(false);

    // @ts-ignore
    expect(is.propertyOf()).toBe(false);
  });

  it('with predicate', () => {
    types.forEach(d => {
      // @ts-ignore
      expect(is.propertyOf(dataset, 'some', is[d.key])).toBe(d.key === 'string');
    });

    types.forEach(d => {
      // @ts-ignore
      expect(is.propertyOf(dataset, 'other', is[d.key])).toBe(d.key === 'number');
    });

    types
      .filter(d => d.key !== 'object')
      .forEach(d => {
        // @ts-ignore
        expect(is.propertyOf(dataset, 'items', is[d.key])).toBe(d.key === 'array');
      });

    types
      .filter(d => d.key !== 'object')
      .forEach(d => {
        // @ts-ignore
        expect(is.propertyOf(dataset, 'fn', is[d.key])).toBe(d.key === 'function');
      });
  });
});

describe('is.regexp', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.regexp(d.value)}`, () => {
      expect(is.regexp(d.value)).toBe(d.key === 'regexp');
    });
  });
});

describe('is.set', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.set(d.value)}`, () => {
      expect(is.set(d.value)).toBe(d.key === 'set');
    });
  });
});

describe('is.string', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.string(d.value)}`, () => {
      expect(is.string(d.value)).toBe(['numericString', 'string'].includes(d.key));
    });
  });
});

describe('is.symbol', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.symbol(d.value)}`, () => {
      expect(is.symbol(d.value)).toBe(d.key === 'symbol');
    });
  });
});

describe('is.undefined', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.undefined(d.value)}`, () => {
      expect(is.undefined(d.value)).toBe(d.key === 'undefined');
    });
  });
});

describe('is.weakMap', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.weakMap(d.value)}`, () => {
      expect(is.weakMap(d.value)).toBe(d.key === 'weakMap');
    });
  });
});

describe('is.weakSet', () => {
  types.forEach(d => {
    it(`${d.key} should return ${is.weakSet(d.value)}`, () => {
      expect(is.weakSet(d.value)).toBe(d.key === 'weakSet');
    });
  });
});
