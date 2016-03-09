var test = require('tape'),
    browserify = require('browserify')

test('remove debug', function (t) {
  var b = browserify({transform: ['.']})
  b.add(__dirname + '/fixtures/basic.js')
  b.bundle(function (err, src) {
    t.error(err)
    src = src.toString('utf8')
    t.ok(!/debug/.test(src), 'src should not contain "debug"')
    t.ok(!/d\('doo'\)/.test(src), 'src should not contain "d(\'doo\')"')
    t.end()
  })
})
