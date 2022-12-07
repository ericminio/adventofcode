const { total, lines, parseForNumbers } = require('../support');

const pattern = /^(.*)-(.*),(.*)-(.*)$/;
const buildAssignments = (data) => ({
    one: { start: data[0], end: data[1] },
    two: { start: data[2], end: data[3] }
});
const isContained = (candidate, reference) => candidate.start >= reference.start && candidate.end <= reference.end;
const areContaining = (pair) => isContained(pair.two, pair.one) || isContained(pair.one, pair.two);
const containing = file => lines(file).map(line => areContaining(buildAssignments(parseForNumbers(line, pattern))));

const isOverlapping = (candidate, reference) => candidate.end >= reference.start && candidate.start <= reference.end;
const areOverlapping = (pair) => isOverlapping(pair.one, pair.two) || isOverlapping(pair.two, pair.one);
const overlapping = (file) => lines(file).map(line => areOverlapping(buildAssignments(parseForNumbers(line, pattern))));

const solve1 = (file) => {
    return total(containing(file));
};
const solve2 = (file) => {
    return total(overlapping(file));
};

module.exports = { solve1, solve2 };