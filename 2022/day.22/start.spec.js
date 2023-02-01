const { expect } = require('chai');
const { parseMap } = require('./parse-map.js');
const { start } = require('./start.js');

const example = `${__dirname}/data/example.txt`;
const challenge = `${__dirname}/data/input.txt`;

describe('start', () => {

    it('is known for the example', () => {
        const map = parseMap(example);
        const location = start(map);

        expect(location).to.deep.equal({ row: 1, column: 9 });
    });

    it('is known for the challenge', () => {
        const map = parseMap(challenge);
        const location = start(map);

        expect(location).to.deep.equal({ row: 1, column: 51 });
    });
});