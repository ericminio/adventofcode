const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.20', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(3);
        });

        it('is solved', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal(17490);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(1623178306);
        });

        it('is solved', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(1623178306);
        });

    });

});
