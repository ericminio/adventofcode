const { expect } = require('chai');
const example = `${__dirname}/data/example.txt`;
const input = `${__dirname}/data/input.txt`;
const { spaceAsHash } = require('../../lib/3d/space');
const { gps } = require('../../lib/gps');
const { setWall } = require('../../lib/walls');
const { boundaries } = require('./boundaries');
const { id, around } = require('./cube');
const { solve1, solve2 } = require('./solve');
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
            let airTrappedCandidates = neighbours(cubes);
            let bounds = boundaries(airTrappedCandidates.map(candidate => candidate.position));
            let minimum = { x: bounds.minimum.x - 1, y: bounds.minimum.y - 1, z: bounds.minimum.z - 1  };
            let maximum = { x: bounds.maximum.x + 1, y: bounds.maximum.y + 1, z: bounds.maximum.z + 1  };
            let space = spaceAsHash({ minimum, maximum });
            Object.values(cubes).forEach(cube => {
                setWall(cube.id, space);
            });
            Object.keys(space).forEach(key => {
                space[key].value = 1;
            });
            let trapped = [];
            let request = { origin: { id: id(minimum) }};
            airTrappedCandidates.forEach(candidate => {
                request.target = { id: candidate.id };
                try {
                    gps(request, space);
                }
                catch (error) {
                    trapped.push(candidate.position);
                }
            });
            let count = 0;
            trapped.forEach(airDropplet => {
                let neighbours = around(airDropplet);
                neighbours.forEach(neighbour => {
                    if (cubes[id(neighbour)] !== undefined) {
                        count ++;
                    }
                });
            });
            expect(count).to.equal(6);
        });
    });
});
