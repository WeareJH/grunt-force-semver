#grunt-force-semver [![Build Status](https://travis-ci.org/WeareJH/grunt-force-semver.svg?branch=master)](https://travis-ci.org/WeareJH/grunt-force-semver)

An automated way (without hitting the network) to ensure that all of you 
team are using up-to-date dependencies.

This module includes a task that can be run before your build process. 
It will scan your `package.json` and ensure that each module you have locally 
installed satisfies the version requirements. It's a replacement for conversations
such as 'but did you run npm install first?'

## Install
```sh
npm install grunt-force-semver
```

## Usage

Within your Gruntfile.js, load the task.

```js
grunt.loadNpmTasks('grunt-force-semver')
```

Now you can prepend it to any build tasks that are appropriate...

```js
grunt.registerTask('build-css',    ['forceSemver', 'sass', 'autoprefixer', 'cssmin', 'cachebreaker:css']);
```

... which means that if someone on your team bumps a major version of `autoprefixer`
for example, the build will fail early and you'll be presented with a nice 
error message explaining the problem.

## Contributions

You should only edit files in `es6-src` as the source code for this module is written 
in ES6. Run `npm run es6` following any changes to have it compiled back down
into ES5
