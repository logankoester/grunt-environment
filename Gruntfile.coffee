#
# * grunt-environment
# * https://github.com/logankoester/grunt-environment
# *
# * Copyright (c) 2013 Logan Koester
# * Licensed under the MIT license.
#
module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig
    # Configuration to be run (and then tested).
    environment:
      default_options:
        options: {}
        files:
          "tmp/default_options": ["test/fixtures/testing", "test/fixtures/123"]

      custom_options:
        options:
          separator: ": "
          punctuation: " !!!"

        files:
          "tmp/custom_options": ["test/fixtures/testing", "test/fixtures/123"]

    # Unit tests.
    nodeunit:
      tests: ['test/*_test.js']

    coffee:
      tasks:
        expand: true
        cwd: 'src/tasks/'
        src: '**/*.coffee'
        dest: 'tasks/'
        ext: '.js'

    clean:
      tests: ["tmp"]

  # Actually load this plugin's task(s).
  grunt.loadTasks 'tasks'

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-nodeunit'
  grunt.loadNpmTasks 'grunt-contrib-coffee'

  # Whenever the "test" task is run, first clean the "tmp" dir, then run this
  # plugin's task(s), then test the result.
  grunt.registerTask 'test', ['clean', 'environment', 'nodeunit']

  # By default, lint and run all tests.
  grunt.registerTask 'default', ['build', 'test']
