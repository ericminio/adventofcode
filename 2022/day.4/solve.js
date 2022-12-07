const { total, lines } = require('../support');

const parse = (line) => ({ one: { start: 2, end: 6 }, two: { start: 4, end: 8 } });
const isContained = (candidate, reference) => candidate.start >= reference.start && candidate.end <= reference.end;
const contained = (pair) => isContained(pair.two, pair.one) || isContained(pair.one, pair.two);
const fullyContained = file => [
    0, 0, 0,
    contained({ one: { start: 2, end: 8 }, two: { start: 3, end: 7 } }),
    contained({ one: { start: 6, end: 6 }, two: { start: 4, end: 6 } }),
    contained(parse('2-6,4-8'))
];

const solve1 = (file) => {
    return total(fullyContained(file));
}

module.exports = { solve1 };