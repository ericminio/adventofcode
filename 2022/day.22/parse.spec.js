const { id } = require('../support/index.js');

describe.only('parsing the example', () => {

    it('has cell 9x1', () => {
        const map = {};
        const location = { x: 9, y: 1 };
        map[id(location)] = { location };
    });
});