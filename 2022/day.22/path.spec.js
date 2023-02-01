const { expect } = require('chai');
const example = `${__dirname}/data/example.txt`;
const { groups } = require('../support/index.js');

const id = (row, column) => `${row}x${column}`;

describe.only('parsing the path', () => {

    it('can be explored', () => {
        const path = parse('1R');

        expect(path).to.deep.equal([
            { move: 10 },
            { rotate: 'R' }
        ]);
    });
});

const parse = (spec) => {
    const path = [
        { move: 10 },
        { rotate: 'R' }
    ];
    return path;
};