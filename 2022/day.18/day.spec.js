const { expect } = require('chai');
const { solve1, solve2 } = require('./solve');
const example = `${__dirname}/data/example.txt`;
const input = `${__dirname}/data/input.txt`;

describe.only('2022.18', () => {

    describe('figuring out the surface area of your scanned lava droplet', () => {

        it('leverages an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(64);
        });

        it('is done', () => {
            expect(solve1(`${__dirname}/data/input.txt`)).to.equal(3466);
        });

    });

    describe('figuring out the exterior surface area of the lava droplet', () => {

        it('leverages an example', () => {
            expect(solve2(`${__dirname}/data/example.txt`)).to.equal(58);
        });

    });

    describe('internals', () => {

        it('exposes lava dropplets', () => {

        });
    });
});
