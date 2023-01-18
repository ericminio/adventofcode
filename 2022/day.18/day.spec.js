const { expect } = require('chai');
const example = `${__dirname}/data/example.txt`;
const input = `${__dirname}/data/input.txt`;
const { spaceAsHash } = require('../../lib/3d/space');
const { gps } = require('../../lib/gps');
const { setWall } = require('../../lib/walls');
const { boundaries } = require('./boundaries');
const { id, around } = require('./cube');
const { solve1, solve2, airTrappedDropplets, touchingCount } = require('./solve');
const { lavaDropplets, neighbours } = require('./solve');

describe.only('2022.18', () => {

    describe('figuring out the surface area of your scanned lava droplet', () => {

        it('leverages an example', () => {
            expect(solve1(example)).to.equal(64);
        });

        it('is done', () => {
            expect(solve1(input)).to.equal(3466);
        });

    });

    describe('figuring out the exterior surface area of the lava droplet', () => {

        it('leverages an example', () => {
            expect(solve2(example)).to.equal(58);
        });

        it('is done', () => {
            expect(3466 - 1454).to.equal(2012);
        });

    });

    describe('internals', () => {

        it('exposes lava dropplets', () => {
            expect(Object.values(lavaDropplets(example)).length).to.equal(13);
            expect(Object.values(lavaDropplets(input)).length).to.equal(2090);
        });

        it('exposes air trapped airTrappedCandidates', () => {
            expect(neighbours(lavaDropplets(example)).length).to.equal(35);
            expect(neighbours(lavaDropplets(input)).length).to.equal(1660);
        });
    });

    describe('the gps way', () => {

        it('is promising', () => {
            let cubes = lavaDropplets(example);
            let trappedDropplets = airTrappedDropplets(cubes);
            let count = touchingCount(trappedDropplets, cubes);

            expect(count).to.equal(6);
        });
    });
});
