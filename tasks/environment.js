(function() {
  module.exports = function(grunt) {
    grunt.readBuildConfig = function() {
      grunt.config.set('build', grunt.file.readJSON('build.json'));
      grunt.config.set('build.timestamp', Date.now());
      grunt.config.set('build.version', grunt.config.get('pkg.version'));
      return grunt.log.ok("Current environment: " + (grunt.config.get('build.environment')));
    };
    grunt.writeBuildConfig = function(config) {
      grunt.log.ok('Writing build.json...');
      return grunt.file.write('build.json', JSON.stringify(config));
    };
    grunt.registerTask('environment:development', function() {
      grunt.writeBuildConfig({
        environment: 'development'
      });
      return grunt.readBuildConfig();
    });
    return grunt.registerTask('environment:production', function() {
      grunt.writeBuildConfig({
        environment: 'production'
      });
      return grunt.readBuildConfig();
    });
  };

}).call(this);
