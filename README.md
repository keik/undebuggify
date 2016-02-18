# undebuggify

Browserify transform to remove [visionmedia/debug](https://github.com/visionmedia/debug) related code using AST.


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
