const { expect } = require('chai');
const example = `${__dirname}/data/example.txt`;
const { groups } = require('../support/index.js');

const id = (row, column) => `${row}x${column}`;

describe.only('parsing the example', () => {

    it('can be explored', () => {
        const map = parse(example);

        // expect(map['1x9']).to.deep.equal({ location: { row: 1, column: 9 }});
    });
});

const parse = (file) => {
    const map = {};
    const incoming = groups(file)[0];
    console.log(incoming);
    for (let i = 0; i < incoming.length; i++) {
        let row = i + 1;
        for (let j = 0; j < incoming[i].length; j++) {
            let column = j + 1;
            if (incoming[i][j] === '.') {
                map[id(row, column)] = { location: { row, column }};
            }
        }
    }
    return map;
};