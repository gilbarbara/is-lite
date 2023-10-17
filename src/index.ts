/* eslint-disable @typescript-eslint/ban-types */
const DOM_PROPERTIES_TO_CHECK: Array<keyof HTMLElement> = [
  'innerHTML',
  'ownerDocument',
  'style',
  'attributes',
  'nodeValue',
];

const objectTypes = [
  'Array',
  'ArrayBuffer',
  'AsyncFunction',
  'AsyncGenerator',
  'AsyncGeneratorFunction',
  'Date',
  'Error',
  'Function',
  'Generator',
  'GeneratorFunction',
  'HTMLElement',
  'Map',
  'Object',
  'Promise',
  'RegExp',
  'Set',
  'WeakMap',
  'WeakSet',
] as const;

const primitiveTypes = [
  'bigint',
  'boolean',
  'null',
  'number',
  'string',
  'symbol',
  'undefined',
] as const;

export type Class<T = unknown> = new (...arguments_: any[]) => T;
export type ObjectTypes = (typeof objectTypes)[number];
export type PlainObject = Record<number | string | symbol, unknown>;
export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
export type PrimitiveTypes = (typeof primitiveTypes)[number];
export type TypeName = ObjectTypes | PrimitiveTypes;

export function getObjectType(value: unknown): ObjectTypes | undefined {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);

  if (/HTML\w+Element/.test(objectTypeName)) {
    return 'HTMLElement';
  }

  if (isObjectType(objectTypeName)) {
    return objectTypeName;
  }

  return undefined;
}

export function isObjectOfType<T>(type: string) {
  return (value: unknown): value is T => getObjectType(value) === type;
}

export function isObjectType(name: unknown): name is ObjectTypes {
  return objectTypes.includes(name as ObjectTypes);
}

export function isOfType<T extends Primitive | Function>(type: string) {
  // eslint-disable-next-line valid-typeof
  return (value: unknown): value is T => typeof value === type;
}

export function isPrimitiveType(name: unknown): name is PrimitiveTypes {
  return primitiveTypes.includes(name as PrimitiveTypes);
}

export const { isArray } = Array;

export const isArrayOf = (target: unknown[], predicate: (v: unknown) => boolean): boolean => {
  if (!is.array(target) && !is.function(predicate)) {
    return false;
  }

  return target.every(d => predicate(d));
};

export const isAsyncGeneratorFunction = (
  value: unknown,
): value is (...arguments_: any[]) => Promise<unknown> =>
  getObjectType(value) === 'AsyncGeneratorFunction';

export const isAsyncFunction = isObjectOfType<Function>('AsyncFunction');

export const isBigInt = isOfType<bigint>('bigint');

export const isBoolean = (value: unknown): value is boolean => {
  return value === true || value === false;
};

export const isDate = isObjectOfType<Date>('Date');

export const isDefined = (value: unknown): boolean => !is.undefined(value);

export const isDomElement = (value: unknown): value is HTMLElement => {
  return (
    is.object(value) &&
    !is.plainObject(value) &&
    (value as HTMLElement).nodeType === 1 &&
    is.string((value as HTMLElement).nodeName) &&
    DOM_PROPERTIES_TO_CHECK.every(property => property in (value as HTMLElement))
  );
};

export const isEmpty = (value: unknown): boolean => {
  return (
    (is.string(value) && value.length === 0) ||
    (is.array(value) && value.length === 0) ||
    (is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0) ||
    (is.set(value) && value.size === 0) ||
    (is.map(value) && value.size === 0)
  );
};

export const isError = isObjectOfType<Error>('Error');

export const isFunction = isOfType<Function>('function');

export const isGenerator = (value: unknown): value is Generator => {
  return (
    is.iterable(value) &&
    is.function((value as IterableIterator<unknown>).next) &&
    is.function((value as IterableIterator<unknown>).throw)
  );
};

export const isGeneratorFunction = isObjectOfType<GeneratorFunction>('GeneratorFunction');

export const isInstanceOf = <T>(instance: unknown, class_: Class<T>): instance is T => {
  if (!instance || !(class_ as Class<T>)) {
    return false;
  }

  return Object.getPrototypeOf(instance) === class_.prototype;
};

export const isIterable = (value: unknown): value is IterableIterator<unknown> => {
  return (
    !is.nullOrUndefined(value) && is.function((value as IterableIterator<unknown>)[Symbol.iterator])
  );
};

export const isMap = isObjectOfType<Map<unknown, unknown>>('Map');

export const isNan = (value: unknown): boolean => {
  return Number.isNaN(value as number);
};

export const isNull = (value: unknown): value is null => {
  return value === null;
};

export const isNullOrUndefined = (value: unknown): value is null | undefined => {
  return is.null(value) || is.undefined(value);
};

export const isNumber = (value: unknown): value is number => {
  return isOfType<number>('number')(value) && !is.nan(value);
};

export const isNumericString = (value: unknown): value is string => {
  return is.string(value) && (value as string).length > 0 && !Number.isNaN(Number(value));
};

export const isObject = (value: unknown): value is object => {
  return !is.nullOrUndefined(value) && (is.function(value) || typeof value === 'object');
};

export const isOneOf = (target: unknown[], value: any): boolean => {
  if (!is.array(target)) {
    return false;
  }

  // eslint-disable-next-line unicorn/prefer-includes
  return target.indexOf(value) > -1;
};

export const isPlainFunction = isObjectOfType<Function>('Function');

export const isPlainObject = (value: unknown): value is PlainObject => {
  if (getObjectType(value) !== 'Object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === null || prototype === Object.getPrototypeOf({});
};

export const isPrimitive = (value: unknown): value is Primitive =>
  is.null(value) || isPrimitiveType(typeof value);

export const isPromise = isObjectOfType<Promise<unknown>>('Promise');

export const isPropertyOf = (
  target: PlainObject,
  key: string,
  predicate?: (v: unknown) => boolean,
): boolean => {
  if (!is.object(target) || !key) {
    return false;
  }

  const value = target[key];

  if (is.function(predicate)) {
    return predicate(value);
  }

  return is.defined(value);
};

export const isRegexp = isObjectOfType<RegExp>('RegExp');

export const isSet = isObjectOfType<Set<PlainObject>>('Set');

export const isString = isOfType<string>('string');

export const isSymbol = isOfType<symbol>('symbol');

export const isUndefined = isOfType<undefined>('undefined');

export const isWeakMap = isObjectOfType<WeakMap<PlainObject, unknown>>('WeakMap');

export const isWeakSet = isObjectOfType<WeakSet<PlainObject>>('WeakSet');

function is(value: unknown): TypeName {
  if (value === null) {
    return 'null';
  }

  switch (typeof value) {
    case 'bigint':
      return 'bigint';
    case 'boolean':
      return 'boolean';
    case 'number':
      return 'number';
    case 'string':
      return 'string';
    case 'symbol':
      return 'symbol';
    case 'undefined':
      return 'undefined';
    default:
  }

  if (is.array(value)) {
    return 'Array';
  }

  if (is.plainFunction(value)) {
    return 'Function';
  }

  const tagType = getObjectType(value);

  if (tagType) {
    return tagType;
  }
  /* c8 ignore next 3 */

  return 'Object';
}

is.array = isArray;
is.arrayOf = isArrayOf;
is.asyncGeneratorFunction = isAsyncGeneratorFunction;
is.asyncFunction = isAsyncFunction;
is.bigint = isBigInt;
is.boolean = isBoolean;
is.date = isDate;
is.defined = isDefined;
is.domElement = isDomElement;
is.empty = isEmpty;
is.error = isError;
is.function = isFunction;
is.generator = isGenerator;
is.generatorFunction = isGeneratorFunction;
is.instanceOf = isInstanceOf;
is.iterable = isIterable;
is.map = isMap;
is.nan = isNan;
is.null = isNull;
is.nullOrUndefined = isNullOrUndefined;
is.number = isNumber;
is.numericString = isNumericString;
is.object = isObject;
is.oneOf = isOneOf;
is.plainFunction = isPlainFunction;
is.plainObject = isPlainObject;
is.primitive = isPrimitive;
is.promise = isPromise;
is.propertyOf = isPropertyOf;
is.regexp = isRegexp;
is.set = isSet;
is.string = isString;
is.symbol = isSymbol;
is.undefined = isUndefined;
is.weakMap = isWeakMap;
is.weakSet = isWeakSet;

export default is;
