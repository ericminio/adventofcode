const { expect } = require('chai');
const { groups } = require('../support/index.js');
const example = `${__dirname}/data/example.txt`;

describe.only('parsing the path', () => {

    it('can be explored', () => {
        const incoming = groups(example)[1][0];
        console.log(incoming);
        const path = parse('10R');

        expect(path).to.deep.equal([
            { move: 10 },
            { rotate: 'R' }
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

    return path;
};