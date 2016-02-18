var test = require('tape'),
    path = require('path'),
    browserify = require('browserify')

test('remove debug', function (t) {
  var b = browserify();
  b.add(__dirname + '/fixtures/basic.js');
  b.transform('.');
  b.bundle(function (err, src) {
    t.error(err)
    src = src.toString('utf8');
    t.ok(!/debug/.test(src), 'src should not contain "debug"')
    t.ok(!/d\('doo'\)/.test(src), 'src should not contain "d(\'doo\')"')
    t.end()
  })
})
