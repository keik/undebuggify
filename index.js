var util = require('util'),
    path = require('path'),
    stream = require('stream'),
    udebug = require('udebug')

module.exports = Undebuggify
util.inherits(Undebuggify, stream.Transform)

function Undebuggify(file, opts) {

  var exts = ['.js', '.jsx', '.es', '.es6', '.coffee']
  if (exts.indexOf(path.extname(file)) === -1)
    return stream.PassThrough()

  if (!(this instanceof Undebuggify))
    return new Undebuggify(file, opts)

  stream.Transform.call(this)
  this._opts = opts
  this._data = ''
  this._filename = file

  return this
}

Undebuggify.prototype._transform = function(buf, enc, callback) {
  this._data += buf
  callback()
}

Undebuggify.prototype._flush = function(callback) {
  this.push(udebug(this._data, {
    filepath: this._filename,
    debug: this._opts._flags && this._opts._flags.debug
  }))
  callback()
}
