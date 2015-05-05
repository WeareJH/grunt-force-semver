import path from 'path';

module.exports = function (grunt) {

    grunt.registerMultiTask('forceSemver', 'Fail the build if dependencies are outdated', function() {

        let options = this.options({
            pkg: require(path.resolve(process.cwd(), './package.json')),
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
function getFails (pkg, cwd) {

    return Object.keys(pkg.devDependencies).reduce((all, key) => {

        let semver  = require('semver');
        let current = require(path.resolve(cwd, 'node_modules', key, 'package.json')).version;
        let wanted  = pkg.devDependencies[key];

        if (!semver.satisfies(current, wanted)) {
            all.push({key, current, wanted});
        }

        return all;

    }, []);
}

module.exports.getFails = getFails;