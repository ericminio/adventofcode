const { expect } = require('chai');

const { lines } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');

describe('2023.1 puzzles', () => {
    const incoming = lines(`${__dirname}/incoming.txt`);

    describe('What is the sum of all of the calibration values?', () => {
        it('is solved', () => {
            expect(solvepartone(incoming)).to.equal(54877);
        });
    });

    describe('What is the sum of all of the real calibration values?', () => {
        it('is solved', () => {
            expect(solveparttwo(incoming)).to.equal(54100);
        });
    });
});
