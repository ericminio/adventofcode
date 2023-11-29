const { expect } = require('chai');
const vowels = require('../../solution/vowels.js');

describe('vowels matchers', () => {
    it('is happy with 3 vowels', () => {
        expect(vowels('aei')).to.equal(true);
    });

    it('is not happy with 2 vowels', () => {
        expect(vowels('ae')).to.equal(false);
    });

    it('is happy with ugknbfddgicrmopn', () => {
        expect(vowels('ugknbfddgicrmopn')).to.equal(true);
    });

    it('is not happy with dvszwmarrgswjxmb', () => {
        expect(vowels('dvszwmarrgswjxmb')).to.equal(false);
    });
});
