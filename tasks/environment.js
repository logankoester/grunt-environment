(function() {
  module.exports = function(grunt) {
    var defaultFile, ensureDefaultDirExists, getFile, initEnvironment, path, readBuildConfig, writeBuildConfig;
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
      var defaultEnv, file, version;
      version = grunt.config.get('environment.version');
      defaultEnv = grunt.config.get('environment.default');
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
        return readBuildConfig();
      } catch (_error) {
        error = _error;
        defaultEnv = grunt.config.get('environment.default');
        return grunt.task.run("environment:#" + defaultEnv);
      }
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
    return initEnvironment();
  };

}).call(this);
