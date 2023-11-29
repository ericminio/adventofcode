const { expect } = require('chai');

const { input } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');

describe('20??.? puzzles', () => {
    const incoming = input(`${__dirname}/incoming.txt`);

    describe('part 1', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal('???');
        });
    });

    describe('part 2', () => {
        it('is done', () => {
            expect(solveparttwo(incoming)).to.equal('???');
        });
    });
});
