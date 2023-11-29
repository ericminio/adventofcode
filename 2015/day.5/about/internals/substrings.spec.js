const { expect } = require('chai');
const substrings = require('../../solution/substrings.js');

describe('substrings matchers', () => {
    it('is happy with ba', () => {
        expect(substrings('ba')).to.equal(true);
    });

    it('is happy with ab', () => {
        expect(substrings('ab')).to.equal(false);
    });

    it('is happy with cd', () => {
        expect(substrings('cd')).to.equal(false);
    });

    it('is happy with pq', () => {
        expect(substrings('pq')).to.equal(false);
    });

    it('is happy with xy', () => {
        expect(substrings('xy')).to.equal(false);
    });
});
