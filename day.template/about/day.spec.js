const { expect } = require('chai');

const { input } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');

describe('20??.? puzzles', () => {
    describe('part 1', () => {
        it('is solved', () => {
            expect(solvepartone(input(`${__dirname}/incoming.txt`))).to.equal(
                '???'
            );
        });
    });

    describe('part 2', () => {
        it('is done', () => {
            expect(solveparttwo(input(`${__dirname}/incoming.txt`))).to.equal(
                '???'
            );
        });
    });
});
