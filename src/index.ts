import { Class, PlainObject, Primitive } from './types';

const primitiveTypeNames = [
  'bigint',
  'boolean',
  'null',
  'number',
  'string',
  'symbol',
  'undefined',
] as const;

const DOM_PROPERTIES_TO_CHECK: Array<keyof HTMLElement> = [
  'innerHTML',
  'ownerDocument',
  'style',
  'attributes',
  'nodeValue',
];

type PrimitiveTypeName = typeof primitiveTypeNames[number];

const enum Types {
  array = 'Array',
  asyncFunction = 'AsyncFunction',
  asyncGeneratorFunction = 'AsyncGeneratorFunction',
  bigint = 'bigint',
  boolean = 'boolean',
  date = 'Date',
  error = 'Error',
  function = 'Function',
  generator = 'Generator',
  generatorFunction = 'GeneratorFunction',
  iterable = 'Iterable',
  map = 'Map',
  null = 'null',
  number = 'number',
  object = 'Object',
  promise = 'Promise',
  regExp = 'RegExp',
  set = 'Set',
  string = 'string',
  symbol = 'symbol',
  undefined = 'undefined',
  weakMap = 'WeakMap',
  weakSet = 'WeakSet',
}

export const getObjectType = (value: unknown): string =>
  Object.prototype.toString.call(value).slice(8, -1);

const isObjectOfType = <T>(type: string) => (value: unknown): value is T =>
  getObjectType(value) === type;

// eslint-disable-next-line @typescript-eslint/ban-types
const isOfType = <T extends Primitive | Function>(type: string) => (value: unknown): value is T =>
  typeof value === type;

function isPrimitiveType(name: unknown): name is PrimitiveTypeName {
  return primitiveTypeNames.includes(name as PrimitiveTypeName);
}

const is = (value: unknown): Types => {
  if (value === null) {
    return Types.null;
  }

  switch (typeof value) {
    case 'bigint':
      return Types.bigint;
    case 'boolean':
      return Types.boolean;
    case 'number':
      return Types.number;
    case 'string':
      return Types.string;
    case 'symbol':
      return Types.symbol;
    case 'undefined':
      return Types.undefined;
    default:
  }

  if (is.array(value)) {
    return Types.array;
  }

  if (is.plainFunction(value)) {
    return Types.function;
  }

  const tagType = getObjectType(value);
  /* istanbul ignore else */
  if (tagType) {
    return tagType as Types;
  }

  /* istanbul ignore next */
  return Types.object;
};

is.array = Array.isArray;

is.arrayOf = (target: unknown[], predicate: (v: unknown) => boolean): boolean => {
  if (!is.array(target) && !is.function(predicate)) {
    return false;
  }

  return target.every(d => predicate(d));
};

is.asyncGeneratorFunction = (value: unknown): value is (...args: any[]) => Promise<unknown> =>
  getObjectType(value) === Types.asyncGeneratorFunction;

// eslint-disable-next-line @typescript-eslint/ban-types
is.asyncFunction = isObjectOfType<Function>(Types.asyncFunction);

is.bigint = isOfType<bigint>('bigint');

is.boolean = (value: unknown): value is boolean => {
  return value === true || value === false;
};

is.date = isObjectOfType<Date>(Types.date);

is.defined = (value: unknown): boolean => !is.undefined(value);

is.domElement = (value: unknown): value is HTMLElement => {
  return (
    is.object(value) &&
    !is.plainObject(value) &&
    (value as HTMLElement).nodeType === 1 &&
    is.string((value as HTMLElement).nodeName) &&
    DOM_PROPERTIES_TO_CHECK.every(property => property in (value as HTMLElement))
  );
};

is.empty = (value: unknown): boolean => {
  return (
    (is.string(value) && value.length === 0) ||
    (is.array(value) && value.length === 0) ||
    (is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0) ||
    (is.set(value) && value.size === 0) ||
    (is.map(value) && value.size === 0)
  );
};

is.error = isObjectOfType<Error>(Types.error);

// eslint-disable-next-line @typescript-eslint/ban-types
is.function = isOfType<Function>('function');

is.generator = (value: unknown): value is Generator => {
  return (
    is.iterable(value) &&
    is.function((value as IterableIterator<unknown>).next) &&
    is.function((value as IterableIterator<unknown>).throw)
  );
};

is.generatorFunction = isObjectOfType<GeneratorFunction>(Types.generatorFunction);

is.instanceOf = <T>(instance: unknown, class_: Class<T>): instance is T => {
  if (!instance || !(class_ as Class<T>)) {
    return false;
  }

  return Object.getPrototypeOf(instance) === class_.prototype;
};

is.iterable = (value: unknown): value is IterableIterator<unknown> => {
  return (
    !is.nullOrUndefined(value) && is.function((value as IterableIterator<unknown>)[Symbol.iterator])
  );
};

is.map = isObjectOfType<Map<unknown, unknown>>(Types.map);

is.nan = (value: unknown): boolean => {
  return Number.isNaN(value as number);
};

is.null = (value: unknown): value is null => {
  return value === null;
};

is.nullOrUndefined = (value: unknown): value is null | undefined => {
  return is.null(value) || is.undefined(value);
};

is.number = (value: unknown): value is number => {
  return isOfType<number>(Types.number)(value) && !is.nan(value);
};

is.numericString = (value: unknown): value is string => {
  return is.string(value) && (value as string).length > 0 && !Number.isNaN(Number(value));
};

// eslint-disable-next-line @typescript-eslint/ban-types
is.object = (value: unknown): value is object => {
  return !is.nullOrUndefined(value) && (is.function(value) || typeof value === 'object');
};

is.oneOf = (target: unknown[], value: any): boolean => {
  if (!is.array(target)) {
    return false;
  }

  return target.indexOf(value) > -1;
};

// eslint-disable-next-line @typescript-eslint/ban-types
is.plainFunction = isObjectOfType<Function>(Types.function);

is.plainObject = (value: unknown): value is PlainObject => {
  if (getObjectType(value) !== 'Object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === null || prototype === Object.getPrototypeOf({});
};

is.primitive = (value: unknown): value is Primitive =>
  is.null(value) || isPrimitiveType(typeof value);

is.promise = isObjectOfType<Promise<unknown>>(Types.promise);

is.propertyOf = (
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

is.regexp = isObjectOfType<RegExp>(Types.regExp);

is.set = isObjectOfType<Set<PlainObject>>(Types.set);

is.string = isOfType<string>(Types.string);

is.symbol = isOfType<symbol>(Types.symbol);

is.undefined = isOfType<undefined>(Types.undefined);

is.weakMap = isObjectOfType<WeakMap<PlainObject, unknown>>(Types.weakMap);

is.weakSet = isObjectOfType<WeakSet<PlainObject>>(Types.weakSet);

export default is;
