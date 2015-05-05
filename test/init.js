'use strict';

var _getFails = require('../tasks/index.js');

var _assert = require('chai');

describe('getting fails', function () {
    it('returns empty array when no failures', function () {
        _getFails.getFails(require('../package.json'), process.cwd());
    });
});