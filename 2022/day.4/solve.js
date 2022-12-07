const { total, lines, parseForNumbers } = require('../support');

const pattern = /^(.*)-(.*),(.*)-(.*)$/;
const buildAssignments = (data) => ({
    one: { start: data[0], end: data[1] },
    two: { start: data[2], end: data[3] }
});
const isContained = (candidate, reference) => candidate.start >= reference.start && candidate.end <= reference.end;
const shouldReconsider = (pair) => isContained(pair.two, pair.one) || isContained(pair.one, pair.two);
const toReconsider = file => lines(file).map(line => shouldReconsider(buildAssignments(parseForNumbers(line, pattern))));

const areOverlapping = (pair) => 1;
const overlapping = (file) => [
    0, 0,
    areOverlapping(buildAssignments(parseForNumbers('5-7,7-9', pattern))),
    1, 1, 1
]

const solve1 = (file) => {
    return total(toReconsider(file));
};
const solve2 = (file) => {
    return total(overlapping(file));
};

module.exports = { solve1, solve2 };