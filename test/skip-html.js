var test = require('tape'),
    browserify = require('browserify')

test('skip paring html', function (t) {
  var b = browserify({transform: ['.', 'jstify']})
  b.add(__dirname + '/fixtures/skip-html.js')
  b.bundle(function (err) {
    t.error(err)
    t.end()
  })
})
