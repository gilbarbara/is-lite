# is-lite

[![NPM version](https://badge.fury.io/js/is-lite.svg)](https://www.npmjs.com/package/is-lite) [![build status](https://travis-ci.org/gilbarbara/is-lite.svg)](https://travis-ci.org/gilbarbara/is-lite) [![Maintainability](https://api.codeclimate.com/v1/badges/7249fdaab7d4edf92bd0/maintainability)](https://codeclimate.com/github/gilbarbara/is-lite/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/7249fdaab7d4edf92bd0/test_coverage)](https://codeclimate.com/github/gilbarbara/is-lite/test_coverage)

Type check tool (just 0.6k minified+gzipped)

## Setup

```bash
npm install is-lite
```

## Usage

```js
import is from 'is-lite';

const value = '';

is.string(value) // true;

```

## API

#### is(value)

Returns the type of the `value`.

Primitives are lowercase: `bigint`, `boolean`, `null`, `number`, `string`, `symbol`, `undefined`  
The rest are camelcase: `Array`, `Function`, `GeneratorFunction`, `Object`, ...

#### is.array(value)

#### is.asyncFunction(value)

Check if `value` is an `async` function that can be called with `await`

```
is.asyncFunction(async () => {}); // => true
is.asyncFunction(() => {}); // => false
```

#### is.boolean(value)

#### is.date(value)

#### is.domElement(value)  
Check if `value` is a DOM Element.

#### is.error(value)

#### is.function(value)

#### is.generator(value)  
Check for an object that has its own .next() and .throw() methods and has a function definition for `Symbol.iterator`

#### is.generatorFunction(value)

#### is.instanceOf(value, class)
Check if `value` is a direct instance of `class`

```js
class APIError extends Error {}

const error = new APIError('Fail');

is.instanceOf(error, APIError); // true 
is.instanceOf(error, Error); // false 
```

#### is.iterable(value)

#### is.map(value)

#### is.nan(value)

#### is.null(value)

#### is.nullOrUndefined(value)

#### is.number(value)  
Note: `is.number(NaN)` returns `false`

#### is.numericString(value)
Check for a string that represents a number. For example, '42' and '-8'.
Note: 'NaN' returns false, but 'Infinity' and '-Infinity' return true

#### is.object(value) 
Remember that functions and arrays are objects too.

#### is.plainObject(value) 
Check if the object is created by either `{}`, `new Object()`, or `Object.create(null)`.

#### is.promise(value)

#### is.regexp(value)

#### is.set(value)

#### is.string(value)

#### is.symbol(value)

#### is.undefined(value)

#### is.weakMap(value)

#### is.weakSet(value)

## FAQ

[@sindresorhus/is](https://github.com/sindresorhus/is) is amazing but I needed something even smaller (and simpler).
This package cover the basics and is only 0.6k minified+gzipped.