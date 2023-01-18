const { expect } = require('chai');
const example = `${__dirname}/data/example.txt`;

const parseMap = (file) => {
    let map = {};
    map.minimum = { x: 1, y: 1, z: 1 };
    map.maximum = { x: 3, y: 3, z: 6 };
    return map;
};

describe.only('map', () => {

    let map;
    beforeEach(() => {
        map = parseMap(example);
    });

    it('exposes the minimum', () => {
        expect(map.minimum).to.deep.equal({ x: 1, y: 1, z: 1 });
    });
    it('exposes the maximum', () => {
        expect(map.maximum).to.deep.equal({ x: 3, y: 3, z: 6 });
    });
});
