const { total, lines, parser, parse, parseForNumbers, isInside, isOverlapping } = require('../support');

const pattern = /^(.*)-(.*),(.*)-(.*)$/;
const buildAssignments = (data) => ({
    one: { start: data[0], end: data[1] },
    two: { start: data[2], end: data[3] },
});

const areContaining = pair => isInside(pair.two, pair.one) || isInside(pair.one, pair.two);
const containing = file => lines(file)
    .map(parser(pattern))
    .map(data => data.map(value => parseInt(value)))
    .map(buildAssignments)
    .map(areContaining);

const areOverlapping = pair => isOverlapping(pair.one, pair.two);
const overlapping = file => lines(file)
    .map(parser(pattern))
    .map(data => data.map(value => parseInt(value)))
    .map(buildAssignments)
    .map(areOverlapping);

const solve1 = (file) => {
    return total(containing(file));
};
const solve2 = (file) => {
    return total(overlapping(file));
};

module.exports = { solve1, solve2 };