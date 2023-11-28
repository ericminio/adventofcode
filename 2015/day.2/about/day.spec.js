const { input } = require('../../../support');
const { solvepartone } = require('../solution');
const { expect } = require('chai');

describe('2015.2 puzzles', () => {
    describe('How many total square feet of wrapping paper should they order?', () => {
        it('is solved', () => {
            expect(solvepartone(input(`${__dirname}/incoming.txt`))).to.equal(
                1606483
            );
        });
    });
});
