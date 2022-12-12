const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe('2022.10', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(13140);
        });
        it('is solved', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(13140);
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


