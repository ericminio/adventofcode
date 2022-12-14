const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.12', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(31);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });

    describe('internals', () => {

        it('may be needed', () => {

        });
    });
});


