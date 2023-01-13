const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe('2022.23', () => {

    describe('figuring out how many empty ground tiles does contain the smallest rectangle that contains the Elves after 10 rounds?', () => {

        it('leverages an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(110);
        });

    });

    describe('part 2', () => {

        it('leverages an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });
});
