const { id } = require('../support/index.js');

const xy = (x, y) => {
    return { x, y };
};

describe.only('parsing the example', () => {

    it('has cell 9x1', () => {
        const map = {};
        map[id(xy(9, 1))] = {
            location: xy(9, 1),
            neighbours: []
        };
    });
});