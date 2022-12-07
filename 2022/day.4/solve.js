const { total, lines } = require('../support');

const pattern = /^(.*)-(.*),(.*)-(.*)$/;
const parse = (line) => pattern.exec(line).splice(1).map(item => parseInt(item));
const build = (data) => ({ one: { start: data[0], end: data[1] }, two: { start: data[2], end: data[3] } });
const isContained = (candidate, reference) => candidate.start >= reference.start && candidate.end <= reference.end;
const contained = (pair) => isContained(pair.two, pair.one) || isContained(pair.one, pair.two);
const fullyContained = file => [
    0, 0, 0,
    contained({ one: { start: 2, end: 8 }, two: { start: 3, end: 7 } }),
    contained(build(parse('6-6,4-6'))),
    contained(build(parse('2-6,4-8')))
];

const solve1 = (file) => {
    return total(fullyContained(file));
}

module.exports = { solve1 };