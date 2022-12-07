const { total, lines, parseForNumbers } = require('../support');

const pattern = /^(.*)-(.*),(.*)-(.*)$/;
const buildAssignments = (data) => ({
    one: { start: data[0], end: data[1] },
    two: { start: data[2], end: data[3] }
});
const isContained = (candidate, reference) => candidate.start >= reference.start && candidate.end <= reference.end;
const contained = (pair) => isContained(pair.two, pair.one) || isContained(pair.one, pair.two);
const fullyContained = file => lines(file).map(line => contained(buildAssignments(parseForNumbers(line, pattern))));

const solve1 = (file) => {
    return total(fullyContained(file));
}

module.exports = { solve1 };