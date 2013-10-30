# grunt-environment

[![Build Status](https://travis-ci.org/logankoester/grunt-environment.png)](https://travis-ci.org/logankoester/grunt-environment)

> Add environment-centric logic to your Grunt builds

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-environment --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this snippet of JavaScript:

```js
grunt.loadNpmTasks('grunt-environment');
try {
  grunt.readBuildConfig();
} catch(e) {
  grunt.task.run('environment:development') // Set default environment
}

```

The **grunt-environment** plugin will add the tasks `environment:development` and
`environment:production`. They will maintain state in a file called `build.json` in
your project directory.

You can now use `grunt.config.get('build.environment')` in your other Grunt tasks to
create conditions around these environments.

For convenience, the `build.timestamp` and `build.version` (mirror of pkg.version) are
set as well.

You may find it useful to pass `build` as a variable into a template for your application to use at runtime.

## Release History

* 0.1.0 - First release


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/logankoester/grunt-environment/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

