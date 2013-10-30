(function() {
  var grunt;

  grunt = require('grunt');

  exports.environment = {
    setUp: function(done) {
      return done();
    },
    default_options: function(test) {
      var build;
      test.expect(2);
      build = grunt.file.readJSON('build.json');
      test.equal(build.environment, 'development', 'should default to development environment');
      test.equal(grunt.config.get('build.environment'), 'development', 'should set config build.environment');
      return test.done();
    }
  };

}).call(this);
