import {getFails} from '../tasks/index.js';
import {assert} from 'chai';

describe('getting fails', () => {
    it('returns empty array when no failures', () => {
        getFails(require('../package.json'), process.cwd());
    });
});