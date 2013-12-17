grunt = require 'grunt'

exports.environment =
  setUp: (done) ->
    done()

  'live environment': (test) ->
    test.expect 3
    test.equal grunt.config.get('environment.env'), 'development', 'should include the development env'
    test.ok grunt.config.get('environment.timestamp'), 'should include a timestamp'
    test.equal grunt.config.get('environment.version'), '0.0.0', 'should include the default version'
    test.done()

  'stored environment': (test) ->
    test.expect 1
    environment = grunt.file.readJSON '.grunt/environment.json'
    test.equal environment.env, 'development', 'should include the development env'
    test.done()

  'merged keys': (test) ->
    test.expect 2
    test.equal grunt.config.get('merge.unchanged'), true
    test.equal grunt.config.get('merge.active'), 'development', 'should merge environment-scoped configuration keys'
    test.done()
