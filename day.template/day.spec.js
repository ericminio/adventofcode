const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const example = `${__dirname}/data/example.txt`;
const input = `${__dirname}/data/input.txt`;

describe('2022.??', () => {

    describe('part 1', () => {

        it('leverages an example', () => {
            expect(solve1(example)).to.equal(42);
        });

    });

    describe('part 2', () => {

        it('leverages an example', () => {
            expect(solve2(input)).to.equal(15);
        });

    });
});
