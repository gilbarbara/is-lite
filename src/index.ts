type Class<T = unknown> = new (...args: any[]) => T;

const enum Types {
  array = 'Array',
  asyncFunction = 'AsyncFunction',
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

const isOfType = <T>(type: string) => (value: unknown): value is T => typeof value === type;

const is = (value: unknown): Types => {
  switch (value) {
    case null:
      return Types.null;
    case true:
    case false:
      return Types.boolean;
    default:
  }

  switch (typeof value) {
    case 'undefined':
      return Types.undefined;
    case 'string':
      return Types.string;
    case 'number':
      return Types.number;
    case 'bigint':
      return Types.bigint;
    case 'symbol':
      return Types.symbol;
    default:
  }

  if (is.array(value)) {
    return Types.array;
  }

  if (is.function(value)) {
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

// tslint:disable-next-line:ban-types
is.asyncFunction = isObjectOfType<Function>(Types.asyncFunction);

is.boolean = (value: unknown): value is boolean => {
  return value === true || value === false;
};

is.date = isObjectOfType<Date>(Types.date);

is.domElement = (value: unknown): value is Element => {
  const DOM_PROPERTIES_TO_CHECK = [
    'innerHTML',
    'ownerDocument',
    'style',
    'attributes',
    'nodeValue',
  ];

  return (
    is.object(value) &&
    !is.plainObject(value) &&
    (value as Element).nodeType === 1 &&
    is.string((value as Element).nodeName) &&
    DOM_PROPERTIES_TO_CHECK.every(property => property in (value as Element))
  );
};

is.error = isObjectOfType<Error>(Types.error);

// tslint:disable-next-line:ban-types
is.function = isObjectOfType<Function>(Types.function);

is.generator = (value: unknown): value is Generator => {
  return (
    is.iterable(value) &&
    is.function((value as IterableIterator<unknown>).next) &&
    is.function((value as IterableIterator<unknown>).throw)
  );
};

is.generatorFunction = isObjectOfType<GeneratorFunction>(Types.generatorFunction);

// tslint:disable-next-line:variable-name
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

is.object = (value: unknown): value is object => {
  return !is.nullOrUndefined(value) && (is.function(value) || typeof value === 'object');
};

is.plainObject = (value: unknown): value is { [key: string]: unknown } => {
  if (getObjectType(value) !== 'Object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === null || prototype === Object.getPrototypeOf({});
};

is.promise = isObjectOfType<Promise<unknown>>(Types.promise);

is.regexp = isObjectOfType<RegExp>(Types.regExp);

is.set = isObjectOfType<Set<object>>(Types.set);

is.string = isOfType<string>(Types.string);

is.symbol = isOfType<symbol>(Types.symbol);

is.undefined = isOfType<undefined>(Types.undefined);

is.weakMap = isObjectOfType<WeakMap<object, unknown>>(Types.weakMap);

is.weakSet = isObjectOfType<WeakSet<object>>(Types.weakSet);

export default is;
