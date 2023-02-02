const { expect } = require('chai');
const { parsePath } = require('./parse-path.js');
const { turnLeft, turnRight } = require('./rotation.js');
const example = `${__dirname}/data/example.txt`;

describe('parsing the path', () => {

    it('can be explored', () => {
        const path = parsePath(example);

        expect(path).to.deep.equal([
            { move: 10 },
            { rotate: turnRight },
            { move: 5 },
            { rotate: turnLeft },
            { move: 5 },
            { rotate: turnRight },
            { move: 10 },
            { rotate: turnLeft },
            { move: 4 },
            { rotate: turnRight },
            { move: 5 },
            { rotate: turnLeft },
            { move: 5 },
        ]);
    });
});