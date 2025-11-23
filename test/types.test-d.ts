/* eslint-disable vitest/expect-expect,@typescript-eslint/no-unsafe-function-type,unicorn/consistent-function-scoping */
import { expectTypeOf } from 'vitest';

import is from '../src';
import {
  isArray,
  isAsyncFunction,
  isAsyncGeneratorFunction,
  isBigInt,
  isBoolean,
  isClass,
  isDate,
  isDefined,
  isDomElement,
  isError,
  isFunction,
  isGenerator,
  isGeneratorFunction,
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
  isPlainFunction,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRegexp,
  isSet,
  isString,
  isSymbol,
  isUndefined,
  isUrl,
  isWeakMap,
  isWeakSet,
} from '../src/standalone';
import type { PlainObject, Primitive } from '../src/types';

describe('standalone type guards', () => {
  describe('primitive type guards', () => {
    it('isString narrows to string', () => {
      const value: unknown = 'test';

      if (isString(value)) {
        expectTypeOf(value).toEqualTypeOf<string>();
      }
    });

    it('isNumber narrows to number', () => {
      const value: unknown = 42;

      if (isNumber(value)) {
        expectTypeOf(value).toEqualTypeOf<number>();
      }
    });

    it('isBoolean narrows to boolean', () => {
      const value: unknown = true;

      if (isBoolean(value)) {
        expectTypeOf(value).toEqualTypeOf<boolean>();
      }
    });

    it('isBigInt narrows to bigint', () => {
      const value: unknown = BigInt(1);

      if (isBigInt(value)) {
        expectTypeOf(value).toEqualTypeOf<bigint>();
      }
    });

    it('isSymbol narrows to symbol', () => {
      const value: unknown = Symbol('test');

      if (isSymbol(value)) {
        expectTypeOf(value).toEqualTypeOf<symbol>();
      }
    });

    it('isNull narrows to null', () => {
      const value: unknown = null;

      if (isNull(value)) {
        expectTypeOf(value).toEqualTypeOf<null>();
      }
    });

    it('isUndefined narrows to undefined', () => {
      const value: unknown = undefined;

      if (isUndefined(value)) {
        expectTypeOf(value).toEqualTypeOf<undefined>();
      }
    });

    it('isPrimitive narrows to Primitive', () => {
      const value: unknown = 'test';

      if (isPrimitive(value)) {
        expectTypeOf(value).toEqualTypeOf<Primitive>();
      }
    });
  });

  describe('object type guards', () => {
    it('isArray narrows to array', () => {
      const value: unknown = [1, 2, 3];

      if (isArray(value)) {
        expectTypeOf(value).toEqualTypeOf<unknown[]>();
      }
    });

    it('isArray with generic narrows to typed array', () => {
      const value: unknown = [1, 2, 3];

      if (isArray<number>(value)) {
        expectTypeOf(value).toEqualTypeOf<number[]>();
      }
    });

    it('isObject narrows to object', () => {
      const value: unknown = {};

      if (isObject(value)) {
        expectTypeOf(value).toEqualTypeOf<object>();
      }
    });

    it('isPlainObject narrows to PlainObject', () => {
      const value: unknown = {};

      if (isPlainObject(value)) {
        expectTypeOf(value).toEqualTypeOf<PlainObject>();
      }
    });

    it('isDate narrows to Date', () => {
      const value: unknown = new Date();

      if (isDate(value)) {
        expectTypeOf(value).toEqualTypeOf<Date>();
      }
    });

    it('isError narrows to Error', () => {
      const value: unknown = new Error();

      if (isError(value)) {
        expectTypeOf(value).toEqualTypeOf<Error>();
      }
    });

    it('isRegexp narrows to RegExp', () => {
      const value: unknown = /test/;

      if (isRegexp(value)) {
        expectTypeOf(value).toEqualTypeOf<RegExp>();
      }
    });

    it('isMap narrows to Map', () => {
      const value: unknown = new Map();

      if (isMap(value)) {
        expectTypeOf(value).toEqualTypeOf<Map<unknown, unknown>>();
      }
    });

    it('isSet narrows to Set', () => {
      const value: unknown = new Set();

      if (isSet(value)) {
        expectTypeOf(value).toEqualTypeOf<Set<unknown>>();
      }
    });

    it('isWeakMap narrows to WeakMap', () => {
      const value: unknown = new WeakMap();

      if (isWeakMap(value)) {
        expectTypeOf(value).toEqualTypeOf<WeakMap<PlainObject, unknown>>();
      }
    });

    it('isWeakSet narrows to WeakSet', () => {
      const value: unknown = new WeakSet();

      if (isWeakSet(value)) {
        expectTypeOf(value).toEqualTypeOf<WeakSet<PlainObject>>();
      }
    });

    it('isPromise narrows to Promise', () => {
      const value: unknown = Promise.resolve();

      if (isPromise(value)) {
        expectTypeOf(value).toEqualTypeOf<Promise<unknown>>();
      }
    });

    it('isUrl narrows to URL', () => {
      const value: unknown = new URL('https://example.com');

      if (isUrl(value)) {
        expectTypeOf(value).toEqualTypeOf<URL>();
      }
    });
  });

  describe('function type guards', () => {
    it('isFunction narrows to Function', () => {
      const value: unknown = () => {};

      if (isFunction(value)) {
        expectTypeOf(value).toEqualTypeOf<Function>();
      }
    });

    it('isPlainFunction narrows to Function', () => {
      const value: unknown = () => {};

      if (isPlainFunction(value)) {
        expectTypeOf(value).toEqualTypeOf<Function>();
      }
    });

    it('isAsyncFunction narrows to Function', () => {
      const value: unknown = async () => {};

      if (isAsyncFunction(value)) {
        expectTypeOf(value).toEqualTypeOf<Function>();
      }
    });

    it('isGeneratorFunction narrows to GeneratorFunction', () => {
      const value: unknown = function* () {};

      if (isGeneratorFunction(value)) {
        expectTypeOf(value).toEqualTypeOf<GeneratorFunction>();
      }
    });

    it('isAsyncGeneratorFunction narrows to AsyncGeneratorFunction', () => {
      const value: unknown = async function* () {};

      if (isAsyncGeneratorFunction(value)) {
        expectTypeOf(value).toEqualTypeOf<AsyncGeneratorFunction>();
      }
    });

    it('isClass narrows to Class', () => {
      const value: unknown = class {};

      if (isClass(value)) {
        expectTypeOf(value).toExtend<new (...arguments_: any[]) => any>();
      }
    });
  });

  describe('compound type guards', () => {
    it('isNullOrUndefined narrows to null | undefined', () => {
      const value: unknown = null;

      if (isNullOrUndefined(value)) {
        expectTypeOf(value).toEqualTypeOf<null | undefined>();
      }
    });

    it('isDefined excludes undefined from type', () => {
      const value: string | undefined = 'test';

      if (isDefined(value)) {
        expectTypeOf(value).toEqualTypeOf<string>();
      }
    });

    it('isDefined works with union types', () => {
      const value: number | string | undefined = 42;

      if (isDefined(value)) {
        expectTypeOf(value).toEqualTypeOf<number>();
      }
    });

    it('isNan returns type guard for number', () => {
      const value: unknown = NaN;

      if (isNan(value)) {
        expectTypeOf(value).toEqualTypeOf<number>();
      }
    });

    it('isInteger narrows to number', () => {
      const value: unknown = 42;

      if (isInteger(value)) {
        expectTypeOf(value).toEqualTypeOf<number>();
      }
    });

    it('isNonEmptyString narrows to string', () => {
      const value: unknown = 'test';

      if (isNonEmptyString(value)) {
        expectTypeOf(value).toEqualTypeOf<string>();
      }
    });

    it('isNumericString narrows to string', () => {
      const value: unknown = '42';

      if (isNumericString(value)) {
        expectTypeOf(value).toEqualTypeOf<string>();
      }
    });
  });

  describe('iterator type guards', () => {
    it('isIterable narrows to IterableIterator', () => {
      const value: unknown = [1, 2, 3];

      if (isIterable(value)) {
        expectTypeOf(value).toEqualTypeOf<IterableIterator<unknown>>();
      }
    });

    it('isGenerator narrows to Generator', () => {
      const value: unknown = (function* () {
        yield 1;
      })();

      if (isGenerator(value)) {
        expectTypeOf(value).toEqualTypeOf<Generator>();
      }
    });
  });

  describe('DOM type guards', () => {
    it('isDomElement narrows to HTMLElement', () => {
      const value: unknown = document.createElement('div');

      if (isDomElement(value)) {
        expectTypeOf(value).toEqualTypeOf<HTMLElement>();
      }
    });
  });
});

describe('main is object type guards', () => {
  it('is.string narrows to string', () => {
    const value: unknown = 'test';

    if (is.string(value)) {
      expectTypeOf(value).toEqualTypeOf<string>();
    }
  });

  it('is.number narrows to number', () => {
    const value: unknown = 42;

    if (is.number(value)) {
      expectTypeOf(value).toEqualTypeOf<number>();
    }
  });

  it('is.defined excludes undefined', () => {
    const value: string | undefined = 'test';

    if (is.defined(value)) {
      expectTypeOf(value).toEqualTypeOf<string>();
    }
  });

  it('is.array narrows to array', () => {
    const value: unknown = [];

    if (is.array(value)) {
      expectTypeOf(value).toEqualTypeOf<unknown[]>();
    }
  });

  it('is.array with generic narrows to typed array', () => {
    const value: unknown = ['a', 'b'];

    if (is.array<string>(value)) {
      expectTypeOf(value).toEqualTypeOf<string[]>();
    }
  });

  it('is.plainObject narrows to PlainObject', () => {
    const value: unknown = {};

    if (is.plainObject(value)) {
      expectTypeOf(value).toEqualTypeOf<PlainObject>();
    }
  });

  it('is.nullOrUndefined narrows to null | undefined', () => {
    const value: unknown = null;

    if (is.nullOrUndefined(value)) {
      expectTypeOf(value).toEqualTypeOf<null | undefined>();
    }
  });
});
