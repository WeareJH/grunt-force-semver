'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _path = require('path');

var _path2 = _interopRequireWildcard(_path);

module.exports = function (grunt) {

    grunt.registerMultiTask('forceSemver', 'Fail the build if dependencies are outdated', function () {

        var options = this.options({
            pkg: require(_path2['default'].resolve(process.cwd(), './package.json')),
            cwd: process.cwd()
        });

        if (getFails(options.pkg, options.cwd).length) {
            grunt.fatal('NOPE');
        }
    });
};

/**
 * @param pkg
 * @param cwd
 */
function getFails(pkg, cwd) {

    return Object.keys(pkg.devDependencies).reduce(function (all, key) {

        var semver = require('semver');
        var current = require(_path2['default'].resolve(cwd, 'node_modules', key, 'package.json')).version;
        var wanted = pkg.devDependencies[key];

        if (!semver.satisfies(current, wanted)) {
            all.push({ key: key, current: current, wanted: wanted });
        }

        return all;
    }, []);
}

module.exports.getFails = getFails;