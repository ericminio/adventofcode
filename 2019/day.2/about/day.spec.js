const { expect } = require('chai');

const { input } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');

describe('2019.2 puzzles', () => {
    describe('What value is left at position 0 after the program halts?', () => {
        it('is solved', () => {
            expect(solvepartone(input(`${__dirname}/incoming.txt`))).to.equal(
                2842648
            );
        });
    });
});
