'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

module.exports = function (grunt) {

    grunt.registerTask('forceSemver', 'Fail the build if dependencies are outdated', function () {

        var options = this.options({
            pkg: require(_path2['default'].resolve(process.cwd(), './package.json')),
            cwd: process.cwd()
        });

        var fails = getFails(options.pkg, options.cwd);
        var msgs = {
            'missing': 'Missing Dependency',
            'outdated': 'Outdated Dependency'
        };

        if (fails.length) {
            fails.forEach(function (item) {
                grunt.log.error(msgs[item.failureType].red, item.key.cyan);
            });
            grunt.log.error('The build could not be completed as your dependencies are out of date.');
            grunt.fatal('Please run `npm install` to update & then run the build again.');
        } else {
            grunt.log.ok('✔'.cyan + ' Dependencies are up to date - continuing');
        }
    });
};

/**
 * Get an array of failures
 * @param {Object} pkg - typically a package.json
 * @param {string} cwd
 * @returns {Array}
 */
function getFails(pkg, cwd) {

    return Object.keys(pkg.devDependencies).reduce(function (all, key) {

        var pkgPath = _path2['default'].resolve(cwd, 'node_modules', key, 'package.json');

        if (!_fs.existsSync(pkgPath)) {
            all.push({ key: key, failureType: 'missing' });
            return all;
        }

        var semver = require('semver');
        var current = require(pkgPath).version;
        var wanted = pkg.devDependencies[key];

        if (!semver.satisfies(current, wanted)) {
            all.push({ key: key, current: current, wanted: wanted, failureType: 'outdated' });
        }

        return all;
    }, []);
}

/**
 * @param pkg
 * @param cwd
 */
module.exports.getFails = getFails;