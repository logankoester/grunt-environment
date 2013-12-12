# grunt-environment

[![Build Status](https://travis-ci.org/logankoester/grunt-environment.png)](https://travis-ci.org/logankoester/grunt-environment)
[![Dependency Status](https://david-dm.org/logankoester/grunt-environment.png)](https://david-dm.org/logankoester/grunt-environment)
[![devDependency Status](https://david-dm.org/logankoester/grunt-environment/dev-status.png)](https://david-dm.org/logankoester/grunt-environment#info=devDependencies)
[![Gittip](http://img.shields.io/gittip/logankoester.png)](https://www.gittip.com/logankoester/)

[![NPM](https://nodei.co/npm/grunt-environment.png?downloads=true)](https://nodei.co/npm/grunt-environment/)

> Add environment-centric logic to your Grunt builds

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-environment --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this snippet of JavaScript:

```js
grunt.initConfig({
  // ...

  environment: {
    default: 'development',
    environments: ['development', 'production'],
    version: function(){
      return grunt.file.readJSON('package.json')['version']
    },
    file: 'build.json'
  }

  // ...
});

grunt.loadNpmTasks('grunt-environment');

```

Any of the above options can also be a function  **except for the `environments` array**.

The **grunt-environment** plugin will add the tasks `environment:development` and
`environment:production` (for each entry in your `environments` array).

They will maintain state in a file called `.grunt/environment.json` in your project directory.

You can now use `grunt.config.get('environment.env')` in your other Grunt tasks to
create conditions around these environments.

> `v0.2.0` adds the alias `grunt.environment()` to the current `env` value.

The additional keys  `timestamp` and `version` are included as well.

> You may find it useful to pass `build` as a variable into a template for your application to use at runtime.

## Release History

###  0.3.0

* No longer necessary to try/catch initialize manually after tasks are loaded
* Adds `grunt environment` (with no subtask) to echo current environment from file

###  0.2.1

* Small fixes

###  0.2.0

* Adds `grunt.environment()` alias
* Bit of overall refactoring
* Moves default storage from `build.json` to `.grunt/environment.json`
* Adds configurable options `default`, `environments`, `version`, `file`

### 0.1.0

* First release


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/logankoester/grunt-environment/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

