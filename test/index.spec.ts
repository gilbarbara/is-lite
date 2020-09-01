/* eslint-disable symbol-description,max-classes-per-file */
import is from '../src';

class ClassTest {}

function* generatorFn(): any {
  yield 1;
}

async function asyncFn(): Promise<any> {
  return undefined;
}

const types = [
  { key: 'array', value: [] },
  { key: 'asyncFunction', base: 'function', value: asyncFn },
  { key: 'boolean', value: true },
  { key: 'date', value: new Date() },
  { key: 'domElement', value: document.createElement('div') },
  { key: 'error', value: new Error() },
  { key: 'function', value: (): any => undefined },
  { key: 'generator', value: generatorFn() },
  { key: 'generatorFunction', base: 'function', value: generatorFn },
  { key: 'map', value: new Map() },
  { key: 'nan', value: NaN },
  { key: 'null', value: null },
  { key: 'number', value: 1 },
  { key: 'numericString', value: '10' },
  { key: 'object', value: {} },
  { key: 'promise', value: new Promise(() => undefined) },
  { key: 'regexp', value: new RegExp('a-z') },
  { key: 'set', value: new Set() },
  { key: 'string', value: '' },
  { key: 'symbol', value: Symbol() },
  { key: 'undefined', value: undefined },
  { key: 'weakMap', value: new WeakMap() },
  { key: 'weakSet', value: new WeakSet() },
];

describe('is', () => {
  it.each([
    [[], 'Array'],
    [asyncFn, 'AsyncFunction'],
    // eslint-disable-next-line no-undef
    [BigInt(9007199254740991), 'bigint'],
    [true, 'boolean'],
    [new Date(), 'Date'],
    [document.createElement('div'), 'HTMLDivElement'],
    [new Error(), 'Error'],
    [(): any => undefined, 'Function'],
    [generatorFn(), 'Generator'],
    [generatorFn, 'GeneratorFunction'],
    [new Map(), 'Map'],
    [NaN, 'number'],
    [null, 'null'],
    [1, 'number'],
    [{}, 'Object'],
    [new Promise(() => undefined), 'Promise'],
    [new RegExp('a-z'), 'RegExp'],
    [new Set(), 'Set'],
    ['', 'string'],
    [Symbol(), 'symbol'],
    [undefined, 'undefined'],
    [new WeakMap(), 'WeakMap'],
    [new WeakSet(), 'WeakSet'],
  ])('%p should return %p', (input: any, expected: string) => {
    expect(is(input)).toBe(expected);
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

describe('instanceOf', () => {
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
        ['array', 'generator', 'map', 'numericString', 'set', 'string'].indexOf(d.key) >= 0,
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
      expect(is.nullOrUndefined(d.value)).toBe(['null', 'undefined'].indexOf(d.key) >= 0);
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
  types.forEach(d => {
    it(`${d.key} should return ${is.object(d.value)}`, () => {
      expect(is.object(d.value)).toBe(
        [
          'array',
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
        ].indexOf(d.key) >= 0,
      );
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
      expect(is.string(d.value)).toBe(['numericString', 'string'].indexOf(d.key) >= 0);
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
