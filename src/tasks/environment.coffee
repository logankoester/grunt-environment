#
# * grunt-environment
# * https://github.com/logankoester/grunt-environment
# *
# * Copyright (c) 2013 Logan Koester
# * Licensed under the MIT license.
#

module.exports = (grunt) ->

  grunt.readBuildConfig = ->
    grunt.config.set 'build', grunt.file.readJSON('build.json')
    grunt.config.set 'build.timestamp', Date.now()
    grunt.config.set 'build.version', grunt.config.get('pkg.version')
    grunt.log.ok "Current environment: #{grunt.config.get('build.environment')}"

  grunt.writeBuildConfig = (config) ->
    grunt.log.ok 'Writing build.json...'
    grunt.file.write 'build.json', JSON.stringify(config)

  grunt.registerTask 'environment:development', ->
    grunt.writeBuildConfig environment: 'development'
    grunt.readBuildConfig()

  grunt.registerTask 'environment:production', ->
    grunt.writeBuildConfig environment: 'production'
    grunt.readBuildConfig()
