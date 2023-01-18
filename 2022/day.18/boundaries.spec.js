const { expect } = require('chai');
const { lines } = require('../support/index.js');
const { boundaries } = require('./boundaries.js');
const { parse } = require('./parser.js');
const example = `${__dirname}/data/example.txt`;

describe.only('boundaries', () => {

    let map;
    beforeEach(() => {
        let cubes = lines(example).reduce((cubes, line) => {
            cubes[line] = parse(line);
            return cubes;
        }, {});
        map = boundaries(Object.values(cubes).map(cube => cube.position));
    });

    it('exposes boundaries', () => {
        expect(map.minimum).to.deep.equal({ x: 1, y: 1, z: 1 });
        expect(map.maximum).to.deep.equal({ x: 3, y: 3, z: 6 });
    });

    it('exposes neighbours', () => {

    });
});
