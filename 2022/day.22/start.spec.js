const { expect } = require('chai');
const { parseMap } = require('./parse-map.js');
const { start } = require('./start.js');

const example = `${__dirname}/data/example.txt`;

describe('start', () => {

    it('is known', () => {
        const map = parseMap(example);
        const location = start(map);

        expect(location).to.deep.equal({ row: 1, column: 9 });
    });
});