grunt = require 'grunt'

exports.environment =
  setUp: (done) ->
    done()

  default_options: (test) ->
    test.expect 2

    build = grunt.file.readJSON 'build.json'
    test.equal build.environment, 'development', 'should default to development environment'
    test.equal grunt.config.get('build.environment'), 'development', 'should set config build.environment'

    test.done()
