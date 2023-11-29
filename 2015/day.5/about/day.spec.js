const { expect } = require('chai');

const { lines } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');

describe('2015.5 puzzles', () => {
    const incoming = lines(`${__dirname}/incoming.txt`);

    describe('How many strings are nice?', () => {
        it('is known', () => {
            expect(solvepartone(incoming)).to.equal(238);
        });
    });

    describe('How many strings are nice under these new rules?', () => {
        it('is known', () => {
            expect(solveparttwo(incoming)).to.equal('???');
        });
    });
});
