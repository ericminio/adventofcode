const { parseMap } = require('./parse-map.js');

const example = `${__dirname}/data/example.txt`;

describe('start', () => {

    it('is known', () => {
        const map = parseMap(example);
    });
});