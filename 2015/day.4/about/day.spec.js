const { expect } = require('chai');

const { solvepartone, solveparttwo } = require('../solution');

describe.skip('2015.4 puzzles', () => {
    const input = 'iwrupvqb';

    describe('find MD5 hashes which, in hexadecimal, start with at least five zeroes', () => {
        it('is solved', () => {
            expect(solvepartone(input)).to.equal(346386);
        });
    });

    describe('find MD5 hashes which, in hexadecimal, start with at least six zeroes', () => {
        it('is solved', () => {
            expect(solveparttwo(input)).to.equal(9958218);
        });
    });
});
