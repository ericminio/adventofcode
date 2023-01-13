const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.22', () => {

    describe('figuring out the final password to pass through the force field', () => {

        it('leverages an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(42);
        });

    });

    describe('part 2', () => {

        it('leverages an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });
});
