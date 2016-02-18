var util = require('util'),
    path = require('path'),
    stream = require('stream'),
    udebug = require('udebug')

module.exports = Undebuggify
util.inherits(Undebuggify, stream.Transform)

function Undebuggify(file, opts) {

  if (path.extname(file) === '.json')
    return stream.PassThrough();

  if (!(this instanceof Undebuggify))
    return new Undebuggify(file, opts)

  stream.Transform.call(this)
  this._data = ''
  this._filename = file

  return this
}

Undebuggify.prototype._transform = function(buf, enc, callback) {
  this._data += buf
  callback()
}

Undebuggify.prototype._flush = function(callback) {
  this.push(udebug(this._data))
  callback()
}