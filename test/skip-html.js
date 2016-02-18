var test = require('tape'),
    path = require('path'),
    browserify = require('browserify')

test('skip paring html', function (t) {
  var b = browserify();
  b.add(__dirname + '/fixtures/skip-html.js');
  b.transform('.');
  b.transform('jstify')
  b.bundle(function (err, src) {
    t.error(err)
    t.end()
  })
})
