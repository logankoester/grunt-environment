# Grunt: Environment
> Add environment-centric logic to your Grunt builds

[![Strider Status](http://ci.ldk.io/logankoester/grunt-environment/badge)](http://ci.ldk.io/logankoester/grunt-environment/)
[![Build Status](https://travis-ci.org/logankoester/grunt-environment.png)](https://travis-ci.org/logankoester/grunt-environment)
[![status](https://sourcegraph.com/api/repos/github.com/logankoester/grunt-environment/badges/status.png)](https://sourcegraph.com/github.com/logankoester/grunt-environment)
[![Dependency Status](https://david-dm.org/logankoester/grunt-environment.png)](https://david-dm.org/logankoester/grunt-environment)
[![devDependency Status](https://david-dm.org/logankoester/grunt-environment/dev-status.png)](https://david-dm.org/logankoester/grunt-environment#info=devDependencies)
[![Gittip](http://img.shields.io/gittip/logankoester.png)](https://www.gittip.com/logankoester/)

[![NPM](https://nodei.co/npm/grunt-environment.png?downloads=true)](https://nodei.co/npm/grunt-environment/)

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

## Divergent task configuration

There are two ways to create Grunt configuration for your environments.

### Branched object

This bit of syntactic sugar added in `v0.4.0` covers most common scenarios.

#### Example

```JavaScript
config: {
  hostname: 'http://development.example.com', // (unaffected)
  development: {
    output_dir: 'build/development'
  },
  production: {
    output_dir: 'build/production'
  },
  environment: {
    default: 'development',
    environments: ['development', 'production']
  }
}
```

The environment you are using gets merged back into the main config:

```
grunt environment:production
```

...makes the config behave as if it were:

```JavaScript
config: {
  hostname: 'http://development.example.com', // (unaffected)
  output_dir: 'build/production',
}
```

### Conditional logic

For more complex configuration, you can also use `grunt.config.get('environment.env')` or it's handy alias
`grunt.environment()` in your Grunt tasks to create conditions around these environments.

#### Example

```javascript

// Environment-specific configuration for grunt-contrib-clean.
// When the **development** environment is active, `grunt clean` will remove files inside `build/development`
// When the **production** environment is active, `grunt clean` will remove files inside `build/production`

clean: {
  build: (function() {
    switch (grunt.environment()) {
      case 'development':
        return ['build/development'];
      case 'production':
        return ['build/production'];
    }
  })()
}

```

> `v0.2.0` adds the alias `grunt.environment()` to the current `env` value.

The additional keys `timestamp` and `version` are included as well.

> You may find it useful to pass `build` as a variable into a template for your application to use at runtime.

## Release History

### 0.4.2
* Extend to allow pulling environment vars from global config (see [#4](https://github.com/logankoester/grunt-environment/pull/4))

### 0.4.0

* Adds **Branched Object** merge feature suggested by @colwilson
* Adds dependency `lodash` (Grunt external libraries are deprecated)
* Original configuration is now preserved upon initialization as `config.environment.meta`

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

[![xrefs](https://sourcegraph.com/api/repos/github.com/logankoester/grunt-environment/badges/xrefs.png)](https://sourcegraph.com/github.com/logankoester/grunt-environment)
[![funcs](https://sourcegraph.com/api/repos/github.com/logankoester/grunt-environment/badges/funcs.png)](https://sourcegraph.com/github.com/logankoester/grunt-environment)
[![top func](https://sourcegraph.com/api/repos/github.com/logankoester/grunt-environment/badges/top-func.png)](https://sourcegraph.com/github.com/logankoester/grunt-environment)
[![library users](https://sourcegraph.com/api/repos/github.com/logankoester/grunt-environment/badges/library-users.png)](https://sourcegraph.com/github.com/logankoester/grunt-environment)
[![authors](https://sourcegraph.com/api/repos/github.com/logankoester/grunt-environment/badges/authors.png)](https://sourcegraph.com/github.com/logankoester/grunt-environment)
[![Total views](https://sourcegraph.com/api/repos/github.com/logankoester/grunt-environment/counters/views.png)](https://sourcegraph.com/github.com/logankoester/grunt-environment)
[![Views in the last 24 hours](https://sourcegraph.com/api/repos/github.com/logankoester/grunt-environment/counters/views-24h.png)](https://sourcegraph.com/github.com/logankoester/grunt-environment)
