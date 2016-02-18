var test = require('tape'),
    undebuggify = require('../'),
    path = require('path'),
    browserify = require('browserify')

test('skip paring json', function (t) {
  var b = browserify();
  b.add('.');
  b.transform(path.dirname(__dirname));
  b.bundle(function (err, src) {
    t.error(err)
    t.end()
  })
})
