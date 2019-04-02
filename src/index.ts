const isObject = (value: any) => typeof value === 'object';

export const getObjectType = (value: any): string =>
  Object.prototype.toString.call(value).slice(8, -1);

const isObjectOfType = (value: any, type: string): boolean =>
  getObjectType(value) === type;

export default {
  array: Array.isArray,
  boolean(value: any): boolean {
    return value === true || value === false;
  },
  date(value: any): boolean {
    return isObjectOfType(value, 'Date');
  },
  domElement(value: any): boolean {
    const DOM_PROPERTIES_TO_CHECK = [
      'innerHTML',
      'ownerDocument',
      'style',
      'attributes',
      'nodeValue',
    ];

    return (
      this.object(value) &&
      !this.plainObject(value) &&
      value.nodeType === 1 &&
      this.string(value.nodeName) &&
      DOM_PROPERTIES_TO_CHECK.every(property => property in value)
    );
  },
  function(value: any): boolean {
    return typeof value === 'function';
  },
  generator(value: any): boolean {
    return (
      this.iterable(value) &&
      this.function(value.next) &&
      this.function(value.throw)
    );
  },
  iterable(value: any): boolean {
    return (
      !this.nullOrUndefined(value) && this.function(value[Symbol.iterator])
    );
  },
  map(value: any): boolean {
    return isObjectOfType(value, 'Map');
  },
  nan(value: any): boolean {
    return Number.isNaN(value);
  },
  null(value: any): boolean {
    return value === null;
  },
  nullOrUndefined(value: any): boolean {
    return this.null(value) || this.undefined(value);
  },
  number(value: any): boolean {
    return typeof value === 'number';
  },
  numericString(value: any): boolean {
    return (
      typeof value === 'string' &&
      value.length > 0 &&
      !Number.isNaN(Number(value))
    );
  },
  object(value: any): boolean {
    return (
      !this.nullOrUndefined(value) && (this.function(value) || isObject(value))
    );
  },
  plainObject(value: any): boolean {
    let prototype;

    return (
      isObjectOfType(value, 'Object') &&
      ((prototype = Object.getPrototypeOf(value)),
      prototype === null || prototype === Object.getPrototypeOf({}))
    );
  },
  promise(value: any): boolean {
    return isObjectOfType(value, 'Promise');
  },
  regexp(value: any): boolean {
    return isObjectOfType(value, 'RegExp');
  },
  set(value: any): boolean {
    return isObjectOfType(value, 'Set');
  },
  string(value: any): boolean {
    return typeof value === 'string';
  },
  symbol(value: any): boolean {
    return isObjectOfType(value, 'Symbol');
  },
  undefined(value: any): boolean {
    return typeof value === 'undefined';
  },
  weakMap(value: any): boolean {
    return isObjectOfType(value, 'WeakMap');
  },
  weakSet(value: any): boolean {
    return isObjectOfType(value, 'WeakSet');
  },
};
