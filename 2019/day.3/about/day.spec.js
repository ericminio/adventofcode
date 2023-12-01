const { expect } = require('chai');

const { lines } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');

describe('2019.3 puzzles', () => {
    const incoming = lines(`${__dirname}/incoming.txt`);

    describe('What is the Manhattan distance from the central port to the closest intersection?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(217);
        });
    });

    describe.skip('What is the fewest combined steps the wires must take to reach an intersection?', () => {
        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal('???');
        });
    });
});
