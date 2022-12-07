const { total, lines } = require('../support');

const isContained = (assignment) => 1;
const contained = (pair) => isContained(pair.two, pair.one);
const fullyContained = file => [0, 0, 0, 1, contained({ one: { start: 2, end: 8 }, two: { start: 3, end: 7 } }), 0];

const solve1 = (file) => {
    return total(fullyContained(file));
}

module.exports = { solve1 };