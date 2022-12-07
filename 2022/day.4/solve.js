const { total, lines, extractor, isInside, isOverlapping } = require('../support');

const pattern = /^(.*)-(.*),(.*)-(.*)$/;
const parse = data => data.map(value => parseInt(value));
const buildAssignments = (numbers) => ({
    one: { start: numbers[0], end: numbers[1] },
    two: { start: numbers[2], end: numbers[3] },
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