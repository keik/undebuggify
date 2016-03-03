var util = require('util'),
    path = require('path'),
    stream = require('stream'),
    udebug = require('udebug'),
    sm = require('source-map'),
    convert = require('convert-source-map')

module.exports = Undebuggify
util.inherits(Undebuggify, stream.Transform)

function Undebuggify(filename, opts) {

  var exts = ['.js', '.jsx', '.es', '.es6', '.coffee']
  if (exts.indexOf(path.extname(filename)) === -1)
    return stream.PassThrough();

  if (!(this instanceof Undebuggify))
    return new Undebuggify(filename, opts)

  stream.Transform.call(this)
  this._data = ''
  this._filename = filename

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

  var origMapConverter = convert.fromSource(this._data),
      origMap = origMapConverter && origMapConverter.toObject()

  var mapComment = convert.fromObject(mergeMap(origMap, newMap)).toComment(origMap, newMap)
  console.log(this._filename)
  console.log(mapComment)
  console.log();
  this.push(code + '\n' + mapComment)
  callback()
}

function mergeMap(origMap, newMap) {
  if (!origMap) {
    console.log(1);
    return newMap
  }
  console.log('TODO merge');
  // var c = new sm.SourceMapConsumer(map)
  // var g = new sm.SourceMapGenerator({
  //   file: this._filename,
  //   sourceRoot: 'http://example.net/aaa/'
  // })
  // c.eachMapping(function(m) {
  //   g.addMapping({
  //     source: m.source,
  //     generated: {
  //       line: m.generatedLine,
  //       column: m.generatedColumn
  //     },
  //     original: {
  //       line: m.originalLine,
  //       column: m.originalColumn
  //     }
  //   })
  // var newMap = g.toString()
  // console.log(map);
  // console.log(newMap);
  return 'f'
}
