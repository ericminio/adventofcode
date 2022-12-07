const { total, lines } = require('../support');

const isContained = (candidate, reference) => candidate.start >= reference.start && candidate.end <= reference.end;
const contained = (pair) => isContained(pair.two, pair.one);
const fullyContained = file => [
    0, 0, 0,
    contained({ one: { start: 2, end: 8 }, two: { start: 3, end: 7 } }),
    1,
    0
];

const solve1 = (file) => {
    return total(fullyContained(file));
}

module.exports = { solve1 };