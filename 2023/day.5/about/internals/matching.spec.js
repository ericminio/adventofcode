import { expect } from 'chai';

import { isMatchingRange } from '../../solution/isMatchingRange.js';

describe('isMatchingRange', () => {
    it('is a closed interval on the left', () => {
        expect(isMatchingRange(77, { source: 77, size: 23 })).to.equal(true);
    });

    it('is a closed interval on the right', () => {
        expect(isMatchingRange(77, { source: 64, size: 13 })).to.equal(false);
    });
});
