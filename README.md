is-lite
===

[![NPM version](https://badge.fury.io/js/is-lite.svg)](https://www.npmjs.com/package/is-lite) 
[![build status](https://travis-ci.org/gilbarbara/is-lite.svg)](https://travis-ci.org/gilbarbara/is-lite) 

Get the type of a value  

### Setup

```bash
npm install is-lite
```

### Usage

```js
import is from 'is-lite';

const value = '';

is.object(value) -> false;

```

### API

**is.null(value: any)**

**is.undefined(value: any)**

**is.nullOrUndefined(value: any)**

**is.string(value: any)**

**is.function(value: any)**

**is.bool(value: any)**

**is.array(value: any)**

**is.iterable(value: any)**

**is.object(value: any)** (objects, functions and arrays)

**is.plainObject(value: any)** (just objects)

**is.domElement(value: any)**
