/* eslint-disable symbol-description,prefer-regex-literals,no-promise-executor-return */

export class ClassTest {}

export function* generatorFn(): any {
  yield 1;
}

export async function asyncFn(): Promise<any> {
  return undefined;
}

export async function* asyncGeneratorFn() {
  yield 4;
}

export const tagNames = ['div', 'input', 'span', 'img', 'canvas', 'script'];

export const types = [
  { key: 'array', value: [] },
  { key: 'asyncFunction', base: 'function', value: asyncFn },
  { key: 'asyncGeneratorFunction', base: 'function', value: asyncGeneratorFn },
  { key: 'boolean', value: true },
  { key: 'date', value: new Date() },
  { key: 'domElement', value: document.createElement('div') },
  { key: 'error', value: new Error() },
  { key: 'function', value: () => undefined },
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
