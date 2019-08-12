import is from '../src';

class ClassTest {}

function* generatorTest(): any {
  yield 1;
}

async function asyncTest(): Promise<any> {
  return undefined;
}

const types = [
  { key: 'array', value: [] },
  { key: 'asyncFunction', value: asyncTest },
  { key: 'boolean', value: true },
  { key: 'date', value: new Date() },
  { key: 'domElement', value: document.createElement('div') },
  { key: 'error', value: new Error() },
  { key: 'function', value: (): any => undefined },
  { key: 'generator', value: generatorTest() },
  { key: 'generatorFunction', value: generatorTest },
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
    ['array', [], 'Array'],
    ['async function', asyncTest, 'AsyncFunction'],
    ['bigInt', BigInt(9007199254740991), 'bigint'],
    ['boolean', true, 'boolean'],
    ['date', new Date(), 'Date'],
    ['domElement', document.createElement('div'), 'HTMLDivElement'],
    ['error', new Error(), 'Error'],
    ['function', (): any => undefined, 'Function'],
    ['generator', generatorTest(), 'Generator'],
    ['generator function', generatorTest, 'GeneratorFunction'],
    ['map', new Map(), 'Map'],
    ['nan', NaN, 'number'],
    ['null', null, 'null'],
    ['number', 1, 'number'],
    ['object', {}, 'Object'],
    ['promise', new Promise(() => undefined), 'Promise'],
    ['regex', new RegExp('a-z'), 'RegExp'],
    ['set', new Set(), 'Set'],
    ['string', '', 'string'],
    ['symbol', Symbol(), 'symbol'],
    ['undefined', undefined, 'undefined'],
    ['weakMap', new WeakMap(), 'WeakMap'],
    ['weakSet', new WeakSet(), 'WeakSet'],
  ])(
    '%p should return properly',
    // @ts-ignore
    // tslint:disable-next-line:variable-name
    (_title: string, input: any, expected: string) => {
      expect(is(input)).toBe(expected);
    },
  );
});

describe('is.asyncFunction', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'asyncFunction',
      }))
      .forEach(d => {
        expect(is.asyncFunction(d.value)).toBe(d.expected);
      });
  });
});

describe('is.array', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'array',
      }))
      .forEach(d => {
        expect(is.array(d.value)).toBe(d.expected);
      });
  });
});

describe('is.boolean', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'boolean',
      }))
      .forEach(d => {
        expect(is.boolean(d.value)).toBe(d.expected);
      });
  });
});

describe('is.date', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'date',
      }))
      .forEach(d => {
        expect(is.date(d.value)).toBe(d.expected);
      });
  });
});

describe('is.domElement', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'domElement',
      }))
      .forEach(d => {
        expect(is.domElement(d.value)).toBe(d.expected);
      });
  });
});

describe('is.function', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'function',
      }))
      .forEach(d => {
        expect(is.function(d.value)).toBe(d.expected);
      });
  });
});

describe('is.generator', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'generator',
      }))
      .forEach(d => {
        expect(is.generator(d.value)).toBe(d.expected);
      });
  });
});

describe('is.generatorFunction', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'generatorFunction',
      }))
      .forEach(d => {
        expect(is.generatorFunction(d.value)).toBe(d.expected);
      });
  });
});

describe('instanceOf', () => {
  it('should return the expected value', () => {
    const test = new ClassTest();

    expect(is.instanceOf(test, ClassTest)).toBe(true);

    // tslint:disable-next-line:max-classes-per-file
    expect(is.instanceOf(test, class Test2 {})).toBe(false);

    types
      .map(d => ({
        ...d,
        expected: false,
      }))
      .forEach(d => {
        expect(is.instanceOf(d.value, ClassTest)).toBe(d.expected);
      });
  });
});

describe('is.iterable', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected:
          ['array', 'generator', 'map', 'numericString', 'set', 'string'].indexOf(d.key) >= 0,
      }))
      .forEach(d => {
        expect(is.iterable(d.value)).toBe(d.expected);
      });
  });
});

describe('is.map', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'map',
      }))
      .forEach(d => {
        expect(is.map(d.value)).toBe(d.expected);
      });
  });
});

describe('is.null', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'null',
      }))
      .forEach(d => {
        expect(is.null(d.value)).toBe(d.expected);
      });
  });
});

describe('is.nullOrUndefined', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: ['null', 'undefined'].indexOf(d.key) >= 0,
      }))
      .forEach(d => {
        expect(is.nullOrUndefined(d.value)).toBe(d.expected);
      });
  });
});

describe('is.number', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'number',
      }))
      .forEach(d => {
        expect(is.number(d.value)).toBe(d.expected);
      });
  });
});

describe('is.numericString', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'numericString',
      }))
      .forEach(d => {
        expect(is.numericString(d.value)).toBe(d.expected);
      });
  });
});

describe('is.object', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected:
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
      }))
      .forEach(d => {
        expect(is.object(d.value)).toBe(d.expected);
      });
  });
});

describe('is.plainObject', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'object',
      }))
      .forEach(d => {
        expect(is.plainObject(d.value)).toBe(d.expected);
      });
  });
});

describe('is.promise', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'promise',
      }))
      .forEach(d => {
        expect(is.promise(d.value)).toBe(d.expected);
      });
  });
});

describe('is.regexp', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'regexp',
      }))
      .forEach(d => {
        expect(is.regexp(d.value)).toBe(d.expected);
      });
  });
});

describe('is.set', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'set',
      }))
      .forEach(d => {
        expect(is.set(d.value)).toBe(d.expected);
      });
  });
});

describe('is.string', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: ['numericString', 'string'].indexOf(d.key) >= 0,
      }))
      .forEach(d => {
        expect(is.string(d.value)).toBe(d.expected);
      });
  });
});

describe('is.symbol', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'symbol',
      }))
      .forEach(d => {
        expect(is.symbol(d.value)).toBe(d.expected);
      });
  });
});

describe('is.undefined', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'undefined',
      }))
      .forEach(d => {
        expect(is.undefined(d.value)).toBe(d.expected);
      });
  });
});

describe('is.weakMap', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'weakMap',
      }))
      .forEach(d => {
        expect(is.weakMap(d.value)).toBe(d.expected);
      });
  });
});

describe('is.weakSet', () => {
  it('should return the expected value', () => {
    types
      .map(d => ({
        ...d,
        expected: d.key === 'weakSet',
      }))
      .forEach(d => {
        expect(is.weakSet(d.value)).toBe(d.expected);
      });
  });
});
