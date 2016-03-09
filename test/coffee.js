var test = require('tape'),
    browserify = require('browserify'),
    convert = require('convert-source-map'),
    sourceMap = require('source-map'),
    SourceMapConsumer = sourceMap.SourceMapConsumer

test('coffeeify + undebuggify', function (t) {
  var b = browserify({transform: ['coffeeify', '.']})
  b.add(__dirname + '/fixtures/coffee.coffee')
  b.bundle(function (err, src) {
    t.error(err)
    src = src.toString('utf8')
    t.ok(!/require\('debug'\)/.test(src), 'src should not contain "debug"')
    t.ok(!/d\('doo'\)/.test(src), 'src should not contain "d(\'doo\')"')
    t.end()
  })
})

test('coffeeify + undebuggify with source map', function (t) {
  var b = browserify({debug: true, transform: ['coffeeify', '.']})
  b.add(__dirname + '/fixtures/coffee.coffee')
  b.bundle(function (err, src) {
    t.error(err)
    src = src.toString('utf8')
    t.ok(!/require\('debug'\)/.test(src), 'src should not contain "debug"')
    t.ok(!/d\('doo'\)/.test(src), 'src should not contain "d(\'doo\')"')

    // source map validation
    /*
     * transformed src should be
     *
     *    012345678901234567890123456789
     * 1  // browserify generated line
     * 2  var a, d, debug;
     * 3  a = function () {
     * 4      return console.log('doo');
     * 5  };
     */
    var map = convert.fromSource(src).toObject()
    var con = new SourceMapConsumer(map)
    var origPos
    origPos = con.originalPositionFor({line: 3, column: 0}) // a
    t.equal(origPos.line, 4)
    t.equal(origPos.column, 0)
    origPos = con.originalPositionFor({line: 3, column: 4}) // function
    t.equal(origPos.line, 4)
    t.equal(origPos.column, 4)
    origPos = con.originalPositionFor({line: 4, column: 11}) // console
    t.equal(origPos.line, 6)
    t.equal(origPos.column, 2)
    origPos = con.originalPositionFor({line: 4, column: 19}) // log
    t.equal(origPos.line, 6)
    t.equal(origPos.column, 10)
    origPos = con.originalPositionFor({line: 4, column: 23}) // 'doo'
    t.equal(origPos.line, 6)
    t.equal(origPos.column, 14)

    t.end()
  })
})
