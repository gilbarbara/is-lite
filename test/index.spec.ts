/* eslint-disable symbol-description,prefer-regex-literals */

import is from '../src';

import { asyncFn, asyncGeneratorFn, ClassTest, generatorFn, tagNames } from './__fixtures';

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

describe('is.* methods (smoke tests)', () => {
  it('should expose all type checker methods', () => {
    // Verify all methods exist and return correct types
    expect(is.array([])).toBe(true);
    expect(is.arrayOf([1, 2], is.number)).toBe(true);
    expect(is.asyncFunction(asyncFn)).toBe(true);
    expect(is.asyncGeneratorFunction(asyncGeneratorFn)).toBe(true);
    expect(is.bigint(BigInt(1))).toBe(true);
    expect(is.boolean(true)).toBe(true);
    expect(is.class(ClassTest)).toBe(true);
    expect(is.date(new Date())).toBe(true);
    expect(is.defined('value')).toBe(true);
    expect(is.domElement(document.createElement('div'))).toBe(true);
    expect(is.empty([])).toBe(true);
    expect(is.error(new Error())).toBe(true);
    expect(is.function(() => {})).toBe(true);
    expect(is.generator(generatorFn())).toBe(true);
    expect(is.generatorFunction(generatorFn)).toBe(true);
    expect(is.instanceOf(new ClassTest(), ClassTest)).toBe(true);
    expect(is.integer(42)).toBe(true);
    expect(is.iterable([])).toBe(true);
    expect(is.map(new Map())).toBe(true);
    expect(is.nan(NaN)).toBe(true);
    expect(is.null(null)).toBe(true);
    expect(is.nullOrUndefined(null)).toBe(true);
    expect(is.nonEmptyString('hello')).toBe(true);
    expect(is.number(1)).toBe(true);
    expect(is.numericString('123')).toBe(true);
    expect(is.object({})).toBe(true);
    expect(is.oneOf([1, 2, 3], 2)).toBe(true);
    expect(is.plainFunction(() => {})).toBe(true);
    expect(is.plainObject({})).toBe(true);
    expect(is.primitive('string')).toBe(true);
    expect(is.promise(new Promise(() => {}))).toBe(true);
    expect(is.propertyOf({ key: 'value' }, 'key')).toBe(true);
    expect(is.regexp(/test/)).toBe(true);
    expect(is.set(new Set())).toBe(true);
    expect(is.string('')).toBe(true);
    expect(is.symbol(Symbol())).toBe(true);
    expect(is.undefined(undefined)).toBe(true);
    expect(is.url(new URL('https://example.com'))).toBe(true);
    expect(is.weakMap(new WeakMap())).toBe(true);
    expect(is.weakSet(new WeakSet())).toBe(true);
  });

  it('should return false for incorrect types', () => {
    expect(is.array('not array')).toBe(false);
    expect(is.string(123)).toBe(false);
    expect(is.number('123')).toBe(false);
    expect(is.boolean(1)).toBe(false);
    expect(is.plainObject([])).toBe(false);
  });
});
