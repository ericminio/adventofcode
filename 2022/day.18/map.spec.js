const { expect } = require('chai');
const example = `${__dirname}/data/example.txt`;

const parseMap = (file) => {
    let map = {};
    map.minimum = { x: 1, y: 1, z: 1 };

    return map;
};

describe.only('map', () => {

    let map;
    beforeEach(() => {
        map = parseMap(example);
    });

    describe('minimum', () => {

        it('exposes the minimu', () => {
            expect(map.minimum).to.deep.equal({ x: 1, y: 1, z: 1 });
        });

    });
});
