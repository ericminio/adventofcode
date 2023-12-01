const { expect } = require('chai');

const { lines } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');

describe('2019.1 puzzles', () => {
    const incoming = lines(`${__dirname}/incoming.txt`);

    describe('What is the Manhattan distance from the central port to the closest intersection?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal('???');
        });
    });
});
