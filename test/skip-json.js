var test = require('tape'),
    path = require('path'),
    browserify = require('browserify')

test('skip paring json', function (t) {
  var b = browserify({transform: '.'})
  b.transform(path.dirname(__dirname))
  b.bundle(function (err) {
    t.error(err)
    t.end()
  })
})
