const { expect } = require('chai');
const { id } = require('../support/index.js');

const xy = (x, y) => {
    return { x, y };
};

describe.only('parsing the example', () => {

    it('has expectations', () => {
        const map = {};
        map[id(xy(9, 1))] = {
            location: xy(9, 1),
            neighbours: [
                id(xy(10, 1)),
                id(xy(9, 2)),
                id(xy(9, 12))
            ]
        };

        expect(map['9x1']).to.deep.equal({
            location: { x: 9, y: 1 },
            neighbours: [
                '10x1', '9x2', '9x12'
            ]
        });
    });
});