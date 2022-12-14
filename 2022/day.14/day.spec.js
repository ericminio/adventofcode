const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.14', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(24);
        });

        it('is solved', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal(592);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(93);
        });

        it('is solved', () => {
            expect(solve2(`${__dirname}/data/input.txt`)).to.equal(30367);
        });

    });
});


