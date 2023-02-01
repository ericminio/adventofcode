const { expect } = require('chai');
const { parseMap } = require('./parse-map.js');
const example = `${__dirname}/data/example.txt`;

describe('parsing the map', () => {

    it('can be explored', () => {
        const map = parseMap(example);

        expect(map['1x9']).to.deep.equal({
            location: { row: 1, column: 9 },
            neighbours: [ '1x10', '2x9', '12x9' ]
        });
    });
});