
const getObjectType = (value: any): string => {
  const objectName = toString.call(value).slice(8, -1);

  return objectName;
};

const isObject = (value: any) => typeof value === 'object';

export default {
  null(value: any): boolean {
    return value === null;
  },
  undefined(value: any): boolean {
    return typeof value === 'undefined';
  },
  nullOrUndefined(value: any): boolean {
    return this.null(value) || this.undefined(value);
  },
  string(value: any): boolean {
    return typeof value === 'string';
  },
  function(value: any): boolean {
    return typeof value === 'function';
  },
  bool(value: any): boolean {
    return value === true || value === false;
  },
  array: Array.isArray,
  iterable(value: any): boolean {
    return !this.nullOrUndefined(value) && this.function(value[Symbol.iterator]);
  },
  object(value: any): boolean {
    return !this.nullOrUndefined(value) && (this.function(value) || isObject(value));
  },
  plainObject(value: any): boolean {
    let prototype;

    return getObjectType(value) === 'Object' && (prototype = Object.getPrototypeOf(value), prototype === null || prototype === Object.getPrototypeOf({})); //eslint-disable-line no-return-assign
  },
  domElement(value: any): boolean {
    const DOM_PROPERTIES_TO_CHECK = [
      'innerHTML',
      'ownerDocument',
      'style',
      'attributes',
      'nodeValue'
    ];

    return this.object(value) && value.nodeType === 1 && this.string(value.nodeName) &&
      !this.plainObject(value) && DOM_PROPERTIES_TO_CHECK.every(property => property in value);
  },
};
