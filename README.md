# is-lite

[![NPM version](https://badge.fury.io/js/is-lite.svg)](https://www.npmjs.com/package/is-lite) [![build status](https://travis-ci.org/gilbarbara/is-lite.svg)](https://travis-ci.org/gilbarbara/is-lite) [![Maintainability](https://api.codeclimate.com/v1/badges/7249fdaab7d4edf92bd0/maintainability)](https://codeclimate.com/github/gilbarbara/is-lite/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/7249fdaab7d4edf92bd0/test_coverage)](https://codeclimate.com/github/gilbarbara/is-lite/test_coverage)


A tiny javascript type testing tool!

### Setup

```bash
npm install is-lite
```

### Usage

```js
import is from 'is-lite';

const value = '';

is.object(value) // false;

```

### API

**is.array**

**is.boolean**

**is.date**

**is.domElement**

**is.function**

**is.generator**

**is.iterable**

**is.map**

**is.nan**

**is.null**

**is.nullOrUndefined**

**is.number**

**is.numericString**
Returns true for a string that represents a number. For example, '42' and '-8'.
Note: 'NaN' returns false, but 'Infinity' and '-Infinity' return true

**is.object** 
Functions and arrays are objects too.

**is.plainObject** 
Just objects

**is.promise**

**is.regexp**

**is.set**

**is.string**

**is.symbol**

**is.undefined**

**is.weakMap**

**is.weakSet**