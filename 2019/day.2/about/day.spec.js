const { expect } = require('chai');

const { input } = require('../../../support');
const { solvepartone, solveparttwo } = require('../solution');

describe('2019.2 puzzles', () => {
    describe('What value is left at position 0 after the program halts?', () => {
        it('is solved', () => {
            expect(solvepartone(input(`${__dirname}/incoming.txt`))).to.equal(
                2842648
            );
        });
    });

    describe('What value is left at position 0 after the program halts?', () => {
        it('Find the input noun and verb that cause the program to produce the output 19690720. What is 100 * noun + verb?', () => {
            expect(solveparttwo(input(`${__dirname}/incoming.txt`))).to.equal(
                9074
            );
        });
    });
});
