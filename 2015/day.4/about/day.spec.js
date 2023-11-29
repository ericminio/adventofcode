const { expect } = require('chai');

const { solvepartone, solveparttwo } = require('../solution');

describe('2015.4 puzzles', () => {
    const input = 'iwrupvqb';

    describe('part 1', () => {
        it('is solved', () => {
            expect(solvepartone(input)).to.equal(346386);
        });
    });
});
