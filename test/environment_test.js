(function() {
  var grunt;

  grunt = require('grunt');

  exports.environment = {
    setUp: function(done) {
      return done();
    },
    'live environment': function(test) {
      test.expect(3);
      test.equal(grunt.config.get('environment.env'), 'development', 'should include the development env');
      test.ok(grunt.config.get('environment.timestamp'), 'should include a timestamp');
      test.equal(grunt.config.get('environment.version'), '0.0.0', 'should include the default version');
      return test.done();
    },
    'stored environment': function(test) {
      var environment;
      test.expect(1);
      environment = grunt.file.readJSON('.grunt/environment.json');
      test.equal(environment.env, 'development', 'should include the development env');
      return test.done();
    },
    'merged keys': function(test) {
      test.expect(2);
      test.equal(grunt.config.get('merge.unchanged'), true);
      test.equal(grunt.config.get('merge.active'), 'development', 'should merge environment-scoped configuration keys');
      return test.done();
    }
  };

}).call(this);
