const { expect } = require('chai');
const { groups } = require('../support/index.js');
const example = `${__dirname}/data/example.txt`;

describe.only('parsing the path', () => {

    it('can be explored', () => {
        const incoming = groups(example)[1][0];
        const path = parse(incoming);

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

const parse = (spec) => {
    const path = [];
    let move = '';
    for (let i = 0; i < spec.length; i++) {
        let char = spec[i];
        if (char === 'R') {
            if (move.length > 0) {
                path.push({ move: parseInt(move, 10) });
                move = '';
            }
            path.push({ rotate: 'R' });
        }
        else if (char === 'L') {
            if (move.length > 0) {
                path.push({ move: parseInt(move, 10) });
                move = '';
            }
            path.push({ rotate: 'L' });
        }
        else {
            move += char;
        }
    }
    if (move.length > 0) {
        path.push({ move: parseInt(move, 10) });
        move = '';
    }

    return path;
};