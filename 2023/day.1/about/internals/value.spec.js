const { expect } = require('chai');

const value = require('../../solution/value.js');

describe('value recovery', () => {
    it('works for 1abc2', () => {
        expect(value('1abc2')).to.equal(12);
    });

    it('works for pqr3stu8vwx', () => {
        expect(value('pqr3stu8vwx')).to.equal(38);
    });

    it('works for a1b2c3d4e5f', () => {
        expect(value('a1b2c3d4e5f')).to.equal(15);
    });
});
