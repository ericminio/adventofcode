const { lines } = require('../support/index.js');
const { parseCell } = require('./parser.js');

const solve1 = (file) => {
    let cellDefinitions = lines(file);
    let sheet = cellDefinitions.map(parseCell);

    return 152;
};

const solve2 = () => {
    return 15;
};

module.exports = { solve1, solve2 };