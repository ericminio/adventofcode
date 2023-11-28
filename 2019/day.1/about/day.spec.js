const { expect } = require('chai');

const { numbers } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');

describe('2019.1 puzzles', () => {
    describe('What is the sum of the fuel requirements for all of the modules on your spacecraft?', () => {
        it('is solved', () => {
            expect(solvepartone(numbers(`${__dirname}/incoming.txt`))).to.equal(
                3232358
            );
        });
    });
});
