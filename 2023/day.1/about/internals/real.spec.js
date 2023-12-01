const { expect } = require('chai');

const value = require('../../solution/real-value.js');

describe('real value recovery', () => {
    it('works for two1nine', () => {
        expect(value('two1nine')).to.equal(29);
    });

    it('works for eightwothree', () => {
        expect(value('eightwothree')).to.equal(83);
    });

    it('works for abcone2threexyz', () => {
        expect(value('abcone2threexyz')).to.equal(13);
    });

    it('works for xtwone3four', () => {
        expect(value('xtwone3four')).to.equal(24);
    });

    it('works for 4nineeightseven2', () => {
        expect(value('4nineeightseven2')).to.equal(42);
    });

    it('works for zoneight234', () => {
        expect(value('zoneight234')).to.equal(14);
    });

    it('works for 7pqrstsixteen', () => {
        expect(value('7pqrstsixteen')).to.equal(76);
    });
});
