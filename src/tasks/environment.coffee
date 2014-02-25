#
# * grunt-environment
# * https://github.com/logankoester/grunt-environment
# *
# * Copyright (c) 2013 Logan Koester
# * Licensed under the MIT license.
#

module.exports = (grunt) ->
  _ = require 'lodash'
  path = require 'path'
  defaultFile = path.join('.grunt', 'environment.json')

  getFile = ->
    file = grunt.config.get 'environment.file'
    if typeof file == 'function' then file = file()
    file ||= defaultFile
    file

  readBuildConfig = ->
    version = grunt.config.get 'environment.version'
    defaultEnv = grunt.config.get 'environment.default'
    meta = grunt.config.get 'environment'

    if typeof version == 'function' then version = version()
    if typeof defaultEnv == 'function' then defaultEnv = defaultEnv()

    version ||= '0.0.0'
    defaultEnv ||= 'development'
    file = getFile()

    grunt.config.set 'environment', grunt.file.readJSON(file)
    grunt.config.set 'environment.timestamp', Date.now()
    grunt.config.set 'environment.version', version
    grunt.config.set 'environment.meta', meta
    grunt.log.ok "Current environment: #{grunt.config.get('environment.env')}"

  writeBuildConfig = (config) ->
    file = getFile()
    ensureDefaultDirExists() if file == defaultFile
    grunt.log.ok "Writing #{file}"
    grunt.file.write file, JSON.stringify(config)

  ensureDefaultDirExists = ->
    unless grunt.file.isDir('.grunt')
      grunt.file.mkdir('.grunt')

  initEnvironment = ->
    try
      readBuildConfig()
      mergeEnvironmentKeys()
    catch error
      defaultEnv = grunt.config.get('environment.default')
      grunt.task.run "environment:#{defaultEnv}"

  mergeEnvironmentKeys = ->
    environments = grunt.config.get 'environment.meta.environments'
    _.forEach grunt.config.get(), (value, key) ->
      value = grunt.config.get(key)
      if _.isObject value
        _.forEach environments, (environment) ->
          if _.has(value, environment)
            if environment == grunt.environment()
              grunt.config.set key, _.merge(grunt.config.get(key), value[environment])
            else
              grunt.config.set "#{key}.#{environment}", undefined

  grunt.config.get('environment.environments').forEach (env) ->
    grunt.registerTask "environment:#{env}", ->
      writeBuildConfig env: env
      readBuildConfig()

  grunt.registerTask 'environment', -> readBuildConfig()

  grunt.environment = ->
    grunt.config.get('environment.env')

  grunt.environmentVar = (name) ->
    config = grunt.config.get(grunt.config.get('environment.env'))
    if config && config[name] != undefined
      return config[name]
    grunt.log.error "environment config not found for variable\"#{name}\""
    return null

  initEnvironment()
