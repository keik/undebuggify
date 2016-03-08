var util = require('util'),
    path = require('path'),
    stream = require('stream'),
    udebug = require('udebug'),
    convert = require('convert-source-map'),
    merge = require('merge-source-map')

module.exports = Undebuggify
util.inherits(Undebuggify, stream.Transform)

function Undebuggify(file, opts) {

  var exts = ['.js', '.jsx', '.es', '.es6', '.coffee']
  if (exts.indexOf(path.extname(file)) === -1)
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
  var gen = udebug(this._data, this._filename),
      code = gen.code,
      newMap = gen.map.toString()

  var origMap = convert.fromSource(this._data) && convert.fromSource(this._data).toObject(),
      mergedMap = merge(origMap, JSON.parse(gen.map.toString())),
      mapComment = convert.fromObject(mergedMap).toComment()

  this.push(code + '\n' + mapComment)
  callback()
}
