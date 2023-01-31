const { expect } = require('chai');
const example = `${__dirname}/data/example.txt`;
const { id, groups } = require('../support/index.js');

const xy = (x, y) => {
    return { x: x, y: y };
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

    it('can be explored', () => {
        const map = parse(example);
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
                map[id(row, column)];
            }
        }
    }
};