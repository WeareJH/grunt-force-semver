import semver from '../tasks/index.js';
import {assert} from 'chai';

describe('getting fails', () => {
    it('returns empty array when no failures', () => {
        assert.equal(semver.getFails(require('../package.json'), process.cwd()).length, 0);
    });
});
