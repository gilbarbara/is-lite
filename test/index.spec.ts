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
  { key: 'asyncFunction', value: asyncFn },
  { key: 'boolean', value: true },
  { key: 'date', value: new Date() },
  { key: 'domElement', value: document.createElement('div') },
  { key: 'error', value: new Error() },
  { key: 'function', value: (): any => undefined },
  { key: 'generator', value: generatorFn() },
  { key: 'generatorFunction', value: generatorFn },
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

describe('is.asyncFunction', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.asyncFunction(d.value)).toBe(d.key === 'asyncFunction');
    });
  });
});

describe('is.array', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
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

describe('is.boolean', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.boolean(d.value)).toBe(d.key === 'boolean');
    });
  });
});

describe('is.date', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.date(d.value)).toBe(d.key === 'date');
    });
  });
});

describe('is.defined', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.defined(d.value)).toBe(d.key !== 'undefined');
    });
  });
});

describe('is.domElement', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
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
  ])(
    '%p should return %p',
    // @ts-ignore
    (input: any, expected: boolean) => {
      expect(is.empty(input)).toBe(expected);
    },
  );
});

describe('is.error', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.error(d.value)).toBe(d.key === 'error');
    });
  });
});

describe('is.function', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.function(d.value)).toBe(d.key === 'function');
    });
  });
});

describe('is.generator', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.generator(d.value)).toBe(d.key === 'generator');
    });
  });
});

describe('is.generatorFunction', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.generatorFunction(d.value)).toBe(d.key === 'generatorFunction');
    });
  });
});

describe('instanceOf', () => {
  it('should return the expected value', () => {
    const test = new ClassTest();

    expect(is.instanceOf(test, ClassTest)).toBe(true);

    // tslint:disable-next-line:max-classes-per-file
    expect(is.instanceOf(test, class Test2 {})).toBe(false);

    types.forEach(d => {
      expect(is.instanceOf(d.value, ClassTest)).toBe(false);
    });
  });
});

describe('is.iterable', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.iterable(d.value)).toBe(
        ['array', 'generator', 'map', 'numericString', 'set', 'string'].indexOf(d.key) >= 0,
      );
    });
  });
});

describe('is.map', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.map(d.value)).toBe(d.key === 'map');
    });
  });
});

describe('is.null', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.null(d.value)).toBe(d.key === 'null');
    });
  });
});

describe('is.nullOrUndefined', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.nullOrUndefined(d.value)).toBe(['null', 'undefined'].indexOf(d.key) >= 0);
    });
  });
});

describe('is.number', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.number(d.value)).toBe(d.key === 'number');
    });
  });
});

describe('is.numericString', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.numericString(d.value)).toBe(d.key === 'numericString');
    });
  });
});

describe('is.object', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.object(d.value)).toBe(
        [
          'array',
          'date',
          'domElement',
          'error',
          'function',
          'generator',
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

describe('is.plainObject', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.plainObject(d.value)).toBe(d.key === 'object');
    });
  });
});

describe('is.promise', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
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
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.regexp(d.value)).toBe(d.key === 'regexp');
    });
  });
});

describe('is.set', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.set(d.value)).toBe(d.key === 'set');
    });
  });
});

describe('is.string', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.string(d.value)).toBe(['numericString', 'string'].indexOf(d.key) >= 0);
    });
  });
});

describe('is.symbol', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.symbol(d.value)).toBe(d.key === 'symbol');
    });
  });
});

describe('is.undefined', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.undefined(d.value)).toBe(d.key === 'undefined');
    });
  });
});

describe('is.weakMap', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.weakMap(d.value)).toBe(d.key === 'weakMap');
    });
  });
});

describe('is.weakSet', () => {
  it('should return the expected value', () => {
    types.forEach(d => {
      expect(is.weakSet(d.value)).toBe(d.key === 'weakSet');
    });
  });
});
