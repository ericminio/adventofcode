const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe('2022.24', () => {

    describe('figuring out the fewest number of minutes required to avoid the blizzards and reach the goal?', () => {

        it('leverages an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(18);
        });

    });

    describe('part 2', () => {

        it('leverages an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });
});
