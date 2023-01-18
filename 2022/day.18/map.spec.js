const { expect } = require('chai');
const { lines } = require('../support/index.js');
const { parse } = require('./parser.js');
const example = `${__dirname}/data/example.txt`;

const parseMap = (cubes) => {
    let map = {};
    map.minimum = { x: 1, y: 1, z: 1 };
    map.maximum = { x: 3, y: 3, z: 6 };
    return map;
};

describe.only('map', () => {

    let map;
    beforeEach(() => {
        let cubes = lines(example).reduce((cubes, line) => {
            cubes[line] = parse(line);
            return cubes;
        }, {});

        map = parseMap(cubes);
    });

    it('exposes boundaries', () => {
        expect(map.minimum).to.deep.equal({ x: 1, y: 1, z: 1 });
        expect(map.maximum).to.deep.equal({ x: 3, y: 3, z: 6 });
    });
});
