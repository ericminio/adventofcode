import { expect } from 'chai';

import { real } from '../../solution/real-value.js';

describe('real value recovery', () => {
    it('works for two1nine', () => {
        expect(real('two1nine')).to.equal(29);
    });

    it('works for eightwothree', () => {
        expect(real('eightwothree')).to.equal(83);
    });

    it('works for abcone2threexyz', () => {
        expect(real('abcone2threexyz')).to.equal(13);
    });

    it('works for xtwone3four', () => {
        expect(real('xtwone3four')).to.equal(24);
    });

    it('works for 4nineeightseven2', () => {
        expect(real('4nineeightseven2')).to.equal(42);
    });

    it('works for zoneight234', () => {
        expect(real('zoneight234')).to.equal(14);
    });

    it('works for 7pqrstsixteen', () => {
        expect(real('7pqrstsixteen')).to.equal(76);
    });
});
