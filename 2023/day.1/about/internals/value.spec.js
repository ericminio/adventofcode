import { expect } from 'chai';

import { naive } from '../../solution/value.js';

describe('value recovery', () => {
    it('works for 1abc2', () => {
        expect(naive('1abc2')).to.equal(12);
    });

    it('works for pqr3stu8vwx', () => {
        expect(naive('pqr3stu8vwx')).to.equal(38);
    });

    it('works for a1b2c3d4e5f', () => {
        expect(naive('a1b2c3d4e5f')).to.equal(15);
    });
});
