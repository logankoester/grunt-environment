#
# * grunt-environment
# * https://github.com/logankoester/grunt-environment
# *
# * Copyright (c) 2013 Logan Koester
# * Licensed under the MIT license.
#

module.exports = (grunt) ->
  path = require 'path'
  defaultFile = path.join('.grunt', 'environment.json')

  getFile = ->
    file = grunt.config.get 'environment.file'
    if typeof file == 'function' then file = file()
    file ||= defaultFile
    file

  readBuildConfig = ->
    version = grunt.config.get('environment.version')
    defaultEnv = grunt.config.get('environment.default')

    if typeof version == 'function' then version = version()
    if typeof defaultEnv == 'function' then defaultEnv = defaultEnv()

    version ||= '0.0.0'
    defaultEnv ||= 'development'
    file = getFile()

    grunt.config.set 'environment', grunt.file.readJSON(file)
    grunt.config.set 'environment.timestamp', Date.now()
    grunt.config.set 'environment.version', version
    grunt.log.ok "Current environment: #{grunt.config.get('environment.env')}"

  writeBuildConfig = (config) ->
    file = getFile()
    ensureDefaultDirExists() if file == defaultFile
    grunt.log.ok "Writing #{file}"
    grunt.file.write file, JSON.stringify(config)

  ensureDefaultDirExists = ->
    unless grunt.file.isDir('.grunt')
      grunt.file.mkdir('.grunt')

  grunt.config.get('environment.environments').forEach (env) ->
    grunt.registerTask "environment:#{env}", ->
      writeBuildConfig env: env
      readBuildConfig()

  grunt.environment = ->
    grunt.config.get('environment.env')
