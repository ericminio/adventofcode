const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe('2022.8', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(21);
        });

        it('is solved', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal(1792);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(8);
        });

        it('is solved', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(8);
        });

    });
});


