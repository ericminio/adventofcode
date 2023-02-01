const { expect } = require('chai');
const { parsePath } = require('./parse-path.js');
const example = `${__dirname}/data/example.txt`;

describe('parsing the path', () => {

    it('can be explored', () => {
        const path = parsePath(example);

        expect(path).to.deep.equal([
            { move: 10 },
            { rotate: 'R' },
            { move: 5 },
            { rotate: 'L' },
            { move: 5 },
            { rotate: 'R' },
            { move: 10 },
            { rotate: 'L' },
            { move: 4 },
            { rotate: 'R' },
            { move: 5 },
            { rotate: 'L' },
            { move: 5 },
        ]);
    });
});