const { input } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');
const { expect } = require('chai');

describe('2015.1 puzzles', () => {
    describe('To what floor do the instructions take Santa?', () => {
        it('is solved', () => {
            expect(solvepartone(input(`${__dirname}/incoming.txt`))).to.equal(
                138
            );
        });
    });

    describe('What is the position of the character that causes Santa to first enter the basement?', () => {
        it('is done', () => {
            expect(solveparttwo(input(`${__dirname}/incoming.txt`))).to.equal(
                1771
            );
        });
    });
});
