(function() {
  module.exports = function(grunt) {
    var defaultFile, ensureDefaultDirExists, getFile, initEnvironment, mergeEnvironmentKeys, path, readBuildConfig, writeBuildConfig, _;
    _ = require('lodash');
    path = require('path');
    defaultFile = path.join('.grunt', 'environment.json');
    getFile = function() {
      var file;
      file = grunt.config.get('environment.file');
      if (typeof file === 'function') {
        file = file();
      }
      file || (file = defaultFile);
      return file;
    };
    readBuildConfig = function() {
      var defaultEnv, file, meta, version;
      version = grunt.config.get('environment.version');
      defaultEnv = grunt.config.get('environment.default');
      meta = grunt.config.get('environment');
      if (typeof version === 'function') {
        version = version();
      }
      if (typeof defaultEnv === 'function') {
        defaultEnv = defaultEnv();
      }
      version || (version = '0.0.0');
      defaultEnv || (defaultEnv = 'development');
      file = getFile();
      grunt.config.set('environment', grunt.file.readJSON(file));
      grunt.config.set('environment.timestamp', Date.now());
      grunt.config.set('environment.version', version);
      grunt.config.set('environment.meta', meta);
      return grunt.log.ok("Current environment: " + (grunt.config.get('environment.env')));
    };
    writeBuildConfig = function(config) {
      var file;
      file = getFile();
      if (file === defaultFile) {
        ensureDefaultDirExists();
      }
      grunt.log.ok("Writing " + file);
      return grunt.file.write(file, JSON.stringify(config));
    };
    ensureDefaultDirExists = function() {
      if (!grunt.file.isDir('.grunt')) {
        return grunt.file.mkdir('.grunt');
      }
    };
    initEnvironment = function() {
      var defaultEnv, error;
      try {
        readBuildConfig();
        return mergeEnvironmentKeys();
      } catch (_error) {
        error = _error;
        defaultEnv = grunt.config.get('environment.default');
        return grunt.task.run("environment:" + defaultEnv);
      }
    };
    mergeEnvironmentKeys = function() {
      var environments;
      environments = grunt.config.get('environment.meta.environments');
      return _.forEach(grunt.config.get(), function(value, key) {
        value = grunt.config.get(key);
        if (_.isObject(value)) {
          return _.forEach(environments, function(environment) {
            if (_.has(value, environment)) {
              if (environment === grunt.environment()) {
                return grunt.config.set(key, _.merge(grunt.config.get(key), value[environment]));
              } else {
                return grunt.config.set("" + key + "." + environment, void 0);
              }
            }
          });
        }
      });
    };
    grunt.config.get('environment.environments').forEach(function(env) {
      return grunt.registerTask("environment:" + env, function() {
        writeBuildConfig({
          env: env
        });
        return readBuildConfig();
      });
    });
    grunt.registerTask('environment', function() {
      return readBuildConfig();
    });
    grunt.environment = function() {
      return grunt.config.get('environment.env');
    };
    grunt.environmentVar = function(name) {
      var config;
      config = grunt.config.get(grunt.config.get('environment.env'));
      if (config && config[name] !== void 0) {
        return config[name];
      }
      grunt.log.error("environment config not found for variable\"" + name + "\"");
      return null;
    };
    return initEnvironment();
  };

}).call(this);
