const { expect } = require('chai');

const { input } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');

describe('2015.3 puzzles', () => {
    describe('How many houses receive at least one present?', () => {
        it('is solved', () => {
            expect(solvepartone(input(`${__dirname}/incoming.txt`))).to.equal(
                2572
            );
        });
    });

    describe('With 2 delivery men, how many houses receive at least one present?', () => {
        it('is solved', () => {
            expect(solveparttwo(input(`${__dirname}/incoming.txt`))).to.equal(
                2631
            );
        });
    });
});
