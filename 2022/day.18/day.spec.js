const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');

describe.only('2022.18', () => {

    describe('figuring out the surface area of your scanned lava droplet', () => {

        it('leverages an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(64);
        });

        it('is done', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(64);
        });

    });

    describe('figuring out the exterior surface area of the lava droplet', () => {

        it('leverages an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(58);
        });

    });
});
