(function() {
  module.exports = function(grunt) {
    var defaultFile, ensureDefaultDirExists, path, readBuildConfig, writeBuildConfig;
    path = require('path');
    defaultFile = path.join('.grunt', 'environment.json');
    readBuildConfig = function() {
      var defaultEnv, file, version;
      file = grunt.config.get('environment.file');
      version = grunt.config.get('environment.version');
      defaultEnv = grunt.config.get('environment.default');
      if (typeof file === 'function') {
        file = file();
      }
      if (typeof version === 'function') {
        version = version();
      }
      if (typeof defaultEnv === 'function') {
        defaultEnv = defaultEnv();
      }
      file || (file = defaultFile);
      version || (version = '0.0.0');
      defaultEnv || (defaultEnv = 'development');
      grunt.config.set('environment', grunt.file.readJSON(file));
      grunt.config.set('environment.timestamp', Date.now());
      grunt.config.set('environment.version', version);
      return grunt.log.ok("Current environment: " + (grunt.config.get('environment.env')));
    };
    writeBuildConfig = function(config) {
      var file;
      file = grunt.config.get('environment.file');
      if (file === defaultFile) {
        ensureDefaultDirExists();
      }
      grunt.log.ok("Writing " + file);
      return grunt.file.write(file, JSON.stringify(config));
    };
    ensureDefaultDirExists = function() {
      if (!grunt.file.isDir('.grunt')) {
        grunt.log.ok("Writing " + file);
        return grunt.file.mkdir('.grunt');
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
    return grunt.environment = function() {
      return grunt.config.get('environment.env');
    };
  };

}).call(this);
