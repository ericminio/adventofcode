const { input } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');
const { expect } = require('chai');

describe('2015.2 puzzles', () => {
    describe('How many total square feet of wrapping paper should they order?', () => {
        it('is solved', () => {
            expect(solvepartone(input(`${__dirname}/incoming.txt`))).to.equal(
                1606483
            );
        });
    });

    describe('How many total feet of ribbon should they order?', () => {
        it('is solved', () => {
            expect(solveparttwo(input(`${__dirname}/incoming.txt`))).to.equal(
                '???'
            );
        });
    });
});
