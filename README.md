# undebuggify

Browserify transform to remove [visionmedia/debug](https://github.com/visionmedia/debug) related code using AST.

[![travis-ci](https://travis-ci.org/keik/undebuggify.svg?branch=master)](https://travis-ci.org/keik/undebuggify)

[![npm](https://nodei.co/npm/undebuggify.png)](https://npmjs.org/package/undebuggify)


# Install

```
npm install --save-dev undebuggify
```


# Usage

## CLI

```
browserify -t undebuggify src.js -o dist.js
```


# Example

Now src.js:

```js
var debug = require("debug"),
    d     = debug("MYAPP")

function greet() {
  d("#greet called")
  return "hi"
}
```

Run `browserify -t undebuggify src.js -o dist.js`, then dist.js will be created like:

```js
function greet() {
    return 'hi';
}
```


# Test

```
% npm install
% npm test
```


# License

MIT (c) keik
