const { expect } = require('chai');
const { lines } = require('../support/index.js');
const { parse } = require('./parser.js');
const example = `${__dirname}/data/example.txt`;

const boundaries = (cubes) => {
    const positions = Object.values(cubes).map(cube => cube.position);
    const xs = positions.map(position => position.x);
    const ys = positions.map(position => position.y);
    const zs = positions.map(position => position.z);
    return {
        minimum: { x: Math.min(...xs), y: Math.min(...ys), z: Math.min(...zs) },
        maximum: { x: Math.max(...xs), y: Math.max(...ys), z: Math.max(...zs) }
    };
};

describe.only('map', () => {

    let map;
    beforeEach(() => {
        let cubes = lines(example).reduce((cubes, line) => {
            cubes[line] = parse(line);
            return cubes;
        }, {});
        map = boundaries(cubes);
    });

    it('exposes boundaries', () => {
        expect(map.minimum).to.deep.equal({ x: 1, y: 1, z: 1 });
        expect(map.maximum).to.deep.equal({ x: 3, y: 3, z: 6 });
    });

    it('exposes neighbours', () => {

    });
});
