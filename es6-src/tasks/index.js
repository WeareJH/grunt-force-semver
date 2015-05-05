import path from 'path';
import {existsSync} from 'fs';

module.exports  = function (grunt) {

    grunt.registerTask('forceSemver', 'Fail the build if dependencies are outdated', function() {

        let options = this.options({
            pkg: require(path.resolve(process.cwd(), './package.json')),
            cwd: process.cwd()
        });


        let fails = getFails(options.pkg, options.cwd);
        let msgs = {
            'missing': 'Missing Dependency',
            'outdated': 'Outdated Dependency'
        };

        if (fails.length) {
            fails.forEach((item) => {
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
function getFails (pkg, cwd) {

    return Object.keys(pkg.devDependencies).reduce((all, key) => {

        let pkgPath = path.resolve(cwd, 'node_modules', key, 'package.json');

        if (!existsSync(pkgPath)) {
            all.push({key, failureType: 'missing'});
            return all;
        }

        let semver  = require('semver');
        let current = require(pkgPath).version;
        let wanted  = pkg.devDependencies[key];

        if (!semver.satisfies(current, wanted)) {
            all.push({key, current, wanted, failureType: 'outdated'});
        }

        return all;

    }, []);
}

/**
 * @param pkg
 * @param cwd
 */
module.exports.getFails = getFails;
