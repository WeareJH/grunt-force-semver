'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tasksIndexJs = require('../tasks/index.js');

var _tasksIndexJs2 = _interopRequireDefault(_tasksIndexJs);

var _chai = require('chai');

describe('getting fails', function () {
    it('returns empty array when no failures', function () {
        _chai.assert.equal(_tasksIndexJs2['default'].getFails(require('../package.json'), process.cwd()).length, 0);
    });
});