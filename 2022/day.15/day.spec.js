const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.15', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`, 10)).to.equal(26);
        });

        it('is solved', () => {
            expect(solve1(`${__dirname}/data/input.txt`, 2000000)).to.equal(4748135);
        });

    });

    describe('part 2', () => {

        it('has an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(56000011);
        });
        it('is solved', () => {
            expect(solve2(`${__dirname}/data/input.txt`)).to.equal(13743542639657);
        });

    });
});


