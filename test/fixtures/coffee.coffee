debug = require 'debug'
d = debug 'a'

a = () ->
  d 'doo'
  console.log 'doo'

d 'doo'
