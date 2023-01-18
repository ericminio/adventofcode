const { expect } = require('chai');
const { lines } = require('../support/index.js');
const { id, around } = require('./cube.js');
const { parse } = require('./parser.js');
const example = `${__dirname}/data/example.txt`;

const parseMap = (cubes) => {
    let map = {};
    const positions = Object.values(cubes).map(cube => cube.position);
    const xs = positions.map(position => position.x);
    const ys = positions.map(position => position.y);
    const zs = positions.map(position => position.z);
    map.minimum = { x: Math.min(...xs), y: Math.min(...ys), z: Math.min(...zs) };
    map.maximum = { x: Math.max(...xs), y: Math.max(...ys), z: Math.max(...zs) };
    return map;
};

describe.only('map', () => {

    let map;
    beforeEach(() => {
        let cubes = lines(example).reduce((cubes, line) => {
            cubes[line] = parse(line);
            return cubes;
        }, {});
        let neighbours = Object.values(cubes)
            .reduce((neighbours, cube) => {
                cube.neighbours.forEach(neighbour => {
                    neighbours[id(neighbour)] = {
                        id: id(neighbour),
                        position: neighbour,
                        neighbours: around(neighbour)
                    };
                });
                return neighbours;
            }, {});
        let candidates = Object.values(neighbours).filter(candidate => cubes[candidate.id] === undefined);

        map = parseMap(cubes);
    });

    it('exposes boundaries', () => {
        expect(map.minimum).to.deep.equal({ x: 1, y: 1, z: 1 });
        expect(map.maximum).to.deep.equal({ x: 3, y: 3, z: 6 });
    });
});
