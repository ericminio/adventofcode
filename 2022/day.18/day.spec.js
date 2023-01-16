const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.18', () => {

    describe('figure out the surface area of your scanned lava droplet', () => {

        it('leverages an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(64);
        });

        it('is done', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(64);
        });

    });

    describe('part 2', () => {

        it('leverages an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(15);
        });

    });
});
