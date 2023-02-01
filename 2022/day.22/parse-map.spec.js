const { expect } = require('chai');
const { parseMap } = require('./parse-map.js');
const example = `${__dirname}/data/example.txt`;

describe.only('parsing the map', () => {

    it('works for 1x9', () => {
        const map = parseMap(example);

        expect(map['1x9']).to.deep.equal({
            location: { row: 1, column: 9 },
            neighbours: [ '1x10', '2x9', '12x9' ]
        });
    });

    it('works for 6x12', () => {
        const map = parseMap(example);

        expect(map['6x12']).to.deep.equal({
            location: { row: 6, column: 12 },
            neighbours: [ '6x1', '7x12', '6x11' ]
        });
    });
});