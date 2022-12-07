const { total, lines, extractor, isInside, isOverlapping } = require('../support');

const pattern = /^(.*)-(.*),(.*)-(.*)$/;
const parse = data => data.map(value => parseInt(value));
const buildAssignments = (data) => ({
    one: { start: data[0], end: data[1] },
    two: { start: data[2], end: data[3] },
});
const assignments = (file) => lines(file)
    .map(extractor(pattern))
    .map(parse)
    .map(buildAssignments);
const areContaining = pair => isInside(pair.two, pair.one) || isInside(pair.one, pair.two);
const containing = file => assignments(file).map(areContaining);

const areOverlapping = pair => isOverlapping(pair.one, pair.two);
const overlapping = file => assignments(file).map(areOverlapping);

const solve1 = (file) => {
    return total(containing(file));
};
const solve2 = (file) => {
    return total(overlapping(file));
};

module.exports = { solve1, solve2 };